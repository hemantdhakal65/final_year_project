
import React from 'react';

const HospitalInfo = () => {
  return (
    <div className="dashboard-card">
      <h3>Hospital Information</h3>
      <p><strong>Name:</strong> ABC Hospital</p>
      <p><strong>Location:</strong> 123 Health Street, City XYZ</p>
      <p><strong>Contact Number:</strong> <a href="tel:+1234567890">+123 456 7890</a></p>
      <p><strong>Email:</strong> <a href="mailto:info@abchospital.com">info@abchospital.com</a></p>
      <p><strong>Website:</strong> <a href="https://www.abchospital.com" target="_blank" rel="noopener noreferrer">www.abchospital.com</a></p>
      
      <h4>Operating Hours</h4>
      <p><strong>General Services:</strong> Monday to Friday, 8:00 AM - 8:00 PM</p>
      <p><strong>Emergency Department:</strong> Open 24/7</p>
      <p><strong>Outpatient Clinics:</strong> Monday to Friday, 9:00 AM - 5:00 PM</p>

      <h4>Facilities & Services</h4>
      <ul>
        <li>Emergency Room (ER)</li>
        <li>Intensive Care Unit (ICU)</li>
        <li>General Surgery</li>
        <li>Pediatrics</li>
        <li>Cardiology</li>
        <li>Oncology</li>
        <li>Radiology and Imaging</li>
        <li>Pharmacy</li>
        <li>Laboratory Services</li>
      </ul>

      <h4>Departments</h4>
      <ul>
        <li><strong>Cardiology Department</strong> - Specialists in heart-related conditions.</li>
        <li><strong>Orthopedics Department</strong> - Experts in bone and joint issues.</li>
        <li><strong>Neurology Department</strong> - For neurological conditions and brain health.</li>
        <li><strong>Oncology Department</strong> - Comprehensive cancer care and treatment.</li>
        <li><strong>Pediatrics Department</strong> - Child healthcare and pediatric specialists.</li>
      </ul>

      <h4>Contact Us</h4>
      <p>If you have any questions or need further information, feel free to reach out to our support team or visit our website for more details.</p>
    </div>
  );
};

export default HospitalInfo;
