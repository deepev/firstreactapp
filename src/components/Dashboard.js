import React, { useState, useEffect } from 'react';
import axios from 'axios';
import jwtDecode from 'jwt-decode';
import LoginForm from './LoginForm';

// const Dashboard = () => {
//     const [email, setEmail] = useState('');
//     const [name, setName] = useState('');
//     const [token, setToken] = useState('');
//     const [users, setUsers] = useState('');

//     useEffect(() => {
//         getToken();
//         getUsers();
//     }, [])

//     const getToken = async () => {
//         try {
//             const response = await axios.get('http://localhost:8000/api/user/token');
//             setToken(response.data.token);
//             const decoded = jwtDecode(response.data.token);
//             setEmail(decoded.email);
//         } catch (error) {
//             console.log('error: ', error);

//         }
//     }
//     const axiosJWT = axios.create();

//     axiosJWT.interceptors.request.use(async (config) => {
//         try {
//             const response = await axios.get('http://localhost:8000/api/user/token');
//             config.headers.Authorization = `${response.data.token}`;
//             setToken(response.data.token);
//             const decoded = jwtDecode(response.data.token);
//             setEmail(decoded.email);
//             setName(decoded.name);
//             return config;
//         } catch (error) {
//             console.log('error: ', error);
//         }
//     })
//     const getUsers = async () => {
//         try {
//             const response = await axiosJWT.get(
//                 'http://localhost:8000/api/user/list',
//                 {
//                     headers: {
//                         Authorization: `${token}`,
//                     },
//                 },
//             );
//             setUsers(response.data);
//         } catch (error) {}
//     };

//     return (
//         <div className="container mt-5">
//             <h1>Welcome Back: {name}</h1>
//             <h1>Your email: {email}</h1>
//             {/* <table className="table is-striped is-fullwidth">
//                 <thead>
//                     <tr>
//                         <th>No</th>
//                         <th>Name</th>
//                         <th>Email</th>
//                     </tr>
//                 </thead>
//                 <tbody>
//                     {users.map((user, index) => (
//                         <tr key={user.id}>
//                             <td>{index + 1}</td>
//                             <td>{user.name}</td>
//                             <td>{user.email}</td>
//                         </tr>
//                     ))}

//                 </tbody>
//             </table> */}
//         </div>
//     )
// };

const Dashboard = () => {
    const [token, setToken] = useState();
    if(!token) {
        { return <LoginForm setToken={setToken}/>}
    }
    return (
        <div className='text-white font-bold text-2xl'>Dashboard</div>
    )
}

export default Dashboard;