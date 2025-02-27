import React, { useState, useRef, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getApiData } from '../redux/slices/dataSlice';
import { Select, Space } from 'antd';
import { BaseUrl } from '../utils/url';
import axios from 'axios'
export default function DonorRegister() {

    const dispatch = useDispatch();
    const { statesWithDistricts, genders, status } = useSelector((state) => state.data);
    const [formData, setFormData] = useState({
        name: "",
        age: "",
        gender: "",
        mobileNo: "",
        fatherName: "",
        email: "",
        state: "",
        district: "",
        address: "",
        pincode: "",
        captchaInput: "",
    });

    const generateRequestBody = (otpValue) => {

        const today = new Date();
        const birthYear = today.getFullYear() - parseInt(formData.age, 10);
        const birthMonth = String(today.getMonth() + 1).padStart(2, '0');
        const birthDay = String(today.getDate()).padStart(2, '0');
        const dob = `${birthYear}-${birthMonth}-${birthDay} 00:00:00`;

        return {
            mobileNo: formData.mobileNo,
            otp: otpValue,
            firstName: formData.name,
            lastName: "",
            password: "Cdac@123",
            emailId: formData.email,
            genderCode: formData.gender,
            address: formData.address,
            fatherName: formData.fatherName,
            dob: dob,
            bloodGroupCode: "",
            firstLogin: "1",
            demographics: "1",
            isValid: "1",
            stateCode: formData.state,
            districtCode: formData.district,
            pincode: formData.pincode,
            allBlood: "0",
            repository: "0",
            registrationMode: "0",
            userId: formData.mobileNo,
        };
    };

    const [isOtpGenerated, setIsOtpGenerated] = useState(false);
    // const [isOtpValidated, setIsOtpValidated] = useState(false);
    const [selectedGender, setSelectedGender] = useState(null);
    const [selectedState, setSelectedState] = useState(null);
    const [selectedDistrict, setSelectedDistrict] = useState(null);
    const [captchaImage, setCaptchaImage] = useState('');
    const [captchaText, setCaptchaText] = useState("");
    const [error, setError] = useState("");
    const otpRefs = useRef([])
    const [timer, setTimer] = useState(300);
    const [otp, setOtp] = useState(["", "", "", "", "", ""]);
    const [isRegistered, setIsRegistered] = useState(false);

    useEffect(() => {
        fetchCaptcha();
        dispatch(getApiData());
    }, [dispatch]);

    useEffect(() => {
        if (isOtpGenerated && timer > 0) {
            const interval = setInterval(() => {
                setTimer(prevTimer => prevTimer - 1);
            }, 1000);
            return () => clearInterval(interval);
        }
    }, [isOtpGenerated, timer]);

    const handleRegsiter = async () => {
        const otpValue = otp.join("");
        if (otpValue.length !== 6) {
            alert("Please enter a 6-digit OTP.");
            return;
        }

        const requestBody = generateRequestBody(otpValue);

        try {
            const response = await axios.post(`${BaseUrl}/eraktkosh/validateOtpAndRegister`, requestBody);
            if (response.data.message === "User registered successfully") {
                setIsRegistered(true);
            } else {
                alert(response.data.message);
            }
        } catch (error) {
            alert("Something went wrong. Please try again.");
            console.error("API error:", error);
        }
    };

    const formatTime = (timeInSeconds) => {
        const minutes = Math.floor(timeInSeconds / 60);
        const seconds = timeInSeconds % 60;
        return `${minutes}:${seconds < 10 ? `0${seconds}` : seconds}`;
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

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevFormData) => ({
            ...prevFormData,
            [name]: value
        }));
    };

    const handleStateChange = (value) => {
        setSelectedState(value);
        setSelectedDistrict(null);
        setFormData({ ...formData, state: value, district: "" });
    };

    const handleDistrictChange = (value) => {
        setSelectedDistrict(value);
        setFormData({ ...formData, district: value });
    };

    const handleGenderChange = (value) => {
        setSelectedGender(value);
        setFormData({ ...formData, gender: value });
    };

    const handleOtpChange = (index, event) => {
        const value = event.target.value;
        if (/^[0-9]?$/.test(value)) {
            const newOtp = [...otp];
            newOtp[index] = value;
            setOtp(newOtp);
            if (value && index < 5) {
                otpRefs.current[index + 1]?.focus();
            }
        }
    };

    const handleSignUp = async () => {
        let errors = {};

        if (!formData.name.trim()) {
            errors.name = "Please enter your Name.";
        }
        if (!formData.age.trim()) {
            errors.age = "Please enter your Age.";
        }
        if (!formData.mobileNo.trim()) {
            errors.mobileNo = "Please enter your Mobile Number.";
        }
        if (!formData.fatherName.trim()) {
            errors.fatherName = "Please enter your Father's Name.";
        }
        if (!formData.pincode.trim()) {
            errors.pincode = "Please enter your Pincode.";
        }

        if (Object.keys(errors).length > 0) {
            console.log("Validation errors:", errors);
            setError(errors);
            return;
        }

        setError({});

        if (formData.captchaInput !== captchaText) {
            setError({ captchaInput: "CAPTCHA does not match!" });
            return;
        }

        try {
            const response = await axios.post(`${BaseUrl}/eraktkosh/generateOtp`, { mobileNo: formData.mobileNo });

            if (response.data.otp) {
                alert("OTP is generated! " + response.data.otp);
                setIsOtpGenerated(true);
                setTimer(300);
            } else {
                setError({ mobileNo: "Mobile number already registered." });
            }
        } catch (error) {
            setError({ api: "Something went wrong. Please try again later." });
            console.error("Error in OTP generation API", error);
        }
    };

    const handleRedirectButton = () => {
        window.location.href = "/beta#/pages/portalDonorLogin"
    }

    const states = statesWithDistricts || [];
    const districts = selectedState
        ? states.find(state => state.stateCode === selectedState)?.districts || []
        : [];

    return (
        <>
            <section className="donorRegistration">
                <div className='container-fluid'>
                    <h2 className="login-header text-center mt-3 mb-3">
                        Donor Sign-Up
                    </h2>
                    {!isOtpGenerated && (
                        <div>
                            <div className="row justify-content-center">
                                <div className="col-xl-10">
                                    <div className="form-box px-4 py-3">
                                        <div className="row">
                                            {/* name */}
                                            <div className="col-xl-4 col-lg-4 col-md-6 col-sm-6 col-12">
                                                <div className="mb-3">
                                                    <label htmlFor="nameInput" className="form-label mb-1">Name<span className="mandatory">*</span></label>
                                                    <input type="text" value={formData.name} name="name" onChange={handleChange} className="form-control" placeholder="Enter Your Name" id="nameInput" />
                                                    {error.name && <small className="text-danger">{error.name}</small>}
                                                </div>
                                            </div>
                                            {/* age */}
                                            <div className="col-xl-4 col-lg-4 col-md-6 col-sm-6 col-12">
                                                <div className="mb-3">
                                                    <label htmlFor="ageInput" className="form-label mb-1">Age<span className="mandatory">*</span></label>
                                                    <input type="text" value={formData.age} name="age"
                                                        onChange={handleChange} className="form-control"
                                                        placeholder="Enter Your Age" id="mobileInput" maxLength="3"
                                                        onInput={(e) => {
                                                            e.target.value = e.target.value.replace(/[^0-9]/g, "");
                                                        }} />

                                                    {error.age && <small className="text-danger">{error.age}</small>}
                                                </div>
                                            </div>
                                            {/* gender */}
                                            <div className="col-xl-4 col-lg-4 col-md-6 col-sm-6 col-12">
                                                <div className='d-flex flex-column'>
                                                    <label htmlFor="genderInput" className="form-label mb-1">Gender</label>
                                                    <Space wrap >
                                                        <Select
                                                            style={{ width: '100%' }} value={selectedGender}
                                                            onChange={handleGenderChange} placeholder="Select Gender" >
                                                            {genders.map((gender) => (
                                                                <Select.Option key={gender.genderCode} value={gender.genderCode}>
                                                                    {gender.genderName}
                                                                </Select.Option>
                                                            ))}
                                                        </Select>
                                                    </Space>
                                                </div>
                                            </div>
                                            {/* mobile number */}
                                            <div className="col-xl-4 col-lg-4 col-md-6 col-sm-6 col-12">
                                                <div className="mb-3">
                                                    <label htmlFor="mobileInput" className="form-label mb-1">Mobile Number<span className="mandatory">*</span></label>
                                                    <input type="text" value={formData.mobileNo} name="mobileNo"
                                                        onChange={handleChange} className="form-control"
                                                        placeholder="Enter Your Mobile Number" id="mobileInput" maxLength="10"
                                                        onInput={(e) => {
                                                            e.target.value = e.target.value.replace(/[^0-9]/g, "");
                                                        }} />
                                                    {error.mobileNo && <small className="text-danger">{error.mobileNo}</small>}
                                                </div>
                                            </div>
                                            {/* father name */}
                                            <div className="col-xl-4 col-lg-4 col-md-6 col-sm-6 col-12">
                                                <div className="mb-3">
                                                    <label htmlFor="fatherInput" className="form-label mb-1">Father Name<span className="mandatory">*</span></label>
                                                    <input type="text" value={formData.fatherName} name="fatherName" onChange={handleChange} className="form-control" placeholder="Enter Your Father Name" id="fatherInput" />
                                                    {error.fatherName && <small className="text-danger">{error.fatherName}</small>}
                                                </div>
                                            </div>
                                            {/* email */}
                                            <div className="col-xl-4 col-lg-4 col-md-6 col-sm-6 col-12">
                                                <div className="mb-3">
                                                    <label htmlFor="emailInput" className="form-label mb-1">Email</label>
                                                    <div className="input-group p-0">
                                                        <input type="text" value={formData.email} name="email" onChange={handleChange} className="form-control" placeholder='Enter Your Email' id="emailInput" />
                                                    </div>
                                                </div>
                                            </div>
                                            {/* state */}
                                            <div className="col-xl-4 col-lg-4 col-md-6 col-sm-6 col-12">
                                                <div className='d-flex flex-column'>
                                                    <label htmlFor="stateInput" className="form-label mb-1">State</label>
                                                    <Space wrap >
                                                        <Select
                                                            style={{ width: '100%' }}
                                                            value={selectedState}
                                                            onChange={handleStateChange}
                                                            placeholder="Select State" >
                                                            {states.map((state) => (
                                                                <Select.Option key={state.stateCode} value={state.stateCode}>
                                                                    {state.stateName}
                                                                </Select.Option>
                                                            ))}
                                                        </Select>
                                                    </Space>
                                                </div>
                                            </div>
                                            {/* district */}
                                            <div className="col-xl-4 col-lg-4 col-md-6 col-sm-6 col-12">
                                                <div className='d-flex flex-column'>
                                                    <label htmlFor="districtInput" className="form-label mb-1">District</label>
                                                    <Space wrap >
                                                        <Select
                                                            style={{ width: '100%' }}
                                                            value={selectedDistrict}
                                                            onChange={handleDistrictChange}
                                                            placeholder="Select District"
                                                            disabled={!selectedState} >
                                                            {districts.map((district) => (
                                                                <Select.Option key={district.districtCode} value={district.districtCode}>
                                                                    {district.districtName}
                                                                </Select.Option>
                                                            ))}
                                                        </Select>
                                                    </Space>
                                                </div>
                                            </div>
                                            {/* address */}
                                            <div className="col-xl-4 col-lg-4 col-md-6 col-sm-6 col-12">
                                                <div className="mb-3">
                                                    <label htmlFor="addressInput" className="form-label mb-1">Address</label>
                                                    <div className="input-group p-0">
                                                        <input type="text" value={formData.address} name="address" onChange={handleChange} className="form-control" placeholder='Type Your Address' id="addressInput" />
                                                    </div>
                                                </div>
                                            </div>
                                            {/* pincode */}
                                            <div className="col-xl-4 col-lg-4 col-md-6 col-sm-6 col-12">
                                                <div className="mb-3">
                                                    <label htmlFor="pincodeInput" className="form-label mb-1">Pin Code<span className="mandatory">*</span></label>
                                                    <input type="text" value={formData.pincode} name="pincode" onChange={handleChange}
                                                        className="form-control" placeholder="Enter Your Pin Code" id="pincodeInput" maxLength="6"
                                                        onInput={(e) => {
                                                            e.target.value = e.target.value.replace(/[^0-9]/g, "");
                                                        }} />
                                                    {error.pincode && <small className="text-danger">{error.pincode}</small>}
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
                                            <div className="col-xl-4 text-center">
                                                {captchaImage && (
                                                    <img
                                                        src={captchaImage}
                                                        alt="CAPTCHA"
                                                        style={{ cursor: 'pointer' }}
                                                        onClick={fetchCaptcha} />
                                                )}
                                            </div>
                                            <div className="col-xl-6">
                                                <div className="input-group">
                                                    <input
                                                        onChange={handleChange} name='captchaInput'
                                                        value={formData.captchaInput} type="text"
                                                        className="form-control p-0" placeholder="Enter captcha"
                                                        id="username" aria-label="Username"
                                                        aria-describedby="basic-addon1"
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-xl-4 align-items-center">
                                        <div className="text-center px-4">
                                            <button onClick={handleSignUp} className="w-100 btn btn-primary-signIn py-1">Sign Up</button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}

                    {isOtpGenerated && !isRegistered && (
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
                                                        key={index} type="text" maxLength="1" required
                                                        ref={el => otpRefs.current[index] = el}
                                                        onChange={(event) => handleOtpChange(index, event)}
                                                        className="otp-field"
                                                        autoFocus={index === 0}
                                                    />
                                                ))}
                                            </div>
                                        </div>
                                        <div className="text-center">
                                            <p className="otpExpiry mb-1">OTP has been sent to your Mobile</p>
                                            <p className="otpExpiry">
                                                Your OTP will expire in <span className="timer">{formatTime(timer)}</span> min
                                            </p>
                                        </div>
                                        <button
                                            type="button"
                                            className="w-100 btn btn-primary-signIn py-1"
                                            onClick={handleRegsiter}
                                            disabled={timer === 0} >
                                            Validate
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}

                    {isRegistered && (
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
                                                className="btn btn-primary-signIn py-1 w-100 text-center"
                                                onClick={handleRedirectButton}>
                                                Login
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </section>
        </>
    );
}
