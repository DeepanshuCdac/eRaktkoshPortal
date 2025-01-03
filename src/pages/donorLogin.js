import React, { useState, useRef, useEffect } from 'react'
import { useHistory } from 'react-router-dom'
import axios from 'axios'
import BaseUrl from '../utils/url'

export default function DonorLogin() {
    const [mobileno, setMobileNumber] = useState('')
    const [showOtpField, setShowOtpField] = useState(false)
    const [isInputDisabled, setIsInputDisabled] = useState(false)
    const [loading, setLoading] = useState(false)
    const [otpExpiry, setOtpExpiry] = useState(null)
    const [captchaImage, setCaptchaImage] = useState(null)
    const [captchaText, setCaptchaText] = useState('')
    const otpRefs = useRef([])
    const history = useHistory()
    const [timerId, setTimerId] = useState(null)
    const [isOtpExpired, setIsOtpExpired] = useState(false)
    // const [lastOtpRequestTime, setLastOtpRequestTime] = useState(null);

    useEffect(() => {
        document.title = 'e-Raktkosh Donor Login'
    }, [])

    const handleMobileNumberChange = (event) => {
        const value = event.target.value
        if (/^\d{0,10}$/.test(value)) {
            setMobileNumber(value)
        }
    }

    const startOtpTimer = (expiryTime) => {
        const currentTime = Math.floor(Date.now() / 1000);
        const timeRemaining = expiryTime - currentTime;

        if (timeRemaining > 0) {
            setOtpExpiry(timeRemaining);
            setIsOtpExpired(false);

            if (timerId) {
                clearInterval(timerId);
            }

            const newTimerId = setInterval(() => {
                setOtpExpiry(prev => {
                    if (prev <= 1) {
                        clearInterval(newTimerId);
                        setIsOtpExpired(true);
                        return 0;
                    }
                    return prev - 1;
                });
            }, 1000);

            setTimerId(newTimerId);
        } else {
            setIsOtpExpired(true);
        }
    };

    const handleGenerateOtp = async () => {
        const isValidNumber = /^\d{10}$/.test(mobileno);
        const currentTime = Date.now();
        // Retrieve last OTP request time for the specific mobile number
        const lastOtpRequestTime = localStorage.getItem(`lastOtpRequestTime_${mobileno}`);


        // Validate mobile number format
        if (!isValidNumber) {
            alert('Please enter a valid 10-digit mobile number.');
            return;
        }

        setLoading(true);

        try {
            // Make API call to generate OTP
            const response = await axios.post(
                `${BaseUrl}/eraktkosh/generateOTP`,
                { mobileno },
                {
                    withCredentials: false,
                    headers: {
                        'Content-Type': 'application/json',
                    },
                }
            );

            console.log('Response data:', response.data);

            setCaptchaImage(response.data.captchaImage);
            setCaptchaText('');

            const otpData = JSON.parse(response.data.OtpData);
            const isUserExists = otpData.isUserExists;

            // check whether user exist or not
            console.log('user ?? :: ', isUserExists)

            // If user doesn't exist, display the message and return
            if (!isUserExists && otpData.notRegisteredMessage) {
                alert(otpData.notRegisteredMessage);
                setShowOtpField(true);  // Hide OTP input field
                setIsInputDisabled(true);
                console.log('notRegisteredMessage:', otpData.notRegisteredMessage);
                return;
            }

            // If the daily OTP limit has been exceeded
            if (isUserExists && otpData.limitExceedMessage) {
                alert(otpData.limitExceedMessage);
                setShowOtpField(false);  // Hide OTP input field
                setIsInputDisabled(true);
                console.log('limitExceedMessage:', otpData.limitExceedMessage);
                return;
            }

            // If last OTP request was made in the last 5 minutes
            console.log('lastOtpRequestTime:', lastOtpRequestTime);
            console.log('currentTime:', currentTime);
            console.log('timeDifference:', currentTime - parseInt(lastOtpRequestTime));
            if (isUserExists && lastOtpRequestTime && !isNaN(lastOtpRequestTime) && currentTime - parseInt(lastOtpRequestTime) < 300000) {
                alert(otpData.errorMessage);
                setShowOtpField(false);
                setIsInputDisabled(true);
                console.log('errorMessage:', otpData.errorMessage);
                return;
            }
            console.log('messageSuccess:', otpData.messageSuccess);

            // If OTP generation is allowed, handle the OTP data
            const otp = otpData.otp;
            const otpExpirationTime = Math.floor(otpData.otpExpirationTime / 1000);

            console.log('OTP:', otp);
            console.log('OTP Expiration Time:', otpExpirationTime);

            alert(otpData.messageSuccess);
            console.log("success message : ", otpData.messageSuccess)

            setShowOtpField(true);
            setIsInputDisabled(false);

            // Update last OTP request time for the new mobile number in localStorage
            localStorage.setItem(`lastOtpRequestTime_${mobileno}`, currentTime);

            // Start OTP timer based on expiration time
            startOtpTimer(otpExpirationTime);
        } catch (error) {
            console.error('Error generating OTP:', error.response || error.message || error);
            alert('An error occurred while generating OTP.');
        } finally {
            setLoading(false);
        }
    };
 

    const handleOtpChange = (index, event) => {
        const { value } = event.target

        if (/^\d$/.test(value)) {
            otpRefs.current[index].value = value

            if (index < otpRefs.current.length - 1) {
                otpRefs.current[index + 1].focus()
            }
        } else if (value === '') {
            if (index > 0) {
                otpRefs.current[index - 1].focus()
            }
        }
    }

    const handleClick = () => {
        history.push('/pages/portaldonorRegister')
    }

    const handleCaptchaChange = (event) => {
        setCaptchaText(event.target.value)
    }

    const handleResendOtp = async () => {
        try {
            // call regenerate OTP endpoint  
            const response = await axios.post(`${BaseUrl}/eraktkosh/regenerateOtp`, { mobileno });
            console.log('Resend OTP Response:', response.data)

            const otpData = JSON.parse(response.data.OtpData)
            const otpExpirationTime = Math.floor(otpData.otpExpirationTime / 1000)

            alert('OTP has been resent.')
            setIsOtpExpired(false)
            startOtpTimer(otpExpirationTime)

        } catch (error) {
            console.error('Error resending OTP:', error)
            alert('An error occurred while resending the OTP.')
        }
    }

    const handleRefreshCaptcha = async () => {
        try {
            const response = await axios.post(`${BaseUrl}/eraktkosh/regenerateCaptcha`)
            console.log('Refresh CAPTCHA Response:', response.data)
            setCaptchaImage(response.data.captchaImage)
            setCaptchaText('')
        } catch (error) {
            console.error('Error refreshing CAPTCHA:', error.response || error.message || error)
            alert('An error occurred while refreshing the CAPTCHA.')
        }
    }

    const handleValidate = async () => {
        const otpValues = otpRefs.current.map(input => input.value).join('');

        if (otpValues.length !== 6 || !captchaText) {
            alert('Please fill in both OTP and Captcha.');
            return;
        }

        setLoading(true);

        try {
            const response = await axios.post(`${BaseUrl}/eraktkosh/validate`, {
                captcha: captchaText,
                mobile_no: mobileno,
                otp: otpValues,
                withCredentials: true
            });

            if (response.status === 200) {
                console.log('Validation Response:', response);

                setShowOtpField(false)
                setIsInputDisabled(false)

                // set mobile number in local..........
                localStorage.setItem('mobileNo', mobileno);
                console.log("Mobile number stored in localStorage:", localStorage.getItem("mobileNo"));

                // set mobile number in sessionStorage..........
                sessionStorage.setItem('mobileNo', mobileno);
                console.log("Mobile number stored in sessionStorage:", sessionStorage.getItem("mobileNo"));

                // construct url for new tab...........
                const newTabUrl = `${window.location.origin}/#/pages/portaldonorAdmin?mobileNo=${mobileno}`;

                setTimeout(() => {
                    setLoading(false);
                    window.open(newTabUrl, '_blank', 'noopener,noreferrer');
                }, 2000);
            } else {
                alert(`Validation failed with status code: ${response.status}`);
                console.log('Validate response:', response);
                setLoading(false);
            }
        } catch (error) {

            if (error.response) {
                switch (error.response.status) {
                    case 400:
                        alert('Invalid OTP or CAPTCHA. Please try again.');
                        break;
                    case 401:
                        alert('Invalid OTP or CAPTCHA. Please try again.');
                        break;
                    case 500:
                        alert('Server error. Please try again later.');
                        break;
                    default:
                        alert(`An error occurred. Status code: ${error.response.status}`);
                }
                console.error('Error response:', error.response);
            } else {
                alert('An error occurred while validating OTP and Captcha.');
                console.error('Error during validation:', error.message || error);
            }
            setLoading(false);
        }
    };



    return (
        <>
            {loading && (
                <div className="loader">
                    <div className="spinner"></div>
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
                                                            className={`otp-field ${index > 0 ? '' : ''}`}
                                                            autoFocus={index === 0} />
                                                    ))}
                                                </div>
                                            </div>
                                            <div className="row align-items-center mb-3">
                                                <div className="col-xl-1">
                                                    <img
                                                        className=''
                                                        style={{ cursor: 'pointer' }}
                                                        src="assets/images/refresh.png"
                                                        alt=""
                                                        onClick={handleRefreshCaptcha}
                                                    />
                                                </div>
                                                <div className="col-xl-4">
                                                    {captchaImage && (
                                                        <img style={{ border: '1px solid #BFC1C5', borderRadius: '4px' }} src={captchaImage} alt="CAPTCHA" />
                                                    )}
                                                </div>
                                                <div className="col-xl-7">
                                                    <div className="input-group mb-1">
                                                        <input
                                                            type="text"
                                                            className="form-control p-0"
                                                            placeholder="Enter captcha"
                                                            aria-label="Captcha"
                                                            value={captchaText}
                                                            onChange={handleCaptchaChange}
                                                        />
                                                    </div>
                                                </div>
                                            </div>
                                            <div className='text-center'>
                                                <p className="otpExpiry mb-1">OTP has been sent to your Mobile</p>
                                                <p className="otpExpiry">
                                                    Your OTP will expire in <span className='timer'>{Math.floor(otpExpiry / 60).toString().padStart(2, '0')}:
                                                        {String(otpExpiry % 60).padStart(2, '0')}</span> min
                                                </p>
                                                {isOtpExpired && (
                                                    <div>
                                                        <p className='otpExpiryText mb-1'>Otp Expired</p>
                                                        <button
                                                            type="button"
                                                            className="w-100 btn btn-primary-outline py-1 mb-2"
                                                            onClick={handleResendOtp}>
                                                            Resend OTP
                                                        </button>
                                                    </div>
                                                )}
                                            </div>
                                            {!isOtpExpired && (
                                                <button
                                                    type="button"
                                                    className="w-100 btn btn-primary-outline py-1"
                                                    onClick={handleValidate}
                                                >
                                                    Validate
                                                </button>
                                            )}

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

                            <div className='d-flex align-items-center justify-content-center px-5' style={{ width: '390px' }}>
                                <button
                                    type="submit"
                                    className="btn btn-primary-signIn py-1 w-100 text-center"
                                    onClick={handleClick}>
                                    Register Now
                                </button>
                            </div>
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
