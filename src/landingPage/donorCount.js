import React, { useState, useEffect } from 'react';
import axios from 'axios';

function animate(obj, initVal, lastVal, duration) {
    let startTime = null;

    const step = (currentTime) => {
        if (!startTime) {
            startTime = currentTime;
        }

        const progress = Math.min((currentTime - startTime) / duration, 1);

        obj.innerHTML = Math.floor(progress * (lastVal - initVal) + initVal);

        if (progress < 1) {
            window.requestAnimationFrame(step);
        }
    };

    window.requestAnimationFrame(step);
}

export default function DonorCount() {
    const [counterData, setCounterData] = useState({
        registeredDonorsAll: 0,
        donorsDonatedAll: 0,
    });
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get('https://eraktkosh.mohfw.gov.in/Blood_Bank/service/genericCount/TotalCount');
                const data = response.data;

                setCounterData({
                    registeredDonorsAll: data.registeredDonorsAll,
                    donorsDonatedAll: data.donorsDonatedAll,
                });
            } catch (error) {
                console.error('Error fetching data:', error);
                setError('Error fetching data. Please try again later.');
            }
        };

        fetchData();
    }, []);

    useEffect(() => {
        animate(document.getElementById('registeredDonorsAll'), 0, counterData.registeredDonorsAll, 3000);
        animate(document.getElementById('donorsDonatedAll'), 0, counterData.donorsDonatedAll, 3000);
    }, [counterData]);

    return (
        <div className="donorCount">
            {error && <p className="error-message">{error}</p>}
            <div className='d-xl-flex d-lg-flex d-md-flex d-sm-flex'>
                <div className='bg-left w-100 text-xl-end text-lg-end text-md-end text-sm-end text-center py-3 px-5'>
                    <p id='registeredDonorsAll' className="count mb-0">{counterData.registeredDonorsAll}</p>
                    <p className="totalCount mb-0">Donor Registered</p>
                </div>
                <div className='bg-right w-100 text-xl-start text-lg-start text-md-start text-sm-start text-center py-3 px-5'>
                    <p id='donorsDonatedAll' className="count mb-0">{counterData.donorsDonatedAll}</p>
                    <p className="totalCount mb-0">Blood Units Collected</p>
                </div>
            </div>
        </div>
    );
}
