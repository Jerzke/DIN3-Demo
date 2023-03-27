import { createDrawerNavigator, DrawerContentScrollView, DrawerItem } from '@react-navigation/drawer';
import { NavigationContainer } from '@react-navigation/native';
import React from 'react';
import { Text } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

import HomeScreen from './components/Home';
import SettingScreen from './components/Settings';
import CalendarScreen from './components/Calendar';
import HistoryScreen from './components/History';

const Drawer = createDrawerNavigator();

function CustomDrawerContent(props) {
  const { navigation } = props;
  return (
    <DrawerContentScrollView {...props}>
      <CustomDrawerItem label="Home" to="Home" navigation={navigation} />
      <CustomDrawerItem label="Setting" to="Setting" navigation={navigation} />
      <CustomDrawerItem label="Calendar" to="Calendar" navigation={navigation} />
      <CustomDrawerItem label="History" to="History" navigation={navigation} />
    </DrawerContentScrollView>
  );
}

function CustomDrawerItem({ label, to, navigation }) {
  const onPress = () => {
    navigation.navigate(to);
  };
  return (
    <DrawerItem
      label={() => <Text style={{ color: '#E71D35' }}>{label}</Text>}
      onPress={onPress}
    />
  );
}

export default function App() {
  return (
    <NavigationContainer>
      <Drawer.Navigator
        drawerContent={(props) => (
          <LinearGradient
            colors={['#000000', '#E71D35']}
            style={{ flex: 1 }}
            start={{ x: 1, y: 0.2 }}
            end={{x:1, y:1}}
          >
            <CustomDrawerContent {...props} />
          </LinearGradient>
        )}
        screenOptions={{
          headerStyle: {
            backgroundColor: '#E71D35',
          },
        }}
        initialRouteName="Home"
      >
        <Drawer.Screen name="Home" component={HomeScreen} />
        <Drawer.Screen name="Setting" component={SettingScreen} />
        <Drawer.Screen name="Calendar" component={CalendarScreen} />
        <Drawer.Screen name="History" component={HistoryScreen} />
      </Drawer.Navigator>
    </NavigationContainer>
  );
}