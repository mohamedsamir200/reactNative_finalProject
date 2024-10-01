import { View, Text, Image, StyleSheet } from "react-native";
import React from "react";
import { ScrollView } from "react-native-gesture-handler";
import styles from './../style';
import { useNavigation } from "@react-navigation/native";
import { TouchableOpacity } from "react-native";
export default function CategoryImage() {
  const { navigate } = useNavigation();
  return (
    <>
     
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
            <View style={style.viewStyles}>
              <TouchableOpacity onPress={() => navigate(routes.allProducts)}>
                <Image
                  style={style.imgStyle}
                  source={require("../assets/category-images/woodCarving .png")}
                />
              </TouchableOpacity>
              <Text>wood carving </Text>
            </View>

            <View style={style.viewStyles}>
              <TouchableOpacity onPress={() => navigate(routes.allProducts)}>
                <Image
                  style={style.imgStyle}
                  source={require("../assets/category-images/pottery.png")}
                />
              </TouchableOpacity>
              <Text>pottery </Text>
            </View>

            <View style={style.viewStyles}>
              <TouchableOpacity onPress={() => navigate(routes.allProducts)}>
                <Image
                  style={style.imgStyle}
                  source={require("../assets/category-images/macrame product.png")}
                />
              </TouchableOpacity>
              <Text>macrame </Text>
            </View>
            
          </View>
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