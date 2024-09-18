import React, { useState, useRef } from 'react';
import { Select, Space } from 'antd';

export default function DonorRegister() {

    // -----------------------------------------
    const [mobile, setMobile] = useState('+91 ');

    const handleInputChange = (e) => {
        const value = e.target.value;

        if (value.startsWith('+91 ')) {
            setMobile(value);
        }
        else if (!value.startsWith('+91')) {
            setMobile('+91 ');
        }
    };

    // -----------------------------------------

    const totalSteps = 3;

    const [currentStep, setCurrentStep] = useState(1);

    const handleSectionView = () => {
        setCurrentStep((prevStep) => Math.min(prevStep + 1, totalSteps))
        console.log("step:", currentStep + 1);
    }

    // --------------------------------------------

    const otpRefs = useRef([]);

    const handleOtpChange = (index, event) => {
        const { value } = event.target;

        if (/^\d$/.test(value)) {
            otpRefs.current[index].value = value; // Update value to ensure only a single digit

            // Move to the next input if there's a next input
            if (index < otpRefs.current.length - 1) {
                otpRefs.current[index + 1].focus();
            }
        } else if (value === '') {
            // If the value is empty, move to the previous input if there's a previous input
            if (index > 0) {
                otpRefs.current[index - 1].focus();
            }
        }
    };

    // --------------------------------------------

    return (
        <>
            <section className="donorRegistration">
                <div className='container-fluid'>
                    <h2 className="login-header text-center mt-3 mb-4">
                        Donor Sign-Up
                    </h2>
                    {currentStep === 1 &&
                        <div>
                            <div className="row justify-content-center">
                                <div className="col-xl-10">
                                    <div className="form-box px-4 py-3">
                                        <div className="row">
                                            <div className="col-xl-4 col-lg-4 col-md-6 col-sm-6 col-12">
                                                <div className="mb-3">
                                                    <label htmlFor="nameInput" className="form-label mb-1">Name</label>
                                                    <img src="assets/images/mendate.png" alt="" />
                                                    <div className="input-group p-0">
                                                        <input type="text" className="form-control" placeholder='Enter Your Name' id="nameInput" />
                                                    </div>
                                                </div>
                                            </div>

                                            <div className="col-xl-4 col-lg-4 col-md-6 col-sm-6 col-12">
                                                <div className="mb-3">
                                                    <div>
                                                        <label htmlFor="ageInput" className="form-label mb-1">Age</label>
                                                        <img src="assets/images/mendate.png" alt="" />
                                                    </div>
                                                    <div className="input-group p-0">
                                                        <input type="number" className="form-control" placeholder='Enter Your Age' id="ageInput" />
                                                    </div>
                                                </div>
                                            </div>

                                            <div className="col-xl-4 col-lg-4 col-md-6 col-sm-6 col-12">
                                                <div className='d-flex flex-column'>
                                                    <label for="exampleInputEmail1" className="form-label mb-1">Gender</label>
                                                    <Space wrap >
                                                        <Select
                                                            defaultValue="select it"
                                                            style={{
                                                                width: '100%',
                                                            }}
                                                            allowClear
                                                            options={[
                                                                {
                                                                    value: 'Male',
                                                                    label: 'Male',
                                                                },
                                                                {
                                                                    value: 'Female',
                                                                    label: 'Female',
                                                                },
                                                                {
                                                                    value: 'Others',
                                                                    label: 'Others',
                                                                },
                                                            ]}
                                                            placeholder="select it"
                                                        />
                                                    </Space>
                                                </div>
                                            </div>

                                            <div className="col-xl-4 col-lg-4 col-md-6 col-sm-6 col-12">
                                                <div className="mb-3">
                                                    <label htmlFor="mobileNoInput" className="form-label mb-1">Mobile No.</label>
                                                    <img src="assets/images/mendate.png" alt="" />
                                                    <div className="input-group p-0">
                                                        <input type="text" value={mobile} onChange={handleInputChange} className="form-control" placeholder='+91' id="mobileNoInput" />
                                                    </div>
                                                </div>
                                            </div>

                                            <div className="col-xl-4 col-lg-4 col-md-6 col-sm-6 col-12">
                                                <div className="mb-3">
                                                    <label htmlFor="mobileNoInput" className="form-label mb-1">Father Name</label>
                                                    <img src="assets/images/mendate.png" alt="" />
                                                    <div className="input-group p-0">
                                                        <input type="text" className="form-control" placeholder='Type Your Father Name' id="mobileNoInput" />
                                                    </div>
                                                </div>
                                            </div>

                                            <div className="col-xl-4 col-lg-4 col-md-6 col-sm-6 col-12">
                                                <div className="mb-3">
                                                    <label htmlFor="mobileNoInput" className="form-label mb-1">Email</label>
                                                    <img src="assets/images/mendate.png" alt="" />
                                                    <div className="input-group p-0">
                                                        <input type="text" className="form-control" placeholder='Enter Your Email ID' id="mobileNoInput" />
                                                    </div>
                                                </div>
                                            </div>

                                            <div className="col-xl-4 col-lg-4 col-md-6 col-sm-6 col-12">
                                                <div className='d-flex flex-column'>
                                                    <label for="exampleInputEmail1" className="form-label mb-1">State</label>
                                                    <Space wrap >
                                                        <Select
                                                            defaultValue="Select State"
                                                            style={{
                                                                width: '100%',
                                                            }}

                                                            options={[
                                                                {
                                                                    value: 'Maharashtra',
                                                                    label: 'Maharashtra',
                                                                },
                                                                {
                                                                    value: 'Goa',
                                                                    label: 'Goa',
                                                                },
                                                                {
                                                                    value: 'Haryana',
                                                                    label: 'Haryana',
                                                                },
                                                            ]}
                                                            placeholder="Select State"
                                                        />
                                                    </Space>
                                                </div>
                                            </div>

                                            <div className="col-xl-4 col-lg-4 col-md-6 col-sm-6 col-12">
                                                <div className='d-flex flex-column'>
                                                    <label for="exampleInputEmail1" className="form-label mb-1">District</label>
                                                    <Space wrap >
                                                        <Select
                                                            defaultValue="Select District"
                                                            style={{
                                                                width: '100%',
                                                            }}

                                                            options={[
                                                                {
                                                                    value: 'Ghaziabad',
                                                                    label: 'Ghaziabad',
                                                                },
                                                                {
                                                                    value: 'Faridabad',
                                                                    label: 'Faridabad',
                                                                },
                                                                {
                                                                    value: 'Noida',
                                                                    label: 'Noida',
                                                                },
                                                            ]}
                                                            placeholder="Select District"
                                                        />
                                                    </Space>
                                                </div>
                                            </div>

                                            <div className="col-xl-4 col-lg-4 col-md-6 col-sm-6 col-12">
                                                <div className="mb-3">
                                                    <label htmlFor="mobileNoInput" className="form-label mb-1">Pincode</label>
                                                    <img src="assets/images/mendate.png" alt="" />
                                                    <div className="input-group p-0">
                                                        <input type="text" className="form-control" placeholder='Enter Your Pincode' id="mobileNoInput" />
                                                    </div>
                                                </div>
                                            </div>

                                            <div className="col-xl-4 col-lg-4 col-md-6 col-sm-6 col-12">
                                                <div className="mb-3">
                                                    <label htmlFor="mobileNoInput" className="form-label mb-1">Address</label>
                                                    <img src="assets/images/mendate.png" alt="" />
                                                    <div className="input-group p-0">
                                                        <input type="text" className="form-control" placeholder='Enter Your Address' id="mobileNoInput" />
                                                    </div>
                                                </div>
                                            </div>

                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div>
                                <div className="row flex-column align-items-center justify-content-center mb-3 mt-4">
                                    <div className="col-xl-4">
                                        <div className="row align-items-center mb-3">
                                            <div className="col-xl-2">
                                                <img className='' style={{ cursor: 'pointer' }} src="assets/images/refresh.png" alt="" />
                                            </div>
                                            <div className="col-xl-2">
                                                captcha
                                            </div>
                                            <div className="col-xl-6">
                                                <div className="input-group mb-1">
                                                    <input
                                                        type="text"
                                                        className="form-control p-0"
                                                        placeholder="Enter captcha"
                                                        id="username"
                                                        aria-label="Username"
                                                        aria-describedby="basic-addon1" />
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-xl-4 align-items-center">
                                        <div className="text-center">
                                            <button onClick={handleSectionView} className="w-100 btn btn-primary-signIn py-1">Sign Up</button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    }

                    {currentStep === 2 &&
                        <div>
                            <div className="row align-items-center justify-content-center">
                                <div className="col-xl-4">
                                    <div className='form-box p-4'>
                                        <div className='d-flex align-items-center justify-content-center mb-3'>
                                            <img style={{ width: '82px', height: '82px' }} src="assets/images/eraktkosh.png" alt="" />
                                        </div>
                                        <div className="mb-">
                                            <label htmlFor="otpInput" className="form-label mb-1">
                                                Enter OTP
                                            </label>
                                            <div className="otp-input">
                                                {Array(6).fill('').map((_, index) => (
                                                    <input
                                                        key={index}
                                                        type="text"
                                                        maxLength="1"
                                                        required
                                                        ref={el => otpRefs.current[index] = el}
                                                        onChange={(event) => handleOtpChange(index, event)}
                                                        className={`otp-field ${index > 0 ? 'ms-1' : 'ms-0'}`}
                                                        autoFocus={index === 0} />
                                                ))}
                                            </div>
                                        </div>
                                        <div className='text-center'>
                                            <p className="otpExpiry mb-1">OTP has been sent to your Mobile</p>
                                            <p className="otpExpiry">
                                                Your OTP will expire in 01:00 min
                                            </p>
                                        </div>
                                        <button
                                            type="button"
                                            className="w-100 btn btn-primary-outline py-1">
                                            Validate
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    }
                </div>
            </section>
        </>
    );
}
