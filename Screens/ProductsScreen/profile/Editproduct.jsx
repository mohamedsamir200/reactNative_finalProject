import React, { useState } from "react";
import { View, Text, TextInput, Button, ScrollView, Image, TouchableOpacity } from "react-native";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { doc, updateDoc } from "firebase/firestore";
import { useRoute } from "@react-navigation/native"; // لاستخدام route
import db from "../../../Config/firebase";

function EditProduct() {
  const route = useRoute(); // استقبال البيانات من route
  const { productData } = route.params; // استقبال بيانات المنتج من الصفحة السابقة

  const [editedData, setEditedData] = useState(productData); // استخدام البيانات المستلمة

  const handleFileUpload = async (fileUri) => {
    const response = await fetch(fileUri);
    const blob = await response.blob();
    const storage = getStorage();
    const storageRef = ref(storage, `productimg/${Date.now()}`);
    await uploadBytes(storageRef, blob);
    const downloadURL = await getDownloadURL(storageRef);
    return downloadURL;
  };

  const handleImagePick = () => {
    // launchImageLibrary({ mediaType: 'photo' }, (response) => {
    //   if (response.assets && response.assets.length > 0) {
    //     const fileUri = response.assets[0].uri;
    //     setEditedData({ ...editedData, img: fileUri });
    //   }
    // });
  };

  const handleUpdate = async () => {
    try {
      const itemRef = doc(db, "add product", editedData.id);
      if (editedData.img && editedData.img.startsWith("file://")) {
        const imageUrl = await handleFileUpload(editedData.img);
        editedData.img = imageUrl;
      }
      await updateDoc(itemRef, {
        title: editedData.title,
        description: editedData.description,
        price: editedData.price,
        img: editedData.img,
        productquantity: editedData.productquantity,
        typeproduct: editedData.typeproduct,
      });
      console.log("Item updated successfully!");

    } catch (error) {
      console.error("Error updating item: ", error);
    }
  };

  return (
    <ScrollView  style={{ padding: 20 }} contentContainerStyle={{ flexGrow: 1 }}>
      <Text style={{ fontSize: 24, fontWeight: "bold", marginBottom: 20 }}>Edit Product</Text>

      <Text style={{ fontSize: 18 }}>Title</Text>
      <TextInput
        value={editedData.title}
        onChangeText={(text) => setEditedData({ ...editedData, title: text })}
        style={{ borderWidth: 1, borderColor: "#ccc", marginBottom: 10, padding: 8 }}
      />

<Text style={{ fontSize: 18 }}>Price</Text>
<TextInput
  value={String(editedData.price)} 
  onChangeText={(text) => setEditedData({ ...editedData, price: Number(text) })}
  style={{ borderWidth: 1, borderColor: "#ccc", marginBottom: 10, padding: 8 }}
  keyboardType="numeric"
/>

      <Text style={{ fontSize: 18 }}>Product Quantity</Text>
      <TextInput
        value={String(editedData.productquantity)}
        onChangeText={(text) => setEditedData({ ...editedData, productquantity: Number(text) })}
        style={{ borderWidth: 1, borderColor: "#ccc", marginBottom: 10, padding: 8 }}
        keyboardType="numeric"
      />

      <Text style={{ fontSize: 18 }}>Description</Text>
      <TextInput
        value={editedData.description}
        onChangeText={(text) => setEditedData({ ...editedData, description: text })}
        style={{ borderWidth: 1, borderColor: "#ccc", marginBottom: 10, padding: 8 }}
        multiline
      />

      <Text style={{ fontSize: 18 }}>Type Product</Text>
      <TextInput
        value={editedData.typeproduct}
        onChangeText={(text) => setEditedData({ ...editedData, typeproduct: text })}
        style={{ borderWidth: 1, borderColor: "#ccc", marginBottom: 10, padding: 8 }}
      />

      <Text style={{ fontSize: 18 }}>Image</Text>
      {editedData.img ? (
        <Image
          source={{ uri: editedData.img }}
          style={{ width: 100, height: 100, marginBottom: 10 }}
        />
      ) : null}
      <TouchableOpacity onPress={handleImagePick} style={{ backgroundColor: '#6200EE', padding: 10 }}>
        <Text style={{ color: "#fff", textAlign: 'center' }}>Choose New Image</Text>
      </TouchableOpacity>

      <View style={{ marginTop: 20 }}>
        <Button title="Update Product" onPress={handleUpdate} />
      </View>
    </ScrollView>
  );
}

export default EditProduct;
