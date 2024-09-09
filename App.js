import { StyleSheet, Text, View } from "react-native";
import { NavigationContainer } from '@react-navigation/native';

import StackNavigation from "./Navigation/StackNavigation";
import DrawerNavigation from "./Navigation/DrawerNavigation";
import TopNavigation from './Navigation/TopNavigation';
import MainScreen from "./Screens/MainScreen";
import BottomNavigation from "./Navigation/BottomNavigation";



export default function App() {

  return (

    <>
   
      <NavigationContainer>
  
        <StackNavigation ></StackNavigation>
        {/* <BottomNavigation></BottomNavigation> */}
        {/* <DrawerNavigation></DrawerNavigation> */}
        {/* <TopNavigation></TopNavigation> */}
      </NavigationContainer>
    </>

  );
}

const styles = StyleSheet.create({

  container: {
    flex: 1,
    marginVertical: 15,
    backgroundColor: '#fff',
    // alignItems: 'center',
    // justifyContent: 'center',

  },
  textStyle: {
    color: "text-white",
    backgroundColor: "bg-red-500"
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
    width: 100
  }

});
