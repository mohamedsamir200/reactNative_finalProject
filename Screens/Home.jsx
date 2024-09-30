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

import EventHome from "./EventHome";

export default function Home() {
  return (
    <>
      <ScrollView showsVerticalScrollIndicator={false}>
        <CategoryImage />
        <SomeProducts />
       <EventHome/>
        {/* <ScrollView><Products/></ScrollView> */}
      </ScrollView>
    </>
  );
}

const style = StyleSheet.create({});
