const express = require("express");
const app = express();
app.use(express.json());
const getTextFromImage = require("./indexVertex");
const mongoose = require("mongoose");

//mongodb configuration

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
    // Remove leading and trailing backticks *and any characters before the opening curly brace*
    const trimmedData = dataString.trim().slice(7, -3);

    // Parse the JSON string into a JavaScript object
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

app.post("/createrecord", async (req, res) => {
  //logic for taking in an image and sending it to our function as parameter
  console.log("hello");
  const data = await getTextFromImage();
  const finalResponse = extractObject(data);
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

app.delete("/record/:id", () => {});

app.listen(3000, () => console.log("server running on port 3000"));
