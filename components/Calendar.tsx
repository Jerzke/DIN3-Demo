import React, { useState } from 'react';
import { View, Text } from 'react-native';
import Calendar from 'react-calendar';

const CalendarScreen: React.FC = () => {

  
  
  return (
    <View style = {{flex: 1, alignItems: 'center', justifyContent: 'center', backgroundColor: 'black'}}>
        <Text style={{color: 'white', fontSize:30, fontWeight: 'bold'}}>Pick a date to see trainning data:</Text>
        
    </View>
  );
};

export default CalendarScreen;