import React, { useEffect } from "react";
import '../scss/bloodSearch.scss'
import { Input, DatePicker, Space } from 'antd';

const onDateChange = (date, dateString) => {
    console.log(date, dateString);
};

const { Search } = Input;

const BloodBankDirectory = () => {

    useEffect(() => {
        document.title = 'e-RaktKosh Blood Bank Directory'
    }, [])

    return (
        <>
            <div className="page-wrapper">
                <div className="container">
                    <h2 className="header-page mb-3">Nearest Blood Bank(BB)/ Blood Storage Unit(BSU)</h2>
                    <div className="widget px-3 py-3 mb-3">
                        <div className="row mx-4">
                            <div className="col-xl-6 col-lg-6 col-md-6 col-sm-6 mb-2 mb-xl-0 mb-lg-0">
                                <div className="d-flex">
                                    <div className="w-100">
                                        <div className="dropdown ">
                                            <button className="p-3 d-1 btn dropdown-toggle w-100 d-flex align-items-center justify-content-between" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                                                Select State
                                            </button>
                                            <ul className="dropdown-menu w-100 py-0">
                                                <li><a className="py-2 dropdown-item" href="#">Action</a></li>
                                                <li><a className="py-2 dropdown-item" href="#">Another action</a></li>
                                                <li><a className="py-2 dropdown-item" href="#">Something else here</a></li>
                                            </ul>
                                        </div>
                                    </div>

                                    <div className="w-100">
                                        <div className="dropdown ">
                                            <button className="btn d-2 p-3 dropdown-toggle w-100 d-flex align-items-center justify-content-between" type="button" data-bs-toggle="dropdown" aria-expanded="false">
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
                            </div>
                            <div className="d-flex align-items-end justify-content-center col-xl-6 col-lg-6 col-md-6 col-sm-6 mb-2 mb-xl-0 mb-lg-0">
                                <div className="w-100 h-100">
                                    <Search placeholder="Search" className="me-2" />
                                </div>
                            </div>
                        </div>
                        <div className="d-flex align-items-center justify-content-center mt-3">
                            <button className="px-5 btn btn-primary-signIn">Search</button>
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
                                            <p className="area mb-0 me-1">Date</p>
                                            <p className="number mb-0 me-1">4</p>
                                        </div>
                                        <button className="btn selected px-1">Selected<img className="ms-1" src="assets/images/arrow_down.png" /></button>
                                        <button className="btn px-2"><img src="assets/images/close.png" /></button>
                                    </div>
                                </div>
                                <div className="col-xl-4 col-lg-4 col-md-4 col-12 pe-xl-0 mb-xl-0 mb-lg-0 mb-md-0 mb-2">
                                    <div className="filterSection d-flex align-items-center justify-content-around px-2 py-1">
                                        <div className="d-flex align-items-center">
                                            <p className="area mb-0 me-1">Camp Name</p>
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

                    <table className="table table-long mt-3">
                        <thead>
                            <th className="column-1">S.No.</th>
                            <th className="column-2">Name</th>
                            <th className="column-3">Address</th>
                            <th className="column-4">Phone</th>
                            <th className="column-5">Email</th>
                            <th className="column-6">Category</th>
                            <th className="column-7">Distance</th>
                            <th className="column-8">Type</th>
                        </thead>
                        <tbody>
                            <tr>
                                <td className="column-1" data-label="S.No.">1</td>
                                <td className="column-2" data-label="Name">Blood Centre Changlang</td>
                                <td className="column-3" data-label="Address">
                                    <span>District Hospital, Changlang, Changlang, Dist. Changlang</span>
                                </td>
                                <td className="column-4" data-label="Phone">9863621471</td>
                                <td className="column-5" data-label="Email">bloodcenterchanglang@gmail.com	</td>
                                <td className="column-6" data-label="Category">Govt.</td>
                                <td className="column-7" data-label="Distance">-</td>
                                <td className="column-8" data-label="Type">
                                    <div className="d-flex flex-column">
                                        <a href="/#/publicPages/campSchedule">Camps</a>
                                        <a href="/#/publicPages/bloodAvailabilitySearch">Stock</a>
                                    </div>
                                </td>
                            </tr>
                            <tr>
                                <td className="column-1" data-label="S.No.">1</td>
                                <td className="column-2" data-label="Name">Blood Centre Changlang</td>
                                <td className="column-3" data-label="Address">
                                    <span>District Hospital, Changlang, Changlang, Dist. Changlang</span>
                                </td>
                                <td className="column-4" data-label="Phone">9863621471</td>
                                <td className="column-5" data-label="Email">bloodcenterchanglang@gmail.com	</td>
                                <td className="column-6" data-label="Category">Govt.</td>
                                <td className="column-7" data-label="Distance">-</td>
                                <td className="column-8" data-label="Type">
                                    <div className="d-flex flex-column">
                                        <a href="/#/publicPages/campSchedule">Camps</a>
                                        <a href="/#/publicPages/bloodAvailabilitySearch">Stock</a>
                                    </div>
                                </td>
                            </tr>
                            <tr>
                                <td className="column-1" data-label="S.No.">1</td>
                                <td className="column-2" data-label="Name">Blood Centre Changlang</td>
                                <td className="column-3" data-label="Address">
                                    <span>District Hospital, Changlang, Changlang, Dist. Changlang</span>
                                </td>
                                <td className="column-4" data-label="Phone">9863621471</td>
                                <td className="column-5" data-label="Email">bloodcenterchanglang@gmail.com	</td>
                                <td className="column-6" data-label="Category">Govt.</td>
                                <td className="column-7" data-label="Distance">-</td>
                                <td className="column-8" data-label="Type">
                                    <div className="d-flex flex-column">
                                        <a href="/#/publicPages/campSchedule">Camps</a>
                                        <a href="/#/publicPages/bloodAvailabilitySearch">Stock</a>
                                    </div>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </>
    )
}

export default BloodBankDirectory