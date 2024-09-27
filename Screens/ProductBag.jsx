import { View, Text, ActivityIndicator } from "react-native";
import React, { useEffect, useState } from "react";
import { ScrollView } from "react-native-gesture-handler";
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDocs,
  onSnapshot,
  query,
  setDoc,
  updateDoc,
  where,
} from "firebase/firestore";
import db from "../Config/firebase";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { MD2Colors } from "react-native-paper";

export default function ProductBag() {
  const [bags, setBags] = useState([]);
  const [UID, setUID] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (UID) {
      const q = query(collection(db, "Bag"), where("userID", "==", UID));
      const unsubscribe = onSnapshot(q, (querySnapshot) => {
        const bagsData = querySnapshot.docs.map((doc) => ({
          ...doc.data(),
          id: doc.id,
        }));
        setBags(bagsData);
      });

      // Cleanup subscription on unmount
      return () => unsubscribe();
    }
    fetchUID();
  }, [UID]);

  //==== get user ID ====//
  const fetchUID = async () => {
    const id = await AsyncStorage.getItem("id");
    if (id) {
      setUID(id);
    }
    setLoading(false);
  };
  //==== get user ID ====//

  if (loading) {
    return <ActivityIndicator size="large" color="#0000ff" />;
  }

  return (
    <ScrollView
      style={Styles.mainContainer}
      showsVerticalScrollIndicator={false}
    >
      <View>
        <Text style= {{backgroundColor :MD2Colors.yellow500 , textAlign:"center" , width :200 , margin:"auto"}}>Continue To Payment</Text>
        {bags.length > 0 ? (
          bags.map((item) => (
            <View key={item.id}>
              <Text>{item.title}</Text>
              <Text>{item.basePrice}</Text>
            </View>
          ))
        ) : (
          <Text>No items in your bag.</Text>
        )}
      </View>
    </ScrollView>
  );
}
