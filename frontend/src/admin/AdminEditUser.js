import React, { useState, useEffect } from 'react';
import '../EditProfile/EditProfile.css'; // Assuming you have some CSS for styling
import CardsContainer from '../EditProfile/CardsContainer';
import EditProfileForm from 'src/EditProfile/EditProfileForm';
import { decodedToken, getAuthToken, getLogin, isAdmin, isAuthenticated, isUser } from 'src/services/BackendService';
import PermissionDenied from 'src/PermissionDenied';

function AdminEditProfile(props) {

  const [userData,setUserData] = useState(null);

    useEffect(() => {
            const login = getLogin(getAuthToken());
            fetch(`http://localhost:8080/get-user/${login}`, {
                method: "GET",
            }).then(response => {
                if (response.status == 200) {
                    return response.json();
                }
                if (!response.ok) {
                    throw new Error('API call failed');
                }
            }).then(data => {
                setUserData(data);
                console.log(data);
            }).catch(error => {
                // Handle other errors
                });
        }, []);


  const renderOptions = () => {
    if (isUser(getAuthToken())) {
      return <EditProfileForm userData={userData}></EditProfileForm>
    } else if (isAdmin(getAuthToken())) {
      return <>
                <input type="checkbox" id="makeAdmin" name="makeAdmin" />
                <label for="makeAdmin">Make Admin</label>
                <input type="checkbox" id="suspendUser" name="suspendUser" />
                <label for="suspendUser">Suspend User</label>
                <EditProfileForm userData={userData}></EditProfileForm></>
                
    } else {
      return <PermissionDenied></PermissionDenied>
    }
  }

  if (userData == null) {
    return null;
  }

  return (
    renderOptions()
  );


}

export default AdminEditProfile;