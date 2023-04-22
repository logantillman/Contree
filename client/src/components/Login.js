import { useState } from 'react';
import axios from 'axios';

const loginUser = async(credentials) => {
    return await axios.post('http://localhost:3000/auth/login', {
        "email": credentials.email,
        "password": credentials.password
    }, { withCredentials: true });
}

const Login = ({ setToken, setemail, setpassword }) => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleSubmit = async(event) => {
        event.preventDefault();
        setemail(email);
        setpassword(password);
        const response = await loginUser({
            email,
            password
        });
        setToken(response.data.accessToken);
    }

    return (
        <>
            <h1>login</h1>
            <form onSubmit={handleSubmit}>
                <label>Email</label>
                <input 
                    name="email"
                    type="text"
                    placeholder="Enter email"
                    onChange={e => setEmail(e.target.value)}
                />
                <label>Password</label>
                <input 
                    name="password"
                    type="password"
                    placeholder="Enter password"
                    onChange={e => setPassword(e.target.value)}
                />
                <button type="submit">Submit</button>
            </form>
        </>
    )
}

export default Login;