import { Button } from "@mui/material";
import { Outlet, NavLink } from "react-router-dom";
import Logout from "./Logout";

const NavBar = (props) => {
    return (
        <>
            <Button variant="contained">
                <NavLink to="/">Home</NavLink>
            </Button>
            <Button variant="contained">
                <NavLink to="/categorize">Categorize</NavLink>
            </Button>
            <Button variant="contained">
                <NavLink to="/login">Login</NavLink>
            </Button>
            <Logout setToken={props.setToken} />
            <Outlet />
        </>
    )
}

export default NavBar;