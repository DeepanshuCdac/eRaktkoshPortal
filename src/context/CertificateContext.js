import React, { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';
import BaseUrl from '../utils/url.js';

const CertificateContext = createContext();

export const useCertificate = () => {
    return useContext(CertificateContext);
};

export const CertificateProvider = ({ children }) => {
    const [certificateData, setCertificateData] = useState(null);
    const [certificateDataLength, setCertificateDataLength] = useState(0);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchCertificateData = async () => {
            const mobileNoFromSession = sessionStorage.getItem('mobileNo');
            console.log("Mobile number from session:", mobileNoFromSession);

            setCertificateData(null);
            setCertificateDataLength(0);
            setLoading(true);
            setError(null);

            if (!mobileNoFromSession) {
                setError('Mobile number not found in session.');
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
                        }
                    }
                );

                console.log("Length:", response.data.length, "&",  "API response:", response.data);

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

        fetchCertificateData();
    }, []);

    const value = {
        certificateData,
        certificateDataLength,
        setCertificateData,
        loading,
        error,
    };

    return (
        <CertificateContext.Provider value={value}>
            {children}
        </CertificateContext.Provider>
    );
};
