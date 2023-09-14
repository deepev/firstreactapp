import React, { useState } from 'react';
import HttpService from '../util/HttpService';
import { useForm } from 'react-hook-form';

const SignIn = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const Login = async () => {
        try {
            // const response = await axios.post('http://localhost:8000/api/user/login', {
            //     email: email,
            //     password: password
            // });
            const response = await HttpService.post(
                'http://localhost:8000/api/user/login',
                {
                    email: email,
                    password: password,
                },
            );
            localStorage.setItem('token', response.data.data.token);
            console.log('response.data: ', response.data);
            return response.data;
        } catch (error) {
            console.log('error: ', error);
        }
    };

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm({
        defaultValues: {
            email: '',
            password: '',
        },
    });

    return (
        <form onSubmit={handleSubmit(() => Login())}>
            <h3>Sign In</h3>
            <div className="mb-3">
                <label>Email address: {''}</label>
                <input
                    type="email"
                    id="email"
                    {...register('email', {
                        required: {
                            value: true,
                            message: 'Email is required',
                        },
                    })}
                    className="form-control"
                    placeholder="Enter email"
                    onChange={(e) => setEmail(e.target.value)}
                />
                <p>{errors.email?.message}</p>
            </div>

            <div className="mb-3">
                <label>Password: {''}</label>
                <input
                    type="password"
                    className="form-control"
                    placeholder="Enter password"
                    {...register('password', {
                        required: {
                            value: true,
                            message: 'Password is required',
                        },
                    })}
                    onChange={(e) => setPassword(e.target.value)}
                />
                <p>{errors.password?.message}</p>
            </div>
            <div className="mb-3">
                <div className="custom-control custom-checkbox">
                    <input
                        type="checkbox"
                        className="custom-control-input"
                        id="customCheck1"
                    />
                    <label
                        className="custom-control-label"
                        htmlFor="customCheck1"
                    >
                        Remember me
                    </label>
                </div>
            </div>
            <div className="d-grid">
                <button type="submit" className="btn btn-primary">
                    Login
                </button>
            </div>
            <p className="forgot-password text-right">
                Forgot <a href="#">password?</a>
            </p>
        </form>
    );
};

export default SignIn;