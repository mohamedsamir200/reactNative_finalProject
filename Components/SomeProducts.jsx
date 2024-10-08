import { View, Text, ScrollView, StyleSheet, Image } from "react-native";
import React, { useEffect, useState } from "react";
import styles from "./../style";
import { Button, Card, Icon, MD2Colors, Snackbar } from "react-native-paper"; // إضافة Snackbar
import { useNavigation } from "@react-navigation/native";
import routes from "./../utilities/Routes";
import {
  onSnapshot,
  collection,
  addDoc,
  query,
  where,
  getDocs,
  doc,
  deleteDoc,
} from "firebase/firestore";
import db from "../Config/firebase";
import { useDispatch, useSelector } from "react-redux";
import { setProducts } from "../Redux/Slices/productSlice";
import { TouchableOpacity } from "react-native-gesture-handler";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Toast from 'react-native-toast-message';
export default function AllProducts() {
  const { navigate } = useNavigation();
  const dispatch = useDispatch();
  const products = useSelector((state) => state.products.products);

  //==== get user ID  ====//
  const [userId, setUserId] = useState("");
  const [data, setData] = useState([]);
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


  //==== get user ID  ====//

  // ==== fun Expended ==== //
  const [isExpanded, setIsExpanded] = useState(false);
  const toggleDescription = (id) => {
    setIsExpanded((prevState) => ({
      ...prevState,
      [id]: !prevState[id],
    }));
  };
  // ==== fun Expended ==== //

  useEffect(() => {
    fetchUser();
    getProduct();
  }, []);

  async function getProduct() {
    let arr;
    onSnapshot(collection(db, "add product"), (snapshot) => {
      arr = snapshot.docs.map((doc) => {
        return { ...doc.data(), id: doc.id };
      });

      dispatch(setProducts([...arr]));
    });
  }

  //=== fun add To Bag ==//
  async function addToBag(item) {
    try {
      const collectionRef = collection(db, "Bag");
      await addDoc(collectionRef, {
        image: item.img,
        quantity: 1,
        title: item.title,
        description: item.description,
        basePrice: item.price,
        price: item.price,
        userID: userId,
      });

      Toast.show({
        text1: "Product added successfully Go to cart",
        text2: item.title,
        position: "top",
        visibilityTime: 3000,
        autoHide: true,
      });
    
    } catch (error) {
      console.error("Error adding to bag: ", error);
    }
  }
  //=== fun add To Bag ==//

  return (
    <>
         <View style={[styles.mainComponentAddress , {marginTop:50 , marginBottom:-5}]}>
          <Text style={styles.mainText}>Product</Text>
          <Text
            style={styles.seeAllBtn}
            onPress={() => navigate(routes.allProducts)}
          >
            SeeAll
          </Text>
        </View>
    <ScrollView
      style={styles.mainContainer}
      showsVerticalScrollIndicator={false}
    >
      <View
        style={{
          flexDirection: "row",
          flexWrap: "wrap",
          justifyContent: "space-between",
        }}
      >
        {products.slice(0,6).map((item) => (
          <View key={item.id}>
            <Card
              style={{
                width: 165,
                height:300,
                backgroundColor: "white",
                marginVertical: 5,
              }}
            >
              <TouchableOpacity
                onPress={() =>
                  navigate(routes.details, {
                    state: {
                      image: item.img,
                      title: item.title,
                      desc: item.description,
                      price: item.price,
                    },
                  })
                }
              >
                <Card.Cover source={{ uri: item.img }} />
              </TouchableOpacity>
              <View style={{ marginTop: 5, padding: 10 }}>
                <Text  style={{fontWeight:700}}>{item.title}</Text>
                {/* <Text
                  style={{ marginVertical: 5 }}
                  numberOfLines={isExpanded[item.id] ? undefined : 2}
                >
                  {item.description}
                </Text> */}
                {/* <Text
                  style={{ color: MD2Colors.indigo500 }}
                  onPress={(e) => {
                    e.stopPropagation();
                    toggleDescription(item.id);
                  }}
                >
                  {isExpanded[item.id] ? "Show Less" : "Show More"}
                </Text> */}
                <View
                  style={{
                    marginTop:20 ,
                    flexDirection: "row",
                    alignItems: "center",
                    justifyContent: "space-between",
                  }}
                >
                  <Text>{item.price} $</Text>
                  <TouchableOpacity onPress={() => addToBag(item)}>
                    <Icon source={"cart"} size={25} />
                  </TouchableOpacity>
                </View>
              </View>
            </Card>
          </View>
        ))}
      </View>

      <Toast ref={(ref) => Toast.setRef(ref)} />
    </ScrollView>
    </>
  );
}

const Styles = StyleSheet.create({
  flexStyle: {
    gap: 5,
    marginTop: 15,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
});
