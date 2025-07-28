
import React from 'react';

const PharmacyInfo = () => {
  return (
    <div className="dashboard-card">
      <h3>Pharmacy Information</h3>
      <p><strong>Operating Hours:</strong> 9:00 AM - 6:00 PM (Monday to Saturday)</p>
      <p><strong>Location:</strong> Block B, Ground Floor</p>

      <h4>Pharmacy Contact</h4>
      <p><strong>Phone Number:</strong> <a href="tel:+1234567890">+123 456 7890</a></p>
      <p><strong>Email:</strong> <a href="mailto:pharmacy@abchospital.com">pharmacy@abchospital.com</a></p>

      <h4>Available Medicines</h4>
      <p>We offer a wide range of medicines for all kinds of health conditions. Below is a list of some of the most commonly available medicines and their prices:</p>
      <ul>
        <li><strong>Paracetamol</strong> - $5 per bottle (500mg, 20 tablets)</li>
        <li><strong>Amoxicillin</strong> - $10 per pack (250mg, 30 capsules)</li>
        <li><strong>Ibuprofen</strong> - $8 per bottle (200mg, 30 tablets)</li>
        <li><strong>Metformin</strong> - $12 per pack (500mg, 30 tablets)</li>
        <li><strong>Salbutamol Inhaler</strong> - $15 per inhaler</li>
        <li><strong>Losartan</strong> - $18 per pack (50mg, 30 tablets)</li>
        <li><strong>Insulin</strong> - $20 per vial (10ml)</li>
        <li><strong>Paroxetine</strong> - $25 per pack (20mg, 30 tablets)</li>
      </ul>

      <h4>Pharmacy Services</h4>
      <ul>
        <li>Prescription Medicines: Available with a valid doctor's prescription.</li>
        <li>Over-the-Counter Medicines: Available without a prescription, including painkillers, cold remedies, and more.</li>
        <li>Health Products: We stock a variety of health and wellness products, including vitamins, supplements, and personal care items.</li>
        <li>Medication Counseling: Our pharmacists provide advice on how to take your medications and possible side effects.</li>
        <li>Refill Services: You can refill your prescription at any time during pharmacy hours.</li>
        <li>Home Delivery: We offer home delivery services for medications, with a nominal fee.</li>
      </ul>

      <h4>Payment Methods</h4>
      <p>We accept the following payment methods for all pharmacy purchases:</p>
      <ul>
        <li>Cash</li>
        <li>Credit/Debit Cards (Visa, MasterCard, American Express)</li>
        <li>Mobile Payments (PayPal, Apple Pay, Google Pay)</li>
      </ul>

      <h4>Important Notice</h4>
      <p>Please note that some medicines may require a prescription from a doctor. Always consult a healthcare provider before taking new medication, and inform the pharmacist about any ongoing treatments to avoid drug interactions.</p>
    </div>
  );
};

export default PharmacyInfo;
