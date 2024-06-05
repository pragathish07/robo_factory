import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPhone, faEnvelope, faQuestionCircle, faComments } from '@fortawesome/free-solid-svg-icons';
import './CustomerSupport.css';

const faqs = [
  { question: 'How can I track my order?', answer: 'You can track your order using the tracking link provided in your order confirmation email.' },
  { question: 'What is your return policy?', answer: 'We accept returns within 30 days of purchase. Please ensure the product is in its original condition.' },
  // Add more FAQs as needed
];

const CustomerSupport = () => {
  return (
    <div className="customer-support">
      <div className="support-info">
        <h2>Customer Support</h2>
        <p>If you have any questions or need assistance, please fill out the form below or contact us directly at:</p>
        <p><FontAwesomeIcon icon={faEnvelope} /> <strong>Email:</strong> support@example.com</p>
        <p><FontAwesomeIcon icon={faPhone} /> <strong>Phone:</strong> 123-456-7890</p>
      </div>
      
      <div className="faqs">
        <h2>Frequently Asked Questions <FontAwesomeIcon icon={faQuestionCircle} /></h2>
        {faqs.map((faq, index) => (
          <div key={index} className="faq">
            <h3>{faq.question}</h3>
            <p>{faq.answer}</p>
          </div>
        ))}
      </div>
      
    </div>
  );
};

export default CustomerSupport;
