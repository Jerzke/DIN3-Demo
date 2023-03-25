import React, { useEffect, useState } from "react";
import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import { fetchData } from "./DataFetch";
import Chart from "./Chart";

export default function App() {
  const [data, setData] = useState([]);

  useEffect(() => {
    fetchData().then((data) => {
      setData(data);
    });
  }, []);

  return (
    <View style={styles.container}>
      <Text style={{ color: "white", fontWeight: "bold", fontSize: 30 }}>
        DIN-3
        <Chart data={data} />
      </Text>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "black",
    alignItems: "center",
    paddingTop: 55,
  },
});
