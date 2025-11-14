// DonorCampRegister.js
import React, { useState, useEffect } from "react";
import "../scss/donorCampRegister.scss";
import { Radio } from "antd";
import { useCampContext } from "../context/CampContext";
import { useDispatch, useSelector } from "react-redux";
import { getApiData } from "../redux/slices/dataSlice";
import MobileDonorRegistration from "./DonorCampRegister/MobileDonorRegistration";
import ABHADonorRegistration from "./DonorCampRegister/ABHADonorRegistration";

export default function DonorCampRegister() {
  const dispatch = useDispatch();
  const { selectedCamp } = useCampContext();
  const [value, setValue] = useState(1); // Default to Mobile option

  useEffect(() => {
    dispatch(getApiData());
  }, [dispatch]);

  const onChange = (e) => {
    setValue(e.target.value);
  };

  const handleMobileSuccess = () => {
    setValue(2); // Reset to Mobile option after successful registration
  };

  return (
    <>
      <div className="page_wrapper gradient_style page-wrapper">
        <div className="container">
          <h2 className="header-page mb-2 pt-3">
            Pre Registration for Blood Donation Camp
          </h2>
          <div className="d-flex flex-wrap mt-3 container-style">
            <div className="widget px-3 pb-0 w-100">
              <div className="row align-items-center">
                <div className="col-3">
                  <div className="d-flex align-items-start">
                    <img src={`${process.env.PUBLIC_URL}/assets/images/campName.svg`} alt="" />
                    <div className="ms-1">
                      <p className="key mb-0">Camp Name</p>
                      <p className="value mb-0">{selectedCamp?.campName}</p>
                    </div>
                  </div>
                </div>
                <div className="col-3">
                  <div className="d-flex align-items-start">
                    <img src={`${process.env.PUBLIC_URL}/assets/images/campLocation.svg`} alt="" />
                    <div className="ms-1">
                      <p className="key mb-0">Camp Location</p>
                      <p className="value mb-0">{selectedCamp?.campVenue}</p>
                    </div>
                  </div>
                </div>
                <div className="col-2">
                  <div className="d-flex align-items-start">
                    <img src={`${process.env.PUBLIC_URL}/assets/images/campDate.svg`} alt="" />
                    <div className="ms-1">
                      <p className="key mb-0">Camp Date</p>
                      <p className="value mb-0">{selectedCamp?.campDate}</p>
                    </div>
                  </div>
                </div>
                <div className="col-2">
                  <div className="d-flex align-items-start">
                    <img src={`${process.env.PUBLIC_URL}/assets/images/campTime.svg`} alt="" />
                    <div className="ms-1">
                      <p className="key mb-0">Camp Time</p>
                      <p className="value mb-0">{selectedCamp?.campTime}</p>
                    </div>
                  </div>
                </div>
                <div className="col-2 justify-content-right">
                  <div className="header_bg p-2">
                    <div>
                      <p className="mb-0">
                        Know more about <br /> Blood Donation
                      </p>
                      <a href="https://eraktkosh.mohfw.gov.in/BLDAHIMS/bloodbank/donateblood.cnt">
                        Know More
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          <div className="d-flex mb-3 mt-3">
            <div>
              <Radio.Group
                onChange={onChange}
                value={value}
                options={[
                  { value: 1, label: "Create or Link ABHA" },
                  { value: 2, label: "Mobile No." },
                ]}
              />
            </div>
          </div>

          {value === 2 ? (
            <MobileDonorRegistration
              selectedCamp={selectedCamp} 
              onSuccess={handleMobileSuccess}
            />
          ) : (
            <ABHADonorRegistration  selectedCamp={selectedCamp} />
          )}
        </div>
      </div>
    </>
  );
}