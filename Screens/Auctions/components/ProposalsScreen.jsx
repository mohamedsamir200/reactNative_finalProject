import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  Image,
  ScrollView,
  TextInput,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import {
  doc,
  onSnapshot,
  updateDoc,
  arrayUnion,
  getDocs,
  collection,
} from "firebase/firestore";
import db from "../../../Config/firebase";
import AsyncStorage from "@react-native-async-storage/async-storage";

function ProposalsPage({ route, navigation }) {
  const { product } = route.params; // Retrieve product from navigation params
  const [inputValue, setInputValue] = useState("");
  const [userID, setUserID] = useState("");
  const [proposals, setProposals] = useState([]);
  const [users, setUsers] = useState({});
  const [error, setError] = useState("");
  const [timeRemaining, setTimeRemaining] = useState(""); // State for remaining time

  // Calculate the time remaining
  useEffect(() => {
    if (product?.endDate) {
      const calculateTimeLeft = () => {
        const endDate = new Date(product.endDate);
        const now = new Date();
        const difference = endDate - now;

        if (difference > 0) {
          const hours = Math.floor(difference / (1000 * 60 * 60));
          const minutes = Math.floor(
            (difference % (1000 * 60 * 60)) / (1000 * 60)
          );
          const seconds = Math.floor((difference % (1000 * 60)) / 1000);

          setTimeRemaining(`${hours}h ${minutes}m ${seconds}s`);
        } else {
          setTimeRemaining("Auction has ended");
        }
      };

      const timer = setInterval(calculateTimeLeft, 1000);
      return () => clearInterval(timer);
    }
  }, [product?.endDate]);

  // Fetch proposals and users logic
  useEffect(() => {
    if (product?.id) {
      const docRef = doc(db, "auctionProduct", product.id);
      const unsubscribe = onSnapshot(docRef, (doc) => {
        const data = doc.data();
        if (data?.proposals) {
          setProposals(data.proposals);
        }
      });
      return () => unsubscribe();
    }
  }, [product]);

  useEffect(() => {
    const checkUserLoginStatus = async () => {
      const userUID = await AsyncStorage.getItem("id");
      setUserID(userUID);
    };
    checkUserLoginStatus();
  }, []);

  useEffect(() => {
    const fetchUsers = async () => {
      const usersCollection = collection(db, "users");
      const userDocs = await getDocs(usersCollection);

      const userData = {};
      userDocs.forEach((doc) => {
        const user = doc.data();
        userData[user.id] = {
          firstName: user.firstname,
          lastName: user.lastname,
          Profile: user.profilePic,
        };
      });

      setUsers(userData);
    };

    fetchUsers();
  }, []);

  async function addProposal(documentId, newItem) {
    const docRef = doc(db, "auctionProduct", documentId);
    await updateDoc(docRef, {
      proposals: arrayUnion(newItem),
    });
    updatePrice(documentId);
  }

  async function updatePrice(documentId) {
    const docRef = doc(db, "auctionProduct", documentId);
    await updateDoc(docRef, {
      initPrice: +inputValue,
    });
  }

  return (
    <ScrollView style={styles.container}>
      {/* Left section */}
      <View style={styles.productSection}>
        <Image source={{ uri: product.img }} style={styles.productImage} />
        <Text style={styles.productTitle}>{product.title}</Text>
        <Text style={styles.productDescription}>{product.description}</Text>
        <Text style={styles.currentPrice}>
          Current Price: ${product.initPrice}
        </Text>

        {/* Countdown Timer */}
        <View
          style={[
            styles.timer,
            timeRemaining.includes("ended")
              ? styles.timerEnded
              : styles.timerActive,
          ]}
        >
          <Text style={styles.timerText}>Time Remaining: {timeRemaining}</Text>
        </View>
      </View>

      {/* Right section - Proposals */}
      <View style={styles.proposalsSection}>
        <Text style={styles.sectionTitle}>Proposals</Text>

        {/* Make the proposals list scrollable */}
        <ScrollView
          style={styles.proposalsList}
          nestedScrollEnabled={true} // Allow nested scroll
        >
          {proposals.length > 0 ? (
            proposals.map((proposal, index) => {
              const user = users[proposal.member] || {};
              return (
                <View key={index} style={styles.proposalItem}>
                  <View style={styles.userInfo}>
                    <Image
                      source={{
                        uri: user.Profile
                          ? user.Profile
                          : "https://www.alleganyco.gov/wp-content/uploads/unknown-person-icon-Image-from.png",
                      }}
                      style={styles.userImage}
                    />
                    <Text>
                      {user.firstName} {user.lastName}
                    </Text>
                  </View>
                  <Text style={styles.proposalAmount}>${proposal.offer}</Text>
                </View>
              );
            })
          ) : (
            <Text>No proposals yet.</Text>
          )}
        </ScrollView>

        {/* Input and Button */}
        <View style={styles.inputSection}>
          <TextInput
            style={styles.input}
            placeholder="Enter your offer"
            keyboardType="numeric"
            value={inputValue}
            onChangeText={setInputValue}
          />
          <TouchableOpacity
            style={styles.submitButton}
            onPress={() => {
              if (product.initPrice <= inputValue) {
                setError("");
                addProposal(product.id, {
                  member: userID,
                  offer: +inputValue,
                });
              } else
                setError("Your offer must be higher than the current price.");
            }}
          >
            <Text style={styles.submitButtonText}>Add Proposal</Text>
          </TouchableOpacity>
        </View>

        {error && <Text style={styles.error}>{error}</Text>}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: "#f8f8f8",
  },
  productSection: {
    backgroundColor: "#fff",
    borderRadius: 8,
    padding: 16,
    marginBottom: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  },
  productImage: {
    width: "100%",
    height: 200,
    borderRadius: 8,
    marginBottom: 16,
  },
  productTitle: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 8,
  },
  productDescription: {
    fontSize: 16,
    marginBottom: 16,
  },
  currentPrice: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 16,
  },
  timer: {
    padding: 8,
    borderRadius: 8,
    alignItems: "center",
    marginTop: 8,
  },
  timerActive: {
    backgroundColor: "#ff6347",
  },
  timerEnded: {
    backgroundColor: "#808080",
  },
  timerText: {
    color: "#fff",
    fontSize: 16,
  },
  proposalsSection: {
    backgroundColor: "#fff",
    borderRadius: 8,
    padding: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  },
  sectionTitle: {
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 16,
  },
  proposalsList: {
    maxHeight: 300, // Set max height for scroll area
  },
  proposalItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 12,
    backgroundColor: "#f0f0f0",
    borderRadius: 8,
    marginBottom: 8,
  },
  userInfo: {
    flexDirection: "row",
    alignItems: "center",
  },
  userImage: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 12,
  },
  proposalAmount: {
    fontWeight: "bold",
  },
  inputSection: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 16,
  },
  input: {
    flex: 1,
    padding: 12,
    borderRadius: 8,
    backgroundColor: "#f0f0f0",
    marginRight: 12,
  },
  submitButton: {
    padding: 12,
    borderRadius: 8,
    backgroundColor: "#007bff",
  },
  submitButtonText: {
    color: "#fff",
    fontWeight: "bold",
  },
  error: {
    color: "red",
    marginTop: 8,
  },
});

export default ProposalsPage;
