import React, { useEffect, useState } from "react";
import { View } from "react-native";
import { Svg, Path, G, Line, Text } from "react-native-svg";
import * as d3 from "d3";
import { fetchData } from "./DataFetch";

const Chart = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    const getData = async () => {
      const parsedData = await fetchData();
      setData(parsedData);
    };
    getData();
  }, []);

  const margin = { top: 20, right: 20, bottom: 30, left: 30 };
  const width = 300;
  const height = 200;

  const x = d3
    .scaleLinear()
    .domain(d3.extent(data, (d) => d.timestamp))
    .range([margin.left, width - margin.right]);

  const y = d3
    .scaleLinear()
    .domain([0, d3.max(data, (d) => d.distance)])
    .range([height - margin.bottom, margin.top]);

  const line = d3
    .line()
    .x((d) => x(d.timestamp))
    .y((d) => y(d.distance));

  return (
    <View style={{ backgroundColor: "white" }}>
      <Svg width={width} height={height}>
        <G>
          {/* add grid lines */}
          <G
            class="grid"
            stroke="#ccc"
            stroke-width="1"
            opacity="0.2"
            transform={`translate(0, ${height - margin.bottom})`}
          >
            {x.ticks().map((tick) => (
              <Line
                key={tick}
                x1={x(tick)}
                x2={x(tick)}
                y2={-height + margin.top + margin.bottom}
              />
            ))}
          </G>
          <Path d={line(data)} stroke="black" fill="none" strokeWidth="2" />
          {/* add x axis label */}
          <Text
            x={width / 2}
            y={height - margin.bottom / 2}
            fill="black"
            fontSize="12"
            textAnchor="middle"
          >
            Distance
          </Text>
          {/* add y axis label */}
          <Text
            x={-height / 2}
            y={margin.left / 2}
            fill="black"
            fontSize="12"
            textAnchor="middle"
            transform={`rotate(-90, ${-height / 2}, ${margin.left / 2})`}
          >
            Time (s)
          </Text>
          {/* add chart title */}
          <Text
            x={width / 2}
            y={margin.top / 2}
            fill="black"
            fontSize="16"
            textAnchor="middle"
          >
            Performance
          </Text>
          {/* add data labels */}
          {data.map((d) => (
            <React.Fragment key={d.timestamp}>
              <Line
                x1={x(d.timestamp)}
                y1={y(0)}
                x2={x(d.timestamp)}
                y2={y(d.distance)}
                stroke="white"
                strokeWidth="1"
              />
            </React.Fragment>
          ))}
        </G>
      </Svg>
    </View>
  );
};

export default Chart;
