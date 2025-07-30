import Suggestion from "../models/suggestion.model.js";

export const suggestion = async (req, res) => {
  const { name, suggestion } = req.body;

  if (!suggestion) {
    return res.status(400).json({ error: "Suggestion is required" });
  }

  try {
    // ✅ Corrected: Use either .create() or new + .save()
    const newSuggestion = await Suggestion.create({
      name: name || "Anonymous",
      suggestion,
    });

    console.log("📩 Saved Suggestion:", newSuggestion);
    res.status(201).json({ message: "Suggestion saved", entry: newSuggestion });
  } catch (error) {
    console.error("❌ Error saving suggestion:", error.message);
    res.status(500).json({ error: "Failed to save suggestion" });
  }

};