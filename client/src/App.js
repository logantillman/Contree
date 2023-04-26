import { useRef, useEffect, useCallback, useState } from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from './components/Home';
import Plaid from './Plaid.tsx';
import Login from './components/Login';
import TransactionGrid from './components/TransactionGrid/TransactionGrid';
import axios from 'axios';
import NavBar from './components/NavBar';
import { AuthContext } from './context/AuthContext';
import RequireAuth from './components/RequireAuth';

const App = () => {
    const ref = useRef();

    const [token, setToken] = useState(null);
    const [authenticated, setAuthenticated] = useState(false);

    const getAccessToken = useCallback(
        () => {
            axios.get('http://localhost:3000/auth/refresh', { withCredentials: true })
                .then(response => {
                    if (response.data.accessToken) {
                        setToken(response.data.accessToken);
                        setAuthenticated(true);
                    }
                })
                .catch(() => {
                    setAuthenticated(false);
                });
        }, []
    );

    // Refresh access token every 14 minutes (expires in 15m)
    useEffect(() => {
        if (!token) return;
        const interval = setInterval(() => getAccessToken(), 14 * 60 * 1000);
        ref.current = interval;
        return () => clearInterval(interval);
    }, [token, getAccessToken]);

    return (
        <AuthContext.Provider value={[authenticated, setAuthenticated]}>
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<NavBar setToken={setToken} />}>
                        <Route index element={<Home />} />
                        {/* TODO this plaid route probably shouldn't be a route... just a normal button */}
                        <Route 
                            path="plaid" 
                            element={
                                <RequireAuth>
                                    <Plaid />
                                </RequireAuth>
                            } 
                        /> 
                        <Route path="login" element={<Login setToken={setToken} />} />
                        <Route 
                            path="categorize" 
                            element={
                                <RequireAuth>
                                    <TransactionGrid />
                                </RequireAuth>
                            } 
                        />
                    </Route>
                </Routes>
            </BrowserRouter>
        </AuthContext.Provider>
    )
}

export default App;