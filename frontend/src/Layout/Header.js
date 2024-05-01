import React from "react";
import './Layout.css'
import { Link } from "react-router-dom";

import './Header.css';

function Header() {

    const renderOptions = () => {
        if (localStorage.getItem("auth_token") == null) {
            return <div className="profile-links">
                <a id = "login" href = "/login" >Login</a>
                <a id = "signup" href = "/signup" >Signup</a>
            </div>;
        } else {
            return <div className="profile-links">
                <a id = "logout" onClick={logout} href="/">Logout</a>
                <a id = "edit-profile" href="/edit-profile">Edit Profile</a>
                <Link id="booking-history" to={"/bookingHistory"}>Booking History</Link>
            </div>;
        }
    };

    const logout = () => {
        localStorage.removeItem("auth_token");
    }

    return (
        <header>
            <Link to={`/`}>Cinema E-Booking System</Link>
            {renderOptions()}
        </header>
    );
}

export default Header;