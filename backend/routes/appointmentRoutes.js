const express = require("express");
const appointmentController = require("../controllers/appointmentController");

const router = express.Router();

router.post("/add", appointmentController.addAppointment);
router.get("/view", appointmentController.getAppointments);

module.exports = router;
