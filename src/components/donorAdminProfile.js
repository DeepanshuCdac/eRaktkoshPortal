import React, { useState } from 'react'

export default function DonorAdminProfile() {

    // -----------------------

    const [selectedItem, setSelectedItem] = useState('Select Your Gender');
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);

    const handleSelect = (event) => {
        event.preventDefault();
        setSelectedItem(event.target.getAttribute('data-value'));
        setIsDropdownOpen(false);
    };
    const toggleDropdown = () => {
        setIsDropdownOpen(!isDropdownOpen);
    };

    // ---------------------------

    const [mobile, setMobile] = useState('+91 ');

    const handleInputChange = (e) => {
        const value = e.target.value;

        if (value.startsWith('+91 ')) {
            setMobile(value);
        } else if (!value.startsWith('+91')) {
            setMobile('+91 ');
        }
    };

    //   ---------------------------

    return (
        <>
            <div className="tabContent">
                <div className="widget p-3 mb-3">
                    <h4 className='widgeHeader mb-5'>Stage 1/3 Personal Details</h4>
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
                            <div className="mb-3 d-flex flex-column">
                                <div className='d-flex align-items-center'>
                                    <label htmlFor="genderDropdown" className="form-label mb-1">Gender</label>
                                    <img src="assets/images/mendate.png" alt="" />
                                </div>
                                <div className="dropdown">
                                    <button
                                        className="btn dropdown-toggle w-100 d-flex align-items-center justify-content-between"
                                        type="button"
                                        onClick={toggleDropdown}
                                    >
                                        {selectedItem}
                                    </button>
                                    {isDropdownOpen && (
                                        <ul className="dropdown-menu show w-100" aria-labelledby="dropdownMenuButton">
                                            <li><a className="dropdown-item" href="#" data-value="Male" onClick={handleSelect}>Male</a></li>
                                            <li><a className="dropdown-item" href="#" data-value="Female" onClick={handleSelect}>Female</a></li>
                                            <li><a className="dropdown-item" href="#" data-value="Other" onClick={handleSelect}>Other</a></li>
                                        </ul>
                                    )}
                                </div>
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
                <div className='text-center'>
                    <button className="btn btn-primary-signIn" style={{padding: '7px 136px'}}>Next</button>
                </div>
            </div>
        </>
    )
}
