import * as d3 from "d3";

const dataUrl = "https://din3-api-37sqsczq3q-ew.a.run.app/";

export const FetchData = async (fileID, title) => {
  const response = await fetch(`${dataUrl}${title}/${fileID}`);
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
