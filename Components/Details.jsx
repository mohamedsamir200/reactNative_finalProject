import { View, Text, Image, TouchableOpacity, StyleSheet } from "react-native";
import React from "react";
import { ScrollView } from "react-native-gesture-handler";
import { MD2Colors } from "react-native-paper";

export default function Details() {
  return (
    <ScrollView
      style={Styles.mainContainer}
      showsVerticalScrollIndicator={false}
    >
      <View>
        <Image
          style={{ width: "100vw", borderRadius: 15 }}
          source={require("../assets/ProductsImages/product1.png")}
        />
        <View style={{ marginVertical: 15 }}>
          <Text>Title : Product 1</Text>
          <Text style={{ marginVertical: 10, lineHeight: 20 }}>
            Description : I recently purchased This Product , and it has
            exceeded my expectations in every way. From the moment I unpacked
            it, I was impressed by the build quality and attention to detail.
            The product is crafted from high-quality materials that feel durable
            and sturdy.
          </Text>

          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <Text>Price : 100 $</Text>
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "space-between",
                width: 100,
              }}
            >
              <TouchableOpacity>
                <Text style={style.btnStyle}>+</Text>
              </TouchableOpacity>
              <Text>1</Text>
              <TouchableOpacity>
                <Text style={style.btnStyle}>-</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </View>
    </ScrollView>
  );
}

const style = StyleSheet.create({
  btnStyle: {
    padding: 7,
    backgroundColor: MD2Colors.indigo100,
    borderRadius : 500
 
  },
});
