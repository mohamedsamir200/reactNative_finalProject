import { View, Text } from 'react-native'
import React from 'react'
import { useNavigation } from '@react-navigation/native';
import { TouchableOpacity } from 'react-native';
import routes from './../../utilities/Routes';
import Styles from './../../style';
import { Icon } from 'react-native-paper';

export default function UserAuction() {
    const { navigate } = useNavigation();
  return (
    <TouchableOpacity onPress={()=>navigate(routes.AuctionScreen)}>
      <View
        style={[
          Styles.drawerViewStyle,
          { flexDirection: "row", alignItems: "center" },
        ]}
      >
       
        <Icon source={"gavel"} size={20} color="teal" />
        <Text style={{ marginLeft: 15 }}>Auction</Text>
      </View>
    </TouchableOpacity>
  );
}