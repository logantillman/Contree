import { Button } from "@mui/material";
import { Outlet, NavLink } from "react-router-dom";

const NavBar = () => {
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
            <Button variant="contained">
                <NavLink to="/logout">Logout</NavLink>
            </Button>
            <Outlet />
        </>
    )
}

export default NavBar;