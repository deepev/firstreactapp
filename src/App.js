import './App.css';
import { useRoutes } from 'react-router-dom';
import Header from './components/header';
import RegistrationForm from './components/RegistrationForm';
import LoginForm from './components/LoginForm';
import Dashboard from './components/Dashboard';
import FileUpload from './components/FileUpload';
import FileList from './components/FileList';
import GetFile from './components/GetFile';
import Navbar from './components/NavBar';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import FileDelete from './components/FileDelete';

function App() {
    const element = useRoutes([
        { path: '/', element: <Header /> },
        { path: '/register', element: <RegistrationForm /> },
        { path: '/login', element: <LoginForm /> },
        { path: '/dashboard', element: <Dashboard /> },
        { path: '/profile', element: <FileUpload /> },
        { path: '/file-list', element: <FileList /> },
        { path: '/file/:id', element: <GetFile /> },
        { path: '/file/delete', element: <FileDelete /> },
    ]);
    return element;
}

// function App() {
//     return (
//         <Router>
//             <Navbar />
//             <Routes>
//                 <Route path="/" exact element={Header} />
//                 <Route path="/register" element={RegistrationForm} />
//                 <Route path="/login" element={LoginForm} />
//             </Routes>
//         </Router>
//     );
// }

export default App;
