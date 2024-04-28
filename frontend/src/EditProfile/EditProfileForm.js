import { useState } from "react";
import CardsContainer from "./CardsContainer";
import PersonalInformationForm from "./PersonalInformationForm";
import UpdatePasswordForm from "./UpdatePasswordForm";
import UpdateAdressForm from "./UpdateAdressForm";
import AddCardForm from "./AddCardForm";

function EditProfileForm({userData}) {
    

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