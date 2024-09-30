import { View, Text, ScrollView, StyleSheet, Image } from "react-native";
import React, { useEffect, useState } from "react";
import Styles from "./../style";
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
import Toast from "react-native-toast-message";
import { Searchbar } from "react-native-paper";

export default function AllProducts() {
  const { navigate } = useNavigation();
  const dispatch = useDispatch();
  const products = useSelector((state) => state.products.products);

  const [searchTerm, setSearchTerm] = useState("");
  const [filteredProducts, setFilteredProducts] = useState(products);
  const [selectedCategory, setSelectedCategory] = useState("All");
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
        name: item.title,
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

  //==== Search ===//

  useEffect(() => {
    let filtered = products;
    if (searchTerm) {
      filtered = filtered.filter((item) =>
        item.title.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    if (selectedCategory !== "All") {
      filtered = filtered.filter(
        (item) => item.typeproduct === selectedCategory
      );
    }
    setFilteredProducts(filtered);
  }, [searchTerm, selectedCategory, products]);

  async function getProduct() {
    let arr;
    onSnapshot(collection(db, "add product"), (snapshot) => {
      arr = snapshot.docs.map((doc) => {
        return { ...doc.data(), id: doc.id };
      });
      dispatch(setProducts([...arr]));
    });
  }

  function handleSearch(term) {
    setSearchTerm(term);
  }

  function handleCategorySelect(category) {
    setSelectedCategory(category);
  }
  //==== Search ===//

  return (
    <ScrollView
      style={Styles.mainContainer}
      showsVerticalScrollIndicator={false}
    >
      <Searchbar
        placeholder="Search"
        style={{
          backgroundColor: "transparent",
          borderWidth: 1,
          borderColor: "grey",
        }}
        onChangeText={handleSearch}
        value={searchTerm}
      />
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        style={{ marginVertical: 5 }}
      >
        <Button
          mode={selectedCategory === "All" ? "contained" : "outlined"}
          onPress={() => handleCategorySelect("All")}
          buttonColor={selectedCategory === "All" ? "#344646" : "transparent"}
          style={styles.smallButton}
          labelStyle={styles.buttonLabel}
        >
          All
        </Button>
        <Button
          mode={selectedCategory === "Macramé" ? "contained" : "outlined"}
          onPress={() => handleCategorySelect("Macramé")}
          buttonColor={
            selectedCategory === "Macramé" ? "#344646" : "transparent"
          }
          style={styles.smallButton}
          labelStyle={styles.buttonLabel}
        >
          Macramé
        </Button>
        <Button
          mode={selectedCategory === "Painting" ? "contained" : "outlined"}
          onPress={() => handleCategorySelect("Painting")}
          style={styles.smallButton}
          buttonColor={
            selectedCategory === "Painting" ? "#344646" : "transparent"
          }
          labelStyle={styles.buttonLabel}
        >
          Painting
        </Button>
        <Button
          mode={selectedCategory === "Pottery" ? "contained" : "outlined"}
          onPress={() => handleCategorySelect("Pottery")}
          style={styles.smallButton}
          buttonColor={
            selectedCategory === "Pottery" ? "#344646" : "transparent"
          }
          labelStyle={styles.buttonLabel}
        >
          Pottery
        </Button>
        <Button
          mode={selectedCategory === "Wood carving" ? "contained" : "outlined"}
          onPress={() => handleCategorySelect("Wood carving")}
          style={styles.smallButton}
          buttonColor={
            selectedCategory === "Wood carving" ? "#344646" : "transparent"
          }
          labelStyle={styles.buttonLabel}
        >
          Wood carving
        </Button>
      </ScrollView>
      <View
        style={{
          flexDirection: "row",
          flexWrap: "wrap",
          justifyContent: "space-between",
        }}
      >
        {filteredProducts.map((item) => (
          <View key={item.id}>
            <Card
              style={{
                width: 165,
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
                <Text style={{ fontWeight: 700 }}>{item.title}</Text>
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
                <View
                  style={{
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

  smallButton: {
    minWidth: 30,
    height: 40,
    marginVertical: 2,
    marginHorizontal: 3,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  buttonLabel: {
    fontSize: 10,
  },
});
