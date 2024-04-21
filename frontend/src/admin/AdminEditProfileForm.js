import { useState } from "react";
import CardsContainer from "../EditProfile/CardsContainer";
import PersonalInformationForm from "./AdminPersonalInformationForm";
import UpdatePasswordForm from "./AdminUpdatePasswordForm";
import UpdateAdressForm from "./AdminUpdateAdressForm";
import AddCardForm from "./AdminAddCardForm";

function AdminEditProfileForm({userData}) {
    
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [name, setName] = useState('');
    const [password, setPassword] = useState('');
    const [isSubscribed, setIsSubscribed] = useState(false);
    const [phoneNumber, setPhoneNumber] = useState('');
    const [cardNumber, setCardNumber] = useState();
    const [cardExpiry, setCardExpiry] = useState('');
    const [billingAddr, setBillingAddr] = useState('');
    const [street, setStreet] = useState('');
    const [city, setCity] = useState('');
    const [state, setState] = useState('');
    const [cardType, setCardType] = useState('');
    const [zipCode, setZipCode] = useState();
    const [currentPassword, setCurrentPassword] = useState('');
    const [login, setLogin] = useState('');
    return (
        <div>
            <PersonalInformationForm 
                login={userData.login}
                firstName={userData.firstName}
                lastName={userData.lastName}
                phoneNumber={userData.phoneNumber}
                isSubscribed={userData.promotionsEnabled}
            >
            </PersonalInformationForm>
            <UpdatePasswordForm></UpdatePasswordForm>
            {<UpdateAdressForm
                homeAddress={userData.homeAddress}
                login={userData.login}
            ></UpdateAdressForm>}
            <AddCardForm
                creditCards={userData.creditCards}
                login={userData.login}
            >
            </AddCardForm>
        </div>
    );
}

export default AdminEditProfileForm;