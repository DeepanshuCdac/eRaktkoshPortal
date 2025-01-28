import React, { useEffect } from "react";
import '../scss/bloodSearch.scss'
import { Input } from 'antd';

const { Search } = Input;


const CampSchedule = () => {

    useEffect(() => {
        document.title = 'e-RaktKosh Camp Schedule'
    }, [])

    return (
        <>
            <div className="page-wrapper">
                <div className="container">
                    <h2 className="header-page mb-3">Nearest Blood Bank(BB)/ Blood Storage(BSU)</h2>
                    <div className="widget px-3 pt-3 pb-5 mb-3">
                        <div className="row">
                            <div className="col-xl-3 col-lg-3 col-md-6 col-sm-6 mb-2 mb-xl-0 mb-lg-0">
                                <div className="">
                                    <label className="label">Select Your State</label>
                                    <div className="dropdown">
                                        <button className="btn dropdown-toggle w-100 d-flex align-items-center justify-content-between" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                                            Select State
                                        </button>
                                        <ul className="dropdown-menu w-100 py-0">
                                            <li><a className="py-2 dropdown-item" href="#">Action</a></li>
                                            <li><a className="py-2 dropdown-item" href="#">Another action</a></li>
                                            <li><a className="py-2 dropdown-item" href="#">Something else here</a></li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                            <div className="col-xl-3 col-lg-3 col-md-6 col-sm-6 mb-2 mb-xl-0 mb-lg-0">
                                <div className="">
                                    <label className="label">Select Your District</label>
                                    <div className="dropdown">
                                        <button className="btn dropdown-toggle w-100 d-flex align-items-center justify-content-between" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                                            Select District
                                        </button>
                                        <ul className="dropdown-menu w-100 py-0">
                                            <li><a className="py-2 dropdown-item" href="#">Action</a></li>
                                            <li><a className="py-2 dropdown-item" href="#">Another action</a></li>
                                            <li><a className="py-2 dropdown-item" href="#">Something else here</a></li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                            <div className="col-xl-3 col-lg-3 col-md-6 col-sm-6 mb-2 mb-xl-0 mb-lg-0">
                                <div className="">
                                    <label className="label">Select Your Blood Group</label>
                                    <div className="dropdown">
                                        <button className="btn dropdown-toggle w-100 d-flex align-items-center justify-content-between" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                                            All Blood Groups
                                        </button>
                                        <ul className="dropdown-menu w-100 py-0">
                                            <li><a className="py-2 dropdown-item" href="#">Action</a></li>
                                            <li><a className="py-2 dropdown-item" href="#">Another action</a></li>
                                            <li><a className="py-2 dropdown-item" href="#">Something else here</a></li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                            <div className="col-xl-3 col-lg-3 col-md-6 col-sm-6 mb-2 mb-xl-0 mb-lg-0">
                                <div className="">
                                    <label className="label">Select Blood Component</label>
                                    <div className="dropdown">
                                        <button className="btn dropdown-toggle w-100 d-flex align-items-center justify-content-between" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                                            Whole Blood
                                        </button>
                                        <ul className="dropdown-menu w-100 py-0">
                                            <li><a className="py-2 dropdown-item" href="#">Action</a></li>
                                            <li><a className="py-2 dropdown-item" href="#">Another action</a></li>
                                            <li><a className="py-2 dropdown-item" href="#">Something else here</a></li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="btnSection text-center col-xl-2 col-lg-2 col-md-3 col-3">
                            <button className="w-100 btn btn-primary-signIn">Search</button>
                        </div>
                    </div>
                    <div className="d-xl-flex d-lg-flex d-md-flex d-sm-flex align-items-center justify-content-between mt-3 mb-3">
                        <div className="pagination-view d-flex align-items-center mb-2 mb-xl-0 mb-lg-0 mb-md-0 mb-sm-0">
                            <p className="area mb-0 me-1">Show</p>
                            <p className="button mb-0 me-1">6</p>
                            <p className="mb-0 area">entries</p>
                        </div>
                        <div className="d-flex">
                            <Search placeholder="Search" className="me-2" />
                            <button className="filter_btn d-flex align-items-center">
                                <img className="me-1" src="assets/images/filter.png" />
                                Filters
                            </button>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-xl-8 col-lg-8 col-md-10 col-12">
                            <div className="row">
                                <div className="col-xl-4 col-lg-4 col-md-4 col-12 pe-xl-0 mb-xl-0 mb-lg-0 mb-md-0 mb-2">
                                    <div className="filterSection d-flex align-items-center justify-content-around px-2 py-1">
                                        <div className="d-flex align-items-center">
                                            <p className="area mb-0 me-1">Area</p>
                                            <p className="number mb-0 me-1">4</p>
                                        </div>
                                        <button className="btn selected px-1">Selected<img className="ms-1" src="assets/images/arrow_down.png" /></button>
                                        <button className="btn px-2"><img src="assets/images/close.png" /></button>
                                    </div>
                                </div>
                                <div className="col-xl-4 col-lg-4 col-md-4 col-12 pe-xl-0 mb-xl-0 mb-lg-0 mb-md-0 mb-2">
                                    <div className="filterSection d-flex align-items-center justify-content-around px-2 py-1">
                                        <div className="d-flex align-items-center">
                                            <p className="area mb-0 me-1">Category</p>
                                            <p className="number mb-0 me-1">4</p>
                                        </div>
                                        <button className="d-flex align-items-center btn selected px-1">Selected<img className="ms-1" src="assets/images/arrow_down.png" /></button>
                                        <button className="btn px-2"><img src="assets/images/close.png" /></button>
                                    </div>
                                </div>
                                <div className="col-xl-4 col-lg-4 col-md-4 col-12 pe-xl-0 mb-xl-0 mb-lg-0 mb-md-0 mb-2">
                                    <div className="filterSection d-flex align-items-center justify-content-around px-2 py-1">
                                        <div className="d-flex align-items-center">
                                            <p className="area mb-0 me-1">State</p>
                                            <p className="number mb-0 me-1">4</p>
                                        </div>
                                        <button className="d-flex align-items-center btn selected px-1">Selected<img className="ms-1" src="assets/images/arrow_down.png" /></button>
                                        <button className="btn px-2"><img src="assets/images/close.png" /></button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <table className="table mt-3">
                        <thead>
                            <th className="column-1">S.No.</th>
                            <th className="column-2">Blood Bank</th>
                            <th className="column-3">Category</th>
                            <th className="column-4">Availability</th>
                            <th className="column-5">Last Updated</th>
                            <th className="column-6">Type</th>
                        </thead>
                        <tbody>
                            <tr>
                                <td className="column-1" data-label="S.No.">1</td>
                                <td className="column-2" data-label="Blood Bank">
                                    <span>Rajinder Nagar, New Delhi,Near Janki Devi college, New delhi</span>
                                </td>
                                <td className="column-3" data-label="Category">
                                    <p className="bdr_orange mb-0">
                                        <span className="dot_orange me-1"></span>
                                        <span>Charitable/Gov</span>
                                    </p>
                                </td>
                                <td className="column-4" data-label="Availability">Whole Blood not available search for another component</td>
                                <td className="column-5" data-label="Last Updated">2024-05-16 <span className="entry_time">(10:55:27)</span></td>
                                <td className="column-6" data-label="Type">Blood  Bank</td>
                            </tr>
                            <tr>
                                <td className="column-1" data-label="S.No.">2</td>
                                <td className="column-2" data-label="Blood Bank">
                                    <span>New Delhi,Near Janki Devi college, New delhi</span>
                                </td>
                                <td className="column-3" data-label="Category">
                                    <p className="bdr_green mb-0">
                                        <span className="dot_green me-1"></span>
                                        <span>Private</span>
                                    </p>
                                </td>
                                <td className="column-4" data-label="Availability">Whole Blood available search for another component</td>
                                <td className="column-5" data-label="Last Updated">2025-10-16 <span className="entry_time">(10:55:27)</span></td>
                                <td className="column-6" data-label="Type">Blood  Bank</td>
                            </tr>
                            <tr>
                                <td className="column-1" data-label="S.No.">3</td>
                                <td className="column-2" data-label="Blood Bank">
                                    <span>Sir Ganga Ram Hospital, Rajinder Nagar, New Delhi,Near Janki Devi college, New delhi</span>
                                </td>
                                <td className="column-3" data-label="Category">
                                    <p className="bdr_blue mb-0">
                                        <span className="dot_blue me-1"></span>
                                        <span>Government</span>
                                    </p>
                                </td>
                                <td className="column-4" data-label="Availability">Whole Blood </td>
                                <td className="column-5" data-label="Last Updated">2024-05-06 <span className="entry_time">(10:55:27)</span></td>
                                <td className="column-6" data-label="Type">Blood  Bank</td>
                            </tr>
                            <tr>
                                <td className="column-1" data-label="S.No.">3</td>
                                <td className="column-2" data-label="Blood Bank">
                                    <span>Sir Ganga Ram Hospital, Near Janki Devi college, New delhi</span>
                                </td>
                                <td className="column-3" data-label="Category">
                                    <p className="bdr_blue mb-0">
                                        <span className="dot_blue me-1"></span>
                                        <span>Government</span>
                                    </p>
                                </td>
                                <td className="column-4" data-label="Availability">Whole Blood </td>
                                <td className="column-5" data-label="Last Updated">2024-05-06 <span className="entry_time">(10:55:27)</span></td>
                                <td className="column-6" data-label="Type">Blood  Bank</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </>
    )
}

export default CampSchedule