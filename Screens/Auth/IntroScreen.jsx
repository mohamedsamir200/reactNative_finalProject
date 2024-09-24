import React, { useEffect } from "react";
import { View, ActivityIndicator, StyleSheet } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage"; // Import AsyncStorage
import { useNavigation } from "@react-navigation/native"; // Navigation
import LoginScreen from "./LoginScreen";
export default function IntroScreen() {
  const navigation = useNavigation();

  console.log(LoginScreen); // Check if it's correctly imported

  // Check if user ID exists in AsyncStorage
  // AsyncStorage.clear();
  const checkUserLoginStatus = async () => {
    try {
      const userUID = await AsyncStorage.getItem("id");
      if (userUID !== null) {
        // UID exists, navigate to OpeningScreen
        navigation.replace("OpeningScreen");
        console.log("from Intro");
      } else {
        // UID does not exist, navigate to LoginScreen
        navigation.replace("LoginScreen");
        console.log("login from Intro");
      }
    } catch (error) {
      console.log("Error retrieving user UID:", error);
      navigation.replace("LoginScreen");
    }
  };

  useEffect(() => {
    checkUserLoginStatus();
  }, []);

  return (
    <View style={styles.container}>
      <ActivityIndicator size="large" color="#8b4513" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
