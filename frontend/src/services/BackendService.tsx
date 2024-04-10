import { jwtDecode } from "jwt-decode";
import { CustomJwtPayload } from "src/entities/CustomJwtPayload";

export const getAuthToken = () => {
    return window.localStorage.getItem('auth_token');
};

export const setAuthHeader = (token: string | null) => {
    if (token !== null) {
      window.localStorage.setItem("auth_token", token);
    } else {
      window.localStorage.removeItem("auth_token");
    }
};

export const isAuthenticated = () => {
  return getAuthToken() !== null;
};

export const isAdmin = (token: string) => {
    const decoded = jwtDecode<CustomJwtPayload>(token);
    return decoded.role == "ADMIN";
}

export const isUser = (token: string) => {
    const decoded = jwtDecode<CustomJwtPayload>(token);
    return decoded.role == "USER";
}

export const getLogin = (token: string) => {
    const decoded = jwtDecode<CustomJwtPayload>(token);
    return decoded.sub;
}