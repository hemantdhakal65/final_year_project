const Appointment = require("../models/appointment");


exports.addAppointment = async (req, res) => {
  try {
    const newAppointment = new Appointment(req.body);
    await newAppointment.save();
    res.status(201).json({ message: "Appointment added successfully!" });
  } catch (error) {
    res.status(500).json({ error: "Error saving appointment" });
  }
};


exports.getAppointments = async (req, res) => {
  try {
    const currentTime = new Date();
    const appointments = await Appointment.find({ appointedDate: { $gte: currentTime } });
    res.status(200).json(appointments);
  } catch (error) {
    res.status(500).json({ error: "Error fetching appointments" });
  }
};


exports.cleanupAppointments = async () => {
  try {
    const currentTime = new Date();
    await Appointment.deleteMany({ appointedDate: { $lt: currentTime } });
    console.log("Expired appointments deleted.");
  } catch (error) {
    console.error("Error deleting old appointments:", error);
  }
};
