const Recommendation = require("../models/recommendation");

exports.addRecommendation = async (req, res) => {
  try {
    const { doctorName, patientName, recommendation } = req.body;
    const newRecommendation = new Recommendation({
      doctorName,
      patientName,
      recommendation,
    });

    await newRecommendation.save();
    res.status(201).json({
      message: "Recommendation added successfully!",
      recommendation: newRecommendation,
    });
  } catch (error) {
    res.status(500).json({ error: "Error saving recommendation" });
  }
};

exports.getRecommendations = async (req, res) => {
  try {
    const recommendations = await Recommendation.find();
    res.status(200).json(recommendations);
  } catch (error) {
    res.status(500).json({ error: "Error fetching recommendations" });
  }
};
