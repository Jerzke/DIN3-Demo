import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { format } from 'date-fns';

interface Note {
  date: string;
  text: string;
}

const NoteTaker: React.FC<{ selectedDate: string }> = ({ selectedDate }) => {
  const [note, setNote] = useState<string>('');
  const [existingNote, setExistingNote] = useState<Note[]>([]);

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
     
        const newNotes = [...existingNote, { date: selectedDate, text: note }];
        await AsyncStorage.setItem(selectedDate, JSON.stringify(newNotes));
        setExistingNote(newNotes);
      } else {
        
        const newNote = [{ date: format(new Date(selectedDate), 'dd.MM.yyyy'), text: note }];
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
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const day = date.getDate().toString().padStart(2, '0');
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const year = date.getFullYear();
    return `${day}-${month}-${year}`;
  };

  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text style={{ color: 'white', fontSize: 16, fontWeight: 'bold', marginTop: 1, marginBottom: 10 }}>
        Write a note:
      </Text>
      <TextInput
        style={{
          height: 120,
          width: 280,
          borderColor: 'rgb(56, 56, 56)',
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
            <View key={index} style={{ borderWidth: 1, borderColor: 'gray', borderRadius: 10, padding: 10, marginBottom: 10 }}>
              <Text style={{ color: 'white', fontWeight: 'bold', marginBottom: 10 }}>{item.date}</Text>
              <Text style={{ color: 'white' }}>{item.text}</Text>
              <TouchableOpacity
                onPress={() => deleteNote(index)}
                style={{
                  marginTop: 10,
                  backgroundColor: 'rgb(231, 29, 53)',
                  paddingVertical: 10,
                  paddingHorizontal: 20,
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









/*import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';


interface Props {
  selectedDate: string;
}


const NoteTaker: React.FC<Props> = ({ selectedDate }) => {
  const [notes, setNotes] = useState([]);

  const [noteText, setNoteText] = useState('');

  const loadNotes = async () => {
    try {
      const storedNotes = await AsyncStorage.getItem('@notes');
      if (storedNotes !== null) {
        setNotes(JSON.parse(storedNotes));
      }
    } catch (error) {
      console.error(error);
    }
  };

  const saveNotes = async (newNotes) => {
    try {
      await AsyncStorage.setItem('@notes', JSON.stringify(newNotes));
    } catch (error) {
      console.error(error);
    }
  };

  const addNote = async () => {
    if (noteText.length > 0) {
      const newNotes = [...notes, { id: Date.now(), text: noteText }];
      await saveNotes(newNotes);
      setNotes(newNotes);
      setNoteText('');
    }
  };

  const deleteNote = async (id) => {
    const newNotes = notes.filter((note) => note.id !== id);
    await saveNotes(newNotes);
    setNotes(newNotes);
  };

  const renderNotes = () => {
    if (notes.length === 0) {
      return <Text>No notes found.</Text>;
    }
    return notes.map((note) => (
      <View key={note.id} style={styles.noteContainer}>
        <Text style={styles.noteText}>{note.text}</Text>
        <Button
          title="Delete"
          onPress={() => deleteNote(note.id)}
          color="#ff0000"
        />
      </View>
    ));
  };

  React.useEffect(() => {
    loadNotes();
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Add a note"
          onChangeText={(text) => setNoteText(text)}
          value={noteText}
        />
        <Button title="Add" onPress={addNote} />
      </View>
      <View>{renderNotes()}</View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 20,
    marginHorizontal: 20,
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 10,
    elevation: 4,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  input: {
    flex: 1,
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    paddingHorizontal: 10,
    marginRight: 10,
    borderRadius: 5,
  },
  noteContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  noteText: {
    flex: 1,
    fontSize: 16,
  },
});

export default NoteTaker;*/
