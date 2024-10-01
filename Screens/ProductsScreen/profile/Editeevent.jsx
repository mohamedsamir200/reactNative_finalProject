import React, { useState, useEffect } from "react";
import { View, Text, TextInput, Button, Image, ScrollView } from "react-native";
import db from "../../../Config/firebase";
import { doc, updateDoc } from "firebase/firestore";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import * as ImagePicker from 'expo-image-picker';
import { useRoute } from "@react-navigation/native"; // لاستخدام route
function EditEvent() {
    const route = useRoute(); // استقبال البيانات من route
    const { productData } = route.params; 
  const [editedData, setEditedData] = useState(productData );
  const [imgFile, setImgFile] = useState(null);

  useEffect(() => {
    const fetchImage = async () => {
      try {
        const storage = getStorage();
        const imageRef = ref(storage, `eventimg/${productData.img}`);
        const imageUrl = await getDownloadURL(imageRef);
        setEditedData((prevData) => ({
          ...prevData,
          img: imageUrl,
        }));
      } catch (error) {
        console.error("Error fetching image:", error);
      }
    };
    fetchImage();
  }, [productData]);

  const handleFileUpload = async (file) => {
    const storage = getStorage();
    const storageRef = ref(storage, `eventimg/${file.name}`);
    await uploadBytes(storageRef, file);
    const downloadURL = await getDownloadURL(storageRef);
    return downloadURL;
  };

  const handleUpdate = async () => {
    try {
      const itemRef = doc(db, "add event", editedData.id);
      if (imgFile) {
        const imageUrl = await handleFileUpload(imgFile);
        editedData.img = imageUrl;
      }
      await updateDoc(itemRef, {
        name: editedData.name,
        date: editedData.date,
        address: editedData.address,
        description: editedData.description,
        time: editedData.time,
        pricetacket: editedData.pricetacket,
        eventtype: editedData.eventtype,
        ticketquantity: editedData.ticketquantity,
        img: editedData.img,
      });
      console.log("Event updated successfully!");
    } catch (error) {
      console.error("Error updating event: ", error);
    }
  };

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      setImgFile(result.uri);
    }
  };

  return (
    <ScrollView contentContainerStyle={{ padding: 20 }}>
      <Text style={{ fontSize: 24, fontWeight: 'bold', marginBottom: 20 }}>Edit Event</Text>

      <Text>Event Name</Text>
      <TextInput
       style={{ borderWidth: 1, borderColor: "#ccc", marginBottom: 10, padding: 8 }}
        value={editedData.name}
        onChangeText={(text) => setEditedData({ ...editedData, name: text })}
      />

      <Text>Event Date</Text>
      <TextInput
       style={{ borderWidth: 1, borderColor: "#ccc", marginBottom: 10, padding: 8 }}
        value={editedData.date}
        onChangeText={(text) => setEditedData({ ...editedData, date: text })}
      />

      <Text>Event Time</Text>
      <TextInput
       style={{ borderWidth: 1, borderColor: "#ccc", marginBottom: 10, padding: 8 }}
        value={editedData.time}
        onChangeText={(text) => setEditedData({ ...editedData, time: text })}
      />

      <Text>Event Address</Text>
      <TextInput
       style={{ borderWidth: 1, borderColor: "#ccc", marginBottom: 10, padding: 8 }}
        value={editedData.address}
        onChangeText={(text) => setEditedData({ ...editedData, address: text })}
      />

      <Text>Event Description</Text>
      <TextInput
        style={{ borderWidth: 1, borderColor: "#ccc", marginBottom: 10, padding: 8 }}
        value={editedData.description}
        multiline
        numberOfLines={4}
        onChangeText={(text) => setEditedData({ ...editedData, description: text })}
      />

      <Text>Event Type</Text>
      <View style={{ flexDirection: "row", marginBottom: 10 }}>
        <Button
          title="Online"
          onPress={() => setEditedData({ ...editedData, eventtype: "online" })}
          color={editedData.eventtype === "online" ? "blue" : "gray"}
        />
        <Button
          title="Offline"
          onPress={() => setEditedData({ ...editedData, eventtype: "offline" })}
          color={editedData.eventtype === "offline" ? "blue" : "gray"}
        />
      </View>

      <Text>Current Image</Text>
      {editedData.img ? (
        <Image
          source={{ uri: editedData.img }}
          style={{ width: 200, height: 200, marginBottom: 10 }}
        />
      ) : (
        <Text>No image available</Text>
      )}

      <Button title="Upload New Image" onPress={pickImage} />

      <Text>Price Ticket</Text>
      <TextInput
       style={{ borderWidth: 1, borderColor: "#ccc", marginBottom: 10, padding: 8 }}
        value={String(editedData.pricetacket)}
        onChangeText={(text) => setEditedData({ ...editedData, pricetacket:  Number(text) })}
      />

      <Text>Ticket Quantity</Text>
      <TextInput
      style={{ borderWidth: 1, borderColor: "#ccc", marginBottom: 10, padding: 8 }}
        value={String(editedData.ticketquantity)}
        keyboardType="numeric"
        onChangeText={(text) => setEditedData({ ...editedData, ticketquantity: Number(text) })}
      />

      <Button title="Done" onPress={handleUpdate} />
    </ScrollView>
  );
}

export default EditEvent;
