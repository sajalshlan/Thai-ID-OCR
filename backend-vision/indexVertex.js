//trying something with vertex ai api
const { GoogleGenerativeAI } = require("@google/generative-ai");
const fs = require("fs").promises;
const dotenv = require("dotenv");
dotenv.config();

//configuration
const api_key = process.env.GEMINI_API_KEY;
const genAI = new GoogleGenerativeAI(api_key);
const generationConfig = {
  temperature: 0.4,
  topP: 1,
  topK: 32,
  maxOutputTokens: 4096,
};

// Initialise Model for vision-based generation
const model = genAI.getGenerativeModel({
  model: "gemini-pro-vision",
  generationConfig,
});

const getTextFromImage = async (imagePath) => {
  try {
    // Load image
    const imageData = await fs.readFile(imagePath);
    const imageBase64 = imageData.toString("base64");

    // Define parts
    const parts = [
      {
        text: "Extract the following details from the Thai ID Card provided - Identification Number, first name, last name, Date of Birth, Date of Issue, Expiry Date. Provide in JSON format as {identificationNumber: , firstName: , lastName: , dob: ,doi: ,doe: }",
      },
      {
        inlineData: {
          mimeType: "image/jpeg",
          data: imageBase64,
        },
      },
    ];

    const result = await model.generateContent({
      contents: [{ role: "user", parts }],
    });
    const response = await result.response;
    return response.text();
    // console.log(response.text());
  } catch (error) {
    console.error("Error generating content:", error);
  }
};

// getTextFromImage();
module.exports = getTextFromImage;
