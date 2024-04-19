import React, { useState, useEffect } from "react";
import AdminUsersContainer from "./adminUserList/AdminUsersContainer";
import "./AdminUserPage.css"
import Signup from "src/signup/Signup";
import EditProfile from "src/EditProfile/EditProfile";
import EditProfileForm from "src/EditProfile/EditProfileForm";

const AdminUsersPage = () => {
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
        <>
            <div id="searchUserSection">
                <input id="userEmailInput" className="searchUserAction" type="email" placeholder="Please enter a user's email address"required/>
                <button id="searchUserButton" className="actionButton">Search</button>
                {/* <button id="suspendUser" className="actionButton">Suspend User</button>
                <button id="makeAdmin" className="actionButton">Make Admin</button> */}
            </div>
            <div id="editProfileDiv">
                <EditProfile id="editProfileComponent"/>
            </div>
            
            <Signup/>
            <AdminUsersContainer users={users} />
        </>
    );
}

export default AdminUsersPage;