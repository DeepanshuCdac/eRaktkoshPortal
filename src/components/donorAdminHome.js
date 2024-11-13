import React, { useState } from 'react';
import { useCertificate } from '../context/CertificateContext';
import DonationCertificate from './donationCertificate.js';

export default function DonorAdminHome() {
    const { certificateData, loading, error } = useCertificate();
    const [selectedCertificate, setSelectedCertificate] = useState(null);

    // Check if the certificateData is an array and contains data
    const isDataValid = Array.isArray(certificateData) && certificateData.length > 0;

    const handleDownloadClick = (certificate) => {
        // When the download button is clicked, set the selected certificate
        setSelectedCertificate(certificate);
    };

    return (
        <>
            <div className="row">
                <div className="col-xl-12">
                    <div className="tabContent mb-3">
                        <div className="tabContainer">
                            <div className="widget-abha d-flex justify-content-between px-4 pt-4">
                                <div>
                                    <h4 className="widgeHeader mb-2">Generate/Verify ABHA</h4>
                                    <button className="btn abha-btn">Download / Verify ABHA</button>
                                </div>
                                <img src="assets/images/abha-img.png" alt="Abha-img" />
                            </div>

                            {/* Donor Certificate Section */}
                            <div className='d-flex mb-0 w-100'>
                                <h4 className="widgeHeader mb-0 me-auto">Donor Certificate</h4>
                                {/* <a href="javascript:void(0)">View All</a> */}
                                <button className="btn btn-link px-0 py-1">
                                    View All
                                </button>
                            </div>
                            <div className="widget p-4">
                                {loading && <div>Loading certificate data...</div>}
                                {error && <div className="text-danger">Error loading certificate data: {error}</div>}
                                {!loading && !error && isDataValid ? (
                                    <div className="row">
                                        {/* Loop through certificateData array */}
                                        {certificateData.map((item, index) => (
                                            <div key={index} className="col-xl-4">
                                                <div className='d-flex align-items-center'>
                                                    <img style={{ height: '30px' }} src="assets/images/pdf.png" alt="Pdf" />
                                                    <div style={{ marginLeft: '12px' }}>
                                                        <p className="mb-0 widgeText">{item.bloodbank || 'Unknown Hospital'}</p>
                                                        <p className="mb-0 donationTxt">
                                                            Donation Date: <span className='mb-0 donation-date'>{item.date || 'N/A'}</span>
                                                        </p>
                                                        {/* <a href="javascript:void(0)">Download</a> */}
                                                        <button
                                                            className="btn btn-link px-0 py-0"
                                                            onClick={() => handleDownloadClick(item)}
                                                        >
                                                            Download
                                                        </button>
                                                    </div>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                ) : (
                                    !loading && !error && <div>No donation records found.</div>
                                )}
                            </div>
                            {selectedCertificate && <DonationCertificate certificateData={selectedCertificate} />}

                            {/* Previous Donations Section */}
                            <h4 className="widgeHeader mb-2">Previous Donations</h4>
                            <div className="widget p-4">
                                {loading && <div>Loading previous donation data...</div>}
                                {error && <div className="text-danger">Error loading previous donations: {error}</div>}
                                {!loading && !error && isDataValid ? (
                                    <div className="row">
                                        {/* Loop through certificateData array for previous donations */}
                                        {certificateData.map((item, index) => (
                                            <div key={index} className='col-xl-4'>
                                                <div className='d-flex align-items-center'>
                                                    <img className='img-fluid' style={{ height: '27px' }} src="assets/images/hospital.png" alt="Hospital" />
                                                    <div style={{ marginLeft: '12px' }}>
                                                        <p className='mb-0 widgeText'>{item.bloodbank || 'Unknown Hospital'}</p>
                                                        <p className='mb-0 donationTxt'>
                                                            Donation Date: <span className='mb-0 donation-date'>{item.date || 'N/A'}</span>
                                                        </p>
                                                    </div>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                ) : (
                                    !loading && !error && <div>No previous donations found.</div>
                                )}
                            </div>

                            {/* In News Section */}
                            <h4 className="widgeHeader mb-2">In News</h4>
                            <div className="row">
                                {["View", "Download PDF", "View"].map((action, index) => (
                                    <div key={index} className="col-xl-4">
                                        <div className="widget p-4">
                                            <div>
                                                <p className='mb-1 widgeText'>Grant of Special Casual Leave for the purpose of blood donation</p>
                                                <p className='mb-1 newsTxt'>
                                                    It has now been decided that Special Casual leave may be granted for blood donation or for apheresis (blood components such as red cells, plasma, platelets etc.) donation at licensed blood banks on a working day (for that day only) up to a maximum of four times in a year on submission of valid proof of donation.
                                                </p>
                                                <a href="javascript:void(0)">{action}</a>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
