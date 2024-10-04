import { View, Text, ScrollView } from "react-native";
import React from "react";
import Styles from "../../style";
import UserInformation from "./UserInformation";
import UserBag from "./UserBag";
import UserProduct from "./UserProduct";
import UserEvent from "./UserEvent";
import UserAuction from "./UserAuction";
import UserLogout from "./UserLogout";

export default function Drawer() {
  return (
    <ScrollView style={Styles.mainContainer}>
    
      <UserInformation />
      <UserBag />
      <UserProduct />
      <UserEvent/>
      <UserAuction/>
      <UserLogout/>
    </ScrollView>
  );
}
