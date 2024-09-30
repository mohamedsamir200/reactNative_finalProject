import { useEffect, useState } from "react";
import { View, Text, StyleSheet } from "react-native";
import { collection, query, where, onSnapshot } from "firebase/firestore";
import db from "../../../Config/firebase";
import AsyncStorage from "@react-native-async-storage/async-storage"; // Import AsyncStorage

function Counter() {
  const [eventCount, setEventCount] = useState(0);
  const [productCount, setProductCount] = useState(0);
  const [reviewCount, setReviewCount] = useState(0);
  const [userid, setUserid] = useState(null);

  useEffect(() => {
    const getUserId = async () => {
      try {
        const id = await AsyncStorage.getItem('id');
        setUserid(id);
      } catch (error) {
        console.error("Error fetching user id from AsyncStorage", error);
      }
    };
    
    getUserId();
  }, []);

  useEffect(() => {
    if (userid) {
      const eventQuery = query(collection(db, "add event"), where("ownerID", "==", userid));
      onSnapshot(eventQuery, (snapshot) => {
        setEventCount(snapshot.size);
      });

      const productQuery = query(collection(db, "add product"), where("ownerID", "==", userid));
      onSnapshot(productQuery, (snapshot) => {
        setProductCount(snapshot.size);
      });

      const reviewQuery = query(collection(db, "userReviews"), where("userID", "==", userid));
      onSnapshot(reviewQuery, (snapshot) => {
        setReviewCount(snapshot.size);
      });
    }
  }, [userid]);

  return (
    <View style={styles.container}>
      <View style={styles.counterBox}>
        <Text style={styles.counterText}>+{eventCount}</Text>
        <Text style={styles.labelText}>Events</Text>
      </View>
      <View style={styles.counterBox}>
        <Text style={styles.counterText}>+{productCount}</Text>
        <Text style={styles.labelText}>Products</Text>
      </View>
      <View style={styles.counterBox}>
        <Text style={styles.counterText}>+{reviewCount}</Text>
        <Text style={styles.labelText}>Reviews</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: 250,
    marginTop: 50,
    alignSelf: 'center'
  },
  counterBox: {
    alignItems: 'center',
  },
  counterText: {
    fontSize: 15,
    color: 'black',
    marginBottom: 5,
  },
  labelText: {
    fontSize: 10,
    color: 'black',
    textAlign: 'center',
  },
});

export default Counter;
