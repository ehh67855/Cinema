import { getAuthToken } from "./BackendService";

export const fetchService = (endpointURIExtention: string, responseHandler: (data: any) => void) => {
    fetch("http://localhost:8080/"+endpointURIExtention, {
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
        responseHandler(data);
    }).catch(error => {
        if (error.message === 'Token expired') {
            window.location.href = '/login';
        } else {
            // Handle other errors
            console.log("You probably shouldn't have seen this" + error.message);
        }
    });
};