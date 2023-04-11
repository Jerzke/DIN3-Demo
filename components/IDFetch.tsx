const cheerio = require("cheerio");

const dataUrl = "https://din3-api-37sqsczq3q-ew.a.run.app/";

export const FetchID = async () => {
  const response = await fetch(`${dataUrl}Sprint`);
  const rawData = await response.text();
  const $ = cheerio.load(rawData);
  const links = [];

  $("ul li a").each((i, elem) => {
    links.push($(elem).text());
    //console.log(links);
  });
  return links;
};
