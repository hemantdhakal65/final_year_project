import React, { useState } from "react";
import axios from "axios";

const Recommendations = () => {
  const [doctorName, setDoctorName] = useState("Dr. Smith"); 
  const [patientName, setPatientName] = useState("");
  const [recommendation, setRecommendation] = useState([]);
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:5000/api/recommendations/add", {
        doctorName,
        patientName,
        recommendation,
      });
      setMessage(response.data.message);
      setPatientName("");
      setRecommendation("");
    } catch (error) {
      setMessage("Error adding recommendation");
    }
  };

  return (
    <div>
      <h2>Add Recommendation</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Doctor's Name:</label>
          <input
            type="text"
            value={doctorName}
            onChange={(e) => setDoctorName(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Patient Name:</label>
          <input
            type="text"
            value={patientName}
            onChange={(e) => setPatientName(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Recommendation:</label>
          <textarea
            value={recommendation}
            onChange={(e) => setRecommendation(e.target.value)}
            required
          />
        </div>
        <button type="submit">Add Recommendation</button>
      </form>
      {message && <p>{message}</p>}
    </div>
  );
};

export default Recommendations;
