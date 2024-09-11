import React, { useState } from 'react';

export default function DonorRegister() {

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

    return (
        <>
            <section className="donorRegistration">
                <div className='container-fluid'>
                    <h2 className="login-header text-center mt-3 mb-4">
                        Donor Sign-Up
                    </h2>
                    <div className="row justify-content-center">
                        <div className="col-xl-10">
                            <div className="form-box px-4 py-3">
                                <div className="row">
                                    <div className="col-xl-4">
                                        <div className="mb-3">
                                            <label htmlFor="nameInput" className="form-label mb-1">Name</label>
                                            <img src="assets/images/mendate.png" alt="" />
                                            <div className="input-group p-0">
                                                <input type="text" className="form-control" placeholder='Enter Your Name' id="nameInput" />
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-xl-4">
                                        <div className="mb-3">
                                            <div>
                                                <label htmlFor="ageInput" className="form-label mb-1">Age</label>
                                                <img src="assets/images/mendate.png" alt="" />
                                            </div>
                                            <div className="input-group p-0">
                                                <input type="number" className="form-control" placeholder='Enter Your Age' id="ageInput" />
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-xl-4">
                                        <div className="mb-3 d-flex flex-column">
                                            <label htmlFor="genderDropdown" className="form-label mb-1">Gender</label>
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
                                    <div className="col-xl-4">
                                        <div className="mb-3">
                                            <label htmlFor="mobileNoInput" className="form-label mb-1">Mobile No.</label>
                                            <img src="assets/images/mendate.png" alt="" />
                                            <div className="input-group p-0">
                                                <input type="number" className="form-control" placeholder='+91' id="mobileNoInput" />
                                                <img className='img-fluid' src="assets/images/phone.png" alt="" />
                                            </div>
                                        </div>
                                    </div>

                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
}
