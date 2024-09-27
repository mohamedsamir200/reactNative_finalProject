import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  Button,
  Image,
  Alert,
  ScrollView,
  StyleSheet,
  TouchableOpacity
} from "react-native";
import { useNavigation } from "@react-navigation/native"; // تأكد من استخدام react-navigation
import AsyncStorage from '@react-native-async-storage/async-storage'; // استيراد AsyncStorage
import db from "../../../Config/firebase";
import {
  getDocs,
  collection,
  query,
  where,
  doc,
  updateDoc,
} from "firebase/firestore";
import { storage} from "../../../Config/firebase";
import { ref, getDownloadURL, uploadBytesResumable } from "firebase/storage";
import * as ImagePicker from 'expo-image-picker';
import { Picker } from "@react-native-picker/picker"; // استيراد Picker
import Icon from 'react-native-vector-icons/FontAwesome'; // لاستخدام الأيقونات

function AddDetailsProfile() {
  const [data, setData] = useState([]);
  const [imgurl, setImgUrl] = useState(null);
  const [coverImgUrl, setCoverImgUrl] = useState(null);
  const [storedImageUrl, setStoredImageUrl] = useState(null);
  const [storedCoverImageUrl, setStoredCoverImageUrl] = useState(null);
  const [percent, setPercent] = useState(0);
  const [userId, setUserId] = useState(null);
  const navigation = useNavigation();

  async function checkUser() {
    try {
      const usersCollection = collection(db, "users");
      const userId = await AsyncStorage.getItem("id");
      const q = query(usersCollection, where("id", "==", userId));
      const querySnapshot = await getDocs(q);

      if (!querySnapshot.empty) {
        querySnapshot.forEach((doc) => {
          const userData = doc.data();
          setData([userData]);
          setStoredImageUrl(userData.profilePic);
          setStoredCoverImageUrl(userData.coverPic);
          setUserId(doc.id);
        });
      } else {
        console.log("No user found!");
        throw new Error("User not found in the database.");
      }
    } catch (error) {
      console.error("Error: ", error);
    }
  }

  useEffect(() => {
    checkUser();
  }, []);

  async function uploadImageToStorage(imageFile, filePath) {
    const storageRef = ref(storage, filePath);
    const uploadTask = uploadBytesResumable(storageRef, imageFile);

    return new Promise((resolve, reject) => {
      uploadTask.on(
        "state_changed",
        (snapshot) => {
          const bits = Math.round((snapshot.bytesTransferred / snapshot.totalBytes) * 100);
          setPercent(bits);
        },
        (error) => {
          Alert.alert("Error", error.message);
          reject(error);
        },
        async () => {
          const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
          resolve(downloadURL);
        }
      );
    });
  }

  async function save() {
    let profileImageUrl = storedImageUrl;
    let coverImageUrl = storedCoverImageUrl;

    if (imgurl) {
      profileImageUrl = await uploadImageToStorage(imgurl, `profileimg/${imgurl.name}`);
    }

    if (coverImgUrl) {
      coverImageUrl = await uploadImageToStorage(coverImgUrl, `coverimg/${coverImgUrl.name}`);
    }

    if (userId) {
      const itemRef = doc(db, "users", userId);
      await updateDoc(itemRef, {
        firstname: data[0].firstname,
        about: data[0].about,
        profilePic: profileImageUrl,
        coverPic: coverImageUrl,
        lastname: data[0].lastname,
        email: data[0].email,
        accountType: data[0].accountType,
        facebook: data[0].facebook,
        instgram: data[0].instgram,
        linkedin: data[0].linkedin,
      });
      navigation.navigate("Profile", { data });
    } else {
      console.error("User ID is not defined.");
    }
  }

  async function pickImage(setImage) {
    // طلب إذن الوصول إلى مكتبة الصور
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    
    if (status !== 'granted') {
      Alert.alert('نحتاج إلى إذن للوصول إلى الصور!');
      return;
    }
  
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });
  
    if (!result.cancelled) {
      setImage(result.uri);
    }
  }
  

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Edit Profile</Text>
      {data.map((item, index) => (
        <View style={styles.form} key={index}>
          <View style={styles.inputGroup}>
            <Text style={styles.label}>First Name</Text>
            <TextInput
              style={styles.input}
              value={item.firstname}
              onChangeText={(text) => setData([{ ...item, firstname: text }])}
            />
          </View>
          <View style={styles.inputGroup}>
            <Text style={styles.label}>Last Name</Text>
            <TextInput
              style={styles.input}
              value={item.lastname}
              onChangeText={(text) => setData([{ ...item, lastname: text }])}
            />
          </View>
          <View style={styles.inputGroup}>
            <Text style={styles.label}>About you</Text>
            <TextInput
              style={styles.textArea}
              multiline
              numberOfLines={4}
              value={item.about}
              onChangeText={(text) => setData([{ ...item, about: text }])}
            />
          </View>
          <View style={styles.inputGroup}>
            <Text style={styles.label}>Facebook</Text>
            <TextInput
              style={styles.input}
              value={item.facebook}
              onChangeText={(text) => setData([{ ...item, facebook: text }])}
            />
          </View>
          <View style={styles.inputGroup}>
            <Text style={styles.label}>Instagram</Text>
            <TextInput
              style={styles.input}
              value={item.instgram}
              onChangeText={(text) => setData([{ ...item, instgram: text }])}
            />
          </View>
          <View style={styles.inputGroup}>
            <Text style={styles.label}>Profile Img</Text>
            {storedImageUrl && <Image source={{ uri: storedImageUrl }} style={styles.image} />}
            <Button title="Select Profile Image" onPress={() => pickImage(setImgUrl)} />
          </View>
          <View style={styles.inputGroup}>
            <Text style={styles.label}>Cover Img</Text>
            {storedCoverImageUrl && <Image source={{ uri: storedCoverImageUrl }} style={styles.image} />}
            <Button title="Select Cover Image" onPress={() => pickImage(setCoverImgUrl)} />
          </View>
          <View style={styles.inputGroup}>
            <Text style={styles.label}>Email</Text>
            <TextInput
              style={styles.input}
              value={item.email}
              onChangeText={(text) => setData([{ ...item, email: text }])}
            />
          </View>
          <View style={styles.inputGroup}>
            <Text style={styles.label}>LinkedIn</Text>
            <TextInput
              style={styles.input}
              value={item.linkedin}
              onChangeText={(text) => setData([{ ...item, linkedin: text }])}
            />
          </View>
          <View style={styles.inputGroup}>
  <Text style={styles.label}>Account Type</Text>
  <Picker
    selectedValue={item.accountType}
    onValueChange={(itemValue) => {
      setData((prevData) => [{ ...prevData[0], accountType: itemValue }]);
    }}
    style={styles.picker} // إضافة تنسيق لمكون Picker
  >
    <Picker.Item label="Select" value="" />
    <Picker.Item label="Artist" value="Artist" />
    <Picker.Item label="Customer" value="Customer" />
  </Picker>
</View>
          {/* <Button title="DONE" onPress={save} style={{backgroundColor:"green"}}/> */}
          <TouchableOpacity onPress={save} style={{borderWidth: 1, borderRadius:50,width:90,alignItems:"center",marginLeft:250,marginTop:40}}>
            <Icon name="check" size={40} color="black" />
          </TouchableOpacity>
        </View>
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor:'white',
  },
  title: {
    fontSize: 25,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  form: {
    marginBottom: 20,
  },
  inputGroup: {
    marginBottom: 15,
  },
  label: {
    fontSize: 15,
    marginBottom: 5,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    borderRadius: 5,
    height:40
  },
  textArea: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    borderRadius: 5,
    height: 100,
    textAlignVertical: 'top', // لتجعل النص يبدأ من الأعلى
  },
  image: {
    width: 100,
    height: 100,
    marginBottom: 10,
  },
  picker: {
    height: 50,
    borderColor: '#ccc',
    borderWidth: 2,
    borderRadius: 5,
    marginTop: 5,
    padding: 10,
  },
});

export default AddDetailsProfile;
