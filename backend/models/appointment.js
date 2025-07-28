
const mongoose = require("mongoose");

const appointmentSchema = new mongoose.Schema(
  {
    patientName: {
      type: String,
      required: true,
    },
    address: {
      type: String,
      required: true,
    },
    problem: {
      type: String,
      required: true,
    },
    doctorName: {
      type: String,
      required: true,
    },
    appointedDate: {
      type: Date,
      required: true,
    },
  },
  { timestamps: true }
);

const Appointment = mongoose.model("Appointment", appointmentSchema);
module.exports = Appointment;
