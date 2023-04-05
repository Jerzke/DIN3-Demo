import React, { useState, useEffect } from 'react';
import { View, Text } from 'react-native';
import {Calendar, CalendarList, Agenda} from 'react-native-calendars';
import NoteTaker from './notes';





const CalendarScreen: React.FC = () => {

  const [selectedDate, setSelectedDate] = useState('');

  const onDayPress = (day) => {
    setSelectedDate(day.dateString);
    console.log(day)
  };


  return (
    <View style = {{flex: 1, alignItems: 'center', justifyContent: 'center', backgroundColor: 'black'}}>
        <Text style={{color: 'white', fontSize:15, fontWeight: 'bold', marginTop:60, marginBottom: 20}}>Pick a date to see trainning data:</Text>
        <Calendar 

        onDayPress={onDayPress}

        style={{
          marginBottom: 20,
          borderWidth: 1,
          borderColor: 'gray',
          height: 360,
          width: 350,
          backgroundColor: 'linear-gradient(to bottom, #57B2FF, #0086F8)',
          
        }}
        theme={{
        backgroundColor: '#ffffff',
        calendarBackground: 'linear-gradient(to bottom, rgb(56,56,56), rgb(100,100,100))',
        textSectionTitleColor: '#ffffff',
        textSectionTitleDisabledColor: '#d9e1e8',
        selectedDayBackgroundColor: '#00adf5',
        selectedDayTextColor: '#ffffff',
        todayTextColor: 'rgb(231, 29, 53)',
        dayTextColor: '#d9e1e8',
        textDisabledColor: '#494e52',
        dotColor: '#00adf5',
        selectedDotColor: '#ffffff',
        arrowColor: 'orange',
        disabledArrowColor: '#d9e1e8',
        monthTextColor: '#ffffff',
        indicatorColor: 'blue',
        textDayFontFamily: 'monospace',
        textMonthFontFamily: 'monospace',
        textDayHeaderFontFamily: 'monospace',
        textDayFontWeight: '300',
        textMonthFontWeight: 'bold',
        textDayHeaderFontWeight: '300',
        textDayFontSize: 16,
        textMonthFontSize: 16,
        textDayHeaderFontSize: 16,
      }}
      
      />

  

      <NoteTaker selectedDate={selectedDate}/>

      
           
    </View>
  );
};

export default CalendarScreen;



  //const [date, setDate] = useState(new Date());
  
  //const onChange = date => {
    //setDate(date);
  //}
  //<Calendar  onChange={onChange} value={date}/*This will always set the current day by default*//>
  //import Calendar from 'react-calendar';
//import './CalendarCSS.css';
//import './node_modules/react-calendar/dist/Calendar.css'