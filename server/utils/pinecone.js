import { Pinecone } from '@pinecone-database/pinecone';
import { PINECONE_API_KEY } from '../configs/server.js';

const pinecone = new Pinecone({
  apiKey: PINECONE_API_KEY, 
  environment: 'gcp-starter',
});

const index = pinecone.index('files');

export const insertRecords = async (records) => {
  await index.upsert(records);
}
