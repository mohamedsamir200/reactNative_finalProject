import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  Button,
  StyleSheet,
  ScrollView,
  Alert,
} from "react-native";
import { FileSystem } from "expo-file-system"; // تأكد من تثبيت expo-file-system
import { collection, addDoc } from "firebase/firestore";
import { storage } from "../../../Config/firebase";
import { ref, getDownloadURL, uploadBytesResumable } from "firebase/storage";
import AsyncStorage from '@react-native-async-storage/async-storage';
import db from "../../../Config/firebase";

function AddProduct() {
  const [data1, setData1] = useState({
    title: "",
    description: "",
    price: "",
    typeproduct: "",
    productquantity: 0,
  });
  const [aucData, setAucData] = useState({
    title: "",
    description: "",
    initPrice: "",
    startDate: "",
    endDate: "",
  });
  const [imgurl, setImgurl] = useState(null);
  const [percent, setPercent] = useState(0);

  const getData = (e) => {
    const { name, value } = e.target;
    setData1((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const getAucData = (e) => {
    const { name, value } = e.target;
    setAucData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const save = async () => {
    if (imgurl) {
      const storageRef = ref(storage, `productimg/${imgurl.name}`);
      const uploadTask = uploadBytesResumable(storageRef, imgurl);

      uploadTask.on(
        "state_changed",
        (snapshot) => {
          const bits = Math.round(
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100
          );
          setPercent(bits);
        },
        (error) => {
          Alert.alert("Error", error.message);
        },
        async () => {
          const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
          const ownerID = await AsyncStorage.getItem("id");

          if (data1.title && data1.description) {
            const collectionRef = collection(db, "tempProducts");
            await addDoc(collectionRef, {
              title: data1.title,
              description: data1.description,
              price: Number(data1.price),
              review: "",
              img: downloadURL,
              productquantity: data1.productquantity,
              typeproduct: data1.typeproduct,
              ownerID,
            });
          } else if (aucData.title && aucData.description) {
            const collectionRef = collection(db, "auctionProduct");
            await addDoc(collectionRef, {
              title: aucData.title,
              description: aucData.description,
              initPrice: Number(aucData.initPrice),
              img: downloadURL,
              ownerID,
              startDate: aucData.startDate,
              endDate: aucData.endDate,
              members: [],
              proposals: [],
            });
          }
        }
      );

      // Reset form data after save
      setData1({
        title: "",
        description: "",
        price: "",
        typeproduct: "",
        productquantity: 0,
      });
      setAucData({
        title: "",
        description: "",
        initPrice: "",
        startDate: "",
        endDate: "",
      });
      setImgurl(null);
    } else {
      Alert.alert("Error", "Please upload an image.");
    }
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.header}>Add Product</Text>
      <TextInput
        placeholder="Title"
        style={styles.input}
        value={data1.title}
        onChangeText={(text) => setData1({ ...data1, title: text })}
      />
      <TextInput
        placeholder="Description"
        style={styles.input}
        value={data1.description}
        onChangeText={(text) => setData1({ ...data1, description: text })}
      />
      <TextInput
        placeholder="Price"
        style={styles.input}
        value={data1.price}
        keyboardType="numeric"
        onChangeText={(text) => setData1({ ...data1, price: text })}
      />
      <TextInput
        placeholder="Type Product"
        style={styles.input}
        value={data1.typeproduct}
        onChangeText={(text) => setData1({ ...data1, typeproduct: text })}
      />
      <TextInput
        placeholder="Product Quantity"
        style={styles.input}
        value={String(data1.productquantity)}
        keyboardType="numeric"
        onChangeText={(text) => setData1({ ...data1, productquantity: Number(text) })}
      />
      <Button title="Upload Product Image" onPress={() => {/* Upload image logic */}} />
      <Button title="Done" onPress={save} />
      <Button title="Cancel" onPress={() => {/* Handle cancel logic */}} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  header: {
    fontSize: 24,
    marginBottom: 20,
    textAlign: 'center',
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 15,
    paddingHorizontal: 10,
  },
});

export default AddProduct;
