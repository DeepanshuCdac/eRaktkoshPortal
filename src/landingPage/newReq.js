import React, { useEffect, useState, useRef } from "react";
import axios from "axios";
import "../scss/newReq.scss";
// import RefreshIcon from "@mui/icons-material/Refresh";
import IconButton from "@mui/material/IconButton";
import { BaseUrl } from "../utils/url";

export default function NewReq() {
  const [data, setData] = useState(null);
  const [pledge, setpledge] = useState(null);

  const approvedRef = useRef(null);
  const donorsRef = useRef(null);
  const donationRef = useRef(null);
  const pledgeRef = useRef(null);

  function animate(obj, initVal, lastVal, duration) {
    let startTime = null;

    const step = (currentTime) => {
      if (!startTime) startTime = currentTime;
      const progress = Math.min((currentTime - startTime) / duration, 1);

      if (obj) {
        obj.innerText = Math.floor(progress * (lastVal - initVal) + initVal);
      }

      if (progress < 1) {
        window.requestAnimationFrame(step);
      }
    };
    window.requestAnimationFrame(step);
  }

  const fetchData = async () => {
    try {
      const response = await axios.get(
        "https://eraktkosh.mohfw.gov.in/Blood_Bank/service/pledge/dashboard"
      );
      setData(response.data);
    } catch (err) {
      console.error("API Error (Data):", err);
    }
  };

  const fetchPledgecount = async () => {
    try {
      const response = await axios.get(
        // "https://pledgeapi.mygov.in/api/v2/voluntary-blood-donation/stats/individual"
        `${BaseUrl}/Blood_Bank/service/pledge/response`
      );
      setpledge(response.data);
    } catch (err) {
      console.log("API error (Pledge) : ", err);
    }
  };

  useEffect(() => {
    fetchData();
    fetchPledgecount();

    const interval = setInterval(() => {
      fetchData();
      fetchPledgecount();
    }, 300000);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (data) {
      animate(approvedRef.current, 0, data.approvalcount || 0, 1000);
      animate(donorsRef.current, 0, data.donarscount || 0, 1000);
      animate(donationRef.current, 0, data.donationcount || 0, 1000);
    }
  }, [data]);

  useEffect(() => {
    if (pledge) {
      animate(pledgeRef.current, 0, pledge.individual || 0, 1000);
    }
  }, [pledge]);

  return (
    <div className="newReq">
      <div className="my-4 container">
        <h3 className="text-center headerers mb-3">
          Nationwide Mega Voluntary Blood Donation Drive
        </h3>

        <div className="box_container">
          {/* <div className="box box-3 p-2">
            <p className="mb-0">No. of Camps Approved</p>
            <div className="d-flex align-items-center justify-content-center">
              <p className="mb-0 numbering" ref={approvedRef}>
                0
              </p>
            </div>
          </div> */}

          {/* <div className="box box-3 p-2">
            <p className="mb-0">No. of New Donors Registered</p>
            <div className="d-flex align-items-center justify-content-center">
              <p className="mb-0 numbering" ref={donorsRef}>
                0
              </p>
            </div>
          </div>

          <div className="box box-3 p-2">
            <p className="mb-0">No. of Blood Units Collected</p>
            <div className="d-flex align-items-center justify-content-center">
              <p className="mb-0 numbering" ref={donationRef}>
                0
              </p>
            </div>
          </div>

          <div className="box box-3 p-2">
            <div className="d-flex justify-content-center">
              <p className="mb-0 pr-1">No. of Pledge Taken</p>
            </div>
            <div className="d-flex align-items-center justify-content-center">
              <p className="mb-0 numbering" ref={pledgeRef}>
                0
              </p>
            </div>
          </div> */}
        </div>

        <div className="row">
          <div className="col-xl-3 col-lg-3 col-md-6 col-sm-6 col-12 mb-3">
            <div className="box box-3 p-2">
              <p className="mb-0">No. of Camps Approved</p>
              <div className="d-flex align-items-center justify-content-center">
                <p className="mb-0 numbering" ref={approvedRef}>
                  0
                </p>
              </div>
            </div>
          </div>

          <div className="col-xl-3 col-lg-3 col-md-6 col-sm-6 col-12 mb-3">
            <div className="box box-3 p-2">
              <p className="mb-0">No. of New Donors Registered</p>
              <div className="d-flex align-items-center justify-content-center">
                <p className="mb-0 numbering" ref={donorsRef}>
                  0
                </p>
              </div>
            </div>
          </div>

          <div className="col-xl-3 col-lg-3 col-md-6 col-sm-6 col-12 mb-3">
            <div className="box box-3 p-2">
              <p className="mb-0">No. of Blood Units Collected</p>
              <div className="d-flex align-items-center justify-content-center">
                <p className="mb-0 numbering" ref={donationRef}>
                  0
                </p>
              </div>
            </div>
          </div>

          <div className="col-xl-3 col-lg-3 col-md-6 col-sm-6 col-12 mb-3">
            <div className="box box-3 p-2">
              <div className="d-flex justify-content-center">
                <p className="mb-0 pr-1">No. of Pledge Taken</p>
              </div>
              <div className="d-flex align-items-center justify-content-center">
                <p className="mb-0 numbering" ref={pledgeRef}>
                  0
                </p>
              </div>
            </div>
          </div>
        </div>

        <p className="since_date text-center">
          Since 17 September 2025 onward
          <IconButton
            onClick={() => {
              fetchPledgecount();
              fetchData();
            }}
            size="small"
          >
            <img src="assets/images/refresh.png" style={{width: '15px', height: '15px'}} alt="" />
            {/* <RefreshIcon fontSize="small" sx={{ paddingBottom: "3px" }} /> */}
          </IconButton>
        </p>
      </div>
    </div>
  );
}
