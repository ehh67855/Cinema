import { useState } from "react";
import "./PersonalInformationForm.css";
import { getAuthToken, getLogin } from "src/services/BackendService";

function PersonalInformationForm({firstName,lastName,phoneNumber,isSubscribed}) {

    const [firstNameInput,setFirstNameInput] = useState(firstName);
    const [lastNameInput,setLastNameInput] = useState(lastName);
    const [phoneNumberInput,setPhoneNumberInput] = useState(phoneNumber);
    const [isSubscribedInput,setIsSubscribedInput] = useState(isSubscribed);

    const updatePersonalInformation = () => {
        try {
          fetch("http://localhost:8080/update-personal-info", {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({ 
                login: getLogin(getAuthToken()), 
                phoneNumber:phoneNumberInput,
                firstName:firstNameInput,
                lastName:lastNameInput,
                isSubscribed:isSubscribedInput
              })
            })
            .then(response => {
              if (response.status === 200) {
                  return response.json();
              } else {
                  alert("Something went wrong");
              }
          }).then(data => {
              if (data) {
                  console.log("Profile updated successfully:", data);
              }
          })
          .catch(error => {
              console.error("Error occurred during profile update:", error);
          })
      } catch (error) {
        console.error(error);
      }
    }

    return (
        <form id="personalInfoForm">
            <h1>Edit Personal Information</h1>
            <label htmlFor="firstName">First Name</label>
            <input
              type="text"
              id="firstName"
              value={firstNameInput}
              onChange={(e) => setFirstNameInput(e.target.value)}
              required
            /> 
            <br></br>

            <label htmlFor="lastName">Last Name</label>
            <input
              type="text"
              id="lastName"
              value={lastNameInput}
              onChange={(e) => setLastNameInput(e.target.value)}
              required
            />
            <br></br>

            <label htmlFor="phoneNumber">Phone Number</label>
            <input
              type="tel"
              inputMode='numeric'
              id="phoneNumber"
              value={phoneNumberInput}
              onChange={(e) => setPhoneNumberInput(e.target.value)}
              required
            />
            <br></br>

            <label htmlFor="subscribe">Subscribe to promotions</label>
            <input
              type="checkbox"
              id="subscribe"
              checked={isSubscribedInput}
              onChange={(e) => setIsSubscribedInput(e.target.checked)}
            />
            <br></br>
            <button 
              className="btn btn-primary"
              onClick={updatePersonalInformation}
              type="submit"
            >
              Update Personal Information
            </button>
        </form>
    );
}

export default PersonalInformationForm;