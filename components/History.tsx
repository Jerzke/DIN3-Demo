import React, { Component, useState, useEffect } from "react";
import { View, Text } from 'react-native';
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

interface Props {}

export default function HistoryContainer(props: Props) {
  const [data, setData] = useState([]);

  useEffect(() => {
    FetchData().then((parsedData) => {
      setData(parsedData);
    });
  }, []);
  const VictoryZoomVoronoiContainer = createContainer("zoom", "voronoi");


  return (
    <View style={{ flex: 1, alignItems: 'center', backgroundColor: 'black', padding: 50, }}>
      <VictoryChart
        theme={VictoryTheme.material}
        containerComponent={
          <VictoryZoomVoronoiContainer
          //idk why this is redlined works fine on app?
            labels={({ datum }) =>
              `Distance (m): ${datum.distance}\nSpeed (m/s): ${datum.speed}\nTimestamp (s): ${(datum.timestamp - data[0].timestamp).toFixed(1)}`
            }
            labelComponent={<VictoryTooltip style={{ fill: 'white' }} flyoutStyle={{ fill: 'black', stroke: '#7d7d7d', strokeWidth: 2,}} />}
          />
        }
      >
        <VictoryAxis label="Distance" 
        style={{ grid: { stroke: '#7d7d7d', strokeWidth: 1 }, }} />
        <VictoryAxis label="Speed" dependentAxis 
        style={{ grid: { stroke: '#7d7d7d', strokeWidth: 1 }, }} />

        <VictoryLine
          y="speed"
          x="distance"
          data={data}
          style={{ data: { stroke: "rgb(231, 29, 53)", strokeWidth: 2, strokeLinecap: "round" } }}
          />
      </VictoryChart>

      <VictoryChart
        theme={VictoryTheme.material}
        containerComponent={
          <VictoryVoronoiContainer
            labels={({ datum }) =>
              `Timestamp (s): ${datum.timestamp}\nDistance (m): ${datum.distance}`
            }
            labelComponent={<VictoryTooltip style={{ fill: 'white' }} flyoutStyle={{ fill: 'black', stroke: '#7d7d7d', strokeWidth: 2, }} />}
          />
        }
      
      >
        <VictoryAxis label="Distance" 
        style={{ grid: { stroke: '#7d7d7d', strokeWidth: 1 }, }} />
        <VictoryAxis label="Speed" dependentAxis 
        style={{ grid: { stroke: '#7d7d7d', strokeWidth: 1 }, }} />

        <VictoryLine
          y="acceleration"
          x="timestamp"
          data={data}
          style={{ data: { stroke: "rgb(231, 29, 53)", strokeWidth: 2, strokeLinecap: "round" } }}
        />
      </VictoryChart>
    </View>
  );
}
