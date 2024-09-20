import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import routes from './../utilities/Routes';
import Products from './../Screens/Products';
import Profile from './../Screens/Profile';
import { Text } from 'react-native';
import Animated, { useSharedValue, useAnimatedStyle, withSpring, withTiming } from 'react-native-reanimated';
import { View } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome'; // استيراد الأيقونات

const Tab = createBottomTabNavigator();

function AnimatedTab({ focused, label, iconName }) {
  const scaleAnimation = useSharedValue(focused ? 1 : 1.5); // تكبير الأيقونة عند التركيز
  const positionAnimation = useSharedValue(focused ? -20 : 0); // تحريك الأيقونة للأعلى عند التركيز

  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [
        { scale: withSpring(scaleAnimation.value) },
        { translateY: withTiming(positionAnimation.value, { duration: 30 }) }, // حركة طيران للأعلى
      ],
    };
  });

  return (
    <Animated.View style={[{ alignItems: 'center' }, animatedStyle]}>
      <View
        style={{
          backgroundColor: focused ? 'green' : 'gray',
          padding: 10,
          borderRadius: 25,
          width: 40,
          height: 40,
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        {/* استبدال الحرف بأيقونة */}
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
            label={route.name === routes.products ? 'Products' : 'Profile'}
            iconName={route.name === routes.products ? 'shopping-cart' : 'user'} // أيقونة مختلفة لكل تاب
          />
        ),
        tabBarShowLabel: false, // إخفاء الأسماء دائمًا في الشريط
      })}>
      <Tab.Screen name={routes.products} component={Products} />
      <Tab.Screen name={routes.profile} component={Profile} />
    </Tab.Navigator>
  );
}



//     <Tab.Navigator >
//       <Tab.Screen options={{header :()=>null}} name={routes.products} component={Products} />
//       <Tab.Screen options={{header :()=>null}} name={routes.profile} component={Profile} />
     
//       {/* <Tab.Screen name="Settings" component={SettingsScreen} /> */}


//     </Tab.Navigator>