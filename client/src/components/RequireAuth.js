import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { Navigate, useLocation } from "react-router-dom";

const RequireAuth = ({ children }) => {
    const [authenticated] = useContext(AuthContext);
    const location = useLocation();

    return authenticated === true ? children : <Navigate to="/login" replace state={{ path: location.pathname }} />
}

export default RequireAuth;