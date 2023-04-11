import React, { Component } from "react";
import { View, Text, Button } from "react-native";
import { FetchID } from "./IDFetch";
import { ScrollView, TouchableOpacity } from "react-native-gesture-handler";

export default function TestContainer({ route }) {
  const { title } = route.params;
  const [links, setLinks] = React.useState([]);

  React.useEffect(() => {
    FetchID().then((data) => {
      setLinks(data);
    });
  }, []);

  return (
    <ScrollView>
    <View
      style={{
        flex: 1,
        alignItems: "center",
        backgroundColor: "black",
        padding: 50,
      }}
    >
      <Text
        style={{
          color: "white",
          fontSize: 15,
          fontWeight: "bold",
          backgroundColor: "#383838",
          borderWidth: 1,
          borderRadius: 8,
          padding: 10,
        }}
      >
        {title}
      </Text>
      <View
        style={{
          flexDirection: "row",
          flexWrap: "wrap",
          justifyContent: "center",
        }}
      >
        {links.map((link) => (
          <TouchableOpacity
            key={link}
            onPress={() => console.log(link)}
            style={{
              backgroundColor: "#E71D35",
              borderRadius: 8,
              padding: 10,
              margin: 10,
              minWidth: 100,
            }}
          >
            <Text style={{ color: "white", textAlign: "center" }}>{link}</Text>
          </TouchableOpacity>
        ))}
      </View>
    </View>
    </ScrollView>
  );
}
