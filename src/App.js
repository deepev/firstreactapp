// import './App.css';
// import { useRoutes } from 'react-router-dom';
// import Header from './components/header';
// import RegistrationForm from './components/RegistrationForm';
// import LoginForm from './components/LoginForm';
// import Dashboard from './components/Dashboard';
// import FileUpload from './components/FileUpload';
// import FileList from './components/FileList';
// import GetFile from './components/GetFile';
// import Navbar from './components/NavBar';
// import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
// import FileDelete from './components/FileDelete';

// function App() {
//     const element = useRoutes([
//         { path: '/', element: <Header /> },
//         { path: '/register', element: <RegistrationForm /> },
//         { path: '/login', element: <LoginForm /> },
//         { path: '/dashboard', element: <Dashboard /> },
//         { path: '/profile', element: <FileUpload /> },
//         { path: '/file-list', element: <FileList /> },
//         { path: '/file/:id', element: <GetFile /> },
//         { path: '/file/delete', element:  /> },
//     ]);
//     return element;
// }

// export default App;

// 2nd approach for protected routes

// import React, { useEffect, useState } from 'react';
// import { Outlet } from 'react-router-dom';
// import PortalFooter from './portal/PortalFooter';
// import PortalNavbar from './portal/PortalNavbar';
// function App() {
//     const [isLoggedIn, setIsLoggedIn] = useState(false);
//     const checkUserToken = () => {
//         const userToken = localStorage.getItem('token');
//         if (!userToken || userToken === 'undefined') {
//             setIsLoggedIn(false);
//         }
//         setIsLoggedIn(true);
//     };
//     useEffect(() => {
//         checkUserToken();
//     }, [isLoggedIn]);

//     return (
//         <React.Fragment>
//             {isLoggedIn && <PortalNavbar />}
//             <Outlet />
//             {isLoggedIn && <PortalFooter />}
//         </React.Fragment>
//     );
// }
// export default App;

// 3rd one

import React from 'react';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Login from './components/Login';
import SignUp from './components/SignUp';
import { Toaster } from 'react-hot-toast';
import FileUpload from './components/FileUpload';
import FileList from './components/FileList';
import GetFile from './components/GetFile';
import FileDelete from './components/FileDelete';

function App() {
    return (
        <Router>
            <div className="App">
                <nav className="navbar navbar-expand-lg navbar-light fixed-top">
                <Toaster position='top-right' reverseOrder={false}/>

                    <div className="container">
                        <Link className="navbar-brand" to={'/sign-in'}>
                            React
                        </Link>
                        <div
                            className="collapse navbar-collapse"
                            id="navbarTogglerDemo02"
                        >
                            <ul className="navbar-nav ml-auto">
                                <li className="nav-item">
                                    <Link className="nav-link" to={'/sign-in'}>
                                        Login
                                    </Link>
                                </li>
                                <li className="nav-item">
                                    <Link className="nav-link" to={'/sign-up'}>
                                        Register
                                    </Link>
                                </li>
                                <li className="nav-item">
                                    <Link className="nav-link" to={'/profile'}>
                                        Upload
                                    </Link>
                                </li>
                                <li className="nav-item">
                                    <Link className="nav-link" to={'/file-list'}>
                                        File List
                                    </Link>
                                </li>
                            </ul>
                        </div>
                    </div>
                </nav>
                <div className="auth-wrapper">
                    <div className="auth-inner">
                        <Routes>
                            <Route exact path="/" element={<Login />} />
                            <Route path="/sign-in" element={<Login />} />
                            <Route path="/sign-up" element={<SignUp />} />
                            <Route path='/profile' element={<FileUpload />} />
                            <Route path='/file-list' element={<FileList />} />
                            <Route path='/file/get/:id' element={<GetFile />} />
                            <Route path='/file/remove/:id' element={<FileDelete />} />
                        </Routes>
                    </div>
                </div>
            </div>
        </Router>
    );
}
export default App;

