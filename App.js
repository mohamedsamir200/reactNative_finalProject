import { StyleSheet, Text, View } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import StackNavigation from "./Navigation/StackNavigation";
import DrawerNavigation from "./Navigation/DrawerNavigation";
import TopNavigation from "./Navigation/TopNavigation";
import MainScreen from "./Screens/MainScreen";
import BottomNavigation from "./Navigation/BottomNavigation";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import Store from "./Redux/Store";
import { Provider } from "react-redux";
import Toast from "react-native-toast-message";

export default function App() {
  return (
    <>
      <Provider store={Store}>
        <GestureHandlerRootView style={{ flex: 1 }}>
          <NavigationContainer>
            <StackNavigation></StackNavigation>
            {/* <BottomNavigation></BottomNavigation> */}
            {/* <DrawerNavigation></DrawerNavigation> */}
            {/* <TopNavigation></TopNavigation> */}
          </NavigationContainer>
          <Toast ref={(ref) => Toast.setRef(ref)} />
        </GestureHandlerRootView>
      </Provider>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginVertical: 15,
    backgroundColor: "#fff",
    // alignItems: 'center',
    // justifyContent: 'center',
  },
  textStyle: {
    color: "text-white",
    backgroundColor: "bg-red-500",
  },
  image: {
    width: 50,
    height: 50,
    marginRight: 10,
    borderRadius: 5,
  },
  iconsStyle: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: 100,
  },
});


// import React from 'react';
// import { View, Button } from 'react-native';
// import email from 'react-native-email';

// const App = () => {
//   const handleEmail = () => {
//     const to = ['hanaamohammed840@gmail.com']; // ضع البريد الإلكتروني الذي ترغب بإرسال الرسالة إليه هنا
//     email(to, {
//       // اختياري: إعدادات إضافية
//       subject: 'Test Email',
//       body: 'This is a test email from React Native app.',
//     }).catch(console.error);
//   };

//   return (
//     <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
//       <Button title="Send Email" onPress={handleEmail} />
//     </View>
//   );
// };

// export default App;
