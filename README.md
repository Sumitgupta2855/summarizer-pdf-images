# summarizer-pdf-images
summarizer-pdf-images

PDF & Image Summarizer

This project is a web-based application that allows users to upload PDF and image files and generates concise summaries of their content using the Hugging Face API and Node.js. The project demonstrates the integration of backend and frontend technologies for a seamless user experience.


---

Features

File Upload: Supports PDF and image files for processing.

Text Extraction: Extracts text from uploaded documents or images using OCR (for images).

Summarization: Generates summaries using Hugging Face's facebook/bart-large-cnn model.

Responsive Frontend: Built with HTML, CSS, and JavaScript for ease of use.

API Integration: Communicates with Hugging Face API for advanced text summarization.



---

Tech Stack

Frontend

HTML: Structure of the application.

CSS: Styling for a user-friendly interface.

JavaScript: Handles form submissions and interacts with the backend.


Backend

Node.js: Backend server and API integration.

Express.js: Framework for building RESTful APIs.

Multer: Handles file uploads.

Tesseract.js: OCR for image text extraction.

pdf-parse: Extracts text from PDF files.


API

Hugging Face API: Used for text summarization.



---

Installation

Prerequisites

Node.js installed on your system.

A Hugging Face API key.


Steps

1. Clone the repository:

git clone https://github.com/Sumitgupta2855/Pdf-Summarizer.git


2. Navigate to the project directory:

cd Pdf-Summarizer


3. Install dependencies:

npm install


4. Create a .env file in the root directory and add your Hugging Face API key:

HUGGING_FACE_API_KEY=your_huggingface_api_key


5. Start the server:

node server.js




---

Usage

1. Start the backend server:

node server.js


2. Open index.html in a web browser.


3. Upload a PDF or image file using the provided form.


4. Click "Summarize" to generate the summary.


5. View the summarized content displayed on the page
