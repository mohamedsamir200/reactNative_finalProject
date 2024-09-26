import { View, Text, Image } from "react-native";
import React from "react";
import { ScrollView } from "react-native-gesture-handler";

export default function CategoryImage() {
  return (
    <>
     
        <View style={{ marginVertical : 50 , flexDirection: "row", alignContent: "space-between" }}>
          <View >
            <Image
              style={{ width: 170, height: 170, marginVertical: 7 , marginHorizontal : 7 }}
              source={require("../assets/sectionTwoImages/Card.png")}
              borderRadius={20}
            />
            <Text style = {{position:"absolute" , bottom : 30 , left : "40%" , color :"white"}}>Wood</Text>
          </View>

          <View >
            <Image
              style={{ width: 170, height: 170, marginVertical: 7 , marginHorizontal : 7 }}
              source={require("../assets/sectionTwoImages/Card2.png")}
              borderRadius={20}
            />
            <Text style = {{position:"absolute" , bottom : 30 , left : "40%" , color :"white"}}>iron</Text>
          </View>
          
          <View >
            <Image
              style={{ width: 170, height: 170, marginVertical: 7 , marginHorizontal : 7 }}
              source={require("../assets/sectionTwoImages/Card.png")}
              borderRadius={20}
            />
            <Text style = {{position:"absolute" , bottom : 30 , left : "40%" , color :"white"}}>Wood</Text>
          </View>

          <View >
            <Image
              style={{ width: 170, height: 170, marginVertical: 7 , marginHorizontal : 7 }}
              source={require("../assets/sectionTwoImages/Card2.png")}
              borderRadius={20}
            />
            <Text style = {{position:"absolute" , bottom : 30 , left : "40%" , color :"white"}}>iron</Text>
          </View>

          <View >
            <Image
              style={{ width: 170, height: 170, marginVertical: 7 , marginHorizontal : 7 }}
              source={require("../assets/sectionTwoImages/Card.png")}
              borderRadius={20}
            />
            <Text style = {{position:"absolute" , bottom : 30 , left : "40%" , color :"white"}}>Wood</Text>
          </View>

         
        </View>
   
    </>
  );
}
