import React, { useEffect } from 'react';
import axios from 'axios';
import jwtDecode from 'jwt-decode';

const Dashboard = () => {

    useEffect(() => {
        const axiosJWT = axios.create();

        axiosJWT.interceptors.request.use(async (config) => {
            try {
                const access_token = localStorage.getItem('token');
                const decoded = jwtDecode(access_token);
                console.log('decoded: ', decoded);
                
            } catch (error) {
                console.log('error: ', error);
            }
        })
    }, [])
   
    return (
        <div className="container mt-5">
            <h1>Welcome Back</h1>
        </div>
    )
};


export default Dashboard;