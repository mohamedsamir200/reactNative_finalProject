import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import Ionicons from 'react-native-vector-icons/Ionicons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

function Side({ activeItem, onItemClick }) {
  return (
    <View style={styles.topNavigation}>
      <View style={styles.menuItems}>

        {/* Profile */}
        <TouchableOpacity
          style={[
            styles.menuItem,
            activeItem === "profile" ? styles.activeItem : null,
          ]}
          onPress={() => onItemClick("profile")}
        >
          <Ionicons name="home-outline" size={24} color="rgba(130, 59, 16, 1)" />
        </TouchableOpacity>

        {/* Products */}
        <TouchableOpacity
          style={[
            styles.menuItem,
            activeItem === "products" ? styles.activeItem : null,
          ]}
          onPress={() => onItemClick("products")}
        >
          <MaterialIcons name="production-quantity-limits" size={24} color="rgba(130, 59, 16, 1)" />
        </TouchableOpacity>

        {/* Events */}
        <TouchableOpacity
          style={[
            styles.menuItem,
            activeItem === "events" ? styles.activeItem : null,
          ]}
          onPress={() => onItemClick("events")}
        >
          <FontAwesome name="calendar" size={24} color="rgba(130, 59, 16, 1)" />
        </TouchableOpacity>

        {/* Settings */}
        <TouchableOpacity
          style={[
            styles.menuItem,
            activeItem === "settings" ? styles.activeItem : null,
          ]}
          onPress={() => onItemClick("settings")}
        >
          <Ionicons name="settings-outline" size={24} color="rgba(130, 59, 16, 1)" />
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  topNavigation: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    height: 60,
    backgroundColor: '#fff',
    paddingHorizontal: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  menuItems: {
    flexDirection: 'row',
  },
  menuItem: {
    alignItems: 'center',
    padding: 10,
    width:100,
  },
  activeItem: {
    backgroundColor: 'rgba(211, 211, 211, 0.5)',
    borderRadius: 10,
  },
});

export default Side;
