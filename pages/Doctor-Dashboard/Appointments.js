import React, { useState, useEffect } from "react";
import axios from "axios";

const Appointments = () => {
  const [appointments, setAppointments] = useState([]);

  useEffect(() => {
    fetchAppointments();
  }, []);

  const fetchAppointments = async () => {
    try {
      const response = await axios.get("http://localhost:5000/api/appointments/view");
      setAppointments(response.data);
    } catch (error) {
      console.error("Error fetching appointments", error);
    }
  };

  return (
    <div>
      <h2>Doctor's Appointments</h2>
      {appointments.length === 0 ? (
        <p>No upcoming appointments.</p>
      ) : (
        <table border="1" style={{ width: "100%", borderCollapse: "collapse" }}>
          <thead>
            <tr>
              <th>Patient Name</th>
              <th>Address</th>
              <th>Problem</th>
              <th>Doctor Name</th>
              <th>Appointment Date</th>
            </tr>
          </thead>
          <tbody>
            {appointments.map((appointment) => (
              <tr key={appointment.id}>
                <td>{appointment.patientName}</td>
                <td>{appointment.address}</td>
                <td>{appointment.problem}</td>
                <td>{appointment.doctorName}</td>
                <td>{new Date(appointment.appointedDate).toLocaleString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default Appointments;
