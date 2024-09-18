import React, { useState } from 'react'
import ProgressBar from './progressBar';
import { Select, Space } from 'antd';

export default function DonorAdminProfile() {

    // ---------------------------

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

    //   ---------------------------

    const totalSteps = 3;

    const [currentStep, setCurrentStep] = useState(1);

    const handleNextStep = () => {
        setCurrentStep((prevStep) => Math.min(prevStep + 1, totalSteps))
        console.log("step:", currentStep + 1);
    }

    const handlePreviousStep = () => {
        setCurrentStep((prevStep) => Math.max(prevStep - 1, 1))
        console.log("step:", currentStep - 1);
    }

    // -----------------------------
    return (
        <>

            <ProgressBar currentStep={currentStep} totalSteps={totalSteps} />
            <div className="tabContent">
                {currentStep === 1 &&
                    <div className="widget p-3 mb-3">
                        <h4 className='widgeHeader mb-5'>Stage {currentStep}/{totalSteps} Personal Details</h4>
                        <div className="row">
                            <div className="col-xl-4 col-lg-4 col-md-6 col-sm-6 col-12">
                                <div className="mb-3 form-inputs">
                                    <label for="exampleInputEmail1" className="form-label mb-1">First Name</label>
                                    <img src="assets/images/mendate.png" alt="" />
                                    <input type="text" placeholder='Enter Your Name' className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" />
                                    {/* <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div> */}
                                </div>
                            </div>

                            <div className="col-xl-4 col-lg-4 col-md-6 col-sm-6 col-12">
                                <div className="mb-3 form-inputs">
                                    <label for="exampleInputEmail1" className="form-label mb-1">Last Name</label>
                                    <input type="text" placeholder='Enter Your Last Name' className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" />
                                    {/* <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div> */}
                                </div>
                            </div>

                            <div className="col-xl-4 col-lg-4 col-md-6 col-sm-6 col-12">
                                <div className="mb-3 form-inputs">
                                    <label for="exampleInputEmail1" className="form-label mb-1">Date of Birth </label>
                                    <img src="assets/images/mendate.png" alt="" />
                                    <input type="date" placeholder='Enter Your Date of Birth ' className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" />
                                    {/* <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div> */}
                                </div>
                            </div>

                            <div className="col-xl-4 col-lg-4 col-md-6 col-sm-6 col-12">
                                <div className='d-flex flex-column'>
                                    <label for="exampleInputEmail1" className="form-label mb-1">Gender</label>
                                    <Space wrap >
                                        <Select
                                            defaultValue="Select Your Gender"
                                            style={{
                                                width: '100%',
                                            }}
                                            
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
                                            placeholder="select Your Gender"
                                        />
                                    </Space>
                                </div>
                            </div>

                            <div className="col-xl-4 col-lg-4 col-md-6 col-sm-6 col-12">
                                <div className="mb-3 form-inputs">
                                    <label for="exampleInputEmail1" className="form-label mb-1">Email</label>
                                    <input type="email" placeholder='Enter Your Email ID' className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" />
                                    {/* <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div> */}
                                </div>
                            </div>

                            <div className="col-xl-4 col-lg-4 col-md-6 col-sm-6 col-12">
                                <div className="mb-3 form-inputs">
                                    <label for="exampleInputEmail1" className="form-label mb-1">Mobile No.</label>
                                    <img src="assets/images/mendate.png" alt="" />
                                    <input type="text" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" value={mobile}
                                        onChange={handleInputChange} />
                                    {/* <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div> */}
                                </div>
                            </div>


                        </div>
                    </div>
                }

                {currentStep === 2 &&
                    <div className="widget p-3 mb-3">
                        <h4 className='widgeHeader mb-5'>Stage {currentStep}/{totalSteps} Personal Details</h4>
                        <div className="row">

                            <div className="col-xl-4 col-lg-4 col-md-6 col-sm-6 col-12">
                                <div className='d-flex flex-column'>
                                    <label for="exampleInputEmail1" className="form-label mb-1">Blood Group</label>
                                    <Space wrap style={{ width: '100%' }}>
                                        <Select
                                            defaultValue="select it"
                                            style={{
                                                width: '100%',
                                            }}
                                            allowClear
                                            options={[
                                                {
                                                    value: 'A+',
                                                    label: 'A+',
                                                },
                                                {
                                                    value: 'B+',
                                                    label: 'B+',
                                                },
                                                {
                                                    value: 'O+',
                                                    label: 'O+',
                                                },
                                                {
                                                    value: 'AB+',
                                                    label: 'AB+',
                                                },
                                                {
                                                    value: 'A-',
                                                    label: 'A-',
                                                },
                                                {
                                                    value: 'B-',
                                                    label: 'B-',
                                                },
                                                {
                                                    value: 'O-',
                                                    label: 'O-',
                                                },
                                                {
                                                    value: 'AB-',
                                                    label: 'AB-',
                                                },
                                            ]}
                                            placeholder="select it"
                                        />
                                    </Space>
                                </div>
                            </div>

                            <div className="col-xl-4 col-lg-4 col-md-6 col-sm-6 col-12">
                                <div className="mb-3 form-inputs">
                                    <label for="exampleInputEmail1" className="form-label mb-1">Father Name</label>
                                    <input type="text" placeholder='Enter Your Father Name' className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" />
                                    {/* <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div> */}
                                </div>
                            </div>

                            <div className="col-xl-4 col-lg-4 col-md-6 col-sm-6 col-12">
                                <div className='d-flex flex-column'>
                                    <label for="exampleInputEmail1" className="form-label mb-1">Marital Status</label>
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
                                                {
                                                    value: 'Married',
                                                    label: 'Married',
                                                },
                                                {
                                                    value: 'Divorced',
                                                    label: 'Divorced',
                                                },
                                            ]}
                                            placeholder="select it"
                                        />
                                    </Space>
                                </div>
                            </div>

                            <div className="col-xl-4 col-lg-4 col-md-6 col-sm-6 col-12">
                                <div className="mb-3 form-inputs">
                                    <label for="exampleInputEmail1" className="form-label mb-1">Spouse Name</label>
                                    <input type="email" placeholder='Enter Your Spouse Name' className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" />
                                    {/* <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div> */}
                                </div>
                            </div>

                            <div className="col-xl-4 col-lg-4 col-md-6 col-sm-6 col-12">
                                <div className='d-flex flex-column'>
                                    <label for="exampleInputEmail1" className="form-label mb-1">Occupation</label>
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
                                                {
                                                    value: 'Blanks',
                                                    label: 'Blanks',
                                                },
                                                {
                                                    value: 'Businessman',
                                                    label: 'Businessman',
                                                },
                                                {
                                                    value: 'Corporate Manager',
                                                    label: 'Corporate Manager',
                                                },
                                                {
                                                    value: 'Customer Services Clerk',
                                                    label: 'Customer Services Clerk',
                                                },
                                                {
                                                    value: 'Drivers And Mobile Plant Operators',
                                                    label: 'Drivers And Mobile Plant Operators',
                                                },
                                                {
                                                    value: 'General Managers Test',
                                                    label: 'General Managers Test',
                                                },
                                                {
                                                    value: 'laborers In Mining, Construction, Manufacturing And Transport',
                                                    label: 'laborers In Mining, Construction, Manufacturing And Transport',
                                                },
                                                {
                                                    value: 'Legislators And Senior Officials',
                                                    label: 'Legislators And Senior Officials',
                                                },
                                                {
                                                    value: 'Life Sciences and Health Associate Professional',
                                                    label: 'Life Sciences and Health Associate Professional',
                                                },
                                                {
                                                    value: 'Life Sciences And Hvealth Professional',
                                                    label: 'Life Sciences And Hvealth Professional',
                                                },
                                                {
                                                    value: 'Machine Operators and Assemblers',
                                                    label: 'Machine Operators and Assemblers',
                                                },
                                                {
                                                    value: 'Market Oriented Skilled Agricultural and Fishery Workers',
                                                    label: 'Market Oriented Skilled Agricultural and Fishery Workers',
                                                },
                                                {
                                                    value: 'Metal, Machinery and Related Trades Workers',
                                                    label: 'Metal, Machinery and Related Trades Workers',
                                                },
                                                {
                                                    value: 'Models, Sales Persons and Demonstrators',
                                                    label: 'Models, Sales Persons and Demonstrators',
                                                },
                                                {
                                                    value: 'New Workers Seeking Employment',
                                                    label: 'New Workers Seeking Employment',
                                                },
                                                {
                                                    value: 'Office Clerks',
                                                    label: 'Office Clerks',
                                                },
                                                {
                                                    value: 'Other Associate Professional',
                                                    label: 'Other Associate Professional',
                                                },
                                                {
                                                    value: 'Other Professional',
                                                    label: 'Other Professional',
                                                },
                                                {
                                                    label: 'Personal Protective Services Workers',
                                                    value: 'Personal Protective Services Workers',
                                                }
                                            ]}
                                            placeholder="select it"
                                        />
                                    </Space>
                                </div>
                            </div>

                            <div className="col-xl-4 col-lg-4 col-md-6 col-sm-6 col-12">
                                <div className='d-flex flex-column'>
                                    <label for="exampleInputEmail1" className="form-label mb-1">Religion</label>
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
                        <h4 className='widgeHeader mb-5'>Stage {currentStep}/{totalSteps} Personal Details</h4>
                        <div className="row">

                            <div className="col-xl-4 col-lg-4 col-md-6 col-sm-6 col-12">
                                <div className='d-flex flex-column'>
                                    <label for="exampleInputEmail1" className="form-label mb-1">H. No.</label>
                                    <Space wrap style={{ width: '100%' }}>
                                        <Select
                                            defaultValue="select Your H. No."
                                            style={{
                                                width: '100%',
                                            }}
                                            allowClear
                                            options={[
                                                {
                                                    value: 'A',
                                                    label: 'A',
                                                },
                                                {
                                                    value: 'B',
                                                    label: 'B',
                                                },
                                                {
                                                    value: 'O',
                                                    label: 'O',
                                                },
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
                                    <label for="exampleInputEmail1" className="form-label mb-1">Street/ Address</label>
                                    <input type="text" placeholder='Enter Your Street/ Address' className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" />
                                    {/* <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div> */}
                                </div>
                            </div>

                            <div className="col-xl-4 col-lg-4 col-md-6 col-sm-6 col-12">
                                <div className="mb-3 form-inputs">
                                    <label for="exampleInputEmail1" className="form-label mb-1">Location</label>
                                    <input type="text" placeholder='Enter Your Location' className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" />
                                    {/* <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div> */}
                                </div>
                            </div>

                            <div className="col-xl-4 col-lg-4 col-md-6 col-sm-6 col-12">
                                <div className="mb-3 form-inputs">
                                    <label for="exampleInputEmail1" className="form-label mb-1">City/ Village</label>
                                    <input type="text" placeholder='Enter Your City/ Village' className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" />
                                    {/* <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div> */}
                                </div>
                            </div>

                            <div className="col-xl-4 col-lg-4 col-md-6 col-sm-6 col-12">
                                <div className='d-flex flex-column'>
                                    <label for="exampleInputEmail1" className="form-label mb-1">District</label>
                                    <Space wrap >
                                        <Select
                                            defaultValue="select it"
                                            style={{
                                                width: '100%',
                                            }}
                                            allowClear
                                            options={[
                                                {
                                                    value: 'Faridabad',
                                                    label: 'Faridabad',
                                                },
                                                {
                                                    value: 'Noida',
                                                    label: 'Noida',
                                                },
                                                {
                                                    value: 'Palwal',
                                                    label: 'Palwal',
                                                },
                                            ]}
                                            placeholder="Select Your District"
                                        />
                                    </Space>
                                </div>
                            </div>

                            <div className="col-xl-4 col-lg-4 col-md-6 col-sm-6 col-12">
                                <div className='d-flex flex-column'>
                                    <label for="exampleInputEmail1" className="form-label mb-1">State</label>
                                    <Space wrap >
                                        <Select
                                            defaultValue="select it"
                                            style={{
                                                width: '100%',
                                            }}
                                            allowClear
                                            options={[
                                                {
                                                    value: 'Himachal Pradesh',
                                                    label: 'Himachal Pradesh',
                                                },
                                                {
                                                    value: 'Uttar Pradesh',
                                                    label: 'Uttar Pradesh',
                                                },
                                                {
                                                    value: 'Haryana',
                                                    label: 'Haryana',
                                                },
                                            ]}
                                            placeholder="Select Your State"
                                        />
                                    </Space>
                                </div>
                            </div>

                            <div className="col-xl-4 col-lg-4 col-md-6 col-sm-6 col-12">
                                <div className='d-flex flex-column'>
                                    <label for="exampleInputEmail1" className="form-label mb-1">Country</label>
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
                                                {
                                                    value: 'Australia',
                                                    label: 'Australia',
                                                }
                                            ]}
                                            placeholder="Select Your Country"
                                        />
                                    </Space>
                                </div>
                            </div>

                            <div className="col-xl-4 col-lg-4 col-md-6 col-sm-6 col-12">
                                <div className="mb-3 form-inputs">
                                    <label for="exampleInputEmail1" className="form-label mb-1">Pin Code</label>
                                    <input type="email" placeholder='Enter Your Pin Code' className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" />
                                    {/* <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div> */}
                                </div>
                            </div>

                            <div className="col-xl-4 col-lg-4 col-md-6 col-sm-6 col-12">
                                <div className="mb-3 form-inputs">
                                    <label for="exampleInputEmail1" className="form-label mb-1">Land Mark</label>
                                    <input type="email" placeholder='Enter Your Land Mark' className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" />
                                    {/* <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div> */}
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
