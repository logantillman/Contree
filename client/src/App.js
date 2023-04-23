import { useRef, useEffect, useCallback, useState } from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from './components/Home';
import Plaid from './Plaid.tsx';
import Login from './components/Login';
import Logout from './components/Logout';
import TransactionGrid from './components/TransactionGrid/TransactionGrid';
import axios from 'axios';

const App = () => {
    const ref = useRef();

    const [token, setToken] = useState(null);

    const getAccessToken = useCallback(
        () => {
            axios.get('http://localhost:3000/auth/refresh', { withCredentials: true }).then(response => {
                if (response.data.accessToken)
                    setToken(response.data.accessToken);
                else
                    console.log("error getting token");
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
        <BrowserRouter>
            <Routes>
                <Route path="/">
                    <Route index element={<Home />} />
                    <Route path="plaid" element={<Plaid />} />
                    <Route path="login" element={<Login setToken={setToken} />} />
                    <Route path="logout" element={<Logout />} />
                    <Route path="categorize" element={<TransactionGrid />} />
                </Route>
            </Routes>
        </BrowserRouter>
    )
}

export default App;