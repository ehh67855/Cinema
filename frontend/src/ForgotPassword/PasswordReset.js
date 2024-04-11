import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';


function PasswordReset() {
  const [email, setEmail] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword,setConfirmPassword] = useState('');

  let token = new URLSearchParams(useLocation().search).get("token");

   const handleSubmit = async (e) => {
    console.log(token);

    e.preventDefault();

    if (newPassword !== confirmPassword) {
      alert("Passwords do not match");
      return null;
    }
    try {
      await fetch(`http://localhost:8080/reset-password/${token}`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ 
              login: email, 
              password: newPassword
            })
          })
          .then(response => {
            if (response.status === 200) {
                return response.json();
            } else if (response.status === 403) {
                alert ("Invalid token or token is not valid for given user. Request a reset password email to receive a valid token");
            } else if (response.status === 404) {
                alert("Email not found");
          } else {
                console.log(response.status);
                alert("Something went wrong");
                return null;
            }
        }).then(data => {
            if (data) {
              alert("Password successfully updated");
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
    <div>
      <h2>Reset Password</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Email:</label> <br></br>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div>
          <label>New Password:</label> <br></br>
          <input
            type="password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Confirm Password:</label> <br></br>
          <input
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit">Reset Password</button> <br></br>
        <a href="forgot-password">Request reset password email</a>
      </form>
    </div>
  );
}

export default PasswordReset;
