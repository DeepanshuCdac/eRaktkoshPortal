import React, { useEffect } from "react";
import { Select, Space } from 'antd'
import '../scss/campRegistration.scss'

const CampRegistration = () => {

    useEffect(() => {
        document.title = 'e-raktKosh Camp Registration'
    }, [])

    return (
        <>
            <div className="campRegistration page-wrapper">
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
                                        <label htmlFor="orgType" className="form-label mb-1">Organisation Type <span className="mandatory">*</span></label>
                                    </div>
                                    <Space wrap>
                                        <Select
                                            style={{ width: '100%' }}
                                            options={[
                                                { value: 'Pvt', label: 'Pvt' },
                                                { value: 'Govt', label: 'Govt' },
                                                { value: 'Charitable', label: 'Charitable' },
                                            ]}
                                            placeholder="Select Value" />
                                    </Space>
                                </div>
                            </div>

                            <div className="col-xl-4 col-lg-4 col-md-6 col-sm-6 col-12">
                                <div className="mb-3 form-inputs">
                                    <label htmlFor="orgName" className="form-label mb-1">Organisation Name <span className="mandatory">*</span></label>
                                    <input
                                        type="text"
                                        placeholder=''
                                        className="form-control"
                                        id="orgName" />
                                </div>
                            </div>

                            <div className="col-xl-4 col-lg-4 col-md-6 col-sm-6 col-12">
                                <div className="mb-3 form-inputs">
                                    <label htmlFor="organiserName" className="form-label mb-1">Organiser Name <span className="mandatory">*</span></label>
                                    <input
                                        type="text"
                                        placeholder=''
                                        className="form-control"
                                        id="organiserName" />
                                </div>
                            </div>

                            <div className="col-xl-4 col-lg-4 col-md-6 col-sm-6 col-12">
                                <div className="mb-3 form-inputs">
                                    <label htmlFor="mobileNo" className="form-label mb-1">Organiser Mobile No. <span className="mandatory">*</span></label>
                                    <input
                                        type="text"
                                        placeholder=''
                                        className="form-control"
                                        id="mobileNo" />
                                </div>
                            </div>

                            <div className="col-xl-4 col-lg-4 col-md-6 col-sm-6 col-12">
                                <div className="mb-3 form-inputs">
                                    <label htmlFor="orgEmail" className="form-label mb-1">Organiser Email ID <span className="mandatory">*</span></label>
                                    <input
                                        type="text"
                                        placeholder=''
                                        className="form-control"
                                        id="orgEmail" />
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Section 2 */}
                    <div className="widget p-3 mb-2">
                        <div className="row mx-4">
                            <div className="col-xl-4 col-lg-4 col-md-6 col-sm-6 col-12">
                                <div className="mb-3 form-inputs">
                                    <label htmlFor="coOrgName" className="form-label mb-1">Co-Organiser Name</label>
                                    <input
                                        type="text"
                                        placeholder=''
                                        className="form-control"
                                        id="coOrgName" />
                                </div>
                            </div>

                            <div className="col-xl-4 col-lg-4 col-md-6 col-sm-6 col-12">
                                <div className="mb-3 form-inputs">
                                    <label htmlFor="coOrgMobileNo" className="form-label mb-1">Co-Organiser Mobile</label>
                                    <input
                                        type="text"
                                        placeholder='Enter Co-Organiser Mobile Number'
                                        className="form-control"
                                        id="coOrgMobileNo" />
                                </div>
                            </div>

                            <div className="col-xl-4 col-lg-4 col-md-6 col-sm-6 col-12">
                                <div className="mb-3 form-inputs">
                                    <label htmlFor="campName" className="form-label mb-1">Camp Name</label>
                                    <input
                                        type="text"
                                        placeholder=''
                                        className="form-control"
                                        id="campName" />
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Section 3 */}
                    <div className="widget mb-2 p-3">
                        <div className="row mx-4">
                            <div className="col-xl-4 col-lg-4 col-md-6 col-sm-6 col-12">
                                <div className="mb-3 form-inputs">
                                    <label htmlFor="campAddress" className="form-label mb-1">Camp Address <span className="mandatory">*</span></label>
                                    <input
                                        type="text"
                                        placeholder=''
                                        className="form-control"
                                        id="campAddress" />
                                </div>
                            </div>

                            <div className="col-xl-4 col-lg-4 col-md-6 col-sm-6 col-12">
                                <div className='d-flex flex-column'>
                                    <div className='d-flex align-items-center'>
                                        <label htmlFor="state" className="form-label mb-1">State <span className="mandatory">*</span></label>
                                    </div>
                                    <Space wrap>
                                        <Select
                                            style={{ width: '100%' }}
                                            options={[
                                                { value: 'Haryana', label: 'Haryana' },
                                                { value: 'Goa', label: 'Goa' },
                                                { value: 'Delhi', label: 'Delhi' }
                                            ]}
                                            placeholder="Select State" />
                                    </Space>
                                </div>
                            </div>

                            <div className="col-xl-4 col-lg-4 col-md-6 col-sm-6 col-12">
                                <div className='d-flex flex-column'>
                                    <div className='d-flex align-items-center'>
                                        <label htmlFor="district" className="form-label mb-1">District <span className="mandatory">*</span></label>
                                    </div>
                                    <Space wrap>
                                        <Select
                                            style={{ width: '100%' }}
                                            options={[
                                                { value: 'Ghaziabad', label: 'Ghaziabad' },
                                                { value: 'Lucknow', label: 'Lucknow' },
                                                { value: 'Prayagraj', label: 'Prayagraj' },
                                            ]}
                                            placeholder="Select District" />
                                    </Space>
                                </div>
                            </div>

                            <div className="col-xl-4 col-lg-4 col-md-6 col-sm-6 col-12">
                                <div className="mb-3 form-inputs">
                                    <label htmlFor="cityName" className="form-label mb-1">City Name <span className="mandatory">*</span></label>
                                    <input
                                        type="text"
                                        placeholder=''
                                        className="form-control"
                                        id="cityName" />
                                </div>
                            </div>

                            <div className="col-xl-4 col-lg-4 col-md-6 col-sm-6 col-12">
                                <div className='d-flex flex-column'>
                                    <div className='d-flex align-items-center'>
                                        <label htmlFor="bankName" className="form-label mb-1">Blood Center <span className="mandatory">*</span></label>
                                    </div>
                                    <Space wrap>
                                        <Select
                                            style={{ width: '100%' }}
                                            options={[
                                                { value: 'Bank1', label: 'Bank1' },
                                                { value: 'Bank2', label: 'Bank2' },
                                                { value: 'Bank3', label: 'Bank3' },
                                            ]}
                                            placeholder="Select BloodBank" />
                                    </Space>
                                </div>
                            </div>

                            <div className="col-xl-4 col-lg-4 col-md-6 col-sm-6 col-12">
                                <div className="mb-3 form-inputs">
                                    <label htmlFor="latitude" className="form-label mb-1">Latitude</label>
                                    <input
                                        type="text"
                                        placeholder=''
                                        className="form-control"
                                        id="latitude" />
                                </div>
                            </div>

                            <div className="col-xl-4 col-lg-4 col-md-6 col-sm-6 col-12">
                                <div className="mb-3 form-inputs">
                                    <label htmlFor="longitude" className="form-label mb-1">Longitude</label>
                                    <input
                                        type="text"
                                        placeholder=''
                                        className="form-control"
                                        id="longitude" />
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
                                                id="startTime" />
                                            <input
                                                style={{ width: "30%" }}
                                                type="text"
                                                placeholder=''
                                                className="form-control"
                                                id="startTime" />
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
                                                id="endTime" />
                                            <input
                                                style={{ width: "30%" }}
                                                type="text"
                                                placeholder=''
                                                className="form-control"
                                                id="endTime" />
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
                                    <label htmlFor="campDate" className="form-label mb-1">Camp Propose Date <span className="mandatory">*</span></label>
                                    <input
                                        type="text"
                                        placeholder=''
                                        className="form-control"
                                        id="campDate" />
                                </div>
                            </div>

                            <div className="col-xl-4 col-lg-4 col-md-6 col-sm-6 col-12">
                                <div className="mb-3 form-inputs">
                                    <label htmlFor="participants" className="form-label mb-1">Estimated Participants</label>
                                    <input
                                        type="text"
                                        placeholder=''
                                        className="form-control"
                                        id="participants" />
                                </div>
                            </div>

                            <div className="col-xl-4 col-lg-4 col-md-6 col-sm-6 col-12">
                                <div className="mb-3 form-inputs">
                                    <label htmlFor="reference" className="form-label mb-1">Reference/Camp Supporter(Prayojak)</label>
                                    <input
                                        type="text"
                                        placeholder=''
                                        className="form-control"
                                        id="reference" />
                                </div>
                            </div>

                            <div className="col-xl-4 col-lg-4 col-md-6 col-sm-6 col-12">
                                <div className="mb-3 form-inputs d-flex flex-column">
                                    <label htmlFor="remarks" className="form-label mb-1">Remarks</label>
                                    <textarea id="remarks" rows="3"></textarea>
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