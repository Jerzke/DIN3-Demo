import React, { useState, useEffect } from "react";
import { View, Text, TextInput, Button } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

interface Note {
  id: number;
  content: string;
}

const NoteTaker = () => {
  const [noteList, setNoteList] = useState<Note[]>([]);
  const [note, setNote] = useState("");

  useEffect(() => {
    retrieveData();
  }, []);

  const retrieveData = async () => {
    try {
      const value = await AsyncStorage.getItem("notes");
      if (value !== null) {
        setNoteList(JSON.parse(value));
      }
    } catch (e) {
      console.error("Failed to retrieve data from storage", e);
    }
  };

  const saveNote = async () => {
    if (note !== "") {
      const newNote: Note = { id: Date.now(), content: note };
      try {
        await AsyncStorage.setItem(
          "notes",
          JSON.stringify([...noteList, newNote])
        );
        setNoteList([...noteList, newNote]);
        setNote("");
        alert("Note added successfully!");
      } catch (e) {
        console.error("Failed to save note to storage", e);
      }
    }
  };

  const deleteNote = async (noteId: number) => {
    const updatedNoteList = noteList.filter((note) => note.id !== noteId);
    try {
      await AsyncStorage.setItem("notes", JSON.stringify(updatedNoteList));
      setNoteList(updatedNoteList);
      alert("Note deleted successfully!");
    } catch (e) {
      console.error("Failed to delete note from storage", e);
    }
  };

  return (
    <View style={{ backgroundColor: "white", padding: 20 }}>
      <TextInput
        style={{ backgroundColor: "white", marginBottom: 10 }}
        placeholder="Write your note here..."
        value={note}
        onChangeText={(text) => setNote(text)}
      />
      <Button title="Save" onPress={saveNote} />
      <Text style={{ marginTop: 20, fontSize: 18 }}>Your notes:</Text>
      {noteList.map((note) => (
        <View
          key={note.id}
          style={{
            backgroundColor: "white",
            padding: 10,
            marginVertical: 5,
          }}
        >
          <Text>{note.content}</Text>
          <Button title="Delete" onPress={() => deleteNote(note.id)} />
        </View>
      ))}
    </View>
  );
};

export default NoteTaker;