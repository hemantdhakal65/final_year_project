import React, { useState, useEffect } from "react";
import axios from "axios";

const ViewRecommendations = () => {
  const [recommendations, setRecommendations] = useState([]);

  useEffect(() => {
    const fetchRecommendations = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/recommendations/view");
        setRecommendations(response.data);
      } catch (error) {
        console.error("Error fetching recommendations", error);
      }
    };

    fetchRecommendations();
  }, []);

  return (
    <div>
      <h2>View Recommendations</h2>
      {recommendations.length === 0 ? (
        <p>No recommendations available.</p>
      ) : (
        <ul>
          {recommendations.map((recommendation) => (
            <li key={recommendation._id}>
              <strong>Doctor:</strong> {recommendation.doctorName} <br />
              <strong>Patient:</strong> {recommendation.patientName} <br />
              <strong>Recommendation:</strong> {recommendation.recommendation} <br />
              <strong>Date:</strong> {new Date(recommendation.date).toLocaleString()}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default ViewRecommendations;
