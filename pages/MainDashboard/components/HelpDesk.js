
import React from 'react';

const HelpDesk = () => {
  return (
    <div className="dashboard-card">
      <h3>Help Desk</h3>
      <p>If you need assistance or have any inquiries, our support team is ready to help you. You can contact us using the following methods:</p>
      <ul>
        <li><strong>Email:</strong> <a href="mailto:support@hospital.com">support@hospital.com</a></li>
        <li><strong>Phone Number:</strong> <a href="tel:+1234567890">+1 234 567 890</a></li>
        <li><strong>Operating Hours:</strong> Monday to Friday, 9:00 AM to 5:00 PM</li>
      </ul>
      <p>Feel free to reach out for any technical support, appointment queries, or other concerns. Our team will respond promptly.</p>
      <p>For emergencies, please call our main hospital line or visit the help desk in person.</p>
    </div>
  );
};

export default HelpDesk;
