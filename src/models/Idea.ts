import mongoose from "mongoose";
const IdeaSchema = new mongoose.Schema({
  title: String,
  created: { type: Date, default: Date.now },
  description: String
});
export const Idea = mongoose.model("Idea", IdeaSchema);
