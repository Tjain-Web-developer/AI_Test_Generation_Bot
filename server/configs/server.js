import dotenv from "dotenv";

dotenv.config();

export const PORT = process.env.PORT;
export const GEMINI_API_KEY = process.env.GOOGLE_GEMINI_API_KEY;
export const PINECONE_API_KEY = process.env.PINECONE_API_KEY;
export const FRONTEND_URL = process.env.FRONTEND_URL;