import React from 'react';
import routes from "./../utilities/Routes";
import Profile from "../Screens/ProductsScreen/profile/Profile";
import Home from "./../Screens/Home";
import Products from './../Components/Products/Products'; 
import Icon from 'react-native-vector-icons/MaterialIcons'; 
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Animated, { useSharedValue, useAnimatedStyle, withSpring, withTiming } from 'react-native-reanimated';
import { View } from 'react-native';
import Events from '../Components/Events/Events';

const Tab = createBottomTabNavigator();

function AnimatedTab({ focused, iconName }) {
  const scaleAnimation = useSharedValue(focused ? 1.3 : 1); 
  const positionAnimation = useSharedValue(focused ? -5 : 0);

  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [
        { scale: withSpring(scaleAnimation.value) },
        { translateY: withTiming(positionAnimation.value, { duration: 400 }) }, 
      ],
    };
  });

  return (
    <Animated.View style={[{ alignItems: 'center'  }, animatedStyle]}>
      <View
        style={{
          backgroundColor: focused ? '#704F38' : '#1F2029',
          padding: 1,
          borderRadius: 25,
          width: 30,
          height: 30,
          justifyContent: 'center',
          alignItems: 'center',
          margin:'auto'
        }}>
        <Icon name={iconName} size={24} color="white" />
      </View>
    </Animated.View>
  );
}

export default function BottomNavigation() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused }) => (
          <AnimatedTab
            focused={focused}
            iconName={
              route.name === routes.home
              ? 'home'
              : route.name === routes.profile
              ? 'person'
              : route.name === routes.Products
              ? 'shopping-cart'
              : 'event' 
            }
          />
        ),
        tabBarShowLabel: false,
        tabBarStyle: {
          backgroundColor: '#1F2029',
          // position: 'absolute',
          bottom:0,
          height: 60,
          marginBottom: 3,
          marginHorizontal:"9%",
          borderRadius: 50,
          justifyContent:"center",
          alignContent:"center",
          width: 300, 
          // marginVertical:100
        },
    
        
        
      })}
    >
      <Tab.Screen name={routes.home} component={Home} options={{header : ()=> null}}/> 
      <Tab.Screen name={routes.Products} component={Products} /> 
      <Tab.Screen name={routes.Events} component={Events}  options={{header : ()=> null}}/> 


      <Tab.Screen name={routes.profile} component={Profile} /> 
    </Tab.Navigator>
  );
}

// export default function BottomNavigation() {
//   return (
//     <Tab.Navigator
//       screenOptions={{
//         tabBarStyle: { height: 50, paddingBottom : 5},
//         tabBarActiveTintColor: "#e91e63",
//       }}
//     >
//       <Tab.Screen
      
//         options={{
//           header: () => null,
//           tabBarLabel: "Home",
//           tabBarIcon: ({ color, size , focused }) => <Icon source={"home"} size={20} color= {focused ? "#e91e63" : ""}/>,
//         }}
//         name={routes.home}
//         component={Home}
//       />
//       <Tab.Screen
//         options={{ header: () => null }}
//         name={routes.profile}
//         component={Profile}
//       />
//      </Tab.Navigator> 


//   );
// }





