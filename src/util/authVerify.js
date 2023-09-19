import React from "react";

const parseJWT = (token) => {
    try {
        return JSON.parse(atob(token));
    } catch (error) {
        console.log('error: ', error);
        return null
    }
}