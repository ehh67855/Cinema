import React, { useState, useEffect, useRef } from "react";
import "./AdminUserPage.css"
import Signup from "src/signup/Signup";
import AdminEditProfileForm from "./AdminEditProfileForm";

const AdminUsersPage = () => {
    
    const chosenUser = useRef(null);
    let [userData, setUserData] = useState();

    function searchUser() {
        fetch(`http://localhost:8080/get-user/${chosenUser.current.value}`, {
                method: "GET",
            }).then(response => {
                if(response.ok) {
                    return response.json()
                } else if (response.status === 404) {
                    return Promise.reject(new Error("404 Error"));
                }
            })
            .then(data => {
                setUserData(data);
                console.log(userData);
            })
            .catch(error => console.error(error));
    }


    return (
        <>
            <div id="searchUserSection">
                <input id="userEmailInput" className="searchUserAction" type="email" placeholder="Please enter a user's email address" required ref={chosenUser}/>
                <button id="searchUserButton" className="actionButton" onClick={searchUser}>Search</button>
            </div>
            <div id="editProfileDiv">
                {(userData != null) ? <AdminEditProfileForm userData={userData}></AdminEditProfileForm> : null}
            </div>
            <Signup/>
        </>
    );
}

export default AdminUsersPage;