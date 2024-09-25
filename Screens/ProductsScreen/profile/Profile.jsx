
import React, { useState, useEffect } from "react";
import { View, Text, Image, ScrollView, StyleSheet, ActivityIndicator, Linking, TouchableOpacity } from "react-native";
import { collection, onSnapshot, query, where, getDocs, getDoc, doc } from "firebase/firestore";
import db from "../../../Config/firebase";
import Icon from 'react-native-vector-icons/FontAwesome'; // لاستخدام الأيقونات
import AsyncStorage from "@react-native-async-storage/async-storage"; // Import AsyncStorage

import Counter from "./Counter";
// import AddProduct from "./AddProduct";
// import EventUser from "./EventUser";
import ReactStars from "react-native-stars";
import Side from "./Side";
import Eventuser from "./Eventuser";
function Profile() {
  const [activeItem, setActiveItem] = useState("profile");
  const [products, setProducts] = useState([]);
  const [data, setData] = useState([]);
  const [userId, setUserId] = useState(null);
  const [loading, setLoading] = useState(true);
  const [reviewsData, setReviewsData] = useState([]);
  const [loadingReviews, setLoadingReviews] = useState(true);
  const handleItemClick = (item) => {
    setActiveItem(item);}
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const userUID = await AsyncStorage.getItem("id"); // استرجاع معرف المستخدم
        if (userUID ) {
          setUserId(userUID );
          const usersCollection = collection(db, "users");
          const q = query(usersCollection, where("id", "==", userUID ));
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
  
                  {/* Social Links */}
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
           {activeItem === "settings" && <AddDeitalsprofile />}
           {activeItem === "Events" && <Eventuser />}
        </View>
      </View>
    </ScrollView>
  );
  
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row', // جعل العناصر جنباً إلى جنب
    flex: 1,
  },
  sideContainer: {
   height:700,
    flex: 1, // حجم الـ Side أصغر
  },
  profileSection: {
    flex: 9, // حجم الـ Profile أكبر
  padding:5,
  },
  profileContainer: {
    backgroundColor: '#fff',
    padding: 30,
    borderRadius: 10,
    marginBottom: 15,
    alignItems:"center"
  },
  profilePic: {
    width: 100,
    height: 100,
    borderRadius: 50,
  },
  name: {
    fontSize: 18,
    fontWeight: 'bold',
    // marginVertical: 5,
    margin:5,
  },
  email: {
    fontSize: 16,
    color: 'gray',
    margin:5,
  },
  accountType: {
    fontSize: 14,
    color: 'black',
    margin:5,
  },
  about: {
    fontSize: 14,
    marginVertical: 10,
    textAlign:"center"
  },
  socialLinks: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '50%',
    margin:10,
  },
  reviewsContainer: {
    marginTop: 20,
  },
  reviewsTitle: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  review: {
    padding: 10,
    backgroundColor: '#f9f9f9',
    borderRadius: 5,
    marginVertical: 5,
  },
});


export default Profile;
