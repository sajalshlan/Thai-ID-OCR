const express = require("express");
const app = express();
const getTextFromImage = require("./indexVertex");
const mongoose = require("mongoose");
const cors = require("cors");
const multer = require("multer");
const path = require("path");
//mongodb configuration

app.use(cors());
app.use(express.json());

const mongoUri =
  "mongodb+srv://admin:admin@sajalcluster.ivqeyvz.mongodb.net/Thai_OCR?retryWrites=true&w=majority";

mongoose.connect(mongoUri);

//Schema
const recordSchema = new mongoose.Schema({
  identificationNumber: String,
  firstName: String,
  lastName: String,
  dob: String,
  doi: String,
  doe: String,
});

//Model to perform CRUD operations on
const records = mongoose.model("records", recordSchema);

//Function to parse the data
function extractObject(dataString) {
  try {
    // Removing any characters before the opening curly brace
    const trimmedData = dataString.trim().slice(7, -3);

    // Parsing the JSON string into js object
    const parsedObject = JSON.parse(trimmedData);

    return parsedObject;
  } catch (error) {
    console.error("Error parsing JSON:", error);
    throw new Error("Invalid JSON format");
  }
}

//Endpoints to expose
// 1. Get OCR Data based on date, id, identification number
// 2. create a new OCR record with success/fail status
// 3. update an exisiting OCR record
// 4. delete an OCR record

app.get("/records", async (req, res) => {
  res.json({ records: await records.find({}) });
});

app.get("/record/:recordId", async (req, res) => {
  console.log("hi");
  const recordId = req.params.recordId;

  const record = await records.findById({ _id: recordId });
  if (record) {
    res.json({ record: record });
  } else res.status(404).json({ message: "record not found" });
});

//middleware and config for fetching the image
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    return cb(null, path.join(__dirname, "public"));
  },
  filename: function (req, file, cb) {
    return cb(null, `${Date.now()}_${file.originalname}`);
  },
});

const upload = multer({ storage });

app.post("/createrecord", upload.single("file"), async (req, res) => {
  //logic for taking in an image and sending it to our function as parameter

  console.log(req.file.filename);
  const fileName = req.file.filename;
  const data = await getTextFromImage(`./public/${fileName}`);
  const finalResponse = extractObject(data);
  console.log(finalResponse);
  await records(finalResponse).save();
  res.json({ message: "record created successfully" });
});

app.put("/record/:id", async (req, res) => {
  const recordId = req.params.id;
  const record = await records.findByIdAndUpdate(recordId, req.body, {
    new: true,
  });
  if (record) {
    res.json({ message: "record updated successfully" });
  } else res.status(404).json({ message: "record not found" });
});

app.delete("/record/:id", async (req, res) => {
  const recordId = req.params.id;
  const record = await records.findByIdAndDelete(recordId);
  if (record) {
    res.json({ message: "record deleted successfully" });
  } else res.status(404).json({ message: "record not found" });
});

app.listen(3000, () => console.log("server running on port 3000"));
