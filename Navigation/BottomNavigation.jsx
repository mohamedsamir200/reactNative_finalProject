import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import routes from './../utilities/Routes';
import Products from './../Screens/Products';
import Profile from './../Screens/Profile';

const Tab = createBottomTabNavigator();


export default function BottomNavigation() {
  return (
    <Tab.Navigator >
      <Tab.Screen options={{header :()=>null}} name={routes.products} component={Products} />
      <Tab.Screen options={{header :()=>null}} name={routes.profile} component={Profile} />
     
      {/* <Tab.Screen name="Settings" component={SettingsScreen} /> */}
    </Tab.Navigator>
  )
}