import React, { useState, useEffect } from "react";
import AdminUsersContainer from "./adminUserList/AdminUsersContainer";
import UserInputField from "./UserInputField";
import "./AdminUserPage.css"
import PersonalInfo from "src/signup/PersonalInfo";
import PersonalInformationForm from "src/EditProfile/PersonalInformationForm";

const AdminUsersPage = () => {
    const states = [
      'AL', 'AK', 'AZ', 'AR', 'CA', 'CO', 'CT', 'DE', 'FL', 'GA',
      'HI', 'ID', 'IL', 'IN', 'IA', 'KS', 'KY', 'LA', 'ME', 'MD',
      'MA', 'MI', 'MN', 'MS', 'MO', 'MT', 'NE', 'NV', 'NH', 'NJ',
      'NM', 'NY', 'NC', 'ND', 'OH', 'OK', 'OR', 'PA', 'RI', 'SC',
      'SD', 'TN', 'TX', 'UT', 'VT', 'VA', 'WA', 'WV', 'WI', 'WY'
    ];

    const[users,setUsers] = useState([

        //Placeholder user
        {name: "wow@wow.com"}
    ]);

    useEffect( () => {
        fetchUsers();
    }, []);

    const fetchUsers = async () => {
        try {
            const response = await fetch('http://localhost:8080/api/movies/get-all-users');
            if(!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            const data = await response.json();
            console.log(data);
            setUsers(data)
        } catch (error) {
            console.error("Failed to fetch users: ", error);
        }
    } 

    return (
        <div>
            <form id="EditUserPage">
                <input id="userInputField" name="userInputField" type="email" placeholder="Enter User's Email Address"/>
                <div className="InputGroup">
                    <UserInputField label="Name" id="NameField" name="name" type="text"/>
                    <UserInputField label="Email Address" id="EmailAddressField" name="EmailAddress" type="email"/>
                    <UserInputField label="Phone Number" id="PhoneNumberField" name="PhoneNumber" type="tel"/>
                    <UserInputField label="Password" id="PasswordField" name="Password" type="password"/>
                </div>
                
                <div className="InputGroup">
                    <UserInputField label="Shipping Address" id="ShippingAddressField" name="ShippingAddress" type="text"/>
                    <UserInputField label="City" id="CityField" name="City" type="text"/>
                    <label for="StateSelect">State</label>
                    <select id="StateSelect" name="state">
                        {states.map((state) => (
                            <option key={state} value={state}>{state}</option>
                        ))}
                    </select>
                    <UserInputField label="Zip Code" id="ZipCodeField" name="ZipCode" type="number"/>
                </div>
                <div id="ButtonGroup">
                    <button type="button">Add As Admin</button>
                    <button type="button">Add as User</button>
                    <button type="button">Disable Admin</button>
                    <button type="button">Suspend User</button>
                </div>
                <div className="InputGroup">
                    <select id="CardSelect" name="card">
                        <option value="" selected="true">Select a card:</option>
                        <option>Card 1</option>
                        <option>Card 2</option>
                    </select>
                    <select id="CardTypeSelect" name="cardType">
                        <option value="" selected="true">Select a card type:</option>
                        <option value="Visa">Visa</option>
                        <option value="Mastercard">Mastercard</option>
                        <option value="Discover">Discover</option>
                        <option value="American Express">American Express</option>
                    </select>
                    <UserInputField label="Card Number" id="CardNumberField" name="cardNumber" type="number"/>
                    <UserInputField label="Card Expiration Date" id="CardExpirationDate" name="CardExpirationDate" type="month"/>
                    <UserInputField label="Billing Address" id="BillingAddress" name="BillingAddress" type="text"/>
                    <UserInputField label="City" id="CityField" name="City" type="text"/>
                    <select id="StateSelect" name="state">
                        {states.map((state) => (
                            <option key={state} value={state}>{state}</option>
                        ))}
                    </select>
                    <UserInputField label="Zip Code" id="ZipCodeField" name="ZipCode" type="number"/>
                </div>
            </form>
            <AdminUsersContainer users={users} />
            
        </div>
    );
}

export default AdminUsersPage;