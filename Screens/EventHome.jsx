import { View, Text } from "react-native";
import React from "react";
import { Image } from "react-native";
import { Button, MD2Colors } from "react-native-paper";
import { useNavigation } from "@react-navigation/native";
import routes from "./../utilities/Routes";

export default function EventHome() {
  const { navigate } = useNavigation();
  return (
    <>
      <View style={{ padding: 10 }}>
        <Image
          source={require("../assets/category-images/event1.png")}
          style={{ width: "100%", height: 200, borderRadius: 20 }}
        />
        <Text style={{ marginTop: 10, lineHeight: 22, fontWeight: "600" }}>
          Join us for exclusive handmade events, online or in person. Discover
          the art of handmade creations and be part of a creative community!
          {"       "}
          <Text
            onPress={() => navigate(routes.Events)}
            style={{ marginLeft: 20, color: MD2Colors.indigo500 }}
          >
            Let's Go <Text style={{ fontSize: 25 }}>→</Text>{" "}
          </Text>
        </Text>
      </View>
    </>
  );
}
