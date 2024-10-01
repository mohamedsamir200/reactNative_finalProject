/* eslint-disable no-unused-vars */
import React from "react";
import { View, Text, Image, TouchableOpacity, StyleSheet, Alert } from "react-native";
import db from "../../../Config/firebase";
import { doc, deleteDoc } from "firebase/firestore";
import Icon from 'react-native-vector-icons/FontAwesome'; // لاستخدام الأيقونات

import { useNavigation } from "@react-navigation/native";
import routes from "../../../utilities/Routes"; // استيراد useNavigation

function Cards({ data }) {
  const navigation =useNavigation (); // استخدام التنقل
  const deleteItemFromFirebase = async (itemId) => {
    try {
      const itemRef = doc(db, "add event", itemId);
      await deleteDoc(itemRef);
      console.log("Item deleted from Firebase");
    } catch (error) {
      console.error("Error deleting item: ", error);
      Alert.alert("Error", "There was an error deleting the item.");
    }
  };
  const handleEdit = () => {
    navigation.navigate(routes.editEvent, { productData: data });
    console.log(data); 
  };

  const deleteItem = (itemId) => {
    Alert.alert(
      "Delete Item",
      "Are you sure you want to delete this item?",
      [
        { text: "Cancel", style: "cancel" },
        { text: "OK", onPress: () => deleteItemFromFirebase(itemId) }
      ]
    );
  };

  return (
    <View style={styles.card}>
      <Image
        source={{ uri: data.eventImg }}
        style={styles.image}
      />
      <View style={styles.content}>
        <Text style={styles.title}>{data.name}</Text>
        <Text style={styles.description}>{data.description}</Text>

        <View style={styles.details}>
          <Text style={styles.detail}><Text style={styles.label}>Address: </Text>{data.address}</Text>
          <Text style={styles.detail}><Text style={styles.label}>Time: </Text>{data.time}</Text>
          <Text style={styles.detail}><Text style={styles.label}>Date: </Text>{new Date(data.date).toLocaleDateString("en-GB")}</Text>
        </View>
      </View>

      <View style={styles.actionsContainer}>
      <TouchableOpacity onPress={() => deleteItem(data.id)}>
            <Icon name="trash" size={30} color="red" />
          </TouchableOpacity>      
          <TouchableOpacity onPress={handleEdit}>
            <Icon name="edit" size={30} color="green" />
          </TouchableOpacity>
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  card: {
    backgroundColor: 'white',
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
    overflow: 'hidden',
    width:300,
    padding:10,
    margin:5,
  },
  image: {
    width: '100%',
    height: 150,
    resizeMode: 'cover',
  },
  content: {
    padding: 10,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#1e3a8a',
  },
  description: {
    fontSize: 16,
    color: '#4b5563',
  },
  details: {
    marginTop: 10,
  },
  detail: {
    fontSize: 16,
    marginBottom: 5,
  },
  label: {
    fontWeight: 'bold',
  },
  actionsContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginTop: 10,
  },
});

export default Cards;
