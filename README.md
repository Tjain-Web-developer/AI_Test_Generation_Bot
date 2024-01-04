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
    git clone [repository_url]
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

- [Google Gemini API](https://example.com/google-gemini-api-key)
- [Pinecone API](https://example.com/pinecone-api-key)

## Contributing

Feel free to contribute to the project by opening issues or submitting pull requests.

## License

This project is licensed under the [MIT License](LICENSE).

---

Replace `[repository_url]` with your actual repository URL. Modify the placeholder URLs in the API Key Generation section with the correct URLs for obtaining the respective API keys.
