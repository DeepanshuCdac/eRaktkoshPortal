import React, { createContext, useContext, useState } from 'react';
import axios from 'axios';
import BaseUrl from '../utils/url.js';

const CertificateContext = createContext();

export const useCertificate = () => {
    return useContext(CertificateContext);
};

export const CertificateProvider = ({ children }) => {
    const [certificateData, setCertificateData] = useState(null);
    const [certificateDataLength, setCertificateDataLength] = useState(0);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const fetchCertificateData = async () => {
        const mobileNoFromSession = sessionStorage.getItem('mobileNo');
        const tokenFromSession = sessionStorage.getItem('authToken');
        console.log("Mobile number from session:", mobileNoFromSession);
        console.log("Token from session:", tokenFromSession);

        setCertificateData(null);
        setCertificateDataLength(0);
        setLoading(true);
        setError(null);

        console.log("Mobile yashu Certificate:", mobileNoFromSession, "Token certificate:", tokenFromSession, !mobileNoFromSession || !tokenFromSession);

        if (!mobileNoFromSession || !tokenFromSession) {
            setError('Mobile number or Token not found in session.');
            setLoading(false);
            return;
        }

        try {
            const response = await axios.post(
                `${BaseUrl}/eraktkosh/fetchCertificateDetails`,
                { mobileno: mobileNoFromSession },
                {
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: `Bearer ${tokenFromSession}`
                    }
                }
            );

            console.log("Length:", response.data.length, "&", "API response:", response.data);

            setCertificateData(response.data);
            if (Array.isArray(response.data)) {
                setCertificateDataLength(response.data.length);
            } else {
                setCertificateDataLength(0);
            }
        } catch (err) {
            console.error('Error fetching certificate data:', err);
            setError('Error fetching certificate data');
        } finally {
            setLoading(false);
        }
    };

    const value = {
        certificateData,
        certificateDataLength,
        setCertificateData,
        fetchCertificateData,
        loading,
        error,
    };

    return (
        <CertificateContext.Provider value={value}>
            {children}
        </CertificateContext.Provider>
    );
};
