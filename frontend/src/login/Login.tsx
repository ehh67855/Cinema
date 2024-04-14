import { useState } from "react";
import  "./Login.css"
import { setAuthHeader } from "../services/BackendService";

export function Login() {
    const [login, setLogin] = useState("");
    const [password, setPassword] = useState("");
    const [errorMessage,setErrorMessage] = useState("");

    const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        fetch("http://localhost:8080/login", {
            method: "POST",
            headers: {"content-type": "application/json"},
            body: JSON.stringify({login: login, password: password})
        }).then(response => {
            if (response.status == 200) {
                return response.json();
            } else if (response.status == 404){
                setErrorMessage("Email not found");
            } else if (response.status == 400) {
                setErrorMessage("Invalid password");
            }
        }).then(data => {
            if (data !== null) {
                setAuthHeader(data["token"]);
                window.location.href = '/';
            } else {
                setAuthHeader(null);
            }
        }).catch(error => {
            console.log(error);
        });
    }

    return (
        <form className="Login-form"onSubmit={onSubmit}>
            <h1>{errorMessage}</h1>
            <div className="Login-input-field">
                <label id="email-label" htmlFor="login">Email</label>
                <input name="login" onChange={(event) => setLogin(event.target.value)}/>
            </div>
            <div className="Login-input-field">
                <label htmlFor="password">Password</label>
                <input name="password" type="password" onChange={(event) => setPassword(event.target.value)}/>
            </div>
            <button type="submit">Sign In</button> <br />
            <a href="/forgot-password">Forgot Password?</a> <br />
            <a href="/signup">Create an account</a>
        </form>
    );
}

export default Login;