import {useState, useEffect} from "react";

import { getAuthToken } from "../services/BackendService";

export function Messages() {
    const [backendResponse, setBackendResponse] = useState("Nothing");

    useEffect(() => {
            fetch("http://localhost:8080/messages", {
                method: "GET",
                headers: {'Authorization': `Bearer ${getAuthToken()}`}
            }).then(response => {
                if (response.status == 200) {
                    return response.json();
                }
                if (!response.ok) {
                    if (response.status === 401) {
                        // Token expired or unauthorized
                        throw new Error('Token expired');
                    }
                    throw new Error('API call failed');
                }
            }).then(data => {
                setBackendResponse(data.message);
            }).catch(error => {
                if (error.message === 'Token expired') {
                    console.log('Token Expired')
                } else {
                    // Handle other errors
                }
            });
        }, []);

    return (
        <div>
            <p>Messages:</p>
            <p>{backendResponse}</p>
        </div>
    );
}

export default Messages;