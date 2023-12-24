const vision = require("@google-cloud/vision");
const express = require("express");
const dotenv = require("dotenv");
dotenv.config();

const app = express();

const client = new vision.ImageAnnotatorClient({
  keyFilename: "./APIKey.json",
});
