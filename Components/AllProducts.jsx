import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  FlatList,
  Image,
} from "react-native";
import React, { useEffect, useState } from "react";
import Styles from "./../style";
import { Button, Card, MD2Colors } from "react-native-paper";
import { useNavigation } from "@react-navigation/native";
import routes from "./../utilities/Routes";
import {
  onSnapshot,
  collection,
  addDoc,
  query,
  where,
  getDocs,
} from "firebase/firestore";
import db from "../Config/firebase";
import { useDispatch, useSelector } from "react-redux";
import { setProducts } from "../Redux/Slices/productSlice";

export default function AllProducts() {
  const { navigate } = useNavigation();
  const dispatch = useDispatch();
  const products = useSelector((state) => state.products.products);

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

  return (
    // showsVerticalScrollIndicator={false}
    <ScrollView
      style={Styles.mainContainer}
      showsVerticalScrollIndicator={false}
    >
      <View
        style={{
          flexDirection: "row",
          flexWrap: "wrap",
          justifyContent: "space-between",
        }}
      >
        {products.map((item) => (
          <View key={item.id}>
            <Card
              style={{ width: 165, backgroundColor: "white" , marginVertical:5}}
              onPress={() => navigate(routes.details)}
            >
              <Card.Cover source={{ uri: item.img }} />
              <View style={{ marginTop: 5, padding: 10 }}>
                <Text>{item.title}</Text>
                <Text
                  style={{ marginVertical: 5 }}
                  numberOfLines={isExpanded[item.id] ? undefined : 2}
                >
                  {item.description}
                </Text>
                <Text
                  style={{ color: MD2Colors.indigo500 }}
                  onPress={(e) => {
                    e.stopPropagation();
                    toggleDescription(item.id);
                  }}
                >
                  {isExpanded[item.id] ? "Show Less" : "Show More"}
                </Text>
                <Text>{item.price} $</Text>
              </View>
            </Card>
          </View>
        ))}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  flexStyle: {
    gap: 5,
    marginVertical: 15,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
});
