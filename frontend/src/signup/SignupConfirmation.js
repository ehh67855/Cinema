import React from 'react';
import { Link } from 'react-router-dom'; // Assuming you're using react-router for navigation
import './SignupConfirmation.css'; // Custom CSS for styling

function SignupConfirmation() {
  return (
    <div className="confirmation-container">
      <div className="confirmation-card">
        <h2>Registration Successful!</h2>
        <p>Thank you for signing up. A confirmation email has been sent to your email address. Please follow the instructions in the email to activate your account.</p>
        <div className="confirmation-actions">
          <Link to="/login">Log In</Link>
        </div>
      </div>
    </div>
  );
}

export default SignupConfirmation;
