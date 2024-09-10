import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import routes from "./../utilities/Routes";
import Profile from "./../Screens/Profile";
import Home from "./../Screens/Home";
import { Icon } from "react-native-paper";
import { Text } from "react-native";

const Tab = createBottomTabNavigator();

export default function BottomNavigation() {
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarStyle: { height: 50, paddingBottom : 5},
        tabBarActiveTintColor: "#e91e63",
      }}
    >
      <Tab.Screen
      
        options={{
          header: () => null,
          tabBarLabel: "Home",
          tabBarIcon: ({ color, size , focused }) => <Icon source={"home"} size={20} color= {focused ? "#e91e63" : ""}/>,
        }}
        name={routes.home}
        component={Home}
      />
      <Tab.Screen
        options={{ header: () => null }}
        name={routes.profile}
        component={Profile}
      />

      {/* <Tab.Screen name="Settings" component={SettingsScreen} /> */}
    </Tab.Navigator>
  );
}
