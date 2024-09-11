import React, { useState, useRef, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import axios from 'axios';

export default function DonorLogin() {
    const [mobileno, setMobileNumber] = useState('');
    const [showOtpField, setShowOtpField] = useState(false);
    const [isInputDisabled, setIsInputDisabled] = useState(false);
    const [loading, setLoading] = useState(false);
    const [otpExpiry, setOtpExpiry] = useState(null);
    const otpRefs = useRef([]);
    const history = useHistory();
    const [timerId, setTimerId] = useState(null);

    useEffect(() => {
        document.title = 'e-Raktkosh Donor Login';
      }, []);

    const handleMobileNumberChange = (event) => {
        const value = event.target.value;
        if (/^\d{0,10}$/.test(value)) {
            setMobileNumber(value);
        }
    };

    const handleGenerateOtp = async () => {
        const isValidNumber = /^\d{10}$/.test(mobileno);

        if (!isValidNumber) {
            alert('Number is invalid.');
            return;
        }

        setLoading(true);

        try {
            const response = await axios.post('http://10.226.17.67:8080/eraktkosh/', { mobileno });

            console.log('Response data:', response.data);

            if (response.data.isUserExists) {
                const otp = response.data.otp;
                console.log('OTP:', otp);
                alert(`Number is valid. OTP generated: ${otp}`);
                setShowOtpField(true);
                setIsInputDisabled(true);

                // Initialize OTP expiry timer
                const expiryTime = 30; // 30sec
                setOtpExpiry(expiryTime);

                // Clear any existing timer
                if (timerId) {
                    clearInterval(timerId);
                }

                const newTimerId = setInterval(() => {
                    setOtpExpiry(prev => {
                        if (prev <= 1) {
                            clearInterval(newTimerId);
                            return 0;
                        }
                        return prev - 1;
                    });
                }, 1000);

                setTimerId(newTimerId);
            } else {
                console.log('User does not exist.');
                alert('Number is invalid.');
                setShowOtpField(false);
                setIsInputDisabled(false);
            }
        } catch (error) {
            console.error('Error validating number:', error.response || error.message || error);
            alert('An error occurred while validating the number.');
        } finally {
            setLoading(false);
        }
    };

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

    const handleClick = () => {
        history.push('/pages/portaldonorRegister');
    };

    useEffect(() => {
        // Clean up the interval when the component is unmounted
        return () => {
            if (timerId) {
                clearInterval(timerId);
            }
        };
    }, [timerId]);

    return (
        <>
            {loading && (
                <div class="loader">
                    <div class="spinner"></div>
                </div>
            )}
            <section className="donorlogin">
                <div className="container-fluid">
                    <div className="row">
                        <div className="col-xl-7 d-none d-lg-block d-xl-block d-md-block col-lg-7 col-md-7">
                            <div className="donorImg">
                                <img src="assets/images/donorImg.png" alt="" className="img-fluid" />
                            </div>
                        </div>
                        <div className="col-xl-5 col-lg-5 col-md-5 d-flex flex-column align-items-center">
                            <div className="donorlogin-right mb-3 px-5">
                                <div className='loginBox'>
                                    <h2 className="login-header text-center mb-5">
                                        Donor Login
                                    </h2>
                                    <div className="mb-4">
                                        <label htmlFor="exampleInputEmail1" className="form-label mb-1">
                                            Mobile Number
                                        </label>
                                        <div className="input-group mb-1">
                                            <input
                                                type="text"
                                                className="form-control p-0"
                                                placeholder="Enter Your Mobile Number"
                                                id="username"
                                                aria-label="Username"
                                                aria-describedby="basic-addon1"
                                                value={mobileno}
                                                onChange={handleMobileNumberChange}
                                                disabled={isInputDisabled}
                                            // value={mobileno}
                                            // onChange={handleMobileNumberChange}
                                            // disabled={isInputDisabled}
                                            />
                                        </div>
                                    </div>

                                    {showOtpField && (
                                        <div>
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
                                                            className={`otp-field ${index > 0 ? 'ms-1' : ''}`}
                                                            autoFocus={index === 0} />
                                                    ))}
                                                </div>
                                            </div>
                                            <div className="row align-items-center mb-3">
                                                <div className="col-xl-2">
                                                    <img className='' style={{ cursor: 'pointer' }} src="assets/images/refresh.png" alt="" />
                                                </div>
                                                <div className="col-xl-3">
                                                    captcha
                                                </div>
                                                <div className="col-xl-7">
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
                                            <div className='text-center'>
                                                <p className="otpExpiry mb-1">OTP has been sent to your Mobile</p>
                                                <p className="otpExpiry">
                                                    Your OTP will expire in {Math.floor(otpExpiry / 60).toString().padStart(2, '0')}:
                                                    {String(otpExpiry % 60).padStart(2, '0')} min
                                                </p>
                                            </div>
                                            <button
                                                type="button"
                                                className="w-100 btn btn-primary-outline py-1">
                                                Validate
                                            </button>
                                        </div>
                                    )}

                                    {!showOtpField && !loading && (
                                        <button
                                            type="button"
                                            className="w-100 btn btn-primary-outline py-1"
                                            onClick={handleGenerateOtp}>
                                            Generate OTP
                                        </button>
                                    )}
                                </div>
                            </div>
                            <p className="option text-center">Or</p>

                            <button
                                type="submit"
                                className="w-100 btn btn-primary-signIn py-1"
                                onClick={handleClick}>
                                Register Now
                            </button>
                            <div className='mt-4'>
                                <div className='d-flex align-items-center mb-3'>
                                    <img className='me-3' src="assets/images/volunteer.png" alt="" />
                                    <p className="mb-0 details">View /Add your Donations</p>
                                </div>
                                <div className='d-flex align-items-center mb-3'>
                                    <img className='me-3' src="assets/images/profile.png" alt="" />
                                    <p className="mb-0 details">Update your Profile</p>
                                </div>
                                <div className='d-flex align-items-center'>
                                    <img className='me-3' src="assets/images/accounts.png" alt="" />
                                    <p className="mb-0 details">Manage your Account </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
}
