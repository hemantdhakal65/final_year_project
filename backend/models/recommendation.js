const mongoose = require("mongoose");

const recommendationSchema = new mongoose.Schema({
  doctorName: {
    type: String,
    required: true,
  },
  patientName: {
    type: String,
    required: true,
  },
  recommendation: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Recommendation", recommendationSchema);
