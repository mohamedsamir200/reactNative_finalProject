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
import { Picker } from "@react-native-picker/picker"; // استيراد Picker

function AddProduct() {
  const [data1, setData1] = useState({
    title: "",
    description: "",
    price: "",
    typeproduct: "",
    productquantity: 0,
  });
  const [imgurl, setImgurl] = useState(null);
  const [percent, setPercent] = useState(0);

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
       <View style={styles.container}>
      <Text style={styles.label}>Type Product</Text>
      <View style={styles.pickerContainer}>
        <Picker
          selectedValue={selectedType}
          onValueChange={(itemValue, itemIndex) =>setData1(itemValue)}
          style={styles.picker}
        >
          <Picker.Item label="Select" value="" />
          <Picker.Item label="Macramé" value="Macramé" />
          <Picker.Item label="Painting" value="Painting" />
          <Picker.Item label="Wood carving" value="Wood carving" />
          <Picker.Item label="Pottery" value="Pottery" />
        </Picker>
      </View>
    </View>
      <TextInput
        placeholder="Product Quantity"
        style={styles.input}
        value={String(data1.productquantity)}
        keyboardType="numeric"
        onChangeText={(text) =>
          setData1({ ...data1, productquantity: Number(text) })
        }
      />

      {/* زر لرفع الصورة */}
      <TouchableOpacity style={styles.bott} onPress={() => {/* Upload image logic */}}>
        <Text style={styles.bottText}>Upload Product Image</Text>
      </TouchableOpacity>

      {/* زر الحفظ */}
      <TouchableOpacity style={styles.bott} onPress={save}>
        <Text style={styles.bottText}>Done</Text>
      </TouchableOpacity>

      {/* زر الإلغاء */}
      <TouchableOpacity style={styles.bott} onPress={() => {/* Handle cancel logic */}}>
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
    width:90,
    marginLeft:260,
  },
  bottText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
  container: {
    marginBottom: 20,
  },
  label: {
    fontSize: 20,
    marginBottom: 10,
  },
  pickerContainer: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    overflow: 'hidden',
  },
  picker: {
    height: 50,
    width: '100%',
  },
});

export default AddProduct;
