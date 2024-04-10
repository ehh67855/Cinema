import { useState } from "react";

function UpdatePasswordForm({password}) {

    const [newPassword,setNewPassword] = useState();

    const updatePassword = () => {

    };

    return (
        <form>
            <h1>Update Password</h1>
            <label htmlFor="password">New Password</label>
            <input
              type="password"
              id="password"
              onChange={(e) => setNewPassword(e.target.value)}
            />
            <br></br>

            <label htmlFor="current-password">Current Password</label>
            <input
              type="password"
              id="current-password"
              onChange={(e) => setCurrentPassword(e.target.value)}
            />
            <br></br>

            <a className="btn btn-primary" onClick={updatePassword()}>Update Password</a>
        </form>
    );
}

export default UpdatePasswordForm;