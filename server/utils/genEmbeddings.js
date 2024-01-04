import { GoogleGenerativeAI } from "@google/generative-ai";
import { GEMINI_API_KEY } from "../configs/server.js";


// Access your API key as an environment variable (see "Set up your API key" above)
const genAI = new GoogleGenerativeAI(GEMINI_API_KEY);

async function generateEmbeddings(text) {
  // For embeddings, use the embedding-001 model
  const model = genAI.getGenerativeModel({ model: "embedding-001"});

  const result = await model.embedContent(text);
  const embedding = result.embedding;
  return embedding.values;
}

function isValidJSONString(str) {
  try {
    JSON.parse(str);
    return true;
  } catch (error) {
    return false;
  }
}

export const getQuiz = async (text) => {
  const model = genAI.getGenerativeModel({ model: "gemini-pro"});

  const prompt = `Give me 5 MCQ about the given text, provide the response of questions in the form of array of objects, having questions, choices and answer field for the given text \n ${text}`

  const result = await model.generateContent(prompt);
  const response = await result.response;
  const res = response.text();
  if(isValidJSONString(res)){
    let parsedData = JSON.parse(res);
    if(parsedData[0].choices.length < 1) return getQuiz();
    return JSON.parse(res);
  }
  return false;
}

export default generateEmbeddings;