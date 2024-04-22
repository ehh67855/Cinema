import React, { useState, useEffect } from 'react';
import '../EditProfile/EditProfile.css'; // Assuming you have some CSS for styling
import CardsContainer from '../EditProfile/CardsContainer';
import EditProfileForm from 'src/EditProfile/EditProfileForm';
import { decodedToken, getAuthToken, getLogin, isAdmin, isAuthenticated, isUser } from 'src/services/BackendService';
import PermissionDenied from 'src/PermissionDenied';
import AdminEditProfileForm from './AdminEditProfileForm';

function AdminEditProfile(props) {

  const [userData,setUserData] = useState(props.userData);
    useEffect(() => {
      if(props.userData != null) {
        setUserData(props.userData);
      } else {
        const login = getLogin(getAuthToken());
        fetch(`http://localhost:8080/get-user/${login}`, {
            method: "GET",
        }).then(response => {
            if (response.status == 200) {
              console.log(props.userData);
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
      }
    }, [props]);


  const renderOptions = () => {
      return <AdminEditProfileForm userData={userData}></AdminEditProfileForm>
              
  }

  if (userData == null) {
    return null;
  }

  return (
    renderOptions()
  );


}

export default AdminEditProfile;