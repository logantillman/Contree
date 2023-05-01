import { useContext } from "react";
import { AppBar, Button, Container, Toolbar, Box } from "@mui/material";
import { Outlet, useNavigate } from "react-router-dom";
import Logout from "./Auth/Logout";
import { AuthContext } from "../context/AuthContext";
const pages = ["Home", "Categorize"];

const NavBar = (props) => {
    const [authenticated] = useContext(AuthContext);
    const navigate = useNavigate();

    const getAuthButton = () => {
        if (authenticated) {
            return <Logout setToken={props.setToken} />;
        }
        return (
            <Button key="login" sx={{ my: 2, color: 'white', display: 'block' }} onClick={() => navigate("/login")} >
                Login
            </Button>
        );
    }

    return (
        <>
            <AppBar position="static">
                <Container maxWidth="xl">
                    <Toolbar disableGutters>
                        <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
                            {pages.map((page) => (
                            <Button
                                key={page}
                                sx={{ my: 2, color: 'white', display: 'block' }}
                                onClick={() => navigate(page)}
                            >
                                {page}
                            </Button>
                            ))}
                        </Box>
                        <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }} justifyContent={"flex-end"}>
                            {getAuthButton()}
                        </Box>
                    </Toolbar>
                </Container>
            </AppBar>
            <Outlet />
        </>
    )

    // return (
    //     <>
    //         <Button variant="contained">
    //             <NavLink to="/">Home</NavLink>
    //         </Button>
    //         <Button variant="contained">
    //             <NavLink to="/categorize">Categorize</NavLink>
    //         </Button>
    //         {getAuthButton()}
    //         <Outlet />
    //     </>
    // )
}

export default NavBar;