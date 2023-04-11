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
import { FetchID } from "./IDFetch";

interface Props {}

export default function HistoryContainer(props: Props) {
  const [data, setData] = useState([]);

  useEffect(() => {
    FetchData().then((parsedData) => {
      setData(parsedData);
    });
  }, []);
  const VictoryZoomVoronoiContainer = createContainer("zoom", "voronoi");
  FetchID().then((links) => {
    console.log(links);
  });

  return (
    <View
      style={{
        flex: 1,
        alignItems: "center",
        backgroundColor: "black",
        padding: 50,
      }}
    >
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
          />
        }
      >
        <VictoryAxis label="Distance" />
        <VictoryAxis label="Speed" dependentAxis />
        <VictoryLine
          y="speed"
          x="distance"
          data={data}
          style={{
            data: { stroke: "#c43a31", strokeWidth: 4, strokeLinecap: "round" },
          }}
          labelComponent={
            <VictoryTooltip
              cornerRadius={0}
              flyoutStyle={{ stroke: "tomato", strokeWidth: 2 }}
              style={{ fontSize: 50 }}
            />
          }
        />
      </VictoryChart>
      <VictoryChart
        theme={VictoryTheme.material}
        containerComponent={
          <VictoryVoronoiContainer
            labels={({ datum }) =>
              `Timestamp (s): ${datum.timestamp}\nDistance (m): ${datum.distance}`
            }
          />
        }
      >
        <VictoryAxis label="Distance" />
        <VictoryAxis label="Speed" dependentAxis />
        <VictoryLine
          y="acceleration"
          x="timestamp"
          data={data}
          style={{
            data: { stroke: "#c43a31", strokeWidth: 4, strokeLinecap: "round" },
          }}
          labelComponent={
            <VictoryTooltip
              cornerRadius={0}
              flyoutStyle={{ stroke: "tomato", strokeWidth: 2 }}
              style={{ fontSize: 10 }}
            />
          }
        />
      </VictoryChart>
    </View>
  );
}
