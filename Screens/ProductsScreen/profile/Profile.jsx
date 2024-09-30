import React, { useState, useEffect } from "react";
import { View, Text, Image, ScrollView, StyleSheet, ActivityIndicator, Linking, TouchableOpacity } from "react-native";
import { collection, onSnapshot, query, where, getDocs, getDoc, doc } from "firebase/firestore";
import db from "../../../Config/firebase";
import Icon from 'react-native-vector-icons/FontAwesome';
import AsyncStorage from "@react-native-async-storage/async-storage";
import AddDeitalsprofile from "./AddDeitalsprofile";
import Cards2 from "./Cards2";
import Counter from "./Counter";
import ReactStars from "react-native-stars";
import Side from "./Side";
import Eventuser from "./Eventuser";
import { FAB, Menu, Provider } from "react-native-paper"
import { useNavigation } from "@react-navigation/native";
import routes from "../../../utilities/Routes";

function Profile() {
  const navigation = useNavigation();
  const [activeItem, setActiveItem] = useState("profile");
  const [products, setProducts] = useState([]);
  const [data, setData] = useState([]);
  const [userId, setUserId] = useState(null);
  const [loading, setLoading] = useState(true);
  const [reviewsData, setReviewsData] = useState([]);
  const [loadingReviews, setLoadingReviews] = useState(true);
  const [visible, setVisible] = useState(false);

  const openMenu = () => {
    console.log("Menu opened");
    setVisible(true);
  };

  const closeMenu = () => {
    console.log("Menu closed");
    setVisible(false);
  };

  const handleItemClick = (item) => {
    setActiveItem(item);
  }

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const userUID = await AsyncStorage.getItem("id");
        if (userUID) {
          setUserId(userUID);
          const usersCollection = collection(db, "users");
          const q = query(usersCollection, where("id", "==", userUID));
          const querySnapshot = await getDocs(q);

          if (!querySnapshot.empty) {
            const userData = querySnapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
            setData(userData);
          } else {
            console.error("No user found!");
          }
        }
      } catch (error) {
        console.error("Error fetching user data: ", error);
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, []);

  useEffect(() => {
    if (userId) {
      const q = query(collection(db, "add product"), where("ownerID", "==", userId));
      const unsubscribe = onSnapshot(q, (snapshot) => {
        const productsArray = snapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
        setProducts(productsArray);
      });

      return () => unsubscribe();
    }
  }, [userId]);

  useEffect(() => {
    if (userId) {
      setLoadingReviews(true);
      const reviewsQuery = query(collection(db, "userReviews"), where("userID", "==", userId));

      const unsubscribeReviews = onSnapshot(reviewsQuery, async (snapshot) => {
        const reviewsList = await Promise.all(
          snapshot.docs.map(async (reviewDoc) => {
            const reviewData = reviewDoc.data();
            const userDoc = await getDoc(doc(db, "users", reviewData.userID));
            const userName = userDoc.exists() ? userDoc.data().name : "Unknown User";
            return {
              id: reviewDoc.id,
              ...reviewData,
              userName,
            };
          })
        );
        setReviewsData(reviewsList);
        setLoadingReviews(false);
      });

      return () => unsubscribeReviews();
    }
  }, [userId]);

  const accountType = data.length > 0 ? data[0].accountType : "";

  return (
    <Provider>
      <ScrollView>
        <View style={styles.container}>
          {/* Sidebar */}
          {accountType !== "Customer" && (
            <View style={styles.sideContainer}>
              <Side activeItem={activeItem} onItemClick={handleItemClick} />
            </View>
          )}

          {/* Profile Section */}
          <View style={styles.profileSection}>
            {activeItem === "profile" && (
              <View>
                {data.length > 0 && data.map((item, index) => (
                  <View key={index} style={styles.profileContainer}>
                    <Image
                      source={{ uri: item.profilePic || "avatar-1299805_1280.png" }}
                      style={styles.profilePic}
                    />
                    <Text style={styles.name}>
                      {item.firstname} {item.lastname}
                    </Text>
                    <Text style={styles.email}>{item.email}</Text>
                    <Text style={styles.accountType}>{item.accountType}</Text>
                    <View style={styles.socialLinks}>
                      <TouchableOpacity onPress={() => Linking.openURL(item.facebook)}>
                        <Icon name="facebook" size={15} color="#4267B2" />
                      </TouchableOpacity>
                      <TouchableOpacity onPress={() => Linking.openURL(item.instagram)}>
                        <Icon name="instagram" size={15} color="#C13584" />
                      </TouchableOpacity>
                      <TouchableOpacity onPress={() => Linking.openURL(item.linkedin)}>
                        <Icon name="linkedin" size={15} color="#0077B5" />
                      </TouchableOpacity>
                    </View>
                    <Text style={styles.about}>{item.about}</Text>
                    {accountType !== "Customer" && <Counter />}
                  </View>
                ))}

                {/* Reviews Section */}
                {accountType !== "Customer" && (
                  <View style={styles.reviewsContainer}>
                    <Text style={styles.reviewsTitle}>Reviews</Text>
                    {loadingReviews ? (
                      <ActivityIndicator size="small" color="#0000ff" />
                    ) : reviewsData.length > 0 ? (
                      reviewsData.map((review) => (
                        <View key={review.id} style={styles.review}>
                          <Text>{review.userName}</Text>
                          <ReactStars
                            count={5}
                            value={review.rating}
                            size={10}
                            fullStarColor="#ffd700"
                            disabled={true}
                          />
                          <Text>{review.reviewText}</Text>
                          <Text>{review.rating} / 5 stars</Text>
                        </View>
                      ))
                    ) : (
                      <Text>No reviews available. Be the first to review!</Text>
                    )}
                  </View>
                )}
              </View>
            )}

            {/* Products Section */}
            {activeItem === "products" && accountType !== "Customer" && (
              <View style={{ backgroundColor: '#fff'}}>
                {data.length > 0 && data[0].accountType !== "Customer" && (
                  <>
                    <View style={{ marginTop: 16, marginLeft: 10, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                      <Text style={{ fontSize: 20, fontWeight: 'bold' }}>Products</Text>
                    </View>

                    <ScrollView style={{ marginTop: 20 }}>
                      {products.length ? (
                        <View style={styles.cardsContainer}>
                          {products.map((item, index) => (
                            <Cards2 data={item} key={index} style={{ shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.25, shadowRadius: 3.84, borderRadius: 10 }} />
                          ))}
                        </View>
                      ) : (
                        <Text>No products available</Text>
                      )}
                    </ScrollView>

                    {/* Floating Action Button (FAB) for Add Product */}
                    <View style={styles.container2}>
                      <Menu
                        visible={visible}
                        onDismiss={closeMenu}
                        anchor={
                          <FAB
                            icon="plus"
                            style={styles.fab}
                            onPress={openMenu}
                          />
                        }
                      >
                        <Menu.Item
                          onPress={() => {
                            closeMenu();
                            navigation.navigate(routes.addproduct); 
                          }}
                          title="Add Product"
                        />
                        <Menu.Item
                          onPress={() => {
                            closeMenu();
                            navigation.navigate(routes.addausproduct); 
                          }}
                          title="  Add Auction Product"
                        />
                      </Menu>
                    </View>
                  </>
                )}
              </View>
            )}

            {activeItem === "settings" && <AddDeitalsprofile />}
            {activeItem === "events" && <Eventuser />}
          </View>
        </View>
      </ScrollView>
    </Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
    flex: 1,
    backgroundColor: '#f0f0f0',
  },
  profileSection: {
    flex: 2,
    margin:10,
  },
  profileContainer: {
    marginVertical: 20,
    padding: 20,
    backgroundColor: "#fff",
    borderRadius: 10,
    shadowColor: "#000",
    alignItems:"center",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  profilePic: {
    width: 100,
    height: 100,
    borderRadius: 50,
  },
  name: {
    fontSize: 20,
    fontWeight: "bold",
  },
  email: {
    fontSize: 12,
    color: "gray",
  },
  accountType: {
    fontSize: 12,
    color: "gray",
  },
  socialLinks: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: 100,
    marginTop: 10,
  },
  about: {
    marginTop: 20,
  },
  reviewsContainer: {
    marginTop: 20,
    backgroundColor:"#fff",
    padding:20,
  },
  reviewsTitle: {
    fontWeight: "bold",
    fontSize:20,
  },
  review: {
    marginTop: 10,
  },
  sideContainer: {
    flex: 1,
  },
 
  container2: {
    position: 'absolute',
    bottom: 16,
    right:5,
  },
});

export default Profile;
