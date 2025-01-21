// index.js
const express = require("express");
const multer = require("multer");
const pdfParse = require("pdf-parse");
const tesseract = require("tesseract.js");
const axios = require("axios");
const dotenv = require("dotenv");
const cors = require("cors");
const fs = require("fs");
const path = require("path");

// Load environment variables
dotenv.config();

const app = express();
const port = 4000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Multer setup for file uploads
const upload = multer({ dest: "uploads/" });

// Hugging Face API configuration
const HUGGINGFACE_API_KEY = process.env.HUGGINGFACE_API_KEY;
const HUGGINGFACE_API_URL = "https://api-inference.huggingface.co/models/facebook/bart-large-cnn";

// Route for uploading files and summarizing
app.post("/upload", upload.single("document"), async (req, res) => {
  try {
    const file = req.file;

    if (!file) {
      return res.status(400).send("No file uploaded.");
    }

    let extractedText = "";

    if (file.mimetype === "application/pdf") {
      // Extract text from PDF
      const data = await pdfParse(fs.readFileSync(file.path));
      extractedText = data.text;
    } else if (file.mimetype.startsWith("image/")) {
      // Perform OCR on image
      const result = await tesseract.recognize(file.path);
      extractedText = result.data.text;
    } else {
      return res.status(400).send("Unsupported file type. Please upload a PDF or an image.");
    }

    // Send text to Hugging Face API
    const response = await axios.post(
      HUGGINGFACE_API_URL,
      { inputs: extractedText },
      {
        headers: {
          Authorization: `Bearer ${HUGGINGFACE_API_KEY}`,
        },
      }
    );

    const summary = response.data[0]?.summary_text || "No summary generated.";
    res.status(200).json({ summary });
  } catch (error) {
    console.error(error);
    res.status(500).send("Error processing the document.");
  }
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
