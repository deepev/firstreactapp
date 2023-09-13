import React from 'react';
import './style.css';
import axios from 'axios';
import { useState } from 'react';

const RegistrationForm = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const Register = async (e) => {
        e.preventDefault();
        try {
            await axios.post('http://localhost:8000/api/user/register', {
                name: name,
                email: email,
                password: password,
            });
        } catch (error) {
            console.log('error: ', error);
        }
    };

    return (
        <div className="form">
            <div className="form-body">
                <div className="username">
                    <label className="form__label" for="fullName">
                        Full Name:{' '}
                    </label>
                    <input
                        className="form__input"
                        type="text"
                        id="fullName"
                        placeholder="Full Name"
                        onChange={(e) => setName(e.target.value)}
                    />
                </div>

                <div className="email">
                    <label className="form__label" for="email">
                        Email:{' '}
                    </label>
                    <input
                        type="email"
                        id="email"
                        className="form__input"
                        placeholder="Email"
                        onChange={(e) => setEmail(e.target.value)}
                    />
                </div>
                <div className="password">
                    <label className="form__label" for="password">
                        Password:{' '}
                    </label>
                    <input
                        className="form__input"
                        type="password"
                        id="password"
                        placeholder="Password"
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </div>
            </div>
            <div class="footer">
                <button onClick={Register}>Register</button>
            </div>
        </div>
    );
};

export default RegistrationForm;
