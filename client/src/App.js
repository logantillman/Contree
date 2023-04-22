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
    const [email, setEmail] = useState(null);
    const [password, setPassword] = useState(null);

    const getAccessToken = useCallback(
        () => {
            axios.post('http://localhost:3000/auth/refresh', {
                "email": email,
                "password": password
            }, { withCredentials: true }).then(response => {
                if (response.data.accessToken)
                    setToken(response.data.accessToken);
                else
                    console.log("error getting token");
            });
        },
        [email, password]
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
                    {/* setEmail and setPassword are temporary until I figure out best way to save them */}
                    <Route path="login" element={<Login setToken={setToken} setemail={setEmail} setpassword={setPassword} />} />
                    <Route path="logout" element={<Logout />} />
                    <Route path="categorize" element={<TransactionGrid />} />
                </Route>
            </Routes>
        </BrowserRouter>
    )
}

export default App;