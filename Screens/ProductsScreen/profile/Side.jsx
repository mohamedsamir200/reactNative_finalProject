import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import Ionicons from 'react-native-vector-icons/Ionicons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
function Side({ activeItem, onItemClick }) {
  return (
    <View style={styles.sidebar}>
      <View style={styles.menuItems}>
        
        {/* Profile */}
        <TouchableOpacity
          style={[
            styles.menuItem,
            activeItem === "profile" ? styles.activeItem : null,
          ]}
          onPress={() => onItemClick("profile")}
        >
          <Ionicons name="home-outline" size={20} color="rgba(130, 59, 16, 1)" />
        </TouchableOpacity>

        {/* Products */}
        <TouchableOpacity
          style={[
            styles.menuItem,
            activeItem === "products" ? styles.activeItem : null,
          ]}
          onPress={() => onItemClick("products")}
        >
          <MaterialIcons name="production-quantity-limits" size={20} color="rgba(130, 59, 16, 1)" />
        </TouchableOpacity>

        {/* Events */}
        <TouchableOpacity
          style={[
            styles.menuItem,
            activeItem === "Events" ? styles.activeItem : null,
          ]}
          onPress={() => onItemClick("Events")}
        >
          <FontAwesome name="calendar" size={20} color="rgba(130, 59, 16, 1)" />
        </TouchableOpacity>

        {/* Settings */}
        <TouchableOpacity
          style={[
            styles.menuItem,
            activeItem === "settings" ? styles.activeItem : null,
          ]}
          onPress={() => onItemClick("settings")}
        >
          <Ionicons name="settings-outline" size={20} color="rgba(130, 59, 16, 1)" />
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  sidebar: {
    width: 40,
    height: '90%',
    backgroundColor: '#fff',
    paddingTop: 50,
  },
  menuItems: {
    marginTop: 20,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    backgroundColor: 'transparent',
  },
  activeItem: {
    backgroundColor: 'rgba(211, 211, 211, 0.5)',
  },
});

export default Side;
