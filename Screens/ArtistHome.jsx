import { View, Text, Image, ScrollView, StyleSheet } from "react-native";
import { useEffect, useState } from "react";
import { collection, query, where, getDocs } from "firebase/firestore";

import db from "../Config/firebase";
import { Card } from "react-native-paper";
import Styles from "./../style";

export default function ArtistHome() {
  const [users, setUsers] = useState([]);
  useEffect(() => {
    const fetchUsers = async () => {
      const q = query(
        collection(db, "users"),
        where("accountType", "==", "Artist")
      );

      const querySnapshot = await getDocs(q);
      const usersList = [];
      querySnapshot.forEach((doc) => {
        usersList.push({ id: doc.id, ...doc.data() });
      });
      setUsers(usersList);
    };
    fetchUsers();
  }, []);

  return (
    <>
      <View style={[Styles.mainComponentAddress, { marginBottom: 5 }]}>
        <Text style={Styles.mainText}>Our Artists</Text>
        <Text
          style={Styles.seeAllBtn}
          onPress={() => navigate(routes.allProducts)}
        >
          All Artists
        </Text>
      </View>
      <ScrollView
        style={{ flexDirection: "row" }}
        horizontal={true}
        showsHorizontalScrollIndicator={false}
      >
        {users.slice(0, 4).map((item) => (
          <View key={item.id} style={styles.cardContainer}>
            <Card.Cover
          
              source={
                item.profilePic
                  ? { uri: item.profilePic }
                  : require("../assets/default-image/default-image.jpg")
              }
              style={[styles.cardImage , {width:200 , height:250}]}
            />
            <Text style={{textAlign:"center" , marginVertical:15}}>{`${item.firstname} ${item.lastname}`} </Text>
            {/* <Text style={styles.accountTypeText}>{item.accountType}</Text> */}
          </View>
        ))}
      </ScrollView>
    </>
  );
}

const styles = StyleSheet.create({
  cardContainer: {
    width:200,
 
    margin: 10,
    borderRadius: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    backgroundColor: "white",
  },

  accountTypeText: {
    textAlign: "center",
  },
});
