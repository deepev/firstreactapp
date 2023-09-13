import React from 'react';
import { Route } from 'react-router-dom';
import Cookies from 'universal-cookie';
const cookie = new Cookies();

const Authentication = ({ component: Component, ...rest }) => {
    return (
        <Route
            {...rest}
            render={(props) => {
                // get cookie from browser if logged in
                const token = cookie.get('Token');

                // returns route if there is a valid token set in the cookie
                if (token) {
                    return <Component {...props} />;
                }
            }}
        />
    );
};

export default Authentication;