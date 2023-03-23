import * as d3 from 'd3';

const csvUrl = 'http://192.168.56.216:3001/1';

export const fetchText = async (url) => {
  const response = await fetch(url);
  return await response.text();
};
  export const fetchData = async () => {
  const text = await fetchText(csvUrl);
  const plainText = await fetchText(csvUrl);

  return plainText;//comment out/remove when plaintext filler is no longer needed

  /* return d3.csvParse(text);
  Uncomment when object data needed, parses plainText to objects
  react does not render these but they are needed for d3 visualization*/
}

