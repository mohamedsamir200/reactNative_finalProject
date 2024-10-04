import { View, Text , TouchableOpacity} from 'react-native'
import React from 'react'
import { useNavigation } from '@react-navigation/native';
import routes from './../../utilities/Routes';
import Styles from './../../style';
import Icon from "react-native-vector-icons/MaterialIcons";
export default function UserEvent() {
    const { navigate } = useNavigation();
  return (
    <TouchableOpacity onPress={()=>navigate(routes.Events)}>
      <View
        style={[
          Styles.drawerViewStyle,
          { flexDirection: "row", alignItems: "center" },
        ]}
      >
       
        <Icon name={"event"} size={20} color="teal" />
        <Text style={{ marginLeft: 15 }}>Events</Text>
      </View>
    </TouchableOpacity>
  );
}