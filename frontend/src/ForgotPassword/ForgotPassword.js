import React, { useState } from 'react';
import './ForgotPassword.css'; // Make sure to create and link a corresponding CSS file for styling

function ForgotPassword() {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false); // Added to handle loading state

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true); // Start loading
    console.log(`Password reset request for: ${email}`);

    try {
      const response = await fetch('http://localhost:8080/api/auth/forgot-password', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
      });

      if (response.ok) {
        console.log('Password reset email sent successfully.');
        setSubmitted(true); // Show the confirmation message
      } else {
        console.error('Failed to send password reset email.');
        // Handle errors or show a message to the user
      }
    } catch (error) {
      console.error('Error sending password reset email:', error);
      // Handle network errors or show a message to the user
    }

    setIsLoading(false); // End loading
  };

  return (
    <div className="forgot-password-container">
      <form className="forgot-password-form" onSubmit={handleSubmit}>
        <h2>Forgot Password</h2>
        {!submitted ? (
          <>
            <div className="input-group">
              <label htmlFor="email">Email Address</label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div className="actions">
              <button type="submit" disabled={isLoading}>
                {isLoading ? 'Submitting...' : 'Submit'}
              </button>
            </div>
          </>
        ) : (
          <div className="confirmation-message">
            <p>If an account exists for {email}, you will receive an email with instructions to reset your password.</p>
          </div>
        )}
      </form>
    </div>
  );
}

export default ForgotPassword;
