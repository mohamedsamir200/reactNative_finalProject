/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React from "react";
import { View, Text, Image, StyleSheet, TouchableOpacity, Alert } from "react-native";
import Icon from 'react-native-vector-icons/FontAwesome'; // لاستخدام الأيقونات
import db from "../../../Config/firebase";
import { doc, deleteDoc } from "firebase/firestore";
// import Editproduct from "./Editproduct"; // يفترض أنك حولت هذا المكون أيضًا إلى React Native

function Cards2({ data, onDelete }) {
  const deleteItemFromFirebase = async (itemId) => {
    try {
      const itemRef = doc(db, "add product", itemId);
      await deleteDoc(itemRef);
      console.log("Item deleted from Firebase");
    } catch (error) {
      console.error("Error deleting item: ", error);
    }
  };

  const deleteItem = (itemId) => {
    Alert.alert(
      "Delete Product",
      "Are you sure you want to delete this product?",
      [
        {
          text: "Cancel",
          style: "cancel",
        },
        {
          text: "Delete",
          onPress: () => {
            deleteItemFromFirebase(itemId);
            if (onDelete) {
              onDelete(itemId);
            }
          },
          style: "destructive",
        },
      ],
      { cancelable: true }
    );
  };

  return (
    <View style={styles.cardContainer}>
      <Image
        source={{ uri: data.img }} // Updated to match the prop
        style={styles.cardImage}
      />
      <View style={styles.overlay}>
        <Text style={styles.productTitle}>{data.typeproduct}</Text>
        <Text style={styles.productDescription}>{data.description}</Text>
        <Text style={styles.productPrice}>{data.price} EGP</Text>

        <View style={styles.actionsContainer}>
          <TouchableOpacity onPress={() => deleteItem(data.id)}>
            <Icon name="trash" size={30} color="red" />
          </TouchableOpacity>
          {/* <Editproduct data={data} /> */}
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  cardContainer: {
    marginBottom: 20,
    borderRadius: 10,
    overflow: "hidden",
    backgroundColor: 'white',
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 2,
    elevation: 5,
    width:300,
    marginLeft:30
  },
  cardImage: {
    width: "100%",
    height: 200,
    resizeMode: "cover",
  },
  overlay: {
    padding: 10,
    backgroundColor: 'white',
  },
  productTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: "black",
  },
  productDescription: {
    fontSize: 16,
    color: "black",
    marginVertical: 10,
  },
  productPrice: {
    fontSize: 18,
    fontWeight: "bold",
    color: "black",
  },
  actionsContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 10,
  marginLeft:250

  },
});

export default Cards2;
