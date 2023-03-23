import { createDrawerNavigator } from '@react-navigation/drawer';
import { NavigationContainer } from '@react-navigation/native';

import HomeScreen from './components/Home';
import SettingScreen from './components/Settings';
import CalendarScreen from './components/Calendar';
import HistoryScreen from './components/History';

const Drawer = createDrawerNavigator();
 

export default function App() {
  return (
    <NavigationContainer>
      <Drawer.Navigator 
      screenOptions={{
        drawerStyle: {
          backgroundColor: '#C8A2C9',
        },
        headerStyle: {
          backgroundColor: '#C8A2C9',
        },
      }}
      initialRouteName='Home'>
        <Drawer.Screen name='Home' component={HomeScreen}/>
        <Drawer.Screen name='Setting' component={SettingScreen}/>
        <Drawer.Screen name='Calendar' component={CalendarScreen}/>
        <Drawer.Screen name='History' component={HistoryScreen}/>
      </Drawer.Navigator>
    </NavigationContainer>

  );
}