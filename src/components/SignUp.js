import React, { useState } from 'react';
import HttpService from '../util/HttpService';
import { useForm } from 'react-hook-form';

const SignUp = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const Register = async () => {
        // e.preventDefault();
        try {
            await HttpService.post('http://localhost:8000/api/user/register', {
                name: name,
                email: email,
                password: password,
            });
        } catch (error) {
            console.log('error: ', error);
        }
    };

    const { register, handleSubmit, formState: { errors }} = useForm({
        defaultValues: {
            name: '',
            email: '',
            password: ''
        }
    });

    return (
        <form onSubmit={handleSubmit(() => Register())}>
            <h3>Sign Up</h3>
            <div className="mb-3">
                <label>Name: {''}</label>
                <input
                    type="name"
                    id="name"
                    className="form-control"
                    placeholder="Enter name"
                    {...register('name', {
                        required: {
                            value: true,
                            message: 'Name is required'
                        }
                    })}
                    onChange={(e) => setName(e.target.value)}
                />
                <p>{errors.name?.message}</p>
            </div>
            <div className="mb-3">
                <label>Email address: {''}</label>
                <input
                    type="email"
                    id="email"
                    className="form-control"
                    placeholder="Enter email"
                    {...register('email', {
                        required: {
                            value: true,
                            message: 'Email is required'
                        }
                    })}
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
                            message: 'Password is required'
                        }
                    })}
                    onChange={(e) => setPassword(e.target.value)}
                />
                <p>{errors.password?.message}</p>
            </div>
            <div className="d-grid">
                <button type="submit" className="btn btn-primary">
                    Register
                </button>
            </div>
            <p className="forgot-password text-right">
                Already have an account, click here <a href="/sign-in">Login</a>
            </p>
        </form>
    );
};

export default SignUp;
