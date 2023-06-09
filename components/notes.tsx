import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, useWindowDimensions } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { format } from 'date-fns';

interface Note {
  date: string;
  text: string;
}

const NoteTaker: React.FC<{ selectedDate: string }> = ({ selectedDate }) => {
  const [note, setNote] = useState<string>('');
  const [existingNote, setExistingNote] = useState<Note[]>([]);
  const dimensions = useWindowDimensions();
  const isLargeScreen = dimensions.width >= 1200;

  useEffect(() => {
    const fetchNote = async () => {
      try {
        const value = await AsyncStorage.getItem(selectedDate);
        if (value !== null) {
          setExistingNote(JSON.parse(value));
        }
      } catch (error) {
        console.error(error);
      }
    };
    fetchNote();
  }, [selectedDate]);

  const storeNote = async () => {
    try {
      if (existingNote.length > 0) {
        const newNotes = [...existingNote, { date: format(new Date(selectedDate), 'yyyy-MM-dd'), text: note }];
        await AsyncStorage.setItem(selectedDate, JSON.stringify(newNotes));
        setExistingNote(newNotes);
      } else {
        const newNote = [{ date: format(new Date(selectedDate), 'yyyy-MM-dd'), text: note }];
        await AsyncStorage.setItem(selectedDate, JSON.stringify(newNote));
        setExistingNote(newNote);
      }
      setNote('');
    } catch (error) {
      console.error(error);
    }
  };
  const deleteNote = async (index: number) => {
    try {
      const value = await AsyncStorage.getItem(selectedDate);
      if (value !== null) {
        const existingNotes: Note[] = JSON.parse(value);
        existingNotes.splice(index, 1); 
        await AsyncStorage.setItem(selectedDate, JSON.stringify(existingNotes));
        setExistingNote(existingNotes); 
      }
    } catch (error) {
      console.error(error);
    }
  };


  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text style={{ color: 'white', fontSize: 16, fontWeight: 'bold', marginTop: 1, marginBottom: 10 }}>
        Write a note:
      </Text>
      <TextInput
        style={{
          height: isLargeScreen ? 200 : 120,
          width: isLargeScreen ? 550 : 280,
          borderColor: 'rgb(56, 56, 56)',
          color: 'white',
          borderWidth: 1,
          borderRadius: 10,
          paddingHorizontal: 10,
          paddingTop: 10,
          textAlignVertical: 'top',
          backgroundColor: 'rgb(56, 56, 56)',
        }}
        multiline={true}
        numberOfLines={4}
        onChangeText={setNote}
        value={note}
      />
      <TouchableOpacity
        onPress={storeNote}
        style={{
          marginTop: 15,
          backgroundColor: 'rgb(231, 29, 53)',
          paddingVertical: 10,
          paddingHorizontal: 20,
          borderRadius: 10,
        }}
      >
        <Text style={{ color: 'white', fontWeight: 'bold' }}>Save</Text>
      </TouchableOpacity>
      {existingNote.length > 0 && (
        <View style={{ marginTop: 20, }}>
          <Text style={{ color: 'white', fontSize: 16, fontWeight: 'bold', marginBottom: 10,  }}>Existing Notes:</Text>
          {existingNote.map((item, index) => (
            <View key={index} style={{ borderWidth: 1, borderColor: 'rgb(231, 29, 53)', borderRadius: 10, padding: 15, marginBottom: 10 }}>
              <Text style={{ color: 'white', fontWeight: 'bold', marginBottom: 10 }}>{item.date}</Text>
              <Text style={{ color: 'white' }}>{item.text}</Text>
              <TouchableOpacity
                onPress={() => deleteNote(index)}
                style={{
                  marginTop: 10,
                  backgroundColor: 'rgb(231, 29, 53)',
                  paddingVertical: 10,
                  paddingHorizontal: 30,
                  borderRadius: 10,
                }}
              >
        <Text style={{ color: 'white', fontWeight: 'bold' }}>Delete</Text>
      </TouchableOpacity>
            </View>
          ))}

        </View>
      )}
    </View>
  );
};

export default NoteTaker;
