import React from 'react'

export default function DonorAdminHome() {
    return (
        <>
            <div className="row">
                <div className="col-xl-12">
                    <div className="tabContent mb-3">
                        <div className="tabContainer">
                            <div className="widget-abha d-flex justify-content-between px-4 pt-4">
                                <div>
                                    <h4 className="widgeHeader mb-2">Generate/Verify ABHA</h4>
                                    <button className="btn abha-btn">Download /Verify ABHA</button>
                                </div>
                                <img src="assets/images/abha-img.png" alt="Abha-img" />
                            </div>
                            <div className='d-flex mb-2 w-100'>
                                <h4 className="widgeHeader mb-0 me-auto">Donor Certificate</h4>
                                <a href="javascript:void(0)">View All</a>
                            </div>
                            <div className="widget p-4">
                                <div className="row">
                                    <div className="col-xl-4">
                                        <div className='d-flex align-items-center'>
                                            <img style={{ height: '30px' }} src="assets/images/pdf.png" alt="Pdf" />
                                            <div style={{ marginLeft: '12px' }}>
                                                <p className="mb-0 widgeText">Hospital Name</p>
                                                <p className="mb-0 donationTxt">Donation Date: <span className='mb-0 donation-date'>11th October 2024</span></p>
                                                <a href="javascript:void(0)">Download</a>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="col-xl-4">
                                        <div className='d-flex align-items-center'>
                                            <img style={{ height: '30px' }} src="assets/images/pdf.png" alt="Pdf" />
                                            <div style={{ marginLeft: '12px' }}>
                                                <p className="mb-0 widgeText">Hospital Name</p>
                                                <p className="mb-0 donationTxt">Donation Date: <span className='mb-0 donation-date'>11th October 2024</span></p>
                                                <a href="javascript:void(0)">Download</a>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="col-xl-4">
                                        <div className='d-flex align-items-center'>
                                            <img style={{ height: '30px' }} src="assets/images/pdf.png" alt="Pdf" />
                                            <div style={{ marginLeft: '12px' }}>
                                                <p className="mb-0 widgeText">Hospital Name</p>
                                                <p className="mb-0 donationTxt">Donation Date: <span className='mb-0 donation-date'>11th October 2024</span></p>
                                                <a href="javascript:void(0)">Download</a>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <h4 className="widgeHeader mb-2">Previous Donations</h4>
                            <div className="widget p-4">
                                <div className='d-flex align-items-center'>
                                    <img className='img-fluid' style={{ height: '27px' }} src="assets/images/hospital.png" alt="Hospital" />
                                    <div style={{ marginLeft: '12px' }}>
                                        <p className='mb-0 widgeText'>Fortis Hospital</p>
                                        <p className='mb-0 donationTxt'>Donation Date: <span className='mb-0 donation-date'>11th October 2024</span></p>
                                    </div>
                                </div>
                            </div>
                            <h4 className="widgeHeader mb-2">In News</h4>
                            <div className="row">
                                <div className="col-xl-4">
                                    <div className="widget p-4">
                                        <div className=''>
                                            <p className='mb-1 widgeText'>Grant of Special Casual Leave for the purpose of blood donation </p>
                                            <p className='mb-1 newsTxt'>It has now been decided that Special Casual leave may be granted for blood donation or for apheresis (blood components such as red cells, plasma, platelets etc.) donation at licensed blood banks on a working day (for that day only) up to a maximum of four times in a year on submission of valid proof of donation. </p>
                                            <a className='' href="javascript:void(0)">View</a>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-xl-4">
                                    <div className="widget p-4">
                                        <div className=''>
                                            <p className='mb-1 widgeText'>Grant of Special Casual Leave for the purpose of blood donation </p>
                                            <p className='mb-1 newsTxt'>It has now been decided that Special Casual leave may be granted for blood donation or for apheresis (blood components such as red cells, plasma, platelets etc.) donation at licensed blood banks on a working day (for that day only) up to a maximum of four times in a year on submission of valid proof of donation. </p>
                                            <a className='' href="javascript:void(0)">Download PDF</a>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-xl-4">
                                    <div className="widget p-4">
                                        <div className=''>
                                            <p className='mb-1 widgeText'>Grant of Special Casual Leave for the purpose of blood donation </p>
                                            <p className='mb-1 newsTxt'>It has now been decided that Special Casual leave may be granted for blood donation or for apheresis (blood components such as red cells, plasma, platelets etc.) donation at licensed blood banks on a working day (for that day only) up to a maximum of four times in a year on submission of valid proof of donation. </p>
                                            <a className='' href="javascript:void(0)">View</a>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
