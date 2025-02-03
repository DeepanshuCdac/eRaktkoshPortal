import React, { useState, useEffect } from 'react';
import DonorAdminHome from '../components/donorAdminHome';
import DonorAdminProfile from '../components/donorAdminProfile';
import { useDonor } from '../context/DonorContext';
import { useCertificate } from '../context/CertificateContext';
import DonationCertificate from '../components/donationCertificate';
import BloodAvailabiltySearch from '../publicPages/bloodAvailabilitySearch';
import CampSchedule from '../publicPages/CampSchedule';

export default function DonorAdmin() {
    const { certificateDataLength, fetchCertificateData } = useCertificate();
    const { donorData, loading, error, fetchDonorData } = useDonor();
    const [activeTab, setActiveTab] = useState(0);

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

    useEffect(() => {
        const token = sessionStorage.getItem('authToken');
        if (!isTokenValid(token)) {
            sessionStorage.clear();
            alert('Session expired. Please log in again.');
            window.location.href = '/#/pages/portalDonorLogin'
        } else {
            fetchDonorData();
            fetchCertificateData();
        }
    }, []);

    const handleTabClick = (index) => {
        setActiveTab(index);
        localStorage.setItem('ActiveTab', index);
    };

    const setDonationCertificateTab = () => {
        handleTabClick(2);
    };

    useEffect(() => {
        const savedTab = localStorage.getItem('ActiveTab');
        if (savedTab !== null) {
            setActiveTab(parseInt(savedTab, 10));
        }
    }, []);

    const handleLogout = () => {
        sessionStorage.clear();
        window.location.href = '/#/pages/portalDonorLogin'
    };

    return (
        <>
            <header className="header">
                <div className="container">
                    <div className="d-flex align-items-center justify-content-between">
                        <a href="javascript:void(0)">
                            <img src="assets/images/main-icon1.png" className="img-fluid" alt="mainIcon" />
                        </a>
                        <a onClick={handleLogout} href='javascript:void(0)' className='mb-0 logout'>Logout</a>
                    </div>
                </div>
            </header>
            <section className='donorAdmin'>
                <div className="container">
                    {loading && <p>Loading...</p>}
                    {error && <p className="error">{error}</p>}
                    {!loading && !error && donorData && (
                        <div>
                            <div className='d-flex align-items-center justify-content-end pt-3 mb-1'>
                                <p className='mb-0 me-2 key'>Last Login:</p>
                                <span className='mb-0 value'>{donorData.body?.isLastLogin || 'N/A'}</span>
                            </div>
                            <div className="header-section p-4 d-xl-flex d-lg-flex w-100">
                                <div className='d-xl-flex d-lg-flex d-md-flex align-items-center me-auto'>
                                    <img className='img-fluid' src="assets/images/user.png" alt="user-img" />
                                    <div className='ms-xl-2 ms-lg-2 ms-md-2 ms-0'>
                                        <p className='mb-0 greet'>Welcome <span className='greetName mb-0'>{donorData.body?.edonorFName || 'Donor'}</span>!</p>
                                    </div>
                                </div>
                                <div className='d-flex mt-xl-0 mt-lg-0 mt-2'>
                                    <div className='d-flex flex-column align-items-center mx-xl-5 mx-lg-5 me-3'>
                                        <p className='mb-0 number'>{certificateDataLength || 'N/A'}</p>
                                        <p className='mb-0 text'>Rakt Score</p>
                                    </div>
                                    <div className='d-flex flex-column align-items-center mx-5'>
                                        <p className='mb-0 number'>{donorData.body?.bloodGroupName || 'N/A'}</p>
                                        <p className='mb-0 text'>Blood Group</p>
                                    </div>
                                    <div className="divider"></div>
                                    <div className='d-flex flex-column align-items-center mx-5'>
                                        <p className='mb-0 number'>{certificateDataLength || 'N/A'}</p>
                                        <p className='mb-0 text'>Total Donations</p>
                                    </div>
                                    <div className='d-flex flex-column align-items-center mx-5'>
                                        <p className='mb-0 number'>{donorData.body?.totalIssue || 0}</p>
                                        <p className='mb-0 text'>Total Issues</p>
                                    </div>
                                </div>
                            </div>
                            <div className="row mt-3">
                                <div className="col-xl-3 col-lg-3 col-md-3">
                                    <div className="tabs">
                                        <ul className="nav flex-column">
                                            <li className="nav-item" style={{ backgroundColor: activeTab === 0 ? 'rgba(192, 40, 49, 0.20)' : '', borderLeft: activeTab === 0 ? '4px solid #C0222B' : '', transition: 'background-color 0.5s ease' }}>
                                                <a onClick={() => handleTabClick(0)} className={`nav-link ${activeTab === 0 ? 'active' : ''}`} href="javascript:void(0)">
                                                    <img src={activeTab === 0 ? 'assets/images/home-active.png' : 'assets/images/home.png'} alt="" />
                                                    <span className='ms-2' style={{ color: activeTab === 0 ? '#000' : '#808080' }}>Home</span>
                                                </a>
                                            </li>
                                            <li className="nav-item" style={{ backgroundColor: activeTab === 1 ? 'rgba(192, 40, 49, 0.20)' : '', borderLeft: activeTab === 1 ? '4px solid #C0222B' : '', transition: 'background-color 0.5s ease' }}>
                                                <a onClick={() => handleTabClick(1)} className={`nav-link ${activeTab === 1 ? 'active' : ''}`} href="javascript:void(0)">
                                                    <img src={activeTab === 1 ? 'assets/images/profile-active.png' : 'assets/images/profile.png'} alt="Profile" />
                                                    <span className='ms-2' style={{ color: activeTab === 1 ? '#000' : '#808080' }}>Manage Profile</span>
                                                </a>
                                            </li>
                                            <li className="nav-item" style={{ backgroundColor: activeTab === 2 ? 'rgba(192, 40, 49, 0.20)' : '', borderLeft: activeTab === 2 ? '4px solid #C0222B' : '', transition: 'background-color 0.5s ease' }}>
                                                <a onClick={() => handleTabClick(2)} className={`nav-link ${activeTab === 2 ? 'active' : ''}`} href="javascript:void(0)">
                                                    <img src={activeTab === 2 ? 'assets/images/certificate-active.png' : 'assets/images/certificates.png'} alt="Certificate-img" />
                                                    <span className='ms-2' style={{ color: activeTab === 2 ? '#000' : '#808080' }}>Donation Certificate</span>
                                                </a>
                                            </li>
                                            <li className="nav-item" style={{ backgroundColor: activeTab === 3 ? 'rgba(192, 40, 49, 0.20)' : '', borderLeft: activeTab === 3 ? '4px solid #C0222B' : '', transition: 'background-color 0.5s ease' }}>
                                                <a onClick={() => handleTabClick(3)} className={`nav-link ${activeTab === 3 ? 'active' : ''}`} href="javascript:void(0)">
                                                    <img src={activeTab === 3 ? 'assets/images/blood-active.png' : 'assets/images/blood.png'} alt="Blood-img" />
                                                    <span className='ms-2' style={{ color: activeTab === 3 ? '#000' : '#808080' }}>Looking for Blood</span>
                                                </a>
                                            </li>
                                            <li className="nav-item" style={{ backgroundColor: activeTab === 4 ? 'rgba(192, 40, 49, 0.20)' : '', borderLeft: activeTab === 4 ? '4px solid #C0222B' : '', transition: 'background-color 0.5s ease' }}>
                                                <a onClick={() => handleTabClick(4)} className={`nav-link ${activeTab === 4 ? 'active' : ''}`} href="javascript:void(0)">
                                                    <img src={activeTab === 4 ? 'assets/images/blood-active.png' : 'assets/images/blood.png'} alt="Blood-img" />
                                                    <span className='ms-2' style={{ color: activeTab === 4 ? '#000' : '#808080' }}>Want to Donate</span>
                                                </a>
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                                <div className="col-xl-9 col-lg-9 col-md-9">
                                    {activeTab === 0 && <DonorAdminHome onViewAllClick={setDonationCertificateTab} />}
                                    {activeTab === 1 && <DonorAdminProfile />}
                                    {activeTab === 2 && <DonationCertificate onBack={() => handleTabClick(0)} />}
                                    {activeTab === 3 && <BloodAvailabiltySearch />}
                                    {activeTab === 4 && <CampSchedule />}
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </section>
        </>
    )
}
