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
  VictoryGroup,
  createContainer,
} from "victory-native";
import { ScrollView, TouchableOpacity } from "react-native-gesture-handler";


interface Props {}

export default function HistoryContainer({route, navigation}, props: Props) {
  const [data1, setData1] = useState([]);
  const [data2, setData2] = useState([]);//data2 is green
  const { test, title } = route.params;
  const { test2, } = route.params;
  const [isLoading, setIsLoading] = useState(true);

  

  
  useEffect(() => {
    setIsLoading(true);
    FetchData(test, title).then((parsedData) => {
      setData1(parsedData);
      setIsLoading(false);
    });
    
    FetchData(test2, title).then((parsedData) => {
      setData2(parsedData);
    });
  }, [test, test2]);

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
          setData1([]);
          setData2([]);
          console.log("data cleared");
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
      
      {test2 ? (
      <>
          <Text style={{color: 'white'}}>
            {test} as red
          </Text>
          <Text style={{color: 'white'}}>
            {test2} as green
          </Text>
      </>
        ) : (
          <Text style={{color: 'white'}}>
            {test} as red
          </Text>
        )}

      {isLoading ? (
          <Text style={{ color: "white" }}>Loading...</Text>
        ) : (
          <VictoryChart
            theme={VictoryTheme.material}
            containerComponent={
              <VictoryZoomVoronoiContainer
                labels={({ datum }) =>
                  `Distance (m): ${datum.distance}\nSpeed (m/s): ${
                    datum.speed
                  }\nTimestamp (s): ${(datum.timestamp - data1[0].timestamp).toFixed(
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
              data={data1}
              style={{
                data: {
                  stroke: "rgb(231, 29, 53)",
                  strokeWidth: 2,
                  strokeLinecap: "round",
                },
              }}
            />
            <VictoryLine  //data2 is green
              y="speed"
              x="distance"
              data={data2}
              style={{
                data: {
                  stroke: "rgb(0, 255, 0)",
                  strokeWidth: 2,
                  strokeLinecap: "round",
                },
              }}
            />
          </VictoryChart>
        )}
  


    </View>
    </ScrollView>

  );
}


/*
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
          data={data1}
          style={{
            data: {
              stroke: "rgb(231, 29, 53)",
              strokeWidth: 2,
              strokeLinecap: "round",
            },
          }}
        />    
        
      </VictoryChart>
*/