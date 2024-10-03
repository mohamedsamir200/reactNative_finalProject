import { View, Text , TouchableOpacity } from 'react-native'
import React from 'react'
import { useNavigation } from '@react-navigation/native';
import { Icon } from 'react-native-paper';
import routes from './../../utilities/Routes';
import Styles from './../../style';

export default function UserProduct() {
    const { navigate } = useNavigation();
  return (
    <TouchableOpacity onPress={()=>navigate(routes.allProducts)}>
      <View
        style={[
          Styles.drawerViewStyle,
          { flexDirection: "row", alignItems: "center" },
        ]}
      >
        <Icon source={"storefront"} size={20} color="teal" />
        <Text style={{ marginLeft: 15 }}>Categories & Products</Text>
      </View>
    </TouchableOpacity>
  );
}