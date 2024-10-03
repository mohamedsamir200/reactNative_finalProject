import { View, Text, Image, StyleSheet } from "react-native";
import React, { useEffect, useState } from "react";
import Styles from "../../style";
import { Button } from "react-native-paper";
import { useNavigation } from "@react-navigation/native";
import routes from "../../utilities/Routes";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { collection, query, where, getDocs } from "firebase/firestore";
import db from "../../Config/firebase";
import { TouchableOpacity } from "react-native";

export default function UserInformation() {
  const { navigate } = useNavigation();
  const [userId, setUserId] = useState("");
  const [userData, setUserData] = useState("");
  const [data, setData] = useState([]);
  //   useEffect(() => {
  //     fetchUserId();
  //     getData();
  //   }, []);

  //   //===== fetchUserId ====== //
  //   const fetchUserId = async () => {
  //     const userID = await AsyncStorage.getItem("id");
  //     setUserId(userID);
  //   };
  //   //===== fetchUserId ====== //
  //   // ===== get user data From firebase ===== //
  //   const getData = async () => {
  //     const collRef = collection(db, "users");
  //     const myQuery = query(collRef, where("id", "==", userId));
  //     const myData = await getDocs(myQuery);
  //     // return myData ;
  //     if (!myData.empty) {
  //       const userData = myData.docs.map((doc) => ({
  //         ...doc.data(),
  //         id: doc.id,
  //       }));
  //       setData(userData);
  //     }
  //   };

  // ===== get user data From firebase ===== //

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const userUID = await AsyncStorage.getItem("id");
        if (userUID) {
          setUserId(userUID);
          const usersCollection = collection(db, "users");
          const q = query(usersCollection, where("id", "==", userUID));
          const querySnapshot = await getDocs(q);

          if (!querySnapshot.empty) {
            const userData = querySnapshot.docs.map((doc) => ({
              ...doc.data(),
              id: doc.id,
            }));
            setData(userData);
          } else {
            console.error("No user found!");
          }
        }
      } catch (error) {
        console.error("Error fetching user data: ", error);
      }
    };

    fetchUser();
  }, []);

  return (
    <View style={Styles.drawerViewStyle}>
      {data.map((item) => (
      <TouchableOpacity  onPress={() => navigate(routes.profile)}>
        <View style={{ flexDirection: "row" }}>
          <View style={styles.divImageStyle}>
            <Image
              source={{
                uri: item.profilePic
                  ? item.profilePic
                  : require("../../assets/default-image/default-image.jpg"),
              }}
              style={{ width: 30, height: 30, borderRadius: 500 }}
            />
          </View>
          <View style={{ marginLeft: 30 }}>
            <Text
              style={{ color: "grey" }}
            >{`${item.firstname} ${item.lastname}`}</Text>
            <Text
              style={{ marginTop: 10, color: "teal" }}
              onPress={() => navigate(routes.profile)}
            >
              View Profile
            </Text>
          </View>
        </View>
          </TouchableOpacity>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  divImageStyle: {
    width: 40,
    height: 40,
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "teal",
    borderRadius: 500,
  },
});
