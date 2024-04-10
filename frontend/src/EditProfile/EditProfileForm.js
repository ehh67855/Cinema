import { useState } from "react";
import CardsContainer from "./CardsContainer";
import PersonalInformationForm from "./PersonalInformationForm";
import UpdatePasswordForm from "./UpdatePasswordForm";
import UpdateAdressForm from "./UpdateAdressForm";
import AddCardForm from "./AddCardForm";

function EditProfileForm({userData}) {
    

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

    return (
        <div>
            <PersonalInformationForm 
                firstName={userData.firstName}
                lastName={userData.lastName}
                phoneNumber={userData.phoneNumber}
                isSubscribed={userData.promotionsEnabled}
            >
            </PersonalInformationForm>
            <UpdatePasswordForm></UpdatePasswordForm>
            {<UpdateAdressForm
                homeAddress={userData.homeAddress}
            ></UpdateAdressForm>}
            <AddCardForm
                creditCards={userData.creditCards}
            >
            </AddCardForm>
        </div>
    );
}

export default EditProfileForm;