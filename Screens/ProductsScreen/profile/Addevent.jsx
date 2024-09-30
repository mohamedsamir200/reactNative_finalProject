import React, { useState } from "react";
import { View, Text, TextInput, Button, ScrollView, TouchableOpacity, Alert } from "react-native";
import { ref, getDownloadURL, uploadBytesResumable } from "firebase/storage";
import { collection, addDoc } from "firebase/firestore";
import { storage, db } from "../../../Config/firebase";
import * as ImagePicker from 'expo-image-picker';

function Addevent() {
  const [data1, setData1] = useState({
    name: "",
    date: "",
    address: "",
    description: "",
    time: "",
    pricetacket: "",
    eventtype: "",
    ticketquantity: 0,
  });

  const [imgurl, setImgUrl] = useState(null);
  const [imgurl2, setImgUrl2] = useState(null);

  const handleInputChange = (name, value) => {
    setData1((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const pickImage = async (setImageState) => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      setImageState(result.uri);
    }
  };

  const handleSave = async () => {
    try {
      if (!imgurl || !imgurl2) {
        Alert.alert("Error", "Both images must be selected for upload.");
        return;
      }

      const eventImgRef = ref(storage, `eventimg/${Date.now()}`);
      const ticketImgRef = ref(storage, `ticketimg/${Date.now() + "_ticket"}`);

      const uploadTask1 = uploadBytesResumable(eventImgRef, await fetchImageBlob(imgurl));
      const uploadTask2 = uploadBytesResumable(ticketImgRef, await fetchImageBlob(imgurl2));

      const [snapshot1, snapshot2] = await Promise.all([uploadTask1, uploadTask2]);

      const downloadURL1 = await getDownloadURL(snapshot1.ref);
      const downloadURL2 = await getDownloadURL(snapshot2.ref);

      const collectionRef = collection(db, "add event");
      await addDoc(collectionRef, {
        ...data1,
        eventImg: downloadURL1,
        ticketImg: downloadURL2,
        ownerID: 'localStorage.getItem("id")',  // This would be replaced with AsyncStorage or relevant storage for React Native
      });

      setData1({
        name: "",
        date: "",
        address: "",
        description: "",
        time: "",
        pricetacket: "",
        eventtype: "",
        ticketquantity: 0,
      });
      setImgUrl(null);
      setImgUrl2(null);

      Alert.alert("Success", "Event saved successfully!");
    } catch (error) {
      Alert.alert("Error", error.message);
    }
  };

  const fetchImageBlob = async (uri) => {
    const response = await fetch(uri);
    return response.blob();
  };

  return (
    <ScrollView style={{ paddingHorizontal: 10 ,marginTop:10, }}>
      <Text style={{ fontSize: 24, fontWeight: "bold", marginBottom: 20 }}>Add Event</Text>

      <Text style={{ fontSize: 18 }}>Event Name</Text>
      <TextInput
        style={styles.input}
        value={data1.name}
        onChangeText={(text) => handleInputChange("name", text)}
      />

      <Text style={{ fontSize: 18 }}>Event Date</Text>
      <TextInput
        style={styles.input}
        value={data1.date}
        onChangeText={(text) => handleInputChange("date", text)}
        placeholder="YYYY-MM-DD"
         keyboardType="numeric"
      />

      <Text style={{ fontSize: 18 }}>Event Time</Text>
      <TextInput
        style={styles.input}
        value={data1.time}
        onChangeText={(text) => handleInputChange("time", text)}
        placeholder="HH:MM"
         keyboardType="numeric"
      />

      <Text style={{ fontSize: 18 }}>Event Address</Text>
      <TextInput
        style={styles.input}
        value={data1.address}
        onChangeText={(text) => handleInputChange("address", text)}
      />

      <Text style={{ fontSize: 18 }}>Event Description</Text>
      <TextInput
        style={styles.input}
        value={data1.description}
        onChangeText={(text) => handleInputChange("description", text)}
        multiline
      />

      <Text style={{ fontSize: 18 }}>Event Type</Text>
      <View style={styles.radioContainer}>
        <TouchableOpacity onPress={() => handleInputChange("eventtype", "online")}>
          <Text style={data1.eventtype === "online" ? styles.selected : styles.radioText}>Online</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => handleInputChange("eventtype", "offline")}>
          <Text style={data1.eventtype === "offline" ? styles.selected : styles.radioText}>Offline</Text>
        </TouchableOpacity>
      </View>

      <Text style={{ fontSize: 18 }}>Event Image</Text>
      <TouchableOpacity onPress={() => pickImage(setImgUrl)}>
        <Text style={styles.uploadButton}>Choose Image</Text>
      </TouchableOpacity>

      <Text style={{ fontSize: 18 }}>Ticket Image</Text>
      <TouchableOpacity onPress={() => pickImage(setImgUrl2)}>
        <Text style={styles.uploadButton}>Choose Image</Text>
      </TouchableOpacity>

      <Text style={{ fontSize: 18 }}>Price Ticket</Text>
      <TextInput
        style={styles.input}
        value={data1.pricetacket}
        onChangeText={(text) => handleInputChange("pricetacket", text)}
        keyboardType="numeric"
      />

      <Text style={{ fontSize: 18 }}>Ticket Quantity</Text>
      <TextInput
        style={styles.input}
        value={String(data1.ticketquantity)}
        onChangeText={(text) => handleInputChange("ticketquantity", text)}
        keyboardType="numeric"
      />

      <View style={{ marginTop: 20 ,paddingBottom:15}}>
        <Button title="Save Event" onPress={handleSave} />
      </View>
    </ScrollView>
  );
}

const styles = {
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    padding: 10,
    marginBottom: 15,
    borderRadius: 5,
  },
  uploadButton: {
    color: "#007bff",
    marginBottom: 15,
    textDecorationLine: "underline",
  },
  radioContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginBottom: 20,
  },
  radioText: {
    fontSize: 18,
    color: "#555",
  },
  selected: {
    fontSize: 18,
    color: "#007bff",
    fontWeight: "bold",
  },
};

export default Addevent;
