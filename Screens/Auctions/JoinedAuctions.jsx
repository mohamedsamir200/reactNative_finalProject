import {
  arrayUnion,
  collection,
  doc,
  onSnapshot,
  Timestamp,
  updateDoc,
} from "firebase/firestore";
import React, { useEffect, useState } from "react";
import db from "../../Config/firebase";
import Card from "./components/Card";
import { View, Text, FlatList } from "react-native";

const JoinedAuctions = () => {
  // Dummy data for joined auctions
  const [products, setProducts] = useState([]);
  const [userID, setUserID] = useState("");
  const checkUserLoginStatus = async () => {
    const userUID = await AsyncStorage.getItem("id");

    setUserID(userUID);
  };
  async function addMember(documentId, newItem) {
    const docRef = doc(db, "auctionProduct", documentId); // Replace with your collection and document ID

    // Update the array field
    await updateDoc(docRef, {
      members: arrayUnion(newItem), // Replace `yourArrayField` with the name of your array field
    });

    console.log("Item added successfully to the array!");
  }

  useEffect(() => {
    const unsubscribe = onSnapshot(
      collection(db, "auctionProduct"),
      (snapshot) => {
        const filteredProducts = snapshot.docs
          .map((doc) => {
            return { ...doc.data(), id: doc.id };
          })
          .filter((product) => product.members?.includes(userID)); // Filter products that include the user ID in members

        setProducts(filteredProducts);
      }
    );

    return () => unsubscribe(); // Clean up the listener on component unmount
  }, [userID]);

  return (
    <View style={{ flex: 1, padding: 20 }}>
      <FlatList
        data={products}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <Card
            imgsrc={item.img}
            productType={item.title}
            title={item.description}
            ID={item.id}
            price={item.initPrice}
            func={() => addMember(item.id, userID)}
            isMember={item.members?.includes(userID)}
            productData={item}
          />
        )}
      />
    </View>
  );
};

export default JoinedAuctions;
