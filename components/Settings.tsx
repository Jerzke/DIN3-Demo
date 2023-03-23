import React from 'react';
import { View, Text } from 'react-native';

const SettingScreen: React.FC = () => {
  return (
    <View style = {{flex: 1, alignItems: 'center', justifyContent: 'center', backgroundColor: 'black'}}>
        <Text style={{color: 'white', fontSize:30, fontWeight: 'bold'}}>Hello settings screen</Text>
    </View>
  );
};

export default SettingScreen;