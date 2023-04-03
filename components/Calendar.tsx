import React, { useState } from 'react';
import { View, Text } from 'react-native';
import Calendar from 'react-calendar';
//import './CalendarCSS.css';
//import 'react-calendar/dist/Calendar.css';

const CalendarScreen: React.FC = () => {

  const [date, setDate] = useState(new Date());

  const onChange = date => {
    setDate(date);
  }

  return (
    <View style = {{flex: 1, alignItems: 'center', justifyContent: 'center', backgroundColor: 'black'}}>
        <Text style={{color: 'white', fontSize:30, fontWeight: 'bold'}}>Pick a date to see trainning data:</Text>
        <Calendar  onChange={onChange} value={date}/*This will always set the current day by default*//>
    </View>
  );
};

export default CalendarScreen;