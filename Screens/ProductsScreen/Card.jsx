import React, { useState, useEffect } from "react";
import { View, Text, Image, TouchableOpacity, StyleSheet } from "react-native";
import { useNavigation } from "@react-navigation/native";
import {
  onSnapshot,
  collection,
  addDoc,
  query,
  where,
  getDocs,
} from "firebase/firestore";
import db from "../../Config/firebase";

const ProductCard = (props) => {
  const [user, setUser] = useState();
  const [artists, setArtists] = useState([]);
  const [isExpanded, setIsExpanded] = useState(false);
  const navigation = useNavigation();

  // Function to toggle description visibility
  const toggleDescription = () => {
    setIsExpanded(!isExpanded);
  };
  useEffect(() => {
    const q = query(
      collection(db, "users"),
      where("accountType", "==", "artist")
    );
    const unsubscribe = onSnapshot(
      q,
      (snapshot) => {
        const artistArr = snapshot.docs.map((doc) => ({
          ...doc.data(),
        }));
        setArtists(artistArr);
      },
      []
    );

    return () => unsubscribe();
  }, []);
  return (
    <View style={styles.card}>
      {/* Image and Title Section */}
      <TouchableOpacity
        onPress={() => {
          //   navigation.navigate("Details", {
          //     imgsrc: props.imgsrc,
          //     productType: props.productType,
          //     title: props.title,
          //     desc: props.desc,
          //     price: props.price,
          //     bobId: props.productID,
          //   });
        }}
      >
        <Image source={{ uri: props.imgsrc }} style={styles.image} />
      </TouchableOpacity>

      <View style={styles.userSection}>
        <TouchableOpacity
          onPress={() => {
            // navigation.navigate("Artprofile", {
            //   user: { ...props.artistData },
            // });
          }}
        >
          <Image
            source={{
              uri: props.artistImage
                ? props.artistImage
                : "https://www.alleganyco.gov/wp-content/uploads/unknown-person-icon-Image-from.png",
            }}
            style={styles.profileImage}
          />
        </TouchableOpacity>
        <Text>{`${props.firstname} ${props.lastname}`}</Text>
      </View>

      <View style={styles.detailsSection}>
        <Text style={styles.title}>{props.title}</Text>
        <Text style={[styles.description, isExpanded ? null : styles.clamped]}>
          {props.desc}
        </Text>

        {/* Show More/Show Less Button */}
        <TouchableOpacity onPress={toggleDescription}>
          <Text style={styles.toggleText}>
            {isExpanded ? "Show Less" : "Show More"}
          </Text>
        </TouchableOpacity>

        {/* Price Section */}
        <View style={styles.priceContainer}>
          <Text style={styles.price}>{props.price} $</Text>
        </View>
      </View>
    </View>
  );
};

// Styles for the component
const styles = StyleSheet.create({
  card: {
    borderRadius: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 1,
    shadowRadius: 2,
    flexDirection: "column",
    overflow: "hidden",
    marginBottom: 20,
  },
  image: {
    width: "100%",
    height: 220,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
  },
  userSection: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 10,
    paddingHorizontal: 15,
  },
  profileImage: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 10,
  },
  detailsSection: {
    paddingHorizontal: 15,
    flex: 1,
  },
  title: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#3E402D",
    marginBottom: 5,
  },
  description: {
    fontSize: 14,
    color: "gray",
  },
  clamped: {
    maxHeight: 40, // Limit description height if not expanded
    overflow: "hidden",
  },
  toggleText: {
    color: "#1e90ff",
    marginTop: 5,
  },
  priceContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 10,
  },
  price: {
    fontSize: 16,
    fontWeight: "bold",
  },
  addButton: {
    marginTop: "auto",
    paddingVertical: 10,
    paddingHorizontal: 20,
    backgroundColor: "#f8f8f8",
    borderRadius: 20,
    borderWidth: 1,
    borderColor: "#ccc",
    alignItems: "center",
  },
  addButtonText: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#000",
  },
});

export default ProductCard;
