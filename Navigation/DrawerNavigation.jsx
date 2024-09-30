// import { createDrawerNavigator } from "@react-navigation/drawer";

// export default function DrawerNavigation() {
//   const Drawer = createDrawerNavigator();

//   return (
//     <Drawer.Navigator>
//       {/* <Drawer.Screen />
//       <Drawer.Screen  />
//       <Drawer.Screen />
//       <Drawer.Screen  /> */}
//     </Drawer.Navigator>
//   );
// }
////////////////////////////////////////////////

import React from "react";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { NavigationContainer } from "@react-navigation/native";
import { View, Text, Image } from "react-native";
import { IconButton } from "react-native-paper";
import routes from "../utilities/Routes";
import MyCart from "../Screens/MyCart";
import Profile from "../Screens/ProductsScreen/profile/Profile";

// Drawer content
function CustomDrawerContent({ navigation }) {
  return (
    <View style={{ flex: 1, padding: 20 }}>
      <Text onPress={() => navigation.navigate(routes.ProposalsScreen)}>
        View Profile
      </Text>
      <Text onPress={() => navigation.navigate(routes.cart)}>Go to Cart</Text>
      <Text
        onPress={() => {
          /* Handle logout logic */
        }}
      >
        Logout
      </Text>
    </View>
  );
}

// Create Drawer
const Drawer = createDrawerNavigator();

export default function RightDrawerNavigator() {
  return (
    <Drawer.Navigator
      drawerPosition="right" // This makes the drawer open from the right
      drawerContent={(props) => <CustomDrawerContent {...props} />}
    >
      <Drawer.Screen name="Profile" component={Profile} />
      <Drawer.Screen name={routes.cart} component={MyCart} />
    </Drawer.Navigator>
  );
}
