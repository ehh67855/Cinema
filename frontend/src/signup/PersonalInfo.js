import {useState } from "react";
import { useEffect } from "react";

function PersonalInfo({updatePersonalInfo}) {

    const [email, setEmail] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [name, setName] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [isSubscribed, setIsSubscribed] = useState(false);

    useEffect(()=> {
        updatePersonalInfo({
            email:email,
            phoneNumber:phoneNumber,
            name:name,
            password:password,
            confirmPassword:confirmPassword,
            isSubscribed:isSubscribed
        })
        
    },{});

    return (
        <>
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
            <label htmlFor="name">Name *</label>
            <input
                type="text"
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
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
            <label>Sign Up For Promotions?</label> 
            <br />
            <label htmlFor="subscribe">Subscribe to promotions</label>
            <input
              type="checkbox"
              id="subscribe"
              checked={true}
              onChange={(e) => setIsSubscribed(e.target.checked)}
            />
            </div>
            <br></br>
        </>
    );
}

export default PersonalInfo;