# MERN Stack Quiz Generator

Welcome to the MERN Stack Quiz Generator project! This web application allows users to upload PDF files, generate quizzes based on the content of the files, play quizzes, and download them. The project is built using the MERN (MongoDB, Express.js, React, Node.js) stack.

## Getting Started

### Prerequisites

Make sure you have the following installed:

- Node.js and npm
- MongoDB
- Visual Studio Code (or any preferred code editor)

### Installation

1. Clone the repository:

    ```bash
    git clone https://github.com/Tjain-Web-developer/AI_Test_Generation_Bot.git
    ```

2. Navigate to the client folder:

    ```bash
    cd client
    ```

3. Install dependencies:

    ```bash
    npm install
    ```

4. Create a `.env` file at the root of the client directory with the following content:

    ```
    VITE_BACKEND_URL="Your Backend base URL"
    ```

5. Run the frontend server:

    ```bash
    npm run dev
    ```

6. Navigate to the server folder:

    ```bash
    cd ../server
    ```

7. Install server dependencies:

    ```bash
    npm install
    ```

8. Create a `.env` file at the root of the server directory with the following content:

    ```
    PORT="Specify port at which backend will run"
    GOOGLE_GEMINI_API_KEY="Your Google Gemini API key"
    PINECONE_API_KEY="Your Pinecone API key"
    FRONTEND_URL="Your frontend URL"
    ```

9. Start the server:

    ```bash
    npm start
    ```

   If you have nodemon installed, you can use:

    ```bash
    nodemon
    ```

## API Key Generation

To obtain API keys for Google Gemini API and Pinecone API, visit the following websites:

- [Google Gemini API](https://makersuite.google.com/app/apikey)
- [Pinecone API](https://docs.pinecone.io/docs/quickstart#2-get-your-api-key)

## Troubleshooting

### File Not Found Error

If you encounter the following error when running the server:

```bash
node:fs:581
  return binding.open(
                 ^

Error: ENOENT: no such file or directory, open 'path/to/file.pdf'
    at Object.openSync (node:fs:581:18)
    at Object.readFileSync (node:fs:457:35)
    at Object.<anonymous> (path/to/your/project/server/node_modules/pdf-parse/index.js:15:25)
    ...
```

#### Solution:

1. Navigate to the `server` folder:

    ```bash
    cd server
    ```

2. Open the `node_modules/pdf-parse/index.js` file in a text editor.

3. Locate the following code at line number 6:

    ```javascript
    let isDebugMode = !module.parent;
    ```

4. Replace it with the following:

    ```javascript
    let isDebugMode = false;
    ```

5. Save the file and restart your server.

This change sets the `isDebugMode` variable to `false`, which should resolve the file not found issue. If the problem persists, consider checking the path specified in the error message and ensuring that the file exists at the specified location.

## Contributing

Feel free to contribute to the project by opening issues or submitting pull requests.

## License

This project is licensed under the [MIT License](LICENSE).

--------------------------------------------------------------------------------------------------------------------------

## AI Test Bot Development Summary Report

**Introduction:**
The AI Test Bot automates the process of generating MCQ quizzes from PDF files, allowing users to play quizzes and store quiz information. The system involves PDF parsing, embedding generation, and integration with the Pinecone database.

**Approach:**
1. **PDF Processing:**
   - Used PDF parsing libraries (pdf-parse, pdfreader) for accurate text extraction from diverse PDF formats.
   - Ensured robust handling of different PDF layouts for improved information extraction.

2. **Embedding Generation:**
   - Integrated Google's Generative AI for generating comprehensive vector embeddings.
   - Incorporated Langchain for semantic knowledge graph construction and reasoning.
   - Utilized Pinecone for efficient storage and retrieval of embeddings.

3. **Test Question Generation:**
   - Implemented algorithms for diverse and challenging test questions.
   - Supported both objective and subjective question formats.

4. **User Interface:**
   - Designed an intuitive web interface using React and Next.js for seamless interaction.
   - Enabled users to upload PDF files, specify topics, generate/view test questions, and export quizzes in PDF format.

**Challenges Faced:**
1. **Integration with External Models:**
   - Overcame challenges in integrating external models like Google's Generative AI and Langchain.
   - Ensured compatibility and smooth collaboration between components.

2. **PDF Parsing Accuracy:**
   - Fine-tuned parsing techniques for high accuracy, addressing challenges with diverse layouts.

3. **Bias Mitigation:**
   - Implemented strategies to reduce bias in question generation for fair assessments.

**Suggestions for Improvement:**
1. **Enhanced Error Handling:**
   - Implement robust error-handling mechanisms for graceful handling of unexpected scenarios.

2. **User Feedback Mechanism:**
   - Integrate a feedback mechanism for continuous improvement and customization.

3. **Scalability Considerations:**
   - Explore architectural designs for scalability to accommodate larger datasets and increased user traffic.

**Conclusion:**
The AI Test Bot fulfills requirements, offering a comprehensive solution for PDF-based quiz generation and storage. The summary report provides insights into the approach, challenges, and suggestions for further improvements.
