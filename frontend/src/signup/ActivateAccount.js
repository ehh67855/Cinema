import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

function ActivateAccount() {
    const { token } = useParams();
    const [status, setStatus] = useState('');

    useEffect(() => {
        fetch(`http://localhost:8080/activate-account/${token}`)
            .then(response => {
                if (response.ok) {
                    return response.text(); // Ensure text is expected here
                } else {
                    return response.json(); // Assuming errors are sent as JSON
                }
            })
            .then(data => {
                if (typeof data === 'string') {
                    setStatus(data);
                } else {
                    // Handle error data structure properly
                    setStatus("Error: " + data.message);
                }
            })
            .catch(error => setStatus("Error activating account: " + error.message));
    }, [token]);
    

    return (
        <div>
            <h1>Account Activation</h1>
            <p>{status}</p>
        </div>
    );
}

export default ActivateAccount;
