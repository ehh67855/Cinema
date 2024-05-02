import { useState } from "react";
import { getAuthToken, getLogin } from "src/services/BackendService";
import "./UpdatePasswordForm.css";


function UpdatePasswordForm() {

    const [newPassword,setNewPassword] = useState();
    const [currentPassword,setCurrentPassword] = useState();

    const updatePassword = (e) => {
      e.preventDefault();
      try {
          fetch("http://localhost:8080/update-password", {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({ 
                login: getLogin(getAuthToken()), 
                newPassword:newPassword,
                currentPassword:currentPassword
              })
            })
            .then(response => {
              if (response.status === 200) {
                  return response.json();
              } else if (response.status === 401) {
                alert("Given current password did not match");
                return null; 
              } else {
                  alert("Something went wrong");
                  return null; 
              }
          }).then(data => {
              if (data) {
                  console.log("Profile updated successfully:", data);
                  alert("Password successfully changed");
              }
          })
          .catch(error => {
              console.error("Error occurred during profile update:", error);
          })
      } catch (error) {
        console.error(error);
      }
    };

    return (
        <form id="updatePassForm" onSubmit={updatePassword}>
            <h1>Update Password</h1>
            <label htmlFor="password">New Password</label>
            <input
              type="password"
              id="password"
              onChange={(e) => setNewPassword(e.target.value)}
              required
            />
            <br></br>

            <label htmlFor="current-password">Current Password</label>
            <input
              type="password"
              id="current-password"
              onChange={(e) => setCurrentPassword(e.target.value)}
              required
            />
            <br></br>
            <button 
              className="btn btn-primary"
              type="submit"
            >
              Update Password
            </button>        
          </form>
    );
}

export default UpdatePasswordForm;