import { useState, useContext } from 'react';
import axios from 'axios';
import { useLocation, useNavigate } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';

const loginUser = async(credentials) => {
    return await axios.post('http://localhost:3000/auth/login', {
        "email": credentials.email,
        "password": credentials.password
    }, { withCredentials: true });
}

const Login = (props) => {
    const [ , setAuthenticated] = useContext(AuthContext);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    const { state } = useLocation();

    const handleSubmit = async(event) => {
        event.preventDefault();
        const response = await loginUser({
            email,
            password
        });
        props.setToken(response.data.accessToken);
        setAuthenticated(true);
        navigate(state?.path || "/");
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