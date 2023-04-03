import React, { useState } from 'react';
import { View, Text } from 'react-native';
//import Calendar from 'react-calendar';
//import './CalendarCSS.css';
//import './node_modules/react-calendar/dist/Calendar.css';
import NoteTaker from './notes';
import {Calendar, CalendarList, Agenda} from 'react-native-calendars';

const CalendarScreen: React.FC = () => {

  //const [date, setDate] = useState(new Date());
  
  //const onChange = date => {
    //setDate(date);
  //}
  //<Calendar  onChange={onChange} value={date}/*This will always set the current day by default*//>
  return (
    <View style = {{flex: 1, alignItems: 'center', justifyContent: 'center', backgroundColor: 'black'}}>
        <Text style={{color: 'white', fontSize:30, fontWeight: 'bold'}}>Pick a date to see trainning data:</Text>
        <Calendar 
        onDayPress={day => {
          console.log('selected day', day);
        }}
        />
        <NoteTaker />
    </View>
  );
};

export default CalendarScreen;