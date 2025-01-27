import React, { createContext, useContext, useState } from 'react';
import axios from 'axios';
import BaseUrl from '../utils/url.js';

const DonorContext = createContext();

export const useDonor = () => {
    return useContext(DonorContext);
};

export const DonorProvider = ({ children }) => {
    const [donorData, setDonorData] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const fetchDonorData = async () => {
        const mobileNoFromSession = sessionStorage.getItem('mobileNo');
        const tokenFromSession = sessionStorage.getItem('authToken');
        console.log(mobileNoFromSession);
        console.log(tokenFromSession);

        setDonorData(null);
        setLoading(true);
        setError(null);

        console.log("Mobile Deepanshu Donor:", mobileNoFromSession, "Token Donor:", tokenFromSession, !mobileNoFromSession || !tokenFromSession);

        if (!mobileNoFromSession || !tokenFromSession) {
            setError('Mobile number or token not found in session.');
            setLoading(false);
            return;
        }

        try {
            const response = await axios.post(
                `${BaseUrl}/eraktkosh/fetchDonorDetails`,
                { mobile_no: mobileNoFromSession },
                {
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: `Bearer ${tokenFromSession}`,
                    }
                }
            )
            setDonorData(response.data);
            console.log("Final response:", response.data);
        } catch (err) {
            console.error('Error fetching donor data:', err);
            setError('Error fetching donor data');
        } finally {
            setLoading(false);
        }
    };


    const value = {
        donorData,
        setDonorData,
        fetchDonorData,
        loading,
        error,
    };


    return (
        <DonorContext.Provider value={value}>
            {children}
        </DonorContext.Provider>
    );
};
