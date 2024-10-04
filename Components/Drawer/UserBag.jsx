import { View, Text } from "react-native";
import React from "react";
import Styles from "../../style";
import { Icon } from "react-native-paper";
import { TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";
import routes from './../../utilities/Routes';
export default function UserBag() {
    const { navigate } = useNavigation();
  return (
    <TouchableOpacity onPress={()=>navigate(routes.productBag)}>
      <View
        style={[
          Styles.drawerViewStyle,
          { flexDirection: "row", alignItems: "center" },
        ]}
      >
        <Icon source={"cart"} size={20} color="teal" />
        <Text style={{ marginLeft: 15 }}>My Bag</Text>
      </View>
    </TouchableOpacity>
  );
}
