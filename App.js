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
      <Drawer.Navigator initialRouteName='Home'>
        <Drawer.Screen name='Home' component={HomeScreen} />
        <Drawer.Screen name='Settings' component={SettingScreen} />
      </Drawer.Navigator>
    </NavigationContainer>

  );
}