const express = require("express");
const app = express();
app.use(express.json());
const { generateContent } = require("./indexVertex");

//mongodb configuration

const mongoUri =
  "mongodb+srv://admin:admin@sajalcluster.ivqeyvz.mongodb.net/Thai_OCR?retryWrites=true&w=majority";

mongoose.connect(mongoUri);

//Endpoints to expose
// 1. Get OCR Data based on date, id, identification number
// 2. create a new OCR record with success/fail status
// 3. update an exisiting OCR record
// 4. delete an OCR record

app.get("/records", async (req, res) => {
  res.json({ records: await cards.find({}) });
});
app.post("/createrecord", () => {});
app.put("/record/:id", () => {});
app.delete("/record/:id", () => {});

app.listen(3000, () => console.log("server running on port 3000"));
