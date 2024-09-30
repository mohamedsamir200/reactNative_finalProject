import {
  addDoc,
  arrayUnion,
  collection,
  deleteDoc,
  doc,
  onSnapshot,
  updateDoc,
} from "firebase/firestore";
import React, { useEffect, useState } from "react";
import db from "../../Config/firebase";
import Card from "./components/Card";
import { View, Text, FlatList } from "react-native";

const AllAuctions = () => {
  // Dummy data for auctions
  const [products, setProducts] = useState([]);
  const [userID, setUserID] = useState("");
  const checkUserLoginStatus = async () => {
    const userUID = await AsyncStorage.getItem("id");
    console.log(userUID);

    setUserID(userUID);
    console.log(userID);
  };

  async function addMember(documentId, newItem) {
    const docRef = doc(db, "auctionProduct", documentId); // Reference to the document

    // Update the array field
    await updateDoc(docRef, {
      members: arrayUnion(newItem), // Adding new member
    });

    console.log("Item added successfully to the array!");
  }

  useEffect(() => {
    const unsubscribe = onSnapshot(
      collection(db, "auctionProduct"),
      (snapshot) => {
        const currentDate = new Date(); // Get the current date

        // Process each auction product individually
        snapshot.docs.forEach(async (doc) => {
          const auctionData = doc.data();

          // Parse the string `endDate` into a JavaScript Date object
          const endDate = new Date(auctionData.endDate);

          // Check if the auction's `endDate` has passed
          if (endDate && currentDate >= endDate) {
            // If there are no proposals, don't add to the Bag, just delete the auction
            if (!auctionData.proposals || auctionData.proposals.length === 0) {
              await deleteDoc(doc.ref); // Delete the expired auction
              console.log(
                `Auction ${doc.id} deleted due to expiration (no proposals).`
              );
            } else {
              // Add auction details to the "Bag"
              const lastProposal =
                auctionData.proposals[auctionData.proposals.length - 1];
              await addDoc(collection(db, "Bag"), {
                basePrice: auctionData.initPrice,
                description: auctionData.description,
                imgsrc: auctionData.img,
                name: auctionData.title,
                price: auctionData.initPrice,
                quantity: 1,
                userID: lastProposal.member, // Use last proposal's member as userID
              });

              // Remove the expired auction
              await deleteDoc(doc.ref);
              console.log(`Auction ${doc.id} deleted and added to the Bag.`);
            }
          }
        });
      }
    );

    return () => unsubscribe(); // Clean up on unmount
  }, []);

  useEffect(() => {
    checkUserLoginStatus();
    const unsubscribe = onSnapshot(
      collection(db, "auctionProduct"),
      (snapshot) => {
        const filteredProducts = snapshot.docs
          .map((doc) => {
            return { ...doc.data(), id: doc.id };
          })
          .filter((product) => !product.members?.includes(userID)); // Filter out products that include the user ID in members

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
          />
        )}
      />
    </View>
  );
};

export default AllAuctions;
