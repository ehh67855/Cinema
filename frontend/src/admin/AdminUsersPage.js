import React, { useState, useEffect, useRef } from "react";
import AdminUsersContainer from "./adminUserList/AdminUsersContainer";
import "./AdminUserPage.css"
import Signup from "src/signup/Signup";
import EditProfile from "src/EditProfile/EditProfile";
import EditProfileForm from "src/EditProfile/EditProfileForm";
import AdminEditProfile from "./AdminEditUser";
import { decodedToken, getAuthToken, getLogin, isAdmin, isAuthenticated, isUser } from 'src/services/BackendService';

const AdminUsersPage = () => {
    const[users, setUsers] = useState([

        //Placeholder user
        {name: "wow@wow.com"}
    ]);
    

    const chosenUser = useRef(null);
    let userFirstName = "";
    let userLastName = "";
    let is_active = "";
    let login = "";
    let password = "";
    let phone_number = "";
    let promotions_enabled = "";
    let role = "";
    let address = "";

    function searchUser() {
        fetch("http://localhost:8080/get-user/" + chosenUser.current.value, {
                method: "GET",
            }).then(response => response.json())
            .then(data => {
                userFirstName = data.firstName;
                userLastName = data.lastName;
                is_active = data.active;
                login = data.login;
                password = data.password;
                phone_number = data.phoneNumber;
                promotions_enabled = data.promotionsEnabled;
                role = data.role;
                address = data.homeAddress;
            })
            .catch(error => console.error(error));
    }
    // useEffect( () => {
    //     fetchUsers();
    // }, []);

    // const fetchUsers = async () => {
    //     try {
    //         const response = await fetch('http://localhost:8080/api/movies/get-all-users');
    //         if(!response.ok) {
    //             throw new Error(`HTTP error! Status: ${response.status}`);
    //         }
    //         const data = await response.json();
    //         console.log(data);
    //         setUsers(data)
    //     } catch (error) {
    //         console.error("Failed to fetch users: ", error);
    //     }
    // } 

    return (
        <>
            <div id="searchUserSection">
                <input id="userEmailInput" className="searchUserAction" type="email" placeholder="Please enter a user's email address" required ref={chosenUser}/>
                <button id="searchUserButton" className="actionButton" onClick={searchUser}>Search</button>
            </div>
            <div id="editProfileDiv">
                <EditProfile id="editProfileComponent" firstName={userFirstName} isActive={userLastName} lastName={is_active} login={login} password={password} phone_number={phone_number} promotions_enabled={promotions_enabled} role={role} address_id={address}/>
            </div>
            
            <Signup/>
            <AdminUsersContainer users={users} />
        </>
    );
}

export default AdminUsersPage;