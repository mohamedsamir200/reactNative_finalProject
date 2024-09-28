import { View, Text, ActivityIndicator, Image, StyleSheet } from "react-native";
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
import { Button, Icon, MD2Colors } from "react-native-paper";
import { TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";
import routes from "./../utilities/Routes";

export default function ProductBag() {
  const [bags, setBags] = useState([]);
  const [UID, setUID] = useState(null);
  const [loading, setLoading] = useState(true);
  const { navigate } = useNavigation();
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

  // === Delete === //
  function handleDelete(id) {
    let docref = doc(db, "Bag", id);
    deleteDoc(docref);
    setBags((prevBags) => prevBags.filter((item) => item.id !== id));
  }
  // === update Quantity == //
  function handleQuantityChange(id, newQuantity) {
    const docRef = doc(db, "Bag", id);
    const item = bags.find((item) => item.id === id);
    const newTotalPrice = item.basePrice * newQuantity;

    updateDoc(docRef, {
      quantity: newQuantity,
      price: newTotalPrice,
    });
    setBags((prevBag) =>
      prevBag.map((bagItem) =>
        bagItem.id == id
          ? { ...bagItem, quantity: newQuantity, price: newTotalPrice }
          : bagItem
      )
    );
  }
  return (
    <ScrollView
      style={Styles.mainContainer}
      showsVerticalScrollIndicator={false}
    >
      <View>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "center",
            alignItems: "center",
            padding: 10,
          }}
        >
          <Text> {bags.length} items Found</Text>

          <Text
            style={[
              styles.payment,
              { display: bags.length == 0 ? "none" : "block" },
            ]}
            onPress={() => navigate(routes.cart)}
          >
            Continue To Payment
          </Text>
        </View>
        {bags.length > 0 ? (
          bags.map((item) => (
            <View key={item.id} style={{ marginVertical: 20 }}>
              <View
                style={{ flexDirection: "row", alignItems: "center", gap: 9 }}
              >
                <Image style={styles.image} source={{ uri: item.image }} />

                <View>
                  <Text>{item.name}</Text>
                  <Text style={{ marginVertical: 10 }}>
                  {item.price} $
                  </Text>

                  <View
                    style={{
                      width: "75%",
                      flexDirection: "row",
                      alignItems: "center",
                      justifyContent: "space-between",
                    }}
                  >
                    <View
                      style={{
                        width: "30%",
                        flexDirection: "row",
                        alignItems: "center",
                        justifyContent: "space-between",
                      }}
                    >
                      <TouchableOpacity
                        onPress={() =>
                          handleQuantityChange(item.id, item.quantity + 1)
                        }
                      >
                        <Text style={[styles.btnStyle]}>+</Text>
                      </TouchableOpacity>

                      <Text>{item.quantity}</Text>

                      <TouchableOpacity
                        onPress={() => {
                          if (item.quantity > 1) {
                            handleQuantityChange(item.id, item.quantity - 1);
                          }
                        }}
                      >
                        <Text style={[styles.btnStyle]}>-</Text>
                      </TouchableOpacity>
                    </View>
                    <TouchableOpacity onPress={() => handleDelete(item.id)}>
                      <Icon
                        source={"delete"}
                        size={20}
                        color={MD2Colors.red400}
                      />
                    </TouchableOpacity>
                  </View>
                </View>
              </View>
            </View>
          ))
        ) : (
          <View style={{ alignItems: "center" }}>
            <Text>No items in your bag.</Text>
            <Button
              textColor="white"
              style={{
                backgroundColor: MD2Colors.indigo600,
                color: "#ffffff",
                marginVertical: 20,
              }}
              onPress={()=>navigate(routes.allProducts)}
            >
              Show All Product
            </Button>
          </View>
        )}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  image: {
    width: 100,
    height: 100,
    resizeMode: "cover",
    borderRadius: 20,
  },
  btnStyle: {
    paddingHorizontal: 5,
    backgroundColor: MD2Colors.indigo300,
    borderRadius: 5,

    color: "white",
  },

  payment: {
    backgroundColor: MD2Colors.yellow500,
    color: "#344646",
    borderRadius: 15,
    textAlign: "center",

    margin: "auto",
    padding: 10,
  },
 
});
