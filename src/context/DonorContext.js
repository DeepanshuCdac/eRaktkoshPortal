import React, { createContext, useContext, useState, useEffect } from 'react'
import axios from 'axios'
import BaseUrl from '../utils/url.js';

const DonorContext = createContext()

export const useDonor = () => {
    return useContext(DonorContext)
};

export const DonorProvider = ({ children }) => {
    const [donorData, setDonorData] = useState(null)
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)

    useEffect(() => {
        const fetchData = async () => {
            const mobileNoFromSession = sessionStorage.getItem('mobileNo')
            console.log(mobileNoFromSession)

              setDonorData(null)
              setLoading(true)
              setError(null)

            if (!mobileNoFromSession) {
                setError('Mobile number not found in session.')
                setLoading(false)
                return
            }

            try {
                const response = await axios.post(
                    `${BaseUrl}/eraktkosh/fetchDonorDetails`,
                    { mobile_no: mobileNoFromSession },
                    {
                        headers: {
                            'Content-Type': 'application/json',
                        }
                    }
                )
                setDonorData(response.data)
                console.log("Final response:",response.data)
                setLoading(false)
            }  catch (err) {
                console.error('Error fetching donor data:', err)
                setError('Error fetching donor data')
            } finally {
                setLoading(false) 
            }
        };

        fetchData()
    }, [])

    const value = {
        donorData,
        setDonorData,
        loading,
        error,
    }

    return (
        <DonorContext.Provider value={value}>
            {children}
        </DonorContext.Provider>
    )
}
