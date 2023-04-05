import * as d3 from 'd3';

const dataUrl = "https://din3-api-37sqsczq3q-ew.a.run.app/Sprint/d_60m_2.csv";

export const FetchData = async () => {
  const response = await fetch(dataUrl);
  const rawData = await response.text();
  const parser = d3.dsvFormat(";");
  const parsedData = parser.parse(rawData, (d) => ({
    timestamp: +d.timestamp,
    distance: +d.distance,
    speed: +d.speed,
    acceleration: +d.acceleration,
  } 
  
  
  ));
  //console.log("parsed data", parsedData);
  return parsedData;
};
