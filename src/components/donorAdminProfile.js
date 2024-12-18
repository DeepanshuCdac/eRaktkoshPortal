import React, { useState } from 'react'
import ProgressBar from './progressBar'
import { Select, Space } from 'antd'
import { useDonor } from '../context/DonorContext'
import axios from 'axios';
import BaseUrl from '../utils/url.js';

export default function DonorAdminProfile() {

    const { donorData, setDonorData } = useDonor()

    const totalSteps = 3

    const [currentStep, setCurrentStep] = useState(1)
    const [errors, setErrors] = useState({})

    const genderMap = {
        M: 'Male',
        F: 'Female',
        O: 'Others',
    };

    const reverseGenderMap = {
        Male: 'M',
        Female: 'F',
        Others: 'O',
    };

    const convertToDDMMYYYY = (date) => {
        if (!date) return '';
        const [year, month, day] = date.split('-');
        return `${day}-${month}-${year}`;
    };

    const convertToISOFormat = (date) => {
        if (!date) return '';
        const [day, month, year] = date.split('-');
        return `${year}-${month}-${day}`;
    };


    const handleNextStep = () => {
        if (validateFields()) {
            setCurrentStep((prevStep) => Math.min(prevStep + 1, totalSteps))
        }
        console.log("step:", currentStep + 1)
    }

    const handlePreviousStep = () => {
        setCurrentStep((prevStep) => Math.max(prevStep - 1, 1))
        console.log("step:", currentStep - 1)
    }

    const handleSave = async () => {
        try {
            if (!validateFields()) {
                alert("Please fix the errors in the form before saving.");
                return;
            }

            // Make the API call
            const response = await axios.post(
                `${BaseUrl}/eraktkosh/updateOrInsertDonorDetails`,
                donorData.body,
                {
                    headers: {
                        'Content-Type': 'application/json',
                        // Include authorization token if needed
                        // 'Authorization': `Bearer ${token}`,
                    },
                }
            );

            // Check the response
            if (response.status === 200) {
                alert('Data saved successfully!');
            } else {
                alert('Something went wrong. Please try again.');
            }
        } catch (error) {
            // errors
            console.error('Error saving data:', error);

            if (error.response) {
                alert(`Server error: ${error.response.data?.message || 'Failed to save data'}`);
            } else if (error.request) {
                alert('No response from server. Please check your connection.');
            } else {
                alert('An unexpected error occurred. Please try again.');
            }
        }
    };

    const validateFields = () => {
        const newErrors = {}

        if (!donorData.body?.edonorFName || donorData.body.edonorFName.trim() === '') {
            newErrors.edonorFName = 'Please Enter First Name'
        }
        if (!donorData.body?.dob || donorData.body.dob.trim() === '') {
            newErrors.dob = 'Please Enter Date of Birth'
        }
        if (!donorData.body?.gender || donorData.body.gender.trim() === '') {
            newErrors.gender = 'Please Select Gender'
        }
        if (!donorData.body?.edonorEmail || donorData.body.edonorEmail.trim() === '') {
            newErrors.edonorEmail = 'Please Enter Your Email'
        }

        setErrors(newErrors)

        return Object.keys(newErrors).length === 0
    }

    const handleInputChange = (field, value) => {
        setDonorData((prevData) => ({
            ...prevData,
            body: {
                ...prevData.body,
                [field]: field === 'gender' ? reverseGenderMap[value] : value,
            },
        }))
    }

    // -----------------------------
    return (
        <>
            <ProgressBar currentStep={currentStep} totalSteps={totalSteps} />
            <div className="tabContent mb-3">
                {currentStep === 1 &&
                    <div className="widget p-3 mb-3">
                        <h4 className='widgeHeader mb-4'>Stage {currentStep}/{totalSteps} Personal Details</h4>
                        <div className="row">
                            <div className="col-xl-4 col-lg-4 col-md-6 col-sm-6 col-12">
                                <div className="mb-3 form-inputs">
                                    <label htmlFor="exampleInputEmail1" className="form-label mb-1">First Name</label>
                                    <img src="assets/images/mendate.png" alt="Mendate" />
                                    <input
                                        type="text"
                                        placeholder='Enter Your Name'
                                        className="form-control"
                                        id="firstName"
                                        value={donorData.body?.edonorFName || ''}
                                        onChange={(e) => handleInputChange('edonorFName', e.target.value)}
                                    />

                                    {errors.edonorFName && <div className="form-text" style={{ color: '#C0222B' }}>{errors.edonorFName}</div>}
                                </div>
                            </div>

                            <div className="col-xl-4 col-lg-4 col-md-6 col-sm-6 col-12">
                                <div className="mb-3 form-inputs">
                                    <label htmlFor="exampleInputEmail1" className="form-label mb-1">Last Name</label>
                                    <input
                                        type="text"
                                        placeholder='Enter Your Last Name'
                                        className="form-control"
                                        id="lastName"
                                        value={donorData.body?.edonorLName || ''}
                                        onChange={e =>
                                            setDonorData({
                                                ...donorData,
                                                body: {
                                                    ...donorData.body,
                                                    edonorLName: e.target.value,
                                                },
                                            })
                                        }
                                    />
                                </div>
                            </div>

                            <div className="col-xl-4 col-lg-4 col-md-6 col-sm-6 col-12">
                                <div className="mb-3 form-inputs">
                                    <label htmlFor="exampleInputEmail1" className="form-label mb-1">Date of Birth </label>
                                    <img src="assets/images/mendate.png" alt="Mendate" />
                                    <input
                                        type="date"
                                        placeholder="Enter Your Date of Birth"
                                        className="form-control"
                                        id="dob"
                                        value={convertToISOFormat(donorData.body?.dob) || ''}
                                        onChange={(e) => handleInputChange('dob', convertToDDMMYYYY(e.target.value))}
                                    />
                                    {errors.dob && <div className="form-text" style={{ color: '#C0222B' }}>{errors.dob}</div>}
                                </div>
                            </div>

                            <div className="col-xl-4 col-lg-4 col-md-6 col-sm-6 col-12">
                                <div className='d-flex flex-column'>
                                    <div className='d-flex align-items-center'>
                                        <label htmlFor="gender" className="form-label mb-1">Gender</label>
                                        <img src="assets/images/mendate.png" alt="Mendate" />
                                    </div>
                                    <Space wrap>
                                        <Select
                                            style={{ width: '100%' }}
                                            value={genderMap[donorData.body?.gender] || null}
                                            onChange={(value) => handleInputChange('gender', value)}
                                            options={[
                                                { value: 'Male', label: 'Male' },
                                                { value: 'Female', label: 'Female' },
                                                { value: 'Others', label: 'Others' },
                                            ]}
                                            placeholder="Select donor gender"
                                        />
                                    </Space>
                                    {errors.gender && (
                                        <div className="form-text" style={{ color: '#C0222B' }}>
                                            {errors.gender}
                                        </div>
                                    )}
                                </div>
                            </div>

                            <div className="col-xl-4 col-lg-4 col-md-6 col-sm-6 col-12">
                                <div className="mb-3 form-inputs">
                                    <label htmlFor="exampleInputEmail1" className="form-label mb-1">Email</label>
                                    <img src="assets/images/mendate.png" alt="Mendate" />
                                    <input
                                        type="email"
                                        placeholder='Enter Your Email ID'
                                        className="form-control"
                                        id="emailID"
                                        value={donorData.body?.edonorEmail || ''}
                                        onChange={(e) => handleInputChange('edonorEmail', e.target.value)}
                                    />
                                    {errors.edonorEmail && <div className="form-text" style={{ color: '#C0222B' }}>{errors.edonorEmail}</div>}
                                </div>
                            </div>

                            <div className="col-xl-4 col-lg-4 col-md-6 col-sm-6 col-12">
                                <div className="mb-3 form-inputs">
                                    <label htmlFor="exampleInputEmail1" className="form-label mb-1">Mobile No.</label>
                                    <img src="assets/images/mendate.png" alt="Mendate" />
                                    <input type="text"
                                        disabled
                                        className="form-control"
                                        id="exampleInputEmail1"
                                        aria-describedby="emailHelp"
                                        value={donorData.body.mobileno || ''}
                                        onChange={e =>
                                            setDonorData({
                                                ...donorData,
                                                mobileno: e.target.value
                                            })}
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                }

                {currentStep === 2 &&
                    <div className="widget p-3 mb-3">
                        <h4 className='widgeHeader mb-4'>Stage {currentStep}/{totalSteps} Personal Details</h4>
                        <div className="row">
                            <div className="col-xl-4 col-lg-4 col-md-6 col-sm-6 col-12">
                                <div className="d-flex flex-column">
                                    <label htmlFor="exampleInputEmail1" className="form-label mb-1">Blood Group</label>
                                    <Space wrap>
                                        <Select
                                            value={donorData.body?.bloodGroup || undefined}
                                            style={{ width: '100%' }}
                                            onChange={value => {
                                                console.log('Selected Blood group:', value);
                                                setDonorData(prevData => ({
                                                    ...prevData,
                                                    body: { 
                                                        ...prevData.body,
                                                        bloodGroup: value,
                                                    },
                                                }));
                                            }}
                                            options={[
                                                { value: 20, label: 'A+' },
                                                { value: 12, label: 'A-' },
                                                { value: 13, label: 'B+' },
                                                { value: 14, label: 'B-' },
                                                { value: 17, label: 'AB+' },
                                                { value: 18, label: 'AB-' },
                                                { value: 15, label: 'O+' },
                                                { value: 16, label: 'O-' },
                                            ]}
                                            placeholder="Select it"
                                        />
                                    </Space>
                                </div>
                            </div>

                            <div className="col-xl-4 col-lg-4 col-md-6 col-sm-6 col-12">
                                <div className="mb-3 form-inputs">
                                    <label htmlFor="exampleInputEmail1" className="form-label mb-1">Father Name</label>
                                    <input
                                        type="text"
                                        placeholder='Enter Your Father Name'
                                        className="form-control"
                                        id="fatherName"
                                        value={donorData.body?.fatherName || ''}
                                        onChange={e =>
                                            setDonorData({
                                                ...donorData,
                                                body: {
                                                    ...donorData.body,
                                                    fatherName: e.target.value,
                                                },
                                            })
                                        }
                                    />
                                </div>
                            </div>

                            <div className="col-xl-4 col-lg-4 col-md-6 col-sm-6 col-12">
                                <div className='d-flex flex-column'>
                                    <label htmlFor="exampleInputEmail1" className="form-label mb-1">Marital Status</label>
                                    <Space wrap >
                                        {/* <Select
                                            value={donorData.body?.maritalStatus || "Select it"}
                                            style={{ width: '100%' }}
                                            allowClear
                                            onChange={value => {
                                                console.log('Selected Marital Status:', value);
                                                setDonorData(prevData => ({
                                                    ...prevData,
                                                    body: {
                                                        ...prevData.body,
                                                        maritalStatus: value,
                                                    },
                                                }));
                                            }}
                                            options={[
                                                { value: 'Single', label: 'Single' },
                                                { value: 'Married', label: 'Married' },
                                            ]}
                                            placeholder="Select it"
                                        /> */}


                                        <Select
                                            value={donorData.body?.maritalStatus !== undefined ? donorData.body.maritalStatus : undefined}
                                            style={{ width: '100%' }}
                                            onChange={value => {
                                                console.log('Selected Marital Status:', value); // Logs numeric value
                                                setDonorData(prevData => ({
                                                    ...prevData,
                                                    body: {
                                                        ...prevData.body,
                                                        maritalStatus: value, // Saves numeric value
                                                    },
                                                }));
                                            }}
                                            options={[
                                                { value: 1, label: 'Married' },
                                                { value: -1, label: 'Single' },
                                            ]}
                                            placeholder="Select it"
                                        />

                                    </Space>
                                </div>
                            </div>

                            <div className="col-xl-4 col-lg-4 col-md-6 col-sm-6 col-12">
                                <div className="mb-3 form-inputs">
                                    <label htmlFor="exampleInputEmail1" className="form-label mb-1">Spouse Name</label>
                                    <input
                                        type="text"
                                        placeholder='Enter Your Spouse Name'
                                        className="form-control"
                                        id="spouseName"
                                        value={donorData.body?.spouce || ''}
                                        onChange={e =>
                                            setDonorData({
                                                ...donorData,
                                                body: {
                                                    ...donorData.body,
                                                    spouce: e.target.value,
                                                },
                                            })
                                        }
                                    />
                                </div>
                            </div>

                            <div className="col-xl-4 col-lg-4 col-md-6 col-sm-6 col-12">
                                <div className='d-flex flex-column'>
                                    <label htmlFor="exampleInputEmail1" className="form-label mb-1">Occupation</label>
                                    <Space wrap >
                                        <Select
                                            value={donorData.body?.occupation || "Select Occupation"}
                                            style={{ width: '100%' }}
                                            onChange={value => {
                                                console.log('Selected Occupation:', value);
                                                setDonorData(prevData => ({
                                                    ...prevData,
                                                    body: {
                                                        ...prevData.body,
                                                        occupation: value,
                                                    },
                                                }));
                                            }}
                                            options={[
                                                { value: 'Agriculture', label: 'Agriculture' },
                                                { value: 'Teaching', label: 'Teaching' }
                                            ]}
                                            placeholder="Select Occupation"
                                        />
                                    </Space>
                                </div>
                            </div>

                            <div className="col-xl-4 col-lg-4 col-md-6 col-sm-6 col-12">
                                <div className='d-flex flex-column'>
                                    <label htmlFor="exampleInputEmail1" className="form-label mb-1">Religion</label>
                                    <Space wrap>
                                        <Select
                                            value={donorData.body?.religion || "Select It"}
                                            style={{ width: '100%' }}
                                            onChange={value => {
                                                console.log('Selected Religion:', value);
                                                setDonorData(prevData => ({
                                                    ...prevData,
                                                    body: {
                                                        ...prevData.body,
                                                        religion: value,
                                                    },
                                                }));
                                            }}
                                            options={[
                                                { value: 'Hinduism', label: 'Hinduism' },
                                                { value: 'Buddhism', label: 'Buddhism' },
                                            ]}
                                            placeholder="Select it"
                                        />
                                    </Space>
                                </div>
                            </div>
                        </div>
                    </div>
                }

                {currentStep === 3 &&
                    <div>
                        <div className="widget p-3 mb-3">
                            <h4 className='widgeHeader mb-4'>Stage {currentStep}/{totalSteps} Personal Details</h4>
                            <div className="row">

                                <div className="col-xl-4 col-lg-4 col-md-6 col-sm-6 col-12">
                                    <div className="mb-3 form-inputs">
                                        <label htmlFor="exampleInputEmail1" className="form-label mb-1">H. No.</label>
                                        <input
                                            type="text"
                                            placeholder='Enter Your H. No.'
                                            className="form-control"
                                            id="houseno"
                                            value={donorData.body?.hno || ''}
                                            onChange={e =>
                                                setDonorData({
                                                    ...donorData,
                                                    body: {
                                                        ...donorData.body,
                                                        hno: e.target.value,
                                                    },
                                                })
                                            }
                                        />
                                    </div>
                                </div>

                                <div className="col-xl-4 col-lg-4 col-md-6 col-sm-6 col-12">
                                    <div className="mb-3 form-inputs">
                                        <label htmlFor="exampleInputEmail1" className="form-label mb-1">Street/ Address</label>
                                        <input
                                            type="text"
                                            placeholder='Enter Your Street/ Address'
                                            className="form-control"
                                            id="address"
                                            value={donorData.body?.address || ''}
                                            onChange={e =>
                                                setDonorData({
                                                    ...donorData,
                                                    body: {
                                                        ...donorData.body,
                                                        address: e.target.value,
                                                    },
                                                })
                                            }
                                        />
                                    </div>
                                </div>

                                <div className="col-xl-4 col-lg-4 col-md-6 col-sm-6 col-12">
                                    <div className="mb-3 form-inputs">
                                        <label htmlFor="exampleInputEmail1" className="form-label mb-1">Location</label>
                                        <input
                                            type="text"
                                            placeholder='Enter Your Loaction'
                                            className="form-control"
                                            id="location"
                                            value={donorData.body?.location || ''}
                                            onChange={e =>
                                                setDonorData({
                                                    ...donorData,
                                                    body: {
                                                        ...donorData.body,
                                                        location: e.target.value,
                                                    },
                                                })
                                            }
                                        />
                                    </div>
                                </div>

                                <div className="col-xl-4 col-lg-4 col-md-6 col-sm-6 col-12">
                                    <div className="mb-3 form-inputs">
                                        <label htmlFor="exampleInputEmail1" className="form-label mb-1">City/ Village</label>
                                        <input
                                            type="text"
                                            placeholder='Enter Your City/ Village'
                                            className="form-control"
                                            id="donorCity"
                                            value={donorData.body?.donorCity || ''}
                                            onChange={e =>
                                                setDonorData({
                                                    ...donorData,
                                                    body: {
                                                        ...donorData.body,
                                                        donorCity: e.target.value,
                                                    },
                                                })
                                            }
                                        />
                                    </div>
                                </div>

                                <div className="col-xl-4 col-lg-4 col-md-6 col-sm-6 col-12">
                                    <div className='d-flex flex-column'>
                                        <label htmlFor="exampleInputEmail1" className="form-label mb-1">District</label>
                                        <Space wrap >
                                            <Select
                                                value={donorData.body.edonorDistName || "Select Your District"}
                                                style={{ width: '100%' }}
                                                onChange={(value) => handleInputChange('district', value)}
                                                options={[
                                                    {
                                                        value: 'Noida',
                                                        label: 'Noida',
                                                    }
                                                ]}
                                                placeholder="Select Your District"
                                            />
                                        </Space>
                                    </div>
                                </div>

                                <div className="col-xl-4 col-lg-4 col-md-6 col-sm-6 col-12">
                                    <div className='d-flex flex-column'>
                                        <label htmlFor="exampleInputEmail1" className="form-label mb-1">State</label>
                                        <Space wrap >
                                            <Select
                                                value={donorData.body.edonorStateName || "Select Your State"}
                                                style={{ width: '100%' }}
                                                onChange={(value) => handleInputChange('State', value)}
                                                options={[
                                                    {
                                                        value: 'Uttar Pradesh',
                                                        label: 'Uttar Pradesh',
                                                    }
                                                ]}
                                                placeholder="Select Your State"
                                            />

                                        </Space>
                                    </div>
                                </div>

                                <div className="col-xl-4 col-lg-4 col-md-6 col-sm-6 col-12">
                                    <div className="d-flex flex-column">
                                        <label htmlFor="exampleInputEmail1" className="form-label mb-1">Country</label>
                                        <Space wrap>
                                            <Select
                                                value="India"
                                                style={{
                                                    width: '100%',
                                                }}
                                                disabled
                                                options={[
                                                    {
                                                        value: 'India',
                                                        label: 'India',
                                                    },
                                                ]}
                                                placeholder="Select Your Country"
                                            />
                                        </Space>
                                    </div>
                                </div>


                                <div className="col-xl-4 col-lg-4 col-md-6 col-sm-6 col-12">
                                    <div className="mb-3 form-inputs">
                                        <label htmlFor="exampleInputEmail1" className="form-label mb-1">Pin Code</label>
                                        <input
                                            type="text"
                                            placeholder='Enter Your Pin Code'
                                            className="form-control"
                                            id="pinCode"
                                            value={donorData.body?.donorPin || ''}
                                            onChange={e =>
                                                setDonorData({
                                                    ...donorData,
                                                    body: {
                                                        ...donorData.body,
                                                        donorPin: e.target.value,
                                                    },
                                                })
                                            }
                                        />
                                    </div>
                                </div>

                                <div className="col-xl-4 col-lg-4 col-md-6 col-sm-6 col-12">
                                    <div className="mb-3 form-inputs">
                                        <label htmlFor="exampleInputEmail1" className="form-label mb-1">Land Mark</label>
                                        <input
                                            type="text"
                                            placeholder='Enter Your LandMark'
                                            className="form-control"
                                            id="landMark"
                                            value={donorData.body?.landmark || ''}
                                            onChange={e =>
                                                setDonorData({
                                                    ...donorData,
                                                    body: {
                                                        ...donorData.body,
                                                        landmark: e.target.value,
                                                    },
                                                })
                                            }
                                        />
                                    </div>
                                </div>

                            </div>
                        </div>
                    </div>
                }

                <div className='text-center'>
                    {currentStep !== 1 && (
                        <button onClick={handlePreviousStep} className="btn btn-primary-outline me-3" style={{ padding: '7px 136px' }}>
                            Back
                        </button>
                    )}
                    {currentStep !== 3 && (
                        <button onClick={handleNextStep} className="btn btn-primary-signIn" style={{ padding: '7px 136px' }}>
                            Next
                        </button>
                    )}

                    {currentStep === 3 && (
                        <button onClick={handleSave} className="btn btn-primary-signIn" style={{ padding: '7px 136px' }}>
                            Save
                        </button>
                    )}
                </div>
            </div>
        </>
    )
}
