import { useState } from "react";
import EditProfileForm from "./EditProfileForm";

function AdminEditProfileForm() {
    const [userLogin,setUserLogin] = useState("");
    const [userData,setUserData] = useState({});

    function isUserDataEmpty(userData) {
        return Object.keys(userData).length === 0;
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        fetch(`http://localhost:8080/get-user/${userLogin}`, {
            method: "GET",
        }).then(response => {
            if (response.status == 200) {
                return response.json();
            }
            if (!response.ok) {
                throw new Error('API call failed');
            } 
        }).then(data => {
            setUserData(data);
            console.log(data);
        }).catch(error => {
            // Handle other errors
        });
      };

    return (
        <>
        <form onSubmit={handleSubmit}>
            <h1>Edit Personal Information</h1>
            <label htmlFor="email">Email</label>
            <input
              type="text"
              id="email"
              value={userLogin}
              onChange={(e) => setUserLogin(e.target.value)}
              required
            /> 
            <button type="submit">Submit</button>
        </form>
        {isUserDataEmpty(userData) && <EditProfileForm userData={userData}></EditProfileForm>}
        </>
    
    );
};

export default AdminEditProfileForm;