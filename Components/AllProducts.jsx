import { View, Text, ScrollView, StyleSheet } from "react-native";
import React from "react";
import Styles from "./../style";
import { Card } from "react-native-paper";
import { useNavigation } from "@react-navigation/native";
import routes from "./../utilities/Routes";

export default function AllProducts() {
  const { navigate } = useNavigation();
  return (
    <ScrollView
      style={Styles.mainContainer}
      showsVerticalScrollIndicator={false}
    >
      <View style={styles.flexStyle}>
        <Card
          style={{ width: 165, backgroundColor: "white" }}
          onPress={() => navigate(routes.details)}
        >
          <Card.Cover
            source={require("../assets/ProductsImages/product1.png")}
          />
          <View style={{ marginTop: 5, padding: 5 }}>
            <Text>Brass product</Text>
            <Text style={{ marginVertical: 5 }}>
              The spa Old Fashioned Hand Glazed Studio Pottery Ceramic Oil
              Bottle (1000 ML)
            </Text>

            <Text>Rs. 799</Text>
          </View>
        </Card>

        <Card
          style={{ width: 165, backgroundColor: "white" }}
          onPress={() => navigate(routes.details)}
        >
          <Card.Cover
            source={require("../assets/ProductsImages/product2.png")}
          />
          <View style={{ marginTop: 5, padding: 5 }}>
            <Text>Brass product</Text>
            <Text style={{ marginVertical: 5 }}>
              The spa Old Fashioned Hand Glazed Studio Pottery Ceramic Oil
              Bottle (1000 ML)
            </Text>
            <Text>Rs. 799</Text>
          </View>
        </Card>
      </View>

      <View style={styles.flexStyle}>
        <Card
          style={{ width: 165, backgroundColor: "white" }}
          onPress={() => navigate(routes.details)}
        >
          <Card.Cover
            source={require("../assets/ProductsImages/product3.png")}
          />
          <View style={{ marginTop: 5, padding: 5 }}>
            <Text>Brass product</Text>
            <Text style={{ marginVertical: 5 }}>
              The spa Old Fashioned Hand Glazed Studio Pottery Ceramic Oil
              Bottle (1000 ML)
            </Text>

            <Text>Rs. 799</Text>
          </View>
        </Card>

        <Card
          style={{ width: 165, backgroundColor: "white" }}
          onPress={() => navigate(routes.details)}
        >
          <Card.Cover
            source={require("../assets/ProductsImages/product4.png")}
          />
          <View style={{ marginTop: 5, padding: 5 }}>
            <Text>Brass product</Text>
            <Text style={{ marginVertical: 5 }}>
              The spa Old Fashioned Hand Glazed Studio Pottery Ceramic Oil
              Bottle (1000 ML)
            </Text>
            <Text>Rs. 799</Text>
          </View>
        </Card>
      </View>

      <View style={styles.flexStyle}>
        <Card
          style={{ width: 165, backgroundColor: "white" }}
          onPress={() => navigate(routes.details)}
        >
          <Card.Cover
            source={require("../assets/ProductsImages/product1.png")}
          />
          <View style={{ marginTop: 5, padding: 5 }}>
            <Text>Brass product</Text>
            <Text style={{ marginVertical: 5 }}>
              The spa Old Fashioned Hand Glazed Studio Pottery Ceramic Oil
              Bottle (1000 ML)
            </Text>

            <Text>Rs. 799</Text>
          </View>
        </Card>

        <Card
          style={{ width: 165, backgroundColor: "white" }}
          onPress={() => navigate(routes.details)}
        >
          <Card.Cover
            source={require("../assets/ProductsImages/product2.png")}
          />
          <View style={{ marginTop: 5, padding: 5 }}>
            <Text>Brass product</Text>
            <Text style={{ marginVertical: 5 }}>
              The spa Old Fashioned Hand Glazed Studio Pottery Ceramic Oil
              Bottle (1000 ML)
            </Text>
            <Text>Rs. 799</Text>
          </View>
        </Card>
      </View>

      <View style={styles.flexStyle}>
        <Card
          style={{ width: 165, backgroundColor: "white" }}
          onPress={() => navigate(routes.details)}
        >
          <Card.Cover
            source={require("../assets/ProductsImages/product3.png")}
          />
          <View style={{ marginTop: 5, padding: 5 }}>
            <Text>Brass product</Text>
            <Text style={{ marginVertical: 5 }}>
              The spa Old Fashioned Hand Glazed Studio Pottery Ceramic Oil
              Bottle (1000 ML)
            </Text>

            <Text>Rs. 799</Text>
          </View>
        </Card>

        <Card
          style={{ width: 165, backgroundColor: "white" }}
          onPress={() => navigate(routes.details)}
        >
          <Card.Cover
            source={require("../assets/ProductsImages/product4.png")}
          />
          <View style={{ marginTop: 5, padding: 5 }}>
            <Text>Brass product</Text>
            <Text style={{ marginVertical: 5 }}>
              The spa Old Fashioned Hand Glazed Studio Pottery Ceramic Oil
              Bottle (1000 ML)
            </Text>
            <Text>Rs. 799</Text>
          </View>
        </Card>
      </View>

      <View style={styles.flexStyle}>
        <Card
          style={{ width: 165, backgroundColor: "white" }}
          onPress={() => navigate(routes.details)}
        >
          <Card.Cover
            source={require("../assets/ProductsImages/product1.png")}
          />
          <View style={{ marginTop: 5, padding: 5 }}>
            <Text>Brass product</Text>
            <Text style={{ marginVertical: 5 }}>
              The spa Old Fashioned Hand Glazed Studio Pottery Ceramic Oil
              Bottle (1000 ML)
            </Text>

            <Text>Rs. 799</Text>
          </View>
        </Card>

        <Card
          style={{ width: 165, backgroundColor: "white" }}
          onPress={() => navigate(routes.details)}
        >
          <Card.Cover
            source={require("../assets/ProductsImages/product2.png")}
          />
          <View style={{ marginTop: 5, padding: 5 }}>
            <Text>Brass product</Text>
            <Text style={{ marginVertical: 5 }}>
              The spa Old Fashioned Hand Glazed Studio Pottery Ceramic Oil
              Bottle (1000 ML)
            </Text>
            <Text>Rs. 799</Text>
          </View>
        </Card>
      </View>
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
});
