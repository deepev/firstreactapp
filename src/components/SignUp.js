import React, { useEffect, useState } from 'react';
import HttpService from '../util/HttpService';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { registerSchema } from '../schema/auth';
import { yupResolver } from '@hookform/resolvers/yup';

const SignUp = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const Register = async () => {
        // e.preventDefault();
        try {
            const response = await HttpService.post('http://localhost:8000/api/user/register', {
                name: name,
                email: email,
                password: password,
            });
            if (response.status == 200) {
               toast.success('User register successfully');
            } else {
                toast.error('something went wrong');
            }
            reset()
        } catch (error) {
            console.log('error: ', error);
        }
    };

    const { register, handleSubmit, reset, formState: { errors }} = useForm({
        defaultValues: {
            name: '',
            email: '',
            password: ''
        },
        resolver: yupResolver(registerSchema)
    });

    return (
        <form onSubmit={handleSubmit( () => Register())}>
            <h3>Sign Up</h3>
            <div className="mb-3">
                <label>Name: {''}</label>
                <input
                    type="name"
                    id="name"
                    className="form-control"
                    placeholder="Enter name"
                    { ...register('name') }
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
                    { ...register('email') }
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
                    { ...register('password') }
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
