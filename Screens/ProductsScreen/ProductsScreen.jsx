import { View, Text, FlatList, StyleSheet } from "react-native";
import React, { useEffect, useState } from "react";
import Card from "./Card";
import { SafeAreaView } from "react-native-safe-area-context";
import {
  onSnapshot,
  collection,
  query,
  where,
  getDocs,
} from "firebase/firestore";
import db from "../../Config/firebase";
import Loader from "../../Components/Loader";

const ProductsScreen = () => {
  const [loading, setLoading] = useState(true);
  const [artists, setArtists] = useState([]);
  const [products, setProducts] = useState([]);
  const [UID, setUID] = useState("");

  // Fetch artists data
  useEffect(() => {
    const q = query(
      collection(db, "users"),
      where("accountType", "==", "artist")
    );
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const artistArr = snapshot.docs.map((doc) => ({
        ...doc.data(),
        // id: doc.id,
      }));
      setArtists(artistArr);
    });

    return () => unsubscribe();
  }, []);

  // Fetch products data
  useEffect(() => {
    const unsubscribe = onSnapshot(
      collection(db, "add product"),
      (snapshot) => {
        const productArr = snapshot.docs.map((doc) => ({
          ...doc.data(),
          id: doc.id,
        }));
        setProducts(productArr);
        setLoading(false); // Set loading to false after fetching data
      }
    );
    getUserData();

    return () => unsubscribe(); // Clean up subscription on unmount
  }, []);

  // Get user data
  async function getUserData() {
    const userCollection = collection(db, "users");
    const q = query(
      userCollection,
      where("id", "==", localStorage.getItem("id"))
    );
    const querySnapshot = await getDocs(q);

    querySnapshot.forEach((doc) => {
      const userData = doc.data();
      setUID(userData.id);
    });
  }

  // Show loading text while data is being fetched
  if (loading) {
    return (
      <SafeAreaView>
        <Loader></Loader>
      </SafeAreaView>
    );
  }

  // Function to render each product item
  const renderItem = ({ item: product }) => {
    // Find the corresponding artist for each product
    const artist = artists.find((artist) => artist.id === product.ownerID);

    return (
      <View style={styles.cardContainer}>
        <Card
          imgsrc={product.img}
          title={product.title}
          desc={product.description}
          price={product.price}
          productID={product.id}
          firstname={artist?.firstname}
          lastname={artist?.lastname}
          artistImage={artist?.profilePic}
          artistData={artist} // Assuming profilePic is the field name
          func={() => clickMe(product)}
        />
      </View>
    );
  };

  return (
    <SafeAreaView>
      <FlatList
        data={products} // Pass products as data to FlatList
        renderItem={renderItem} // Function to render each item
        keyExtractor={(item) => item.id} // Unique key for each product
        ListEmptyComponent={<Text>No products available</Text>} // Display message if no products
        numColumns={2} // Display two cards per row
        contentContainerStyle={{ paddingBottom: 20, paddingHorizontal: 10 }} // Optional padding
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  cardContainer: {
    flex: 1,
    margin: 10, // Add margin between cards
  },
});

export default ProductsScreen;
