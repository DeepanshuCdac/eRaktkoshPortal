import React, { useEffect } from "react";
import { Select, Space } from 'antd'
import '../scss/campRegistration.scss'

const CampRegistration = () => {

    useEffect(() => {
        document.title = 'e-raktKosh Camp Registration'
    }, [])

    return (
        <>
            <div className="campRegistration mt-3">
                <div className="container">
                    <div>
                        <h4 className="text-center header-page">Camp Registration</h4>
                    </div>

                    {/* section 1 */}
                    <div className="widget mb-2 p-3">
                        <div className="row mx-4">
                            <div className="col-xl-4 col-lg-4 col-md-6 col-sm-6 col-12">
                                <div className='d-flex flex-column'>
                                    <div className='d-flex align-items-center'>
                                        <label htmlFor="gender" className="form-label mb-1">Organisation Type <span className="mandatory">*</span></label>
                                     </div>
                                    <Space wrap>
                                        <Select
                                            style={{ width: '100%' }}
                                            options={[
                                                { value: 'Male', label: 'Male' },
                                                { value: 'Female', label: 'Female' },
                                                { value: 'Others', label: 'Others' },
                                            ]}
                                            placeholder="Select Value" />
                                    </Space>
                                </div>
                            </div>

                            <div className="col-xl-4 col-lg-4 col-md-6 col-sm-6 col-12">
                                <div className="mb-3 form-inputs">
                                    <label htmlFor="exampleInputEmail1" className="form-label mb-1">Organisation Name <span className="mandatory">*</span></label>
                                    <input
                                        type="text"
                                        placeholder=''
                                        className="form-control"
                                        id="firstName" />
                                </div>
                            </div>

                            <div className="col-xl-4 col-lg-4 col-md-6 col-sm-6 col-12">
                                <div className="mb-3 form-inputs">
                                    <label htmlFor="exampleInputEmail1" className="form-label mb-1">Organiser Name <span className="mandatory">*</span></label>
                                    <input
                                        type="text"
                                        placeholder=''
                                        className="form-control"
                                        id="firstName" />
                                </div>
                            </div>

                            <div className="col-xl-4 col-lg-4 col-md-6 col-sm-6 col-12">
                                <div className="mb-3 form-inputs">
                                    <label htmlFor="exampleInputEmail1" className="form-label mb-1">Organiser Mobile No. <span className="mandatory">*</span></label>
                                    <input
                                        type="text"
                                        placeholder=''
                                        className="form-control"
                                        id="firstName" />
                                </div>
                            </div>

                            <div className="col-xl-4 col-lg-4 col-md-6 col-sm-6 col-12">
                                <div className="mb-3 form-inputs">
                                    <label htmlFor="exampleInputEmail1" className="form-label mb-1">Organiser Email ID <span className="mandatory">*</span></label>
                                  <input
                                        type="text"
                                        placeholder=''
                                        className="form-control"
                                        id="firstName" />
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Section 2 */}
                    <div className="widget p-3 mb-2">
                        <div className="row mx-4">
                            <div className="col-xl-4 col-lg-4 col-md-6 col-sm-6 col-12">
                                <div className="mb-3 form-inputs">
                                    <label htmlFor="exampleInputEmail1" className="form-label mb-1">Co-Organiser Name</label>
                                    {/* <img src="assets/images/mendate.png" alt="Mendate" /> */}
                                    <input
                                        type="text"
                                        placeholder=''
                                        className="form-control"
                                        id="firstName" />
                                </div>
                            </div>

                            <div className="col-xl-4 col-lg-4 col-md-6 col-sm-6 col-12">
                                <div className="mb-3 form-inputs">
                                    <label htmlFor="exampleInputEmail1" className="form-label mb-1">Co-Organiser Mobile</label>
                                    {/* <img src="assets/images/mendate.png" alt="Mendate" /> */}
                                    <input
                                        type="text"
                                        placeholder='Enter Co-Organiser Mobile Number'
                                        className="form-control"
                                        id="firstName" />
                                </div>
                            </div>

                            <div className="col-xl-4 col-lg-4 col-md-6 col-sm-6 col-12">
                                <div className="mb-3 form-inputs">
                                    <label htmlFor="exampleInputEmail1" className="form-label mb-1">Camp Name</label>
                                    {/* <img src="assets/images/mendate.png" alt="Mendate" /> */}
                                    <input
                                        type="text"
                                        placeholder=''
                                        className="form-control"
                                        id="firstName" />
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Section 3 */}
                    <div className="widget mb-2 p-3">
                        <div className="row mx-4">
                            <div className="col-xl-4 col-lg-4 col-md-6 col-sm-6 col-12">
                                <div className="mb-3 form-inputs">
                                    <label htmlFor="exampleInputEmail1" className="form-label mb-1">Camp Address <span className="mandatory">*</span></label>
                                    <input
                                        type="text"
                                        placeholder=''
                                        className="form-control"
                                        id="firstName" />
                                </div>
                            </div>

                            <div className="col-xl-4 col-lg-4 col-md-6 col-sm-6 col-12">
                                <div className='d-flex flex-column'>
                                    <div className='d-flex align-items-center'>
                                        <label htmlFor="gender" className="form-label mb-1">State <span className="mandatory">*</span></label>
                                    </div>
                                    <Space wrap>
                                        <Select
                                            style={{ width: '100%' }}
                                            options={[
                                                { value: 'Male', label: 'Male' },
                                                { value: 'Female', label: 'Female' },
                                                { value: 'Others', label: 'Others' },
                                            ]}
                                            placeholder="Select State" />
                                    </Space>
                                </div>
                            </div>

                            <div className="col-xl-4 col-lg-4 col-md-6 col-sm-6 col-12">
                                <div className='d-flex flex-column'>
                                    <div className='d-flex align-items-center'>
                                        <label htmlFor="gender" className="form-label mb-1">District <span className="mandatory">*</span></label>
                                    </div>
                                    <Space wrap>
                                        <Select
                                            style={{ width: '100%' }}
                                            options={[
                                                { value: 'Male', label: 'Male' },
                                                { value: 'Female', label: 'Female' },
                                                { value: 'Others', label: 'Others' },
                                            ]}
                                            placeholder="Select District" />
                                    </Space>
                                </div>
                            </div>

                            <div className="col-xl-4 col-lg-4 col-md-6 col-sm-6 col-12">
                                <div className="mb-3 form-inputs">
                                    <label htmlFor="exampleInputEmail1" className="form-label mb-1">City Name <span className="mandatory">*</span></label>
                                    <input
                                        type="text"
                                        placeholder=''
                                        className="form-control"
                                        id="firstName" />
                                </div>
                            </div>

                            <div className="col-xl-4 col-lg-4 col-md-6 col-sm-6 col-12">
                                <div className='d-flex flex-column'>
                                    <div className='d-flex align-items-center'>
                                        <label htmlFor="gender" className="form-label mb-1">Blood Bank <span className="mandatory">*</span></label>
                                    </div>
                                    <Space wrap>
                                        <Select
                                            style={{ width: '100%' }}
                                            options={[
                                                { value: 'Male', label: 'Male' },
                                                { value: 'Female', label: 'Female' },
                                                { value: 'Others', label: 'Others' },
                                            ]}
                                            placeholder="Select BloodBank" />
                                    </Space>
                                </div>
                            </div>

                            <div className="col-xl-4 col-lg-4 col-md-6 col-sm-6 col-12">
                                <div className="mb-3 form-inputs">
                                    <label htmlFor="exampleInputEmail1" className="form-label mb-1">Latitude</label>
                                    <input
                                        type="text"
                                        placeholder=''
                                        className="form-control"
                                        id="firstName" />
                                </div>
                            </div>

                            <div className="col-xl-4 col-lg-4 col-md-6 col-sm-6 col-12">
                                <div className="mb-3 form-inputs">
                                    <label htmlFor="exampleInputEmail1" className="form-label mb-1">Longitude</label>
                                    <input
                                        type="text"
                                        placeholder=''
                                        className="form-control"
                                        id="firstName" />
                                </div>
                            </div>

                            <div className="col-xl-4 col-lg-4 col-md-6 col-sm-6 col-12">
                                <div className="d-flex">
                                    <div>
                                        <div className="d-flex">
                                            <h6 className="form-label mb-1">Start Time(24HH:MM)<span className="mandatory">*</span></h6>
                                        </div>
                                        <div className="d-flex form-inputs">
                                            <input
                                                style={{ width: "30%" }}
                                                type="text"
                                                placeholder=''
                                                className="form-control"
                                                id="firstName" />
                                            <input
                                                style={{ width: "30%" }}
                                                type="text"
                                                placeholder=''
                                                className="form-control"
                                                id="firstName" />
                                        </div>
                                    </div>
                                    <div>
                                        <div className="d-flex">
                                            <h6 className="form-label mb-1">End Time:(24HH:MM) <span className="mandatory">*</span></h6>
                                        </div>
                                        <div className="d-flex form-inputs">
                                            <input
                                                style={{ width: "30%" }}
                                                type="text"
                                                placeholder=''
                                                className="form-control"
                                                id="firstName" />
                                            <input
                                                style={{ width: "30%" }}
                                                type="text"
                                                placeholder=''
                                                className="form-control"
                                                id="firstName" />
                                        </div>
                                    </div>
                                </div>

                            </div>
                        </div>
                    </div>

                    {/* Section 4 */}
                    <div className="widget p-3 mb-2">
                        <div className="row mx-4">
                            <div className="col-xl-4 col-lg-4 col-md-6 col-sm-6 col-12">
                                <div className="mb-3 form-inputs">
                                    <label htmlFor="exampleInputEmail1" className="form-label mb-1">Camp Propose Date <span className="mandatory">*</span></label>
                                     <input
                                        type="text"
                                        placeholder=''
                                        className="form-control"
                                        id="firstName" />
                                </div>
                            </div>

                            <div className="col-xl-4 col-lg-4 col-md-6 col-sm-6 col-12">
                                <div className="mb-3 form-inputs">
                                    <label htmlFor="exampleInputEmail1" className="form-label mb-1">Estimated Participants</label>
                                    {/* <img src="assets/images/mendate.png" alt="Mendate" /> */}
                                    <input
                                        type="text"
                                        placeholder=''
                                        className="form-control"
                                        id="firstName" />
                                </div>
                            </div>

                            <div className="col-xl-4 col-lg-4 col-md-6 col-sm-6 col-12">
                                <div className="mb-3 form-inputs">
                                    <label htmlFor="exampleInputEmail1" className="form-label mb-1">Reference/Camp Supporter(Prayojak)</label>
                                    {/* <img src="assets/images/mendate.png" alt="Mendate" /> */}
                                    <input
                                        type="text"
                                        placeholder=''
                                        className="form-control"
                                        id="firstName" />
                                </div>
                            </div>

                            <div className="col-xl-4 col-lg-4 col-md-6 col-sm-6 col-12">
                                <div className="mb-3 form-inputs d-flex flex-column">
                                    <label htmlFor="exampleInputEmail1" className="form-label mb-1">Remarks</label>
                                    <textarea id="textarea" rows="3"></textarea>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Submit buttons */}
                    <div className="row align-items-center justify-content-center">
                        <div className="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-6 d-xl-flex d-lg-flex d-md-flex ">
                            <button className="w-100 mb-3 me-3 btn btn-primary-signIn">Submit</button>
                            <button className="w-100 mb-3 btn btn-primary-outline">Cancel</button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default CampRegistration