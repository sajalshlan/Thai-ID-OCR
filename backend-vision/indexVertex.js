//trying something with vertex ai api
const { GoogleGenerativeAI } = require("@google/generative-ai");
const fs = require("fs").promises;
const dotenv = require("dotenv");
dotenv.config();

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

async function generateContent() {
  try {
    // Load image
    const imagePath = "./aa.jpg";
    const imageData = await fs.readFile(imagePath);
    const imageBase64 = imageData.toString("base64");

    // Define parts
    const parts = [
      {
        text: "Extract the following details from the Thai ID Card provided - Identification Number, Name, Date of Birth, Religion, Address, Date of Issue, Issuing Officer, Expiry Date. Provide in JSON format in English Language. :\n",
      },
      {
        inlineData: {
          mimeType: "image/jpeg",
          data: imageBase64,
        },
      },
    ];

    // Generate content using both text and image input
    const result = await model.generateContent({
      contents: [{ role: "user", parts }],
    });
    const response = await result.response;
    console.log(response.text());
  } catch (error) {
    console.error("Error generating content:", error);
  }
}

// Run the function
generateContent();
