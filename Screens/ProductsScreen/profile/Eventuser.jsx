import React, { useEffect, useState } from "react";
import { View, Text, ScrollView, StyleSheet } from "react-native";
import Cards from "./Cards";
// import Addevent from "./Addevent";
import db from "../../../Config/firebase";
import { collection, onSnapshot, query, where } from "firebase/firestore";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { FAB } from 'react-native-paper';
import { useNavigation } from "@react-navigation/native";
import routes from "../../../utilities/Routes";
function Eventuser() {
  const [events, setEvents] = useState([]);
  const navigation = useNavigation();
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
        <Text style={styles.header}>Event</Text>
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
      <FAB
        icon="plus"
        style={styles.fab}
        onPress={() => navigation.navigate(routes.addevent)}  // Navigate to the AddEvent page
      />
    </ScrollView>

  );
}

export default Eventuser;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding:20,
    borderRadius: 10,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  headerContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 16,
  },
  header: {
    fontSize: 25,
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
  fab: {
    position: 'absolute',
    right: 5, // لتثبيت الزر على يسار الشاشة
    bottom: 5, // لتثبيت الزر في أسفل الشاشة
  },
});
