import { useState } from "react";
import { getAuthToken, getLogin } from "src/services/BackendService";


function UpdateAdressForm({homeAddress, login}) {
    const [streetInput,setStreetInput] = useState(homeAddress.street);
    const [cityInput,setCityInput] = useState(homeAddress.city);
    const [stateInput,setStateInput] = useState(homeAddress.state);
    const [zipCodeInput,setZipCodeInput] = useState(homeAddress.zipcode);

const updateHomeAdress = (e) => {
        e.preventDefault();
        try {
          fetch("http://localhost:8080/update-home-adress", {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({ 
                login: login, 
                street: streetInput,
                city: cityInput,
                state: stateInput,
                zipCode: zipCodeInput
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
                  alert("Address successfully changed");
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
      <form onSubmit={updateHomeAdress}>
            <h1>Update Home Adress</h1>
            <label htmlFor="street">Street</label>
            <input
              type="text"
              id="street"
              value={streetInput}
              onChange={(e) => setStreetInput(e.target.value)}
              required
            />
            <br></br>

            <label htmlFor="city">City</label>
            <input
              type="text"
              id="city"
              value={cityInput}
              onChange={(e) => setCityInput(e.target.value)}
              required
            />
            <br></br>

            <label htmlFor="state">State</label>
            <input
              type="text"
              id="state"
              value={stateInput}
              onChange={(e) => setStateInput(e.target.value)}
              required
            />
            <br></br>
            <label htmlFor="zipCode">Zip Code</label>
            <input
              type="number"
              inputMode='numeric'
              id="zipCode"
              value={zipCodeInput}
              onChange={(e) => setZipCodeInput(e.target.value)}
              required
            />
            <br></br>

          <button 
              className="btn btn-primary"
              type="submit"
            >
              Update Home Adress
            </button>            
          </form>
    );

}

export default UpdateAdressForm;