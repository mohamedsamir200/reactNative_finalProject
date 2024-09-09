
import React from "react";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";


export default function TopNavigation() {
  const Tab = createMaterialTopTabNavigator();

  return (
    <Tab.Navigator style={{marginVertical:30 }}>
      <Tab.Screen />
      <Tab.Screen />
  
    </Tab.Navigator>
  );
}
