import React from "react";
import AdminUserCard from "./AdminUserCard";

const AdminUsersContainer = ({users}) => {
    return (
        <>
        <div className="container">
            <div>
                {users.map((user) => (
                <div key={user.id}>
                    <AdminUserCard user={user} />
                </div>
                ))}
            </div>
        </div>
        </>
    );
}

export default AdminUsersContainer;