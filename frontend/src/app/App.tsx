import { useState, useEffect } from "react";
import { jwtDecode } from 'jwt-decode'

import Login from "../login/Login";
import Messages from "../messages/Messages";
import ProtectedMessages from "../messages/ProtectedMessages";
import MovieBrowse from "../moviebrowse/MovieBrowse";
import { CustomJwtPayload } from "../entities/CustomJwtPayload";


import { getAuthToken } from "../services/BackendService";
import AdminMainPage from "src/admin/AdminMainPage";

export function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {

    let token = getAuthToken();
    
    if (token !== null) {
        setIsAuthenticated(true);
        const decoded = jwtDecode<CustomJwtPayload>(token);
        console.log(decoded);
        if (decoded.role == "ADMIN") {
            setIsAdmin(true);
        } else {
            setIsAdmin(false);
        }
    } else {
        setIsAuthenticated(false);
    }
  }, []);

return (
      isAdmin ? <AdminMainPage></AdminMainPage> : <MovieBrowse isAuthenticated={isAuthenticated}></MovieBrowse>
  );
}

export default App;