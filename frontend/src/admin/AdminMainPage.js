import React from "react";
import "./AdminMainPage.css";
import { Link } from "react-router-dom";

const AdminMainPage = () => {
    return (
        <div className="buttons">
            <Link to={`/manageMovies`} className="adminMainPageBtn"><button>Manage Movies</button></Link>
            <Link to={`/manageUsers`} className="adminMainPageBtn"><button>Manage Users</button></Link>
            <Link to={`/promotions`} className="adminMainPageBtn"><button>Manage Promotions</button></Link>
        </div>
    );
}

export default AdminMainPage;