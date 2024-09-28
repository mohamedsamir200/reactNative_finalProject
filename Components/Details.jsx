import { View, Text, Image, TouchableOpacity, StyleSheet } from "react-native";
import React, { useEffect, useState } from "react";
import { ScrollView } from "react-native-gesture-handler";
import {
  ActivityIndicator,
  Button,
  MD2Colors,
  Snackbar,
} from "react-native-paper";
import { useNavigation, useRoute } from "@react-navigation/native";
import Styles from "./../style";
import {
  onSnapshot,
  collection,
  addDoc,
  query,
  where,
  getDocs,
} from "firebase/firestore";
import db from "../Config/firebase";
import AsyncStorage from "@react-native-async-storage/async-storage";
import routes from './../utilities/Routes';
import ProductBag from './../Screens/ProductBag';

export default function Details() {
  const route = useRoute();
  const { image, title, desc, price } = route.params.state;
  const [count, setCount] = useState(1);
  const [userId, setUserId] = useState("");
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const {navigate} = useNavigation()
  //==== snackBar ==== //
  const [visible, setVisible] = React.useState(false);
  const onToggleSnackBar = () => setVisible(!visible);
  const onDismissSnackBar = () => setVisible(false);
  //==== snackBar ==== //

  useEffect(() => {
    fetchUser();
  }, []);

  // ==== fun get user ID === //
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
  // ==== fun get user ID === //

  async function addToBag() {
    setIsLoading(true);
    const collectionRef = collection(db, "Bag");
    const doc = await addDoc(collectionRef, {
      image: image,
      quantity: count,
      name : title ,
      description: desc,
      price: price * count,
      basePrice: price,
      userID: userId,
    });

    onToggleSnackBar();
    setIsLoading(false);
  }

  return (
    <ScrollView
      style={Styles.mainContainer}
      showsVerticalScrollIndicator={false}
    >
      <View>
        <Image
          style={styles.image}
          source={{ uri: image }}
        />
        <View style={styles.contentContainer}>
          <Text style={styles.title}>{title}</Text>
          <Text style={styles.description}>{desc}</Text>

          <View style={styles.priceAndCountContainer}>
            <Text style={styles.price}>{price * count} $</Text>
            <View style={styles.counterContainer}>
              <TouchableOpacity onPress={() => setCount(count + 1)}>
                <Text style={styles.btnStyle}>+</Text>
              </TouchableOpacity>
              <Text style={styles.count}>{count}</Text>
              <TouchableOpacity onPress={() => count > 1 && setCount(count - 1)}>
                <Text style={styles.btnStyle}>-</Text>
              </TouchableOpacity>
            </View>
          </View>
          <Button
            mode="contained"
            style={styles.addButton}
            onPress={() => addToBag()}
            disabled={isLoading}
          >
            {isLoading ? (
              <ActivityIndicator animating={true} size="small" color="#FFFFFF" />
            ) : (
              "Add To Bag"
            )}
          </Button>
          <Button
            icon="arrow-right"
            mode="outlined"
            contentStyle={styles.goToBagButtonContent}
            style={styles.goToBagButton}
            onPress={()=>navigate(routes.productBag)}
          >
            Go To Bag
          </Button>
        </View>
      </View>
      {/*===== snackBar ===== */}
      <Snackbar
        visible={visible}
        onDismiss={onDismissSnackBar}
        style={styles.snackbar}
        duration={2000}
      >
        <Text style={styles.snackbarText}>Added Success</Text>
      </Snackbar>
      {/*===== snackBar ===== */}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  image: {
    width: "100%",
    height: 200,
    resizeMode: "cover",
    borderRadius: 20,
  },
  contentContainer: {
    marginVertical: 15,
  },
  title: {
    fontWeight: "bold",
  },
  description: {
    marginVertical: 10,
    lineHeight: 20,
  },
  priceAndCountContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  price: {
    fontWeight: "bold",
  },
  counterContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    width: 100,
    marginVertical: 20,
  },
  btnStyle: {
    padding: 7,
    backgroundColor: MD2Colors.indigo100,
    borderRadius: 50,
    textAlign: "center",
  },
  count: {
    marginHorizontal: 10,
  },
  addButton: {
    marginBottom: 8,
  },
  goToBagButton: {
    marginTop: 8,
  },
  goToBagButtonContent: {
    flexDirection: "row-reverse",
  },
  snackbar: {
    backgroundColor: "#4CAF50",
  },
  snackbarText: {
    textAlign: "center",
    color: "white",
  },
});
