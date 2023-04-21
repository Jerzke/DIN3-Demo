import React, { useState, useEffect } from "react";
import { View, Text, Button } from "react-native";
import { FetchID } from "./IDFetch";
import { ScrollView, TouchableOpacity } from "react-native-gesture-handler";
import { FetchData } from "./DataFetch"; 

export default function TestContainer({ navigation, route }) {
  const { title } = route.params;
  const [links, setLinks] = useState([]);
  const [selectedOptions, setSelectedOptions] = useState([]);

  React.useEffect(() => {
    FetchID(title).then((data) => {
      setLinks(data);
    });
  }, [title]);

  const handleOptionSelect = (option) => {
    if (selectedOptions.length < 2) {
      setSelectedOptions([...selectedOptions, option]);
    } else {
      setSelectedOptions([option]);
    }
  };

  const handleNavigation = () => {
    if (selectedOptions.length === 1) {
      const { title, link } = selectedOptions[0];
      navigation.navigate("Charts", { test: link, title });
    } else if (selectedOptions.length === 2) {
      const { title: title1, link: link1 } = selectedOptions[0];
      const { title: title2, link: link2 } = selectedOptions[1];
      navigation.navigate("Charts", {
        test: link1,
        title: title1,
        test2: link2,
        title2: title2,
      });
    }
  };



  return (
    <ScrollView
      style={{
        backgroundColor: "black"
      }}
    >
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
            onPress={() =>{
              console.log(link)
              handleOptionSelect({link, title})
            }}
            style={{
              backgroundColor: selectedOptions.some(option => option.link === link) ? 'green' : '#E71D35',
              borderRadius: 8,
              padding: 10,
              margin: 10,
              minWidth: 100,
            }}
          >
            <Text style={{ color: "white", textAlign: "center" }}>
              {link}
            </Text>
          </TouchableOpacity>
          ))}
          
          </View>
        <TouchableOpacity onPress= {() =>{handleNavigation()} } 
        style={{
          flex: 1,
          alignItems: "center",
          backgroundColor: "black",
          padding: 20,
          }}
          >
          <Text style={{ 
            color: "white",
            fontSize: 15,
            fontWeight: "bold",
            backgroundColor: "#383838",
            borderWidth: 1,
            borderRadius: 8,
            padding: 10,
            }}
            >
            Compare
          </Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}
