import React, { useEffect, useState } from "react";
import { View, Text, ScrollView, StyleSheet } from "react-native";
import Cards from "./Cards";
// import Addevent from "./Addevent";
import db from "../../../Config/firebase";
import { collection, onSnapshot, query, where } from "firebase/firestore";
import AsyncStorage from '@react-native-async-storage/async-storage';

function Eventuser() {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    const fetchUserId = async () => {
      try {
        const userid = await AsyncStorage.getItem("id");

        // جلب البيانات من Firestore
        const q = query(collection(db, "add event"), where("ownerID", "==", userid));
        const unsubscribe = onSnapshot(q, (snapshot) => {
          const arr = snapshot.docs.map((doc) => {
            return { ...doc.data(), id: doc.id };
          });
          setEvents([...arr]);
        });

        // تنظيف الاشتراك في Firebase عند إلغاء تحميل المكون
        return () => unsubscribe();
      } catch (error) {
        console.error("Error fetching user ID from AsyncStorage: ", error);
      }
    };

    fetchUserId();
  }, []);

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.headerContainer}>
        <Text style={styles.header}>Events</Text>
        {/* <Addevent /> */}
      </View>

      <View style={styles.cardsContainer}>
        {events.length ? (
          events.map((item, index) => {
            return <Cards data={item} key={index} />;
          })
        ) : (
          <View style={styles.noEventsContainer}>
            <Text>No events found</Text>
          </View>
        )}
      </View>
    </ScrollView>
  );
}

export default Eventuser;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  headerContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 16,
  },
  header: {
    fontSize: 20,
    fontWeight: "bold",
  },
  cardsContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 8,
  },
  noEventsContainer: {
    justifyContent: "center",
    alignItems: "center",
    marginTop: 50,
  },
});
