import { useState } from "react";

function UpdateAdressForm({homeAddress}) {
    const [streetInput,setStreetInput] = useState();
    const [cityInput,setCityInput] = useState();
    const [stateInput,setStateInput] = useState();
    const [zipCodeInput,setZipCodeInput] = useState();

    const updateHomeAdress = () => {
    };

    return (
        <form>
            <h1>Update Home Adress</h1>
            <label htmlFor="street">Street</label>
            <input
              type="text"
              id="street"
              value={homeAddress.street}
              onChange={(e) => setStreetInput(e.target.value)}
            />
            <br></br>

            <label htmlFor="city">City</label>
            <input
              type="text"
              id="city"
              value={homeAddress.city}
              onChange={(e) => setCityInput(e.target.value)}
            />
            <br></br>

            <label htmlFor="state">State</label>
            <input
              type="text"
              id="state"
              value={homeAddress.state}
              onChange={(e) => setStateInput(e.target.value)}
            />
            <br></br>
            <label htmlFor="zipCode">Zip Code</label>
            <input
              type="number"
              inputMode='numeric'
              id="zipCode"
              value={homeAddress.zipCode}
              onChange={(e) => setZipCodeInput(e.target.value)}
            />
            <br></br>

            <a className="btn btn-primary" onClick={updateHomeAdress()}>Update Home Adress</a>
        </form>
    );

}

export default UpdateAdressForm;