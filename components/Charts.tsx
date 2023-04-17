import React, { Component, useState, useEffect } from "react";
import { View, Text } from "react-native";
import { FetchData } from "./DataFetch";
import {
  VictoryChart,
  VictoryTheme,
  VictoryLine,
  VictoryTooltip,
  VictoryVoronoiContainer,
  VictoryAxis,
  VictoryZoomContainer,
  createContainer,
} from "victory-native";
import { ScrollView, TouchableOpacity } from "react-native-gesture-handler";

interface Props {}

export default function HistoryContainer({route, navigation}, props: Props) {
  const [data, setData] = useState([]);
  const { test, title } = route.params;

  
  useEffect(() => {
    FetchData(test, title).then((parsedData) => {
      setData(parsedData);
      console.log(test);
    });
  }, [test]);
  const VictoryZoomVoronoiContainer = createContainer("zoom", "voronoi");

  return (
    <ScrollView
      style={{
        backgroundColor: "black"
      }}
    >
    <View
      style={{
        flex: 1,
        alignItems: "center"
      }}
    >
      <TouchableOpacity
        onPress={() =>{
          navigation.navigate("History", {title: title})
        }}
        style={{
          backgroundColor: "#E71D35",
          borderRadius: 8,
          padding: 10,
          margin: 5,
        }}
      >
        <Text>Back</Text>
      </TouchableOpacity>
      <VictoryChart
        theme={VictoryTheme.material}
        containerComponent={
          <VictoryZoomVoronoiContainer
            //idk why this is redlined works fine on app?
            labels={({ datum }) =>
              `Distance (m): ${datum.distance}\nSpeed (m/s): ${
                datum.speed
              }\nTimestamp (s): ${(datum.timestamp - data[0].timestamp).toFixed(
                1
              )}`
            }
            labelComponent={
              <VictoryTooltip
                style={{ fill: "white" }}
                flyoutStyle={{
                  fill: "black",
                  stroke: "#7d7d7d",
                  strokeWidth: 2,
                }}
              />
            }
          />
        }
      >
        <VictoryAxis
          label="Distance"
          style={{ grid: { stroke: "#7d7d7d", strokeWidth: 1 } }}
        />
        <VictoryAxis
          label="Speed"
          dependentAxis
          style={{ grid: { stroke: "#7d7d7d", strokeWidth: 1 } }}
        />

        <VictoryLine
          y="speed"
          x="distance"
          data={data}
          style={{
            data: {
              stroke: "rgb(231, 29, 53)",
              strokeWidth: 2,
              strokeLinecap: "round",
            },
          }}
        />
      </VictoryChart>

      <VictoryChart
        theme={VictoryTheme.material}
        containerComponent={
          <VictoryVoronoiContainer
            labels={({ datum }) =>
              `Timestamp (s): ${datum.timestamp}\nDistance (m): ${datum.distance}`
            }
            labelComponent={
              <VictoryTooltip
                style={{ fill: "white" }}
                flyoutStyle={{
                  fill: "black",
                  stroke: "#7d7d7d",
                  strokeWidth: 2,
                }}
              />
            }
          />
        }
      >
        <VictoryAxis
          label="Distance"
          style={{ grid: { stroke: "#7d7d7d", strokeWidth: 1 } }}
        />
        <VictoryAxis
          label="Speed"
          dependentAxis
          style={{ grid: { stroke: "#7d7d7d", strokeWidth: 1 } }}
        />

        <VictoryLine
          y="acceleration"
          x="timestamp"
          data={data}
          style={{
            data: {
              stroke: "rgb(231, 29, 53)",
              strokeWidth: 2,
              strokeLinecap: "round",
            },
          }}
        />
      </VictoryChart>
    </View>
    </ScrollView>
  );
}
