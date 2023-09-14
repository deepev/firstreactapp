import React from "react";
import { Outlet } from "react-router-dom";
import AuthFooter from "./AuthFooter";
import AuthNavbar from "./AuthNavbar";

const Auth = () => {
    return (
        <React.Fragment>
            <AuthNavbar/>
            <Outlet/>
            <AuthFooter/>
        </React.Fragment>
    )
}

export default Auth;