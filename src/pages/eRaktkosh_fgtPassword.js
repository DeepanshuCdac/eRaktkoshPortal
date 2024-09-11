import React, { useState } from 'react';
// import axios from 'axios';

export default function ERaktkosh_fgtPassword({ showModal, closeModal }) {

    const [isRotated, setIsRotated] = useState(false);

    const handleClick = () => {
        setIsRotated(!isRotated);
    };
    if (!showModal) return null;

    return (
        <>
            <section className="password-section">
                <div className="modal fade show" id="staticBackdrop" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true" style={{ display: 'block' }}>
                    <div className="modal-dialog">
                        <div className="modal-content p-4">
                            <div className="row">
                                <div className="col-xl-6 d-none d-lg-block d-xl-block d-md-block col-lg-6 col-md-6 d-xl-flex d-lg-flex d-md-flex align-items-center justify-content-center">
                                    <img className='img-fluid' src="assets/images/fgt-password-img.png" alt="" />
                                </div>
                                <div className="col-xl-6 col-lg-6 col-md-6">
                                    <div className="modal-header pb-2 p-0">
                                        <button type="button" className="btn-close" onClick={closeModal} aria-label="Close"></button>
                                    </div>
                                    <div>
                                        <h1 className="modal-title text-center" id="staticBackdropLabel">Forgot Password?</h1>
                                        <div className="modal-body pb-0">
                                            <form className='d-flex flex-column align-items-center'>
                                                <div className="mb-3 form-container">
                                                    <label htmlFor="exampleInputEmail1" className="form-label mb-1">
                                                        Enter Username
                                                    </label>
                                                    <div className="input-group mb-1">
                                                        <span className="input-group-text p-0" id="basic-addon1">
                                                            <img src="assets/images/inputPerson.png" alt="" />
                                                        </span>
                                                        <input
                                                            type="username"
                                                            className="form-control py-0"
                                                            placeholder="Enter Registered Username"
                                                            aria-label="username"
                                                            aria-describedby="basic-addon1"
                                                        />
                                                    </div>
                                                </div>

                                                <div className="mb-3 form-container">
                                                    <label htmlFor="exampleInputEmail1" className="form-label mb-1">
                                                        Enter Number
                                                    </label>
                                                    <div className="input-group mb-1">
                                                        <span className="input-group-text p-0" id="basic-addon1">
                                                            <img src="assets/images/password.png" alt="" />
                                                        </span>
                                                        <input
                                                            type="number"
                                                            className="form-control py-0"
                                                            placeholder="Enter Registered Mobile Number"
                                                            aria-label="number"
                                                            aria-describedby="basic-addon1"
                                                        />
                                                    </div>
                                                </div>

                                                <div className='d-flex align-items-center mb-3 captcha-box'>
                                                    <img onClick={handleClick} src="assets/images/refresh.png" width="24px" height="24px" className={`refresh-img img-fluid me-2 ${isRotated ? 'rotate' : ''}`} alt="" />
                                                    <div className='captcha-container d-xl-flex d-lg-flex d-md-flex align-items-center justify-content-center me-xl-4 me-lg-4 mme-md-4'>
                                                        <div className="input-group me-2 mb-3 mb-xl-0 mb-lg-0 mb-md-0">
                                                            <input
                                                                type="text"
                                                                className="form-control py-0"
                                                                placeholder="Captcha"
                                                                aria-label="text"
                                                                aria-describedby="basic-addon1"
                                                            />
                                                        </div>

                                                        <div className="input-group">
                                                            <input
                                                                type="text"
                                                                className="form-control py-0"
                                                                placeholder="Enter Captcha"
                                                                aria-label="text"
                                                                aria-describedby="basic-addon1"
                                                            />
                                                        </div>
                                                    </div>
                                                </div>
                                            </form>
                                        </div>
                                        <div className="modal-footer pt-0">
                                            <button type="button" className="btn btn-primary-signIn">Next</button>
                                            <button type="button" className="btn btn-primary-outline" onClick={closeModal}>Clear</button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="modal-backdrop fade show"></div>
            </section>
        </>
    );
}
