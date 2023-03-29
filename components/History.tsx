import React, { Component } from 'react';
import { View, Text } from 'react-native';

interface Props {}
interface State {}

export default class HistoryContainer extends Component<Props, State> {
  render() {
    return (
      <View style={{ flex: 1, alignItems: 'center', backgroundColor: 'black', padding: 50, }}>
        <Text style={{ color: 'white', fontSize: 25, fontWeight: 'bold', }}>Eventually exercise history will be here</Text>
      </View>
    );
  }
}
