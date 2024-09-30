import React from "react";
import { SafeAreaView, StyleSheet } from "react-native";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import AllAuctions from "./AllAuctions"; // Component for all auctions
import JoinedAuctions from "./JoinedAuctions"; // Component for joined auctions
import Icon from "react-native-vector-icons/Ionicons"; // For tab icons

const Tab = createMaterialTopTabNavigator();

export default function AuctionScreen() {
  return (
    <SafeAreaView style={styles.container}>
      <Tab.Navigator
        screenOptions={({ route }) => ({
          tabBarLabelStyle: { fontSize: 12, fontWeight: "bold" }, // Tab label size
          tabBarActiveTintColor: "white", // Active tab color
          tabBarInactiveTintColor: "gray", // Inactive tab color
          tabBarIndicatorStyle: { backgroundColor: "#344646" }, // Indicator color
          tabBarStyle: { backgroundColor: "#344646" },
          // Tab bar background color
          tabBarShowIcon: true, // Show icons on tabs
        })}
      >
        <Tab.Screen name="All Auctions" component={AllAuctions} />
        <Tab.Screen name="Joined Auctions" component={JoinedAuctions} />
      </Tab.Navigator>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
});
