import { View, Text, ScrollView, Image, StyleSheet } from "react-native";
import React from "react";
import Styles from "./../style";
import CategoryImage from "../Components/CategoryImage";
import Products from "../Components/Products/Products";
import AllProducts from "../Components/AllProducts";
import { Button } from "react-native-paper";
import styles from "./../style";
import { useNavigation } from "@react-navigation/native";
import routes from "./../utilities/Routes";
import { TouchableOpacity } from "react-native";
import SomeProducts from "../Components/SomeProducts";

export default function Home() {
  const { navigate } = useNavigation();
  return (
    <>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.mainComponentAddress}>
          <Text style={styles.mainText}>Category</Text>
          <Text
            style={styles.seeAllBtn}
            onPress={() => navigate(routes.allProducts)}
          >
            SeeAll
          </Text>
        </View>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          <View style={{ flexDirection: "row", alignContent: "space-between" }}>
            <View style={style.viewStyles}>
              <TouchableOpacity onPress={() => navigate(routes.allProducts)}>
                <Image
                  style={style.imgStyle}
                  source={require("../assets/category-images/category1.jpg")}
                />
              </TouchableOpacity>
              <Text>POTTERY</Text>
            </View>
            <View style={style.viewStyles}>
              <TouchableOpacity onPress={() => navigate(routes.allProducts)}>
                <Image
                  style={style.imgStyle}
                  source={require("../assets/category-images/category4.jpg")}
                />
              </TouchableOpacity>
              <Text>TEXTILE</Text>
            </View>
            <View style={style.viewStyles}>
              <TouchableOpacity onPress={() => navigate(routes.allProducts)}>
                <Image
                  style={style.imgStyle}
                  source={require("../assets/category-images/category2.jpeg")}
                />
              </TouchableOpacity>
              <Text>ANTIQUES</Text>
            </View>
            <View style={style.viewStyles}>
              <TouchableOpacity onPress={() => navigate(routes.allProducts)}>
                <Image
                  style={style.imgStyle}
                  source={require("../assets/category-images/category3.jpg")}
                />
              </TouchableOpacity>
              <Text>TEXTILE</Text>
            </View>
          </View>
        </ScrollView>

        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          {/* <CategoryImage /> */}
        </ScrollView>
        {/* <ScrollView><Products/></ScrollView> */}
        <ScrollView>
          {/* <AllProducts /> */}
          <SomeProducts/>
        </ScrollView>
      </ScrollView>
    </>
  );
}

const style = StyleSheet.create({
  viewStyles: {
    // marginHorizontal: 5,
    width: 100,
    height: 120,
    justifyContent: "center",
    alignItems: "center",
  },
  imgStyle: {
    width: 90,
    height: 90,
    marginVertical: 7,
    borderWidth: 1,
    borderColor: "grey",
    borderRadius: 500,
  },
});
