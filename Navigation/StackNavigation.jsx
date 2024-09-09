import { createNativeStackNavigator } from "@react-navigation/native-stack";

import TopNavigation from "./TopNavigation";
import DrawerNavigation from "./DrawerNavigation";
import routes from "./../utilities/Routes";
import MainScreen from "../Screens/MainScreen";
import OpeningScreen from "../Screens/OpeningScreen";
import BottomNavigation from "./BottomNavigation";
import { Text } from "react-native";
import Products from './../Screens/Products';
import { Icon, IconButton } from "react-native-paper";
import { useNavigation } from "@react-navigation/native";
import MyCart from "../Screens/MyCart";

export default function StackNavigation() {
 const {navigate} = useNavigation();
  const Stack = createNativeStackNavigator();

  return (
    <Stack.Navigator initialRouteName={routes.openingScreen}>
      <Stack.Screen
        options={{ header: () => null }}
        name={routes.openingScreen}
        component={OpeningScreen}
      />
      <Stack.Screen
        options={{
          headerBackVisible: false,
          headerTitle : "" ,
        headerRight : ()=> {
          return <Text style = {{fontSize:25 , fontWeight : 500}}>HandiCraft</Text>
        }, 
        headerLeft : ()=> {
          return <IconButton icon={"cart"} size={30} onPress={()=>navigate(routes.cart)}/>
        }
        }}
        name={routes.mainScreen}
        component={BottomNavigation}
      />
      <Stack.Screen name= {routes.cart} component={MyCart}/> 
      {/* <Stack.Screen  /> */}
      {/* <Stack.Screen /> */}
    </Stack.Navigator>
  );
}
