import React, { useState, useRef, useEffect } from 'react';
import { Select, Space } from 'antd';
import BaseUrl from '../utils/url';
import axios from 'axios'

export default function DonorRegister() {

    // -----------------------------------------
    const [mobile, setMobile] = useState('');
    const [captchaImage, setCaptchaImage] = useState('');
    const [captchaText, setCaptchaText] = useState('');
    const [currentStep, setCurrentStep] = useState(1);
    const [gender, setGender] = useState('');
    const [state, setState] = useState('');
    const [district, setdistrict] = useState('');


    // ------------------------

    const handleInputChange = (e) => {
        const value = e.target.value;

        const numericValue = value.replace(/[^\d]/g, '');

        if (numericValue.length <= 10) {
            setMobile(numericValue);
        }
    };

    // -----------------------------------------

    const totalSteps = 3;

    // const handleSectionView = () => {
    //     const nameInput = document.getElementById('nameInput').value.trim();
    //     const ageInput = document.getElementById('ageInput').value.trim();
    //     const mobileNoInput = mobile.trim();
    //     const fatherInput = document.getElementById('fatherInput').value.trim();
    //     const pincodeInput = document.getElementById('pincodeInput').value.trim();
    //     const captchaInput = document.getElementById('username').value.trim();

    //     if (!nameInput) {
    //         alert("Please enter your name.");
    //         return;
    //     }
    //     if (!ageInput) {
    //         alert("Please enter your age.");
    //         return;
    //     }
    //     if (!gender) {
    //         alert("Please select your gender.");
    //         return;
    //     }
    //     if (!mobileNoInput || !/^(\+91\s)?[1-9]{1}[0-9]{9}$/.test(mobileNoInput)) {
    //         alert("Please enter a valid mobile number.");
    //         return;
    //     }
    //     if (!fatherInput) {
    //         alert("Please enter your father name.");
    //         return;
    //     }
    //     if (!state) {
    //         alert("Please select your state.");
    //         return;
    //     }
    //     if (!district) {
    //         alert("Please select your district.");
    //         return;
    //     }
    //     if (!pincodeInput) {
    //         alert("Please select your pin code.");
    //         return;
    //     }

    //     if (!captchaInput) {
    //         alert("Please enter the CAPTCHA.");
    //         return;
    //     }
    //     if (captchaInput !== captchaText) {
    //         alert("CAPTCHA does not match. Please try again.");
    //         return;
    //     }
    //     // Move to the next step
    //     setCurrentStep((prevStep) => Math.min(prevStep + 1, totalSteps));
    //     console.log("Step:", currentStep + 1);
    // };

    // --------------------------------------------


    const handleSectionView = async () => {
        const nameInput = document.getElementById('nameInput').value.trim();
        const ageInput = document.getElementById('ageInput').value.trim();
        const mobileNoInput = mobile.trim();
        const fatherInput = document.getElementById('fatherInput').value.trim();
        const pincodeInput = document.getElementById('pincodeInput').value.trim();
        const captchaInput = document.getElementById('username').value.trim();

        // Validation checks
        if (!nameInput) {
            alert("Please enter your name.");
            return;
        }
        if (!ageInput) {
            alert("Please enter your age.");
            return;
        }
        if (!gender) {
            alert("Please select your gender.");
            return;
        }
        if (!mobileNoInput || !/^[1-9]{1}[0-9]{9}$/.test(mobileNoInput)) {
            alert("Please enter a valid mobile number.");
            return;
        }
        if (!fatherInput) {
            alert("Please enter your father's name.");
            return;
        }
        if (!state) {
            alert("Please select your state.");
            return;
        }
        if (!district) {
            alert("Please select your district.");
            return;
        }
        if (!pincodeInput) {
            alert("Please select your pin code.");
            return;
        }
        if (!captchaInput) {
            alert("Please enter the CAPTCHA.");
            return;
        }
        if (captchaInput !== captchaText) {
            alert("CAPTCHA does not match. Please try again.");
            return;
        }

        try {
            const response = await generateOtp(mobileNoInput);
            
            if (response.status === 200) {
                // OTP successfully generated
                alert("OTP sent successfully!");
            } else {
                // Handle error if OTP generation fails based on the response data
                alert("Failed to generate OTP. Please try again.");
            }
        } catch (error) {
            console.error("Error generating OTP:", error);
            alert("An error occurred. Please try again.");
        }
        // Move to the next step
        setCurrentStep((prevStep) => Math.min(prevStep + 1, totalSteps));
        console.log("Step:", currentStep + 1);
    };

    // The generateOtp function using axios
    const generateOtp = async (mobileNo) => {
        try {
            const response = await axios.post(
                `${BaseUrl}/eraktkosh/generateOtp`,
                {
                    mobileNumber: mobileNo, // Send mobile number in JSON body
                },
                {
                    headers: {
                        'Content-Type': 'application/json', // Explicitly set the content type
                    },
                }
            );
            return response;
        } catch (error) {
            console.error("Error generating OTP:", error);
            throw new Error("Error generating OTP");
        }
    };





    const otpRefs = useRef([]);

    const handleOtpChange = (index, event) => {
        const { value } = event.target;

        if (/^\d$/.test(value)) {
            otpRefs.current[index].value = value;

            if (index < otpRefs.current.length - 1) {
                otpRefs.current[index + 1].focus();
            }
        } else if (value === '') {
            if (index > 0) {
                otpRefs.current[index - 1].focus();
            }
        }
    };

    // Fetch Captcha data
    const fetchCaptcha = async () => {
        try {
            const response = await axios.get(`${BaseUrl}/eraktkosh/generateCaptchaforRegistration`);
            const data = response.data;

            setCaptchaImage(data.captchaImage);
            setCaptchaText(data.captchaText);

            console.log('CAPTCHA fetched:', data);
        } catch (error) {
            console.error('Error fetching CAPTCHA:', error);
        }
    };

    useEffect(() => {
        fetchCaptcha();
    }, []);

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
                                                    <label htmlFor="genderInput" className="form-label mb-1">Gender</label>
                                                    <Space wrap >
                                                        <Select
                                                            value={gender}
                                                            onChange={setGender}
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
                                                                    value: 'Other',
                                                                    label: 'Other',
                                                                },
                                                            ]}
                                                            placeholder="Select Gender"
                                                        />
                                                    </Space>
                                                </div>
                                            </div>
                                            <div className="col-xl-4 col-lg-4 col-md-6 col-sm-6 col-12">
                                                <div className="mb-3">
                                                    <label htmlFor="mobileNoInput" className="form-label mb-1">Mobile No.</label>
                                                    <img src="assets/images/mendate.png" alt="" />
                                                    <div className="input-group p-0">
                                                        <input type="text" value={mobile} onChange={handleInputChange} className="form-control" placeholder='Enter Your Number' id="mobileNoInput" />
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="col-xl-4 col-lg-4 col-md-6 col-sm-6 col-12">
                                                <div className="mb-3">
                                                    <div>
                                                        <label htmlFor="fatherInput" className="form-label mb-1">Father Name</label>
                                                        <img src="assets/images/mendate.png" alt="" />
                                                    </div>
                                                    <div className="input-group p-0">
                                                        <input type="text" className="form-control" placeholder='Type Your Father Name' id="fatherInput" />
                                                    </div>
                                                </div>
                                            </div>

                                            <div className="col-xl-4 col-lg-4 col-md-6 col-sm-6 col-12">
                                                <div className="mb-3">
                                                    <div>
                                                        <label htmlFor="emailInput" className="form-label mb-1">Email</label>
                                                        {/* <img src="assets/images/mendate.png" alt="" /> */}
                                                    </div>
                                                    <div className="input-group p-0">
                                                        <input type="text" className="form-control" placeholder='Enter Your Email' id="emailInput" />
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="col-xl-4 col-lg-4 col-md-6 col-sm-6 col-12">
                                                <div className='d-flex flex-column'>
                                                    <label htmlFor="stateInput" className="form-label mb-1">State</label>
                                                    <Space wrap >
                                                        <Select
                                                            value={state}
                                                            onChange={setState}
                                                            style={{
                                                                width: '100%',
                                                            }}
                                                            allowClear
                                                            options={[
                                                                {
                                                                    value: 'haryana',
                                                                    label: 'haryana',
                                                                },
                                                            ]}
                                                            placeholder="Select State"
                                                        />
                                                    </Space>
                                                </div>
                                            </div>

                                            <div className="col-xl-4 col-lg-4 col-md-6 col-sm-6 col-12">
                                                <div className='d-flex flex-column'>
                                                    <label htmlFor="districtInput" className="form-label mb-1">District</label>
                                                    <Space wrap >
                                                        <Select
                                                            value={district}
                                                            onChange={setdistrict}
                                                            style={{
                                                                width: '100%',
                                                            }}
                                                            allowClear
                                                            options={[
                                                                {
                                                                    value: 'noida',
                                                                    label: 'noida',
                                                                },
                                                            ]}
                                                            placeholder="Select district"
                                                        />
                                                    </Space>
                                                </div>
                                            </div>
                                            <div className="col-xl-4 col-lg-4 col-md-6 col-sm-6 col-12">
                                                <div className="mb-3">
                                                    {/* <div> */}
                                                    <label htmlFor="addressInput" className="form-label mb-1">Address</label>
                                                    {/* <img src="assets/images/mendate.png" alt="" /> */}
                                                    {/* </div> */}
                                                    <div className="input-group p-0">
                                                        <input type="text" className="form-control" placeholder='Type Your Address' id="addressInput" />
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="col-xl-4 col-lg-4 col-md-6 col-sm-6 col-12">
                                                <div className="mb-3">
                                                    <div>
                                                        <label htmlFor="pincodeInput" className="form-label mb-1">Pin Code</label>
                                                        <img src="assets/images/mendate.png" alt="" />
                                                    </div>
                                                    <div className="input-group p-0">
                                                        <input type="number" className="form-control" placeholder='Type Your Pin Code' id="pincodeInput" />
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
                                        <div className="row align-items-center mb-3 justify-content-center">
                                            {/* <div className="col-xl-2">
                                                <img className='' style={{ cursor: 'pointer' }} src="assets/images/refresh.png" alt="" />
                                            </div> */}
                                            <div className="col-xl-4 text-center">
                                                {/* captcha Image */}
                                                {captchaImage && (
                                                    <img
                                                        src={captchaImage}
                                                        alt="CAPTCHA"
                                                        style={{ cursor: 'pointer' }}
                                                        onClick={fetchCaptcha}
                                                    />
                                                )}
                                            </div>
                                            <div className="col-xl-6">
                                                <div className="input-group">
                                                    <input
                                                        type="text"
                                                        className="form-control p-0"
                                                        placeholder="Enter captcha"
                                                        id="username"
                                                        aria-label="Username"
                                                        aria-describedby="basic-addon1"
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-xl-4 align-items-center">
                                        <div className="text-center px-4">
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
                                    <div className='form-box px-5 py-4'>
                                        <div className='d-flex align-items-center justify-content-center mb-3'>
                                            <img style={{ width: '82px', height: '82px' }} src="assets/images/eraktkosh.png" alt="" />
                                        </div>
                                        <div className="mb-3">
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
                                                        className={`otp-field ${index > 0 ? '' : ''}`}
                                                        autoFocus={index === 0}
                                                    />
                                                ))}
                                            </div>
                                        </div>
                                        <div className='text-center'>
                                            <p className="otpExpiry mb-1">OTP has been sent to your Mobile</p>
                                            <p className="otpExpiry">
                                                Your OTP will expire in <span className='timer'> 01:00</span> min
                                            </p>
                                        </div>
                                        <button
                                            type="button"
                                            onClick={handleSectionView}
                                            className="w-100 btn btn-primary-signIn py-1">
                                            Validate
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    }

                    {currentStep === 3 &&
                        <div>
                            <div className="row align-items-center justify-content-center">
                                <div className="col-xl-4">
                                    <div className='form-box p-4'>
                                        <div className='d-flex align-items-center justify-content-center mb-3'>
                                            <img style={{ width: '82px', height: '82px' }} src="assets/images/eraktkosh.png" alt="" />
                                        </div>
                                        <div className="mb-2">
                                            <div className='text-center'>
                                                <img src="assets/images/success.png" alt="" />
                                                <p className="otpExpiry mt-3">You have been successfully registered</p>

                                            </div>
                                        </div>
                                        <div className='d-flex align-items-center justify-content-center px-5'>
                                            <button
                                                type="submit"
                                                className="btn btn-primary-signIn py-1 w-100 text-center">
                                                Login
                                            </button>
                                        </div>
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
