const express = require("express");
const app = express();
app.use(express.json());
const { generateContent } = require("./indexVertex");

//Endpoints to expose
// 1. Get OCR Data based on date, id, identification number
// 2. create a new OCR record with success/fail status
// 3. update an exisiting OCR record
// 4. delete an OCR record

app.get("/record/:parameter", () => {});
app.post("/createrecord", () => {});
app.put("/record/:id", () => {});
app.delete("/record/:id", () => {});

app.listen(3000, () => console.log("server running on port 3000"));
