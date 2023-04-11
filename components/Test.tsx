import React, { Component } from "react";
import { View, Text, Button } from "react-native";
import { FetchID } from "./IDFetch";

export default function TestContainer({ route }) {
  const { title } = route.params;
  const [links, setLinks] = React.useState([]);

  React.useEffect(() => {
    FetchID().then((data) => {
      setLinks(data);
    });
  }, []);

  return (
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
        Eventually exercise {title}{" "}
      </Text>
      <View
        style={{
          flexDirection: "row",
          flexWrap: "wrap",
          justifyContent: "center",
        }}
      >
        {links.map((link) => (
          <Button key={link} title={link} onPress={() => console.log(link)} />
        ))}
      </View>
    </View>
  );
}
