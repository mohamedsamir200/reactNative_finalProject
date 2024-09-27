import { View, Text, ScrollView } from "react-native";
import React, { useState } from "react";
import styles from "./../style";
import { useSelector } from "react-redux";
import { Card, MD2Colors } from "react-native-paper";
import { useNavigation } from "@react-navigation/native";
import { collection } from 'firebase/firestore';

export default function SomeProducts() {
    const { navigate } = useNavigation();
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



  return (
    // showsVerticalScrollIndicator={false}
    <>
         <View style={[styles.mainComponentAddress , {marginBottom : -2 , marginTop:40}]}>
          <Text style={styles.mainText}>Products</Text>
          <Text
            style={styles.seeAllBtn}
            onPress={() => navigate(routes.allProducts)}
          >
            SeeAll
          </Text>
        </View>
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
      {products.slice(0,4).map((item) => (
        <View key={item.id}>
          <Card
            style={{
              width: 165,
              backgroundColor: "white",
             marginVertical : 8
            }}
            onPress={() =>
              navigate(routes.details, {
                state: {
                  image : item.img , 
                  title : item.title , 
                  desc : item.description , 
                  price : item.price
                },
              })
            }
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
  </>
  );
}
