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
import * as ImagePicker from 'expo-image-picker';
import Icon from 'react-native-vector-icons/FontAwesome';

function Addausproduct({ navigation }) {
  const [aucData, setAucData] = useState({
    title: "",
    description: "",
    initPrice: "",
    startDate: "",
    endDate: ""
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
      const fileName = imgurl.fileName || `image_${Date.now()}.jpg`;
      const storageRef = ref(storage, `productimg/${fileName}`);
      const uploadTask = uploadBytesResumable(storageRef, {
        uri: imgurl.uri,
        name: fileName,
      });

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

          if (aucData.title && aucData.description) {
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

            // الانتقال إلى صفحة المنتجات بعد الحفظ
            navigation.navigate("Profile")
          }
        }
      );

      // إعادة تعيين البيانات بعد الحفظ
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
      <Text style={styles.header}>Add Auction Product</Text>
      <TextInput
        placeholder="Title"
        style={styles.input}
        value={aucData.title}
        onChangeText={(text) => setAucData({ ...aucData, title: text })}
      />
      <TextInput
        placeholder="Description"
        style={styles.input}
        value={aucData.description}
        onChangeText={(text) => setAucData({ ...aucData, description: text })}
      />
      <TextInput
        placeholder="Initial Price"
        style={styles.input}
        value={aucData.initPrice}
        keyboardType="numeric"
        onChangeText={(text) => setAucData({ ...aucData, initPrice: text })}
      />
      <TextInput
        placeholder="Start Date (YYYY-MM-DD)"
        style={styles.input}
        value={aucData.startDate}
        onChangeText={(text) => setAucData({ ...aucData, startDate: text })}
      />
      <TextInput
        placeholder="End Date (YYYY-MM-DD)"
        style={styles.input}
        value={aucData.endDate}
        onChangeText={(text) => setAucData({ ...aucData, endDate: text })}
      />

      {/* زر لرفع الصورة */}
      <TouchableOpacity style={styles.bott1} onPress={pickImage}>
      <View style={styles.iconContainer}>
          <Icon name="camera" size={30} color="#fff" />
        </View>
      </TouchableOpacity>

      {/* زر الحفظ */}
      <TouchableOpacity style={styles.bott} onPress={save}>
        <Text style={styles.bottText}>Done</Text>
      </TouchableOpacity>

      {/* زر الإلغاء */}
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
});

export default Addausproduct;
