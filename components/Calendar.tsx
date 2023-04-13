import React, { useState, useEffect } from 'react';
import { View, Text } from 'react-native';
import {Calendar, CalendarList, Agenda} from 'react-native-calendars';
import NoteTaker from './notes';
import { ScrollView } from 'react-native-gesture-handler';


const CalendarScreen: React.FC = () => {

  const [selectedDate, setSelectedDate] = useState('');

  const onDayPress = (day) => {
    setSelectedDate(day.dateString);
    console.log(day);
  };


  return (
    <ScrollView>
    <View style = {{flex: 1, alignItems: 'center', justifyContent: 'center', backgroundColor: 'black'}}>
        <Text style={{color: 'white', fontSize:15, fontWeight: 'bold', marginTop:60, marginBottom: 20}}>Pick a date to see training data:</Text>

        <Calendar 
        markedDates={{
          [selectedDate]: {selected: true, marked: false, selectedColor: 'rgb(231, 29, 53)'},
        }}
        onDayPress={onDayPress}
        style={{
          marginBottom: 20,
          borderWidth: 1,
          borderColor: 'rgb(231, 29, 53)',
          height: 370,
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
        arrowColor: 'rgb(231, 29, 53)', 
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
      <Text style={{color: 'white', fontSize:15, fontWeight: 'bold', marginTop:40, marginBottom: 40}}>Selected date is: {selectedDate}</Text>
      <NoteTaker selectedDate={selectedDate}/>
    </View>
    </ScrollView>
  );
};

export default CalendarScreen;

