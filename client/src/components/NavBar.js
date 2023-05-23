import { useContext, useEffect, useState } from "react";
import { AppBar, Button, Container, Toolbar, Box } from "@mui/material";
import { Outlet, useNavigate } from "react-router-dom";
import Logout from "./Auth/Logout";
import { AuthContext } from "../context/AuthContext";
import Plaid from "./Plaid.tsx";
const pages = ["Summary"];

const NavBar = (props) => {
    console.log(props)
    const [authenticated] = useContext(AuthContext);
    const [showPlaidModal, setShowPlaidModal] = useState(false);
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
                            <Button key="plaid" sx={{ my: 2, color: 'white', display: 'block' }} onClick={() => setShowPlaidModal(!showPlaidModal)}>Plaid</Button>
                            {getAuthButton()}
                        </Box>
                    </Toolbar>
                </Container>
            </AppBar>
            {showPlaidModal ? <Plaid token={props.token}/> : null}
            <Outlet />
        </>
    )
}

export default NavBar;