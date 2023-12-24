const vision = require("@google-cloud/vision");

const client = new vision.ImageAnnotatorClient({
  keyFilename: "../../APIKey.json",
});

client
  .textDetection("./abc.jpg")
  .then((results) => {
    const text = results[0].fullTextAnnotation.text;

    const details = {
      IdentificationNumber: text.match(/เลขประจำตัวประชาชน\s*(.*)/)[1],
      Name: text.match(/ชื่อตัวและชื่อสกุล\s*(.*)/)[1],
      DateOfBirth: text.match(/เกิดวันที่\s*(.*)/)[1],
      Religion: text.match(/ศาสนา\s*(.*)/)[1],
      Address: text.match(/ที่อยู่\s*(.*)/)[1],
      DateOfIssue: text.match(/วันออกบัตร\s*(.*)/)[1],
      IssuingOfficer: text.match(/เจ้าพนักงานออกบัตร\s*(.*)/)[1],
      ExpiryDate: text.match(/วันบัตรหมดอายุ\s*(.*)/)[1],
    };

    // Clean up the data
    details.IdentificationNumber = details.IdentificationNumber.trim();
    details.Name = details.Name.trim();
    details.DateOfBirth = details.DateOfBirth.trim();
    details.Religion = details.Religion.trim();
    details.Address = details.Address.trim();
    details.DateOfIssue = details.DateOfIssue.trim();
    details.IssuingOfficer = details.IssuingOfficer.trim();
    details.ExpiryDate = details.ExpiryDate.trim();

    // Convert the date fields to ISO 8601 format
    details.DateOfBirth = new Date(details.DateOfBirth).toISOString();
    details.DateOfIssue = new Date(details.DateOfIssue).toISOString();
    details.ExpiryDate = new Date(details.ExpiryDate).toISOString();

    // Format the address field as a single string
    details.Address = details.Address.replace(/\n/g, " ");

    // Output the cleaned up data
    console.log(details);
  })
  .catch((err) => {
    console.error("ERROR:", err);
  });
