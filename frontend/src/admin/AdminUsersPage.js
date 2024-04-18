import React, { useState, useEffect } from "react";
import AdminUsersContainer from "./adminUserList/AdminUsersContainer";
import UserInputField from "./UserInputField";
import "./AdminUserPage.css"
import PersonalInfo from "src/signup/PersonalInfo";
import PersonalInformationForm from "src/EditProfile/PersonalInformationForm";
import Signup from "src/signup/Signup";
import EditProfile from "src/EditProfile/EditProfile";

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
            <Signup/>
            <AdminUsersContainer users={users} />
        </>
    );
}

export default AdminUsersPage;