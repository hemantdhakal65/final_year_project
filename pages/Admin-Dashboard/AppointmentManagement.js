import React, { useState } from "react";
import axios from "axios";

const AppointmentManagement = () => {
  const [appointment, setAppointment] = useState({
    patientName: "",
    address: "",
    problem: "",
    doctorName: "",
    appointedDate: "",
  });

  const handleChange = (e) => {
    setAppointment({ ...appointment, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:5000/api/appointments/add", appointment);
      alert("Appointment added successfully!");
      setAppointment({ patientName: "", address: "", problem: "", doctorName: "", appointedDate: "" });
    } catch (error) {
      console.error("Error adding appointment", error);
    }
  };

  return (
    <div style={styles.container}>
      <h2>Manage Appointments</h2>
      <form onSubmit={handleSubmit} style={styles.form}>
        <input
          type="text"
          name="patientName"
          placeholder="Patient Name"
          value={appointment.patientName}
          onChange={handleChange}
          required
          style={styles.input}
        />
        <input
          type="text"
          name="address"
          placeholder="Address"
          value={appointment.address}
          onChange={handleChange}
          required
          style={styles.input}
        />
        <input
          type="text"
          name="problem"
          placeholder="Problem"
          value={appointment.problem}
          onChange={handleChange}
          required
          style={styles.input}
        />
        <input
          type="text"
          name="doctorName"
          placeholder="Doctor Name"
          value={appointment.doctorName}
          onChange={handleChange}
          required
          style={styles.input}
        />
        <input
          type="datetime-local"
          name="appointedDate"
          value={appointment.appointedDate}
          onChange={handleChange}
          required
          style={styles.input}
        />
        <button type="submit" style={styles.button}>Add Appointment</button>
      </form>
    </div>
  );
};


const styles = {
  container: {
    marginTop: '20px',
    paddingLeft: '20px',  
  },

  input: {
    padding: '10px',
    fontSize: '16px',
    borderRadius: '5px',
    border: '1px solid #ccc',
  },
  button: {
    padding: '12px 20px',
    fontSize: '16px',
    backgroundColor: '#007bff',
    color: 'white',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
  },
};

export default AppointmentManagement;
