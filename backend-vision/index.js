const vision = require("@google-cloud/vision");
const express = require("express");
// const app = express();

const client = new vision.ImageAnnotatorClient({
  keyFilename: "../../APIKey.json",
});

client
  .textDetection("./abc.jpg")
  .then((results) => {
    // const text = results.fullTextAnnotation;

    console.log(results[0].fullTextAnnotation.text);
  })
  .catch((err) => {
    console.error("ERROR:", err);
  });
