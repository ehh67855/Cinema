import React, { useState } from 'react';
import './ForgotPassword.css'; // Make sure to create and link a corresponding CSS file for styling

function ForgotPassword() {
  const [email, setEmail] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await fetch("http://localhost:8080/forgot-password", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ 
              login: email, 
            })
          })
          .then(response => {
            if (response.status === 200) {
                return response.json();
            } else if (response.status === 208) {
                alert("An email has already been sent");
            } else if (response.status === 404) {
                alert ("Could not find email");
            } else {
                console.log(response.status);
                alert("Something went wrong");
                return null;
            }
        }).then(data => {
            if (data) {
                alert("An email has been sent to your inbox");
            }
        })
        .catch(error => {
            console.error("Error occurred during registration:", error);
        })
    } catch (error) {
      console.error(error);
    }

  }

  return (
    <div className="forgot-password-container">
      <form className="forgot-password-form" onSubmit={handleSubmit}>
        <h2>Forgot Password</h2>
        
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
              <button type="submit">
                Submit
              </button>
            </div>
          </>
        
      </form>
    </div>
  );
}

export default ForgotPassword;
