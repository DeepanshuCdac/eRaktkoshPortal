import React from 'react'

export default function DonorAdminHome() {
    return (
        <>
            <div className="row">
                <div className="col-xl-8">
                    <div className="tabContent">
                        <div className="tabContainer">
                            <div className="widget p-3 mb-2">
                                <h4 className="widgeHeader mb-3">Generate/Verify ABHA</h4>
                                <button style={{ fontSize: '16px' }} className="btn btn-primary-outline">Download /Verify ABHA</button>
                            </div>
                            <div className="widget p-3 mb-2">
                                <h4 className="widgeHeader mb-3">Donor Certificate</h4>
                                <div className='d-flex'>
                                    <p className='mb-0 widgeText'>Download Latest Donor certificate </p>
                                    <a className='ms-1' href="javascript:void(0)">Download</a>
                                </div>
                            </div>
                            <div className="widget p-3 mb-2">
                                <h4 className="widgeHeader mb-3">Previous Donations</h4>
                                <div className='d-flex'>
                                    <p className='mb-0 widgeText'>No Donations Available. Please add your </p>
                                    <a className='ms-1' href="javascript:void(0)">Previous Donations</a>
                                </div>
                            </div>
                            <div className="widget p-3 mb-2">
                                <h4 className="widgeHeader mb-3">In News</h4>
                                <div className='d-flex'>
                                    <p className='mb-0 widgeText'>All Notifications </p>
                                    <a className='ms-1' href="javascript:void(0)">Read More...</a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="col-xl-4">
                    <div className="widge p-3">
                        <div className="row">
                            <div className='col-6'>
                                <div className='mb-3'>
                                    <p className="key mb-1">36</p>
                                    <p className="value mb-0">Rakt Score</p>
                                </div>
                                <div className='mb-3'>
                                    <p className="key mb-1">O+</p>
                                    <p className="value mb-0">Blood Group</p>
                                </div>
                                <div className='mb-3'>
                                    <p className="key mb-1">0</p>
                                    <p className="value mb-0">Total Donations</p>
                                </div>
                                <div className=''>
                                    <p className="key mb-1">0</p>
                                    <p className="value mb-0">Total Issues</p>
                                </div>
                            </div>
                            <div className='col-6'>
                                <img src="assets/gif/blood-gif.gif" alt="" />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
