import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function ActivateAccount() {
  const [token, setToken] = useState('');
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  const handleActivation = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`http://localhost:8080/activate-account`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ token })
      });
      if (response.ok) {
        setMessage('Account activated successfully. You can now login.');
        navigate('/login');
      } else {
        const data = await response.json();
        setMessage(data.message || 'Activation failed. Please check the token and try again.');
      }
    } catch (error) {
      setMessage('Error activating account.');
    }
  };

  return (
    <div>
      <h1>Account Activation</h1>
      <form onSubmit={handleActivation}>
        <label htmlFor="token">Activation Code:</label>
        <input
          type="text"
          id="token"
          value={token}
          onChange={(e) => setToken(e.target.value)}
          required
        />
        <button type="submit">Activate Account</button>
      </form>
      <p>{message}</p>
    </div>
  );
}

export default ActivateAccount;
