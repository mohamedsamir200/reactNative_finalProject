import { View, Text, ScrollView, Image, StyleSheet } from "react-native";
import React from "react";
import Styles from "./../style";
import WoodImage from "../Components/WoodImage";
import Products from "../Components/Products";

export default function Home() {
  return (
    <>
      <ScrollView style={Styles.mainContainer} showsVerticalScrollIndicator={false}>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          <View style={{ flexDirection: "row", alignContent: "space-between" }}>
            <View style={style.viewStyles}>
              <Image
                style={{ width: 90, height: 90, marginVertical: 7 }}
                source={require("../assets/roundedImages/Roundimg1.png")}
              />
              <Text>Handicraft</Text>
            </View>
            <View style={style.viewStyles}>
              <Image
                style={{ width: 90, height: 90, marginVertical: 7 }}
                source={require("../assets/roundedImages/Roundimg2.png")}
              />
              <Text>Clocks</Text>
            </View>
            <View style={style.viewStyles}>
              <Image
                style={{ width: 90, height: 90, marginVertical: 7 }}
                source={require("../assets/roundedImages/Roundimg1.png")}
              />
              <Text>Handicraft</Text>
            </View>
            <View style={style.viewStyles}>
              <Image
                style={{ width: 90, height: 90, marginVertical: 7 }}
                source={require("../assets/roundedImages/Roundimg2.png")}
              />
              <Text>Clocks</Text>
            </View>
            <View style={style.viewStyles}>
              <Image
                style={{ width: 90, height: 90, marginVertical: 7 }}
                source={require("../assets/roundedImages/Roundimg1.png")}
              />
              <Text>Handicraft</Text>
            </View>
            <View style={style.viewStyles}>
              <Image
                style={{ width: 90, height: 90, marginVertical: 7 }}
                source={require("../assets/roundedImages/Roundimg2.png")}
              />
              <Text>Clocks</Text>
            </View>
          </View>
        </ScrollView>

        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          <WoodImage />
        </ScrollView>
        <ScrollView>
          <Products/>
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
});
