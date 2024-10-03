import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  ScrollView,
  Alert,
  TouchableOpacity,
} from "react-native";
import { collection, addDoc } from "firebase/firestore";
import { ref, getDownloadURL, uploadBytesResumable } from "firebase/storage";
import AsyncStorage from "@react-native-async-storage/async-storage";
import db, { storage } from "../../../Config/firebase";
import { Picker } from "@react-native-picker/picker";
import * as ImagePicker from 'expo-image-picker';
import Icon from 'react-native-vector-icons/FontAwesome';

function AddProduct({ navigation }) {
  const [data1, setData1] = useState({
    title: "",
    description: "",
    price: "",
    typeproduct: "",
    productquantity: 0,
  });
  const [imgurl, setImgurl] = useState(null);
  const [percent, setPercent] = useState(0);

  const pickImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync();
    if (!result.canceled) {
      setImgurl(result.assets[0]);
    }
  };
  const save = async () => {
    if (imgurl) {
      const storageRef = ref(storage, `productimg/${imgurl.name}`);
      const uploadTask = uploadBytesResumable(storageRef, imgurl);

      uploadTask.on(
        "state_changed",
        (snapshot) => {
          const bits = Math.round((snapshot.bytesTransferred / snapshot.totalBytes) * 100);
          setPercent(bits);
        },
        (error) => {
          Alert.alert("Error", error.message);
        },
        async () => {
          const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
          const ownerID = await AsyncStorage.getItem("id");

          if (data1.title && data1.description) {
            const collectionRef = collection(db, "add product");
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
            navigation.navigate("Profile")
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
      <View style={styles.pickerContainer}>
        <Picker
          selectedValue={data1.typeproduct}
          onValueChange={(itemValue) => setData1({ ...data1, typeproduct: itemValue })}
          style={styles.picker}
        >
          <Picker.Item label="Type Product" value="" />
          <Picker.Item label="Macramé" value="Macramé" />
          <Picker.Item label="Painting" value="Painting" />
          <Picker.Item label="Wood carving" value="Wood carving" />
          <Picker.Item label="Pottery" value="Pottery" />
        </Picker>
      </View>
      <TextInput
        placeholder="Product Quantity"
        style={styles.input}
        value={String(data1.productquantity)}
        keyboardType="numeric"
        onChangeText={(text) => setData1({ ...data1, productquantity: Number(text) })}
      />
      <TouchableOpacity style={styles.bott1} onPress={pickImage}>
      <View style={styles.iconContainer}>
          <Icon name="camera" size={30} color="#fff" />
        </View>
      </TouchableOpacity>
      <TouchableOpacity style={styles.bott} onPress={save}>
        <Text style={styles.bottText}>Done</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.bott} onPress={() => navigation.goBack()}>
        <Text style={styles.bottText}>Cancel</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#fff",
  },
  header: {
    fontSize: 24,
    marginBottom: 20,
    textAlign: "center",
  },
  input: {
    height: 50,
    borderColor: "gray",
    borderWidth: 1,
    marginBottom: 15,
    paddingHorizontal: 10,
    borderRadius: 10,
  },
  bott: {
    backgroundColor: "red",
    padding: 5,
    borderRadius: 10,
    alignItems: "center",
    marginVertical: 10,
    width: 90,
    marginLeft: 260,
  },
  bottText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
  bott1: {
    backgroundColor: "gray",
    padding: 5,
    borderRadius: 50,
    alignItems: "center",
    width: 90,
    alignSelf: 'center',
    height:90,
  },
  iconContainer: {
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop:25
  },
  pickerContainer: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    overflow: 'hidden',
    marginBottom: 20,
  },
  picker: {
    height: 50,
    width: '100%',
  },
});

export default AddProduct;
