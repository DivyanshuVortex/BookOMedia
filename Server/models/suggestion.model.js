import mongoose from "mongoose";

const suggestionSchema = new mongoose.Schema({
  name: String,
  suggestion: { type: String, required: true },
  date: { type: Date, default: Date.now }
});

export default mongoose.model("Suggestion", suggestionSchema);
