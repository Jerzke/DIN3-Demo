import { createDrawerNavigator, DrawerContentScrollView, DrawerItem } from '@react-navigation/drawer';
import { NavigationContainer } from '@react-navigation/native';
import React from 'react';
import { Text, useWindowDimensions } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

import HomeScreen from './components/Home';
import CalendarScreen from './components/Calendar';
import HistoryScreen from './components/Charts';
import TestScreen from './components/History';



const Drawer = createDrawerNavigator();

function CustomDrawerContent(props) {
  const { navigation, state } = props;
  const activeScreen = state.routeNames[state.index];
  return (
    <DrawerContentScrollView {...props}>
      <CustomDrawerItem label="Home" to="Home" navigation={navigation} activeScreen={activeScreen} />
      <CustomDrawerItem label="Calendar" to="Calendar" navigation={navigation} activeScreen={activeScreen} />
      <CustomDrawerItem label="MultiChart" to="MultiChart" navigation={navigation} activeScreen={activeScreen} />
    </DrawerContentScrollView>
  );
}


function CustomDrawerItem({ label, to, navigation, activeScreen }) {
  const onPress = () => {
    navigation.navigate(to);
  };
  const isActive = activeScreen === to;
  return (
    <DrawerItem
      label={() => (
        <Text
          style={{
            color: isActive ? "#000000" : "#E71D35",
            fontSize: 20,
            padding: 10,
            fontWeight: isActive ? "bold" : "normal",
          }}
        >
          {label}
        </Text>
      )}
      onPress={onPress}
      style={{ backgroundColor: isActive ? "#E71D35" : "#000000" }}
    />
  );
}


export default function App() {
  const dimensions = useWindowDimensions();
  const isLargeScreen = dimensions.width >= 1200;
  
  return (
    <NavigationContainer>
      <Drawer.Navigator
        defaultStatus="closed"
        drawerContent={(props) => (
          <LinearGradient
            colors={['#000000', '#E71D35']}
            style={{ flex: 1 }}
            start={{ x: 1, y: 0.2 }}
            end={{ x: 1, y: 1 }}
          >
            <CustomDrawerContent {...props} />
          </LinearGradient>
        )}
        screenOptions={{
          drawerType: isLargeScreen ? null : 'back',
          drawerStyle: isLargeScreen ? { width: '25%' } : { width: '60%' },
          swipeEnabled: isLargeScreen ? false : true,
          headerStyle: { backgroundColor: '#E71D35' },
          headerTintColor: '#000000',
          drawerType: isLargeScreen ? 'front' : 'front',
          swipeEdgeWidth: isLargeScreen ? 0 : 50, 
        }}
        initialRouteName="Home"
      >
        <Drawer.Screen name="Home" component={HomeScreen} />
        <Drawer.Screen name="Calendar" component={CalendarScreen} />
        <Drawer.Screen name="History" component={TestScreen} />
        <Drawer.Screen name="Charts" component={HistoryScreen} />


      </Drawer.Navigator>
    </NavigationContainer>
  );
}
