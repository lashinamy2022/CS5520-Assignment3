import { DOMParser } from "react-native-html-parser";

export const extractImageOrAddImage = (article) => {
  const parser = new DOMParser();
  const parsedHTML = parser.parseFromString(article, "text/html");
  const imgElements = parsedHTML.getElementsByTagName("img");
  if (imgElements[0] != undefined) {
    return imgElements[0].getAttribute("src");
  }
  return "https://picsum.photos/800/600?nature";
};

export const provideImage = () => {
  return "https://picsum.photos/800/600?nature";
}
