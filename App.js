import React, { useEffect, useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import * as d3 from 'd3';
import { fetchData, fetchText, pushText } from './DataFetch';


export default function App() {
  const [data, setData] = useState([]);

  useEffect(() => {
    fetchData().then((data) => {
      setData(data);
    });
  }, []);


  return (
    <View style={styles.container}>
      <Text style={{ color: 'white', fontWeight: 'bold', fontSize: 30 }}>
        DIN-3 {data}
      </Text>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black',
    alignItems: 'center',
    paddingTop: 55,
  },
});
