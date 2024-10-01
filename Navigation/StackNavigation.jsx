import { createNativeStackNavigator } from "@react-navigation/native-stack";

import TopNavigation from "./TopNavigation";
import DrawerNavigation from "./DrawerNavigation";
import routes from "./../utilities/Routes";
import MainScreen from "../Screens/MainScreen";
import OpeningScreen from "../Screens/OpeningScreen";
import BottomNavigation from "./BottomNavigation";
import { Text } from "react-native";

import { Icon, IconButton } from "react-native-paper";
import { useNavigation } from "@react-navigation/native";
import MyCart from "../Screens/MyCart";
import AllProducts from "../Components/AllProducts";
import Details from "../Components/Details";
import EventOffline from "../Components/Events/EventOffline";
import EventOnline from "../Components/Events/EventOnline";
import LoginScreen from "../Screens/Auth/LoginScreen";
import IntroScreen from "../Screens/Auth/IntroScreen";
import RegistrationScreen from "../Screens/Auth/RegistrationScreen";
import Home from "../Screens/Home";
import Profile from "../Screens/ProductsScreen/profile/Profile";
import Addproduct from "../Screens/ProductsScreen/profile/Addproduct";
import AuctionScreen from "../Screens/Auctions/AuctionScreen";
import ProposalsScreen from "../Screens/Auctions/components/ProposalsScreen";
import ProductsScreen from './../Screens/ProductsScreen/ProductsScreen';
import ProductBag from "../Screens/ProductBag";
import Addausproduct from "../Screens/ProductsScreen/profile/Addausproduct";
import EditProduct from "../Screens/ProductsScreen/profile/Editproduct";
import Addevent from "../Screens/ProductsScreen/profile/Addevent";
import EditEvent from "../Screens/ProductsScreen/profile/Editeevent";
import AddDetailsprofile from "../Screens/ProductsScreen/profile/AddDeitalsprofile";
export default function StackNavigation() {
  const { navigate } = useNavigation();
  const Stack = createNativeStackNavigator();
  // console.log(LoginScreen); // Should not be 'undefined'

  return (
    <Stack.Navigator initialRouteName={routes.IntroScreen}>
      <Stack.Screen
        name={routes.LoginScreen}
        component={LoginScreen}
        options={{ header: () => null }}
      />

      <Stack.Screen
        name={routes.RegistrationScreen}
        component={RegistrationScreen}
        options={{ header: () => null }}
      />
      <Stack.Screen
        name={routes.IntroScreen}
        component={IntroScreen}
        options={{ header: () => null }}
      />
      <Stack.Screen
        options={{ header: () => null }}
        name={routes.openingScreen}
        component={OpeningScreen}
      />
      <Stack.Screen
        options={{ header: () => null }}
        name={routes.AuctionScreen}
        component={AuctionScreen}
      />
      <Stack.Screen name={routes.ProposalsScreen} component={ProposalsScreen} />
      <Stack.Screen
        options={{ headerTitle: "Products", headerTitleAlign: "center" }}
        name={routes.ProductsScreen}
        component={ProductsScreen}
      />
      <Stack.Screen
        options={{
          headerBackVisible: false,
          headerTitle: "",
          headerRight: () => {
            return (
              <Text style={{ fontSize: 25, fontWeight: 500 }}>
                Artistain Corner
              </Text>
            );
          },
          headerLeft: () => {
            return (
              <IconButton
                icon={"cart"}
                size={30}
                onPress={() => navigate(routes.productBag)}
              />
            );
          },
        }}
        name={routes.mainScreen}
        component={BottomNavigation}
      />
      <Stack.Screen name={routes.cart} component={MyCart} />
      <Stack.Screen name={routes.allProducts} component={AllProducts} />
      <Stack.Screen name={routes.details} component={Details} />
      <Stack.Screen name={routes.productBag} component={ProductBag} />
      <Stack.Screen name={routes.EventOnline} component={EventOnline} />
      <Stack.Screen name={routes.EventOffline} component={EventOffline} />
      <Stack.Screen name="Profile" component={Profile} />
      <Stack.Screen name="Addproduct" component={Addproduct} />
      <Stack.Screen name="Addausproduct" component={Addausproduct} />
      <Stack.Screen name="EditProduct" component={ EditProduct} />
      <Stack.Screen name="Addevent" component={Addevent} />
      <Stack.Screen name="EditEvent" component={EditEvent} />
      <Stack.Screen name="AddDetailsprofile" component={AddDetailsprofile} />
      {/* <Stack.Screen /> */}
      {/* <Stack.Screen /> */}
      {/* <Stack.Screen /> */}
    </Stack.Navigator>
  );
}
