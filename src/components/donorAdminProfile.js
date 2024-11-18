import React, { useState } from 'react'
import ProgressBar from './progressBar'
import { Select, Space } from 'antd'
import { useDonor } from '../context/DonorContext'

export default function DonorAdminProfile() {

    const { donorData, setDonorData } = useDonor()

    const totalSteps = 3

    const [currentStep, setCurrentStep] = useState(1)
    const [errors, setErrors] = useState({})

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

    const validateFields = () => {
        const newErrors = {}

        if (!donorData.body?.edonorFName || donorData.body.edonorFName.trim() === '') {
            newErrors.edonorFName = 'Please Enter First Name'
        }
        if (!donorData.body?.edonorDOB || donorData.body.edonorDOB.trim() === '') {
            newErrors.edonorDOB = 'Please Enter Date of Birth'
        }
        if (!donorData.body?.gender || donorData.body.gender.trim() === '') {
            newErrors.gender = 'Please Select Gender'
        }
        if (!donorData.body?.edonorEmail || donorData.body.edonorEmail.trim() === '') {
            newErrors.edonorEmail = 'Please Enter Your Email'
        }
        // if (!donorData.body?.mobileno || donorData.body?.mobileno.trim() === '') {
        //     newErrors.mobileno = 'Please Enter Your Mobile Number';
        // }

        setErrors(newErrors)

        return Object.keys(newErrors).length === 0
    }

    const handleInputChange = (field, value) => {
        setDonorData((prevData) => ({
            ...prevData,
            body: {
                ...prevData.body,
                [field]: value,
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

                                    {/* <div id="emailHelp" className="form-text" style={{ color: '#C0222B' }}>Please Enter First Name</div> */}
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
                                        placeholder='Enter Your Date of Birth'
                                        className="form-control"
                                        id="dob"
                                        value={donorData.body?.edonorDOB || ''}
                                        onChange={(e) => handleInputChange('edonorDOB', e.target.value)}
                                    />
                                    {/* <div id="emailHelp" className="form-text" style={{ color: '#C0222B' }}>Please Enter Date of Birth</div> */}
                                    {errors.edonorDOB && <div className="form-text" style={{ color: '#C0222B' }}>{errors.edonorDOB}</div>}
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
                                            // value={donorData.body.gender || "Select donor gender"}
                                            style={{ width: '100%' }}
                                            value={donorData.body?.gender || null}
                                            onChange={(value) => handleInputChange('gender', value)}
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
                                                }
                                            ]}
                                            placeholder="Select donor gender"
                                        />
                                    </Space>
                                    {/* <div id="emailHelp" className="form-text" style={{ color: '#C0222B' }}>Please Select Gender</div> */}
                                    {errors.gender && <div className="form-text" style={{ color: '#C0222B' }}>{errors.gender}</div>}
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
                                <div className='d-flex flex-column'>
                                    <label htmlFor="exampleInputEmail1" className="form-label mb-1">Blood Group</label>
                                    <Space wrap>
                                        <Select
                                            // value={donorData.body.bloodgroup || "Select it"}
                                            style={{ width: '100%' }}
                                            onChange={value => {
                                                console.log('Selected Blood group:', value);
                                                setDonorData({ ...donorData, bloodgroup: value });
                                            }}
                                            options={[
                                                {
                                                    value: 'A+',
                                                    label: 'A+',
                                                },
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
                                        <Select
                                            defaultValue="select it"
                                            style={{
                                                width: '100%',
                                            }}
                                            allowClear
                                            options={[
                                                {
                                                    value: 'Single',
                                                    label: 'Single',
                                                },
                                            ]}
                                            placeholder="select it"
                                        />
                                    </Space>
                                </div>
                            </div>

                            <div className="col-xl-4 col-lg-4 col-md-6 col-sm-6 col-12">
                                <div className="mb-3 form-inputs">
                                    <label htmlFor="exampleInputEmail1" className="form-label mb-1">Spouse Name</label>
                                    <input type="email" placeholder='Enter Your Spouse Name' className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" />
                                </div>
                            </div>

                            <div className="col-xl-4 col-lg-4 col-md-6 col-sm-6 col-12">
                                <div className='d-flex flex-column'>
                                    <label htmlFor="exampleInputEmail1" className="form-label mb-1">Occupation</label>
                                    <Space wrap >
                                        <Select
                                            defaultValue="select it"
                                            style={{
                                                width: '100%',
                                            }}
                                            allowClear
                                            options={[
                                                {
                                                    value: 'Agricultural, Fishery And Related Labour',
                                                    label: 'Agricultural, Fishery And Related Labour',
                                                },
                                            ]}
                                            placeholder="select it"
                                        />
                                    </Space>
                                </div>
                            </div>

                            <div className="col-xl-4 col-lg-4 col-md-6 col-sm-6 col-12">
                                <div className='d-flex flex-column'>
                                    <label htmlFor="exampleInputEmail1" className="form-label mb-1">Religion</label>
                                    <Space wrap>
                                        <Select
                                            defaultValue="select it"
                                            style={{
                                                width: '100%',
                                            }}
                                            allowClear
                                            options={[
                                                {
                                                    value: 'Buddhism',
                                                    label: 'Buddhism',
                                                },
                                                {
                                                    value: 'Christainity',
                                                    label: 'Christainity',
                                                },
                                                {
                                                    value: 'Hinduism',
                                                    label: 'Hinduism',
                                                },
                                                {
                                                    value: 'Islam',
                                                    label: 'Islam',
                                                },
                                                {
                                                    value: 'Jainism',
                                                    label: 'Jainism',
                                                },
                                                {
                                                    value: 'Sikhism',
                                                    label: 'Sikhism',
                                                },
                                                {
                                                    value: 'Other',
                                                    label: 'Other',
                                                },
                                            ]}
                                            placeholder="select it"
                                        />
                                    </Space>
                                </div>
                            </div>

                        </div>
                    </div>
                }

                {currentStep === 3 &&
                    <div className="widget p-3 mb-3">
                        <h4 className='widgeHeader mb-4'>Stage {currentStep}/{totalSteps} Personal Details</h4>
                        <div className="row">

                            <div className="col-xl-4 col-lg-4 col-md-6 col-sm-6 col-12">
                                <div className='d-flex flex-column'>
                                    <label htmlFor="exampleInputEmail1" className="form-label mb-1">H. No.</label>
                                    <Space wrap style={{ width: '100%' }}>
                                        <Select
                                            defaultValue="select Your H. No."
                                            style={{
                                                width: '100%',
                                            }}
                                            allowClear
                                            options={[
                                                {
                                                    value: 'AB',
                                                    label: 'AB',
                                                },
                                            ]}
                                            placeholder="Select Your H. No."
                                        />
                                    </Space>
                                </div>
                            </div>

                            <div className="col-xl-4 col-lg-4 col-md-6 col-sm-6 col-12">
                                <div className="mb-3 form-inputs">
                                    <label htmlFor="exampleInputEmail1" className="form-label mb-1">Street/ Address</label>
                                    <input type="text" placeholder='Enter Your Street/ Address' className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" />
                                </div>
                            </div>

                            <div className="col-xl-4 col-lg-4 col-md-6 col-sm-6 col-12">
                                <div className="mb-3 form-inputs">
                                    <label htmlFor="exampleInputEmail1" className="form-label mb-1">Location</label>
                                    <input type="text" placeholder='Enter Your Location' className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" />
                                </div>
                            </div>

                            <div className="col-xl-4 col-lg-4 col-md-6 col-sm-6 col-12">
                                <div className="mb-3 form-inputs">
                                    <label htmlFor="exampleInputEmail1" className="form-label mb-1">City/ Village</label>
                                    <input type="text" placeholder='Enter Your City/ Village' className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" />
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
                                <div className='d-flex flex-column'>
                                    <label htmlFor="exampleInputEmail1" className="form-label mb-1">Country</label>
                                    <Space wrap >
                                        <Select
                                            defaultValue="select it"
                                            style={{
                                                width: '100%',
                                            }}
                                            allowClear
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
                                    <input type="email" placeholder='Enter Your Pin Code' className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" />
                                </div>
                            </div>

                            <div className="col-xl-4 col-lg-4 col-md-6 col-sm-6 col-12">
                                <div className="mb-3 form-inputs">
                                    <label htmlFor="exampleInputEmail1" className="form-label mb-1">Land Mark</label>
                                    <input type="email" placeholder='Enter Your Land Mark' className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" />
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
                </div>
            </div>
        </>
    )
}
