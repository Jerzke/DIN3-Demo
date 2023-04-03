import React, { Component } from 'react';
import { View, Text } from 'react-native';

interface Props {}
interface State {}

export default class TestContainer extends Component<Props, State> {
  render() {
    return (
      <View style={{ flex: 1, alignItems: 'center', backgroundColor: 'black', padding: 50, }}>
        <Text style={
          { color: 'white', fontSize: 15, fontWeight: 'bold', backgroundColor: '#383838', 
          borderWidth: 1, borderRadius: 8, padding: 10, width: 300, height: 450, }
          }>Eventually exercise test will be here</Text>
      </View>
    );
  }
}