import { View, Text } from 'react-native'
import React from 'react'
import { useNavigation } from '@react-navigation/native';
import { TouchableOpacity } from 'react-native';
import Styles from './../../style';
// import { Icon } from 'react-native-paper';
import routes from './../../utilities/Routes';
import Icon from "react-native-vector-icons/MaterialIcons";
import AsyncStorage from '@react-native-async-storage/async-storage';
export default function UserLogout() {
    const { navigate } = useNavigation();
    function handleLogout () {
      navigate(routes.LoginScreen);
       AsyncStorage.clear();
    }
  return (
    <TouchableOpacity onPress={()=>handleLogout()}>
      <View
        style={[
          Styles.drawerViewStyle,
          { flexDirection: "row", alignItems: "center" },
        ]}
      >
       
        <Icon name={"logout"} size={20} color="teal" style={{ transform: [{ scaleX: -1 }] }} />
        <Text style={{ marginLeft: 15 }}>Logout</Text>
      </View>
    </TouchableOpacity>
  );
}