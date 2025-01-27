import React from "react";

const ProtectedRoute = ({children}) => {

    const token = sessionStorage.getItem('authToken')

    const isTokenValid = (token) => {
        if (!token) return false;

        try {
            const payload = JSON.parse(atob(token.split('.')[1])); 
            const currentTime = Math.floor(Date.now() / 1000);
            return payload.exp > currentTime; 
        } catch (e) {
            console.error('Invalid token format:', e);
            return false;
        }
    };
     
    if (!isTokenValid(token)) {
        window.location.href = "/#/pages/portalDonorLogin"; 
        return null;
    }

    return children
}

export default ProtectedRoute