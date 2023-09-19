// import React, { useEffect, useState } from 'react';
// import { useNavigate } from 'react-router-dom';

// const ProtectedRoute = (props) => {
//     const navigate = useNavigate();
//     const [isLogging, setLogging] = useState(false);

//     const checkToken = () => {
//         const access_token = localStorage.getItem('token');
//         if (!access_token) {
//             setLogging(false);
//             return navigate('/sign-in');
//         }
//         setLogging(true);
//     };
//     useEffect(() => {
//         checkToken();
//     }, [isLogging]);

//     return <React.Fragment>{isLogging ? props.children : null}</React.Fragment>;
// };

// export default ProtectedRoute;

import React from 'react';
import { Link, Route } from 'react-router-dom';
const ProtectedRoute = ({ component: Component, isAuthenticated, ...rest }) => (
    <Route
        {...rest}
        render={(props) =>
            isAuthenticated ? (
                <Component {...props} />
            ) : (
                <Link to='/sign-in' />
            )
        }
    />
);
export default ProtectedRoute;
