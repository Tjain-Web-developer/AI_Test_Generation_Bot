import mongoose from "mongoose";

const documentSchema = new mongoose.Schema({
  name: String,
  embedding: [Number], // Array to store the vector embedding
  text: String
}, {timestamps: true});

export default mongoose.model('Document', documentSchema);
