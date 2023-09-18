import React, { useState } from 'react';
import './style.css';
import axios from 'axios';


function LoginForm() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    // const [token, setToken] = useState(null);

    const Login = async () => {
        try {
            const response = await axios.post('http://localhost:8000/api/user/login', {
                email: email,
                password: password
            });
           localStorage.setItem('token', response.data.data.token);
        //    setToken(response.data.data.token);
        } catch (error) {
            console.log('error: ', error);
            
        }
    }
    return (
        <div className="form">
            <div className="form-body">
                
                <div className="email">
                    <label className="form__label" for="email">
                        Email: {' '}
                    </label>
                    <input
                        type="email"
                        id="email"
                        className="form__input"
                        placeholder="Email"
                        required
                        onChange={(e) => setEmail(e.target.value)}
                    />
                </div>
                <div className="password">
                    <label className="form__label" for="password">
                        Password: {' '}
                    </label>
                    <input
                        className="form__input"
                        type="password"
                        id="password"
                        placeholder="Password"
                        required
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </div>
            </div>
            <div class="footer">
                <button type="submit" class="btn" onClick={Login}>
                    Login
                </button>
            </div>
        </div>
    );
}

export default LoginForm;
