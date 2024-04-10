import { useState } from "react";

function PersonalInformationForm({firstName,lastName,phoneNumber,isSubscribed}) {

    const [firstNameInput,setFirstNameInput] = useState('');
    const [lastNameInput,setLastNameInput] = useState('');
    const [phoneNumberInput,setPhoneNumberInput] = useState();
    const [isSubscribedInput,setIsSubscribedInput] = useState();

    const updatePersonalInformation = () => {

    };

    return (
        <form >
            <h1>Edit Peronsal Information</h1>
            <label htmlFor="firstName">First Name</label>
            <input
              type="text"
              id="firstName"
              value={firstName}
              onChange={(e) => setFirstNameInput(e.target.value)}
              required
            /> 
            <br></br>

            <label htmlFor="lastName">Last Name</label>
            <input
              type="text"
              id="lastName"
              value={lastName}
              onChange={(e) => setLastNameInput(e.target.value)}
              required
            />
            <br></br>

            <label htmlFor="phoneNumber">Phone Number</label>
            <input
              type="tel"
              inputMode='numeric'
              id="phoneNumber"
              value={phoneNumber}
              onChange={(e) => setPhoneNumberInput(e.target.value)}
              required
            />
            <br></br>

            <label htmlFor="subscribe">Subscribe to promotions</label>
            <input
              type="checkbox"
              id="subscribe"
              checked={isSubscribed}
              onChange={(e) => setIsSubscribedInput(e.target.checked)}
            />
            <br></br>
            <a className="btn btn-primary" onClick={updatePersonalInformation()}>Update Peronsal Information</a>
        </form>
    );
}

export default PersonalInformationForm;