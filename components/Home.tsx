import { View, Text } from 'react-native'
import React from 'react'
import { StatusBar } from 'expo-status-bar'

const HomeScreen : React.FC = () => {
  return (
    <View style = {{flex: 1, alignItems: 'center', justifyContent: 'center', backgroundColor: 'black'}}>
        <Text style={{color: 'white', fontSize:30, fontWeight: 'bold'}}>Hello home screen</Text>
        <StatusBar style="auto" />
    </View>
  )
}

export default HomeScreen
  