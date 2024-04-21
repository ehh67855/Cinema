import React, { useState, useEffect, useRef } from "react";
import AdminUsersContainer from "./adminUserList/AdminUsersContainer";
import "./AdminUserPage.css"
import Signup from "src/signup/Signup";
import EditProfile from "src/EditProfile/EditProfile";
import EditProfileForm from "src/EditProfile/EditProfileForm";
import AdminEditProfile from "./AdminEditProfile";
import { decodedToken, getAuthToken, getLogin, isAdmin, isAuthenticated, isUser } from 'src/services/BackendService';

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
                <AdminEditProfile id="editProfileComponent" userData={userData}/>
            </div>
            
            <Signup/>
            {/* <AdminUsersContainer users={users} /> */}
        </>
    );
}

export default AdminUsersPage;