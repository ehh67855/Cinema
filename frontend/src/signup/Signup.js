import React, { useState } from 'react';
import './Signup.css'; // Assuming you'll have similar styling with possible additions
import { useNavigate } from 'react-router-dom';
import { getAuthToken, getLogin, isAdmin, isUser } from 'src/services/BackendService';

function Signup() {
  // personal info
  const [email, setEmail] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');

  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  // misc info
  const [isSubscribed, setIsSubscribed] = useState(false);
  // card info
  const [cardNumber, setCardNumber] = useState('');
  const [cardType, setCardType] = useState('');
  const [cardExpiry, setCardExpiry] = useState('');
  const [billingAddr, setBillingAddr] = useState('');
  // home address info
  const [street, setStreet] = useState('');
  const [city, setCity] = useState('');
  const [state, setState] = useState('');
  const [zipCode, setZipCode] = useState('');
  
  const navigate = useNavigate();

  const handleSignup = async (e) => {
    e.preventDefault();

    // Validate mandatory personal information fields
    if (!email || !phoneNumber || !firstName || !lastName || !password || !confirmPassword) {
      alert("Please fill out all required personal information fields.");
      return;
    }

    // Check password confirmation
    if (password !== confirmPassword) {
      alert("Password and Confirm Password do not match.");
      return;
    }

    // Validate optional card information
    const cardFields = [cardNumber, cardType, cardExpiry, billingAddr];
    const cardFieldsFilled = cardFields.every(field => field !== "");
    const cardFieldsPartiallyFilled = cardFields.some(field => field !== "");

    if (cardFieldsPartiallyFilled && !cardFieldsFilled) {
      alert("Please fill out all or none of the card information fields.");
      return;
    }

    // Validate optional home address information
    const addressFields = [street, city, state, zipCode];
    const addressFieldsFilled = addressFields.every(field => field !== "");
    const addressFieldsPartiallyFilled = addressFields.some(field => field !== "");

    if (addressFieldsPartiallyFilled && !addressFieldsFilled) {
      alert("Please fill out all or none of the home address information fields.");
      return;
    }

    // Proceed with user creation
    await postUser(cardFieldsFilled,addressFieldsFilled);
  };


  const postUser = async (cardFieldsFilled,addressFieldsFilled) => {
    try {
      await fetch("http://localhost:8080/register", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ 
              cardFieldsFilled:cardFieldsFilled,
              addressFieldsFilled:addressFieldsFilled,
              login: email, 
              phoneNumber:phoneNumber,
              firstName:firstName,
              lastName:lastName,
              password: password,
              isSubscribed:isSubscribed,
              cardNumber:cardNumber,
              cardType:cardType,
              cardExpiry:cardExpiry,
              billingAddr:billingAddr,
              street:street,
              city:city,
              state:state,
              zipCode:zipCode
            })
          })
          .then(response => {
            if (response.status === 201) {
                return response.json();
            } else if (response.status === 400) {
                alert("Email is already in use");
            } else if (response.status === 401) {
              alert ("Could not validate user email");
            } else{
                alert("Something went wrong");
                return null;
            }
        }).then(data => {
            if (data) {
                console.log("User registered successfully:", data);
                if (isAdmin(getAuthToken())) {
                  alert("User has been created")
                } else {
                  window.location.href = "/signup-confirmation";
                }
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
    <div className="signup-container">
      {!isAdmin(getAuthToken()) && <h2 id="signup-label">Sign Up</h2>}
      
      <form>
      <h3 className="category-label">Personal Information</h3>
      <h6 className="required">All fields marked with an * are required</h6>
        <div className="input-group">
          <br/>
          <label htmlFor="email">Email *</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            placeholder='example@gmail.com'
          />
          
        </div>
        <div className="input-group">
          <label htmlFor="phone">Phone Number *</label>
          <input
            type="tel"
            id="phone"
            value={phoneNumber}
            onChange={(e) => setPhoneNumber(e.target.value)}
            required
            placeholder='123-456-7890'
          />
        </div>

        <div className="input-group">
          <label htmlFor="firstName">First Name *</label>
          <input
            type="text"
            id="firstName"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            required
            placeholder='Bob Jones'
          />
        </div>

        <div className="input-group">
          <label htmlFor="lastName">Last Name *</label>
          <input
            type="text"
            id="lastName"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            required
            placeholder='Bob Jones'
          />
        </div>

        <div className="input-group">
          <label htmlFor="password">Password *</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            placeholder='Enter a password'
          />
        </div>

        <div className="input-group">
          <label htmlFor="confirm-password">Confirm Password *</label>
          <input
            type="password"
            id="confirm-password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
            placeholder='Retype your password'
          />
        </div>

        <div id="promotions">
            <br />
            <label htmlFor="subscribe">Subscribe to promotions</label>
            <input
              type="checkbox"
              id="subscribe"
              checked={true}
              onChange={(e) => setIsSubscribed(e.target.checked)}
            />
        </div>
        <br />
        {!isAdmin(getAuthToken()) ? <h3 className='category-label'>Enter Credit Card Information (Optional)</h3> : <h3 className='category-label'>Enter Credit Card Information</h3>}

        <div className="input-group">
          <label htmlFor="cardNumber">Card Number</label>
          <input
            type="number"
            inputMode='numeric'
            id="cardNumber"
            value={cardNumber}
            onChange={(e) => setCardNumber(e.target.value)}
            placeholder='12345678910123456'
          />
        </div>

        <div className="input-group">
          <label htmlFor="cardType">Card Type</label>
          <input
            type="text"
            id="cardType"
            value={cardType}
            onChange={(e) => setCardType(e.target.value)}
            placeholder='Type in your card Type'
          />
        </div>

        <div className="input-group">
          <label htmlFor="cardExpiry">Expiry Date</label>
          <input
            type="month"
            id="cardExpiry"
            placeholder="MM/YY"
            value={cardExpiry}
            onChange={(e) => setCardExpiry(e.target.value)}
          />
        </div>

        <div className="input-group">
          <label htmlFor="card-address">Billing Address</label>
          <input 
            type="text"
            id="card-address"
            value={billingAddr}
            onChange={(e) => setBillingAddr(e.target.value)}
            placeholder="1234 Main Street"
          />
        </div>
        <br />
        {/* Home Address */}
        {!isAdmin(getAuthToken()) ? <h3 className='category-label'>Enter Home Address Information (Optional)</h3> : <h3 className='category-label'>Enter Home Address Information</h3>}
        <div className="input-group">
          <label htmlFor="street">Street</label>
          <input
            type="text"
            id="street"
            value={street}
            onChange={(e) => setStreet(e.target.value)}
            placeholder='S Lumpkin St'
          />
        </div>
        
        <div className="input-group">
          <label htmlFor="city">City</label>
          <input
            type="text"
            id="city"
            value={city}
            onChange={(e) => setCity(e.target.value)}
            placeholder='Athens'
          />
        </div>

        <div className='input-group'>
          <label htmlFor='state'>State</label>
          <input 
            type="text"
            id="state"
            value={state}
            onChange={(e) => setState(e.target.value)}
            placeholder='Georgia'
            />
        </div>

        <div className="input-group">
          <label htmlFor="zipCode">Zip Code</label>
          <input
            type="number"
            inputMode='numeric'
            id="zipCode"
            value={zipCode}
            onChange={(e) => setZipCode(e.target.value)}
            placeholder='30604'
          />
        </div>
        {!isAdmin(getAuthToken()) ?  
              <><div className="actions">
              <a className = "btn btn-primary" onClick={handleSignup}>Sign up</a>
              </div> <div className="login-link">
              Already registered? <a href="/login">Log in</a>
              </div> </>
              : 
            <div className="actions">
            <a className = "btn btn-primary" onClick={handleSignup}>Add User</a>
        </div>}

        
        
        </form>
    </div>
  );
}

export default Signup;
