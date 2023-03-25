import * as d3 from "d3";

const dataUrl = "http://localhost:3001/1";

export const fetchData = async () => {
  const response = await fetch(dataUrl);
  const rawData = await response.text();
  const parser = d3.dsvFormat(";");
  const parsedData = parser.parse(rawData, (d) => ({
    timestamp: +d.timestamp,
    distance: +d.distance,
    speed: +d.speed,
    acceleration: +d.acceleration,
  }));
  console.log("parsed data", parsedData);
  return parsedData;
};
