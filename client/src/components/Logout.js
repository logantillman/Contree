import { Button } from "@mui/material";
import axios from 'axios';
import { useContext } from "react";
import { useNavigate } from 'react-router-dom';
import { AuthContext } from "../context/AuthContext";

const logoutUser = async() => {
    return await axios.post('http://localhost:3000/auth/logout', { withCredentials: true });
}

const Logout = (props) => {
    const navigate = useNavigate();
    const [ , setAuthenticated] = useContext(AuthContext);

    const handleLogOut = async() => {
        await logoutUser();
        props.setToken(null);
        setAuthenticated(false);
        navigate("/login");
    }
 
    return (
        <Button variant="contained" onClick={handleLogOut}>Logout</Button>
    )
};

export default Logout;