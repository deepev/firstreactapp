import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const ProtectedRoute = (props) => {
    const navigate = useNavigate();
    const [isLogging, setLogging] = useState(false);

    const checkToken = () => {
        const access_token = localStorage.getItem('token');
        if (!access_token) {
            setLogging(false);
            return navigate('/login');
        }
        setLogging(true);
    };
    useEffect(() => {
        checkToken();
    }, [isLogging]);

    return <React.Fragment>{isLogging ? props.children : null}</React.Fragment>;
};

export default ProtectedRoute;