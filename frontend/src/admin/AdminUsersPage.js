import React, { useState, useEffect } from "react";
import AdminUsersContainer from "./adminUserList/AdminUsersContainer";


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
        <div>
            <h2>Users: </h2>
            <AdminUsersContainer users={users} />
        </div>
    );
}

export default AdminUsersPage;