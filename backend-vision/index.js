// const vision = require("@google-cloud/vision");

// const client = new vision.ImageAnnotatorClient({
//   keyFilename: "../../APIKey.json",
// });

// client
//   .textDetection("./abc.jpg")
//   .then((results) => {
//     // const text = results.fullTextAnnotation;

//     console.log(results[0].fullTextAnnotation.text);
//   })
//   .catch((err) => {
//     console.error("ERROR:", err);
//   });

const vision = require("@google-cloud/vision");

const client = new vision.ImageAnnotatorClient({
  keyFilename: "../../APIKey.json",
});

client
  .textDetection("./abc.jpg")
  .then((results) => {
    const text = results[0].fullTextAnnotation.text;

    // Extract information using refined regular expressions
    const idRegex = /\d{1,4}\s?\d{5}\s?\d{5}\s?\d{1,2}\s?\d/;
    const nameRegex = /ชื่อตัวและชื่อสกุล\s+(.+)/;
    const dobRegex = /เกิดวันที่\s+(\d+\s*\S+\s*\d+)/;
    const addressRegex = /ที่อยู่\s+(.+)/;
    const issueDateRegex = /วันออกบัตร\s+(\d+\s*\S+\s*\d+)/;
    const expiryDateRegex = /วันบัตรหมดอายุ\s+(\d+\s*\S+\s*\d+)/;

    const idMatch = text.match(idRegex);
    const nameMatch = text.match(nameRegex);
    const dobMatch = text.match(dobRegex);
    const addressMatch = text.match(addressRegex);
    const issueDateMatch = text.match(issueDateRegex);
    const expiryDateMatch = text.match(expiryDateRegex);

    // Display the extracted information
    console.log("Identification Number:", idMatch ? idMatch[0] : "Not found");
    console.log("Name:", nameMatch ? nameMatch[1].trim() : "Not found");
    console.log("Date of Birth:", dobMatch ? dobMatch[1].trim() : "Not found");
    console.log(
      "Address:",
      addressMatch ? addressMatch[1].trim() : "Not found"
    );
    console.log(
      "Date of Issue:",
      issueDateMatch ? issueDateMatch[1].trim() : "Not found"
    );
    console.log(
      "Date of Expiry:",
      expiryDateMatch ? expiryDateMatch[1].trim() : "Not found"
    );
  })
  .catch((err) => {
    console.error("ERROR:", err);
  });
