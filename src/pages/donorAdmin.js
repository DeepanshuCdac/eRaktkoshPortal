import React, { useState, useEffect } from 'react';
import DonorAdminHome from '../components/donorAdminHome';
import DonorAdminProfile from '../components/donorAdminProfile';

export default function DonorAdmin() {
    const [activeTab, setActiveTab] = useState(0);

    const handleTabClick = (index) => {
        setActiveTab(index);
        localStorage.setItem('activeTab', index); // Save the active tab index to localStorage
        console.log(`Tab ${index} saved to localStorage`);
    };

    useEffect(() => {
        document.title = 'e-Raktkosh Donor Admin Portal';

        // Retrieve active tab from localStorage if available
        const savedTab = localStorage.getItem('activeTab');
        if (savedTab !== null) {
            setActiveTab(parseInt(savedTab, 10)); // Set the saved tab index
            console.log(`Tab ${savedTab} retrieved from localStorage`); // Log to check if it's retrieved
        } else {
            console.log('No tab found in localStorage, defaulting to Tab 0');
        }
    }, []);

    return (
        <>
            <section className='donorAdmin'>
                <div className="container">
                    <div className="header-section pt-3 d-flex w-100">
                        <div className='d-flex align-items-center me-auto'>
                            <img className='img-fluid' src="assets/images/user.png" alt="user-img" />
                            <p className='ms-2 mb-0 key'>Welcome <span className='value mb-0'>User!</span></p>
                        </div>
                        <div className='d-flex align-items-center'>
                            <p className='mb-0 me-2 key'>Last Login:</p>
                            <span className='mb-0 me-2 value'>2024-09-08</span>
                            <span className='value mb-0'>13:23:34</span>
                        </div>
                    </div>
                    <div className="row mt-3">
                        <div className="col-xl-3 col-lg-3 col-md-3">
                            <div className="tabs">
                                <ul className="nav flex-column">
                                    <li className="nav-item" style={{ backgroundColor: activeTab === 0 ? '#C02831' : '#fff', transition: 'background-color 0.5s ease' }}>
                                        <a onClick={() => handleTabClick(0)} className={`nav-link ${activeTab === 0 ? 'active' : ''}`} href="javascript:void(0)">
                                            <img src={activeTab === 0 ? 'assets/images/home-active.png' : 'assets/images/home.png'} alt="" />
                                            <span className='ms-2' style={{ color: activeTab === 0 ? '#fff' : '#808080' }}>Home</span>
                                        </a>
                                    </li>
                                    <li className="nav-item" style={{ backgroundColor: activeTab === 1 ? '#C02831' : '#fff', transition: 'background-color 0.5s ease' }}>
                                        <a onClick={() => handleTabClick(1)} className={`nav-link ${activeTab === 1 ? 'active' : ''}`} href="javascript:void(0)">
                                            <img src={activeTab === 1 ? 'assets/images/profile-active.png' : 'assets/images/profile.png'} alt="" />
                                            <span className='ms-2' style={{ color: activeTab === 1 ? '#fff' : '#808080' }}>Manage Profile</span>
                                        </a>
                                    </li>
                                    <li className="nav-item" style={{ backgroundColor: activeTab === 2 ? '#C02831' : '#fff', transition: 'background-color 0.5s ease' }}>
                                        <a onClick={() => handleTabClick(2)} className={`nav-link ${activeTab === 2 ? 'active' : ''}`} href="javascript:void(0)">
                                            <img src={activeTab === 2 ? 'assets/images/certificate-active.png' : 'assets/images/certificates.png'} alt="" />
                                            <span className='ms-2' style={{ color: activeTab === 2 ? '#fff' : '#808080' }}>Participants/ Donation Certificate</span>
                                        </a>
                                    </li>
                                    <li className="nav-item" style={{ backgroundColor: activeTab === 3 ? '#C02831' : '#fff', transition: 'background-color 0.5s ease' }}>
                                        <a onClick={() => handleTabClick(3)} className={`nav-link ${activeTab === 3 ? 'active' : ''}`} href="javascript:void(0)">
                                            <img src={activeTab === 3 ? 'assets/images/blood-active.png' : 'assets/images/blood.png'} alt="" />
                                            <span className='ms-2' style={{ color: activeTab === 3 ? '#fff' : '#808080' }}>Looking for Blood</span>
                                        </a>
                                    </li>
                                </ul>
                            </div>
                        </div>
                        <div className="col-xl-9 col-lg-9 col-md-9">
                            {activeTab === 0 && (
                                <div>
                                    <DonorAdminHome />
                                </div>
                            )}
                            {activeTab === 1 && (
                                <div>
                                    <DonorAdminProfile />
                                </div>
                            )}
                            {activeTab === 2 && (
                                <div className="tabContent p-3">
                                    <div className='row'>
                                        <div className="col-xl-8 col-lg-8 col-12">
                                            <div className="tabContainer">
                                                <p className="ques mb-2">rohit</p>
                                                <p className="ans">gghfg</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            )}
                            {activeTab === 3 && (
                                <div className="tabContent p-3">
                                    <div className='row'>
                                        <div className="col-xl-8 col-lg-8 col-12">
                                            <div className="tabContainer">
                                                <p className="ques mb-2">ameya</p>
                                                <p className="ans">gghfg</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
}
