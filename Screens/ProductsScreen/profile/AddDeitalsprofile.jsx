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
  TouchableOpacity,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import routes from "../../../utilities/Routes"; // استيراد useNavigation
import AsyncStorage from "@react-native-async-storage/async-storage";
import db from "../../../Config/firebase";
import {
  getDocs,
  collection,
  query,
  where,
  doc,
  updateDoc,
} from "firebase/firestore";
import { storage } from "../../../Config/firebase";
import { ref, getDownloadURL, uploadBytesResumable } from "firebase/storage";
import * as ImagePicker from "expo-image-picker";
import { Picker } from "@react-native-picker/picker"; // استيراد Picker
import Icon from "react-native-vector-icons/FontAwesome"; // لاستخدام الأيقونات

function AddDetailsProfile() {
  const [data, setData] = useState([]);
  const [imgurl, setImgUrl] = useState(null);
  const [storedImageUrl, setStoredImageUrl] = useState(null);
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
          const bits = Math.round(
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100
          );
          setPercent(bits);
        },
        (error) => {
          console.error("Upload error:", error); // قم بطباعة الخطأ
          Alert.alert("Error", error.message); // عرض رسالة الخطأ للمستخدم
          reject(error); // رفض الوعد (Promise)
        },
        async () => {
          try {
            const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
            resolve(downloadURL); // إعادة رابط التنزيل في حال نجاح الرفع
          } catch (err) {
            console.error("Error getting download URL:", err); // معالجة الخطأ في حالة فشل الحصول على رابط التحميل
            reject(err); // رفض الوعد (Promise)
          }
        }
      );
    });
  }

  async function save() {
    let profileImageUrl = storedImageUrl;

    if (imgurl) {
      profileImageUrl = await uploadImageToStorage(
        imgurl,
        `profileimg/${imgurl.split('/').pop()}` // تأكد من استخدام اسم الملف الصحيح
      );
    }
    if (userId) {
      const itemRef = doc(db, "users", userId);
      await updateDoc(itemRef, {
        firstname: data[0].firstname,
        about: data[0].about,
        profilePic: profileImageUrl,
        lastname: data[0].lastname,
        email: data[0].email,
        accountType: data[0].accountType,
        facebook: data[0].facebook,
        instgram: data[0].instgram,
        linkedin: data[0].linkedin,
      });
      navigation.navigate(routes.profile, { Data: data });
      console.log(data);
      
    } else {
      console.error("User ID is not defined.");
    }
  }

  async function pickImage(setImage) {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== "granted") {
      Alert.alert("نحتاج إلى إذن للوصول إلى الصور!");
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.cancelled) {
      setImage(result.uri); // حفظ الصورة التي تم اختيارها
    } else {
      Alert.alert("لم يتم اختيار صورة.");
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
            {storedImageUrl && (
              <Image source={{ uri: storedImageUrl }} style={styles.image} />
            )}
            <Button
              title="Select Profile Image"
              onPress={() => pickImage(setImgUrl)}
            />
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
              onValueChange={(itemValue) =>
                setData((prevData) => [{ ...prevData[0], accountType: itemValue }])
              }
              style={styles.picker}
            >
              <Picker.Item label="Select" value="" />
              <Picker.Item label="Artist" value="Artist" />
              <Picker.Item label="Customer" value="Customer" />
            </Picker>
          </View>
          <TouchableOpacity
            onPress={save}
            style={{
              borderWidth: 1,
              borderRadius: 50,
              width: 90,
              alignItems: "center",
              marginLeft: 250,
              marginTop: 40,
            }}
          >
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
    backgroundColor:"#fff",
    padding:20,
    borderRadius: 10,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  title: {
    fontSize: 25,
    fontWeight: "bold",
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
    borderColor: "#ccc",
    padding: 10,
    borderRadius: 5,
    height: 40,
  },
  textArea: {
    borderWidth: 1,
    borderColor: "#ccc",
    padding: 10,
    borderRadius: 5,
    textAlignVertical: "top",
  },
  image: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 10,
  },
  picker: {
    borderWidth: 1,
    borderColor: "#ccc",
  },
});

export default AddDetailsProfile;
