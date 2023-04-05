import React, { Component } from 'react';
import { View, Text } from 'react-native';


export default function TestContainer ({route}) {
  const {title} = route.params;

    return (
      <View style={{ flex: 1, alignItems: 'center', backgroundColor: 'black', padding: 50, }}>
        <Text style={
          { color: 'white', fontSize: 15, fontWeight: 'bold', backgroundColor: '#383838', 
          borderWidth: 1, borderRadius: 8, padding: 10, width: 300, height: 450, }
          }>Eventually exercise {title} </Text>
      </View>
    );
  }
