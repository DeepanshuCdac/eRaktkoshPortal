import React, { useState, useEffect } from "react";
import { CaretRightOutlined } from "@ant-design/icons";
import {
  Collapse,
  theme,
  Select,
  Space,
  Input,
  Button,
  DatePicker,
} from "antd";
import { useDonor } from "../context/DonorContext";
import { useDispatch, useSelector } from "react-redux";
import { getApiData } from "../redux/slices/dataSlice";
import axios from "axios";
import { BaseUrl } from "../utils/url.js";
import dayjs from "dayjs";
import Swal from "sweetalert2";

const BLOOD_GROUP_MAPPING = {
  "A-pos": "A+Ve",
  "A-neg": "A-Ve",
  "B-pos": "B+Ve",
  "B-neg": "B-Ve",
  "AB-pos": "AB+Ve",
  "AB-neg": "AB-Ve",
  "O-pos": "O+Ve",
  "O-neg": "O-Ve",
};

export default function DonorAdminProfile() {
  const dispatch = useDispatch();
  const {
    statesWithDistricts,
    genders,
    occupations,
    religion,
    maritalStatus,
    bloodGroups,
  } = useSelector((state) => state.data);
  const [selectGender, setSelectGender] = useState(null);
  const [bloodGroup, setBloodGroup] = useState(null);
  const [selectMaritalStatus, setSelectMaritalStatus] = useState(null);
  const [selectOccupation, setSelectOccupation] = useState(null);
  const [selectReligion, setSelectReligion] = useState(null);
  const [selectedState, setSelectedState] = useState(null);
  const [selectedDistrict, setSelectedDistrict] = useState(null);
  const { donorData, setDonorData } = useDonor();
  const [errors, setErrors] = useState({});
  const [activePanels, setActivePanels] = useState(["1"]);

  useEffect(() => {
    dispatch(getApiData());
  }, [dispatch]);

  // Initialize form fields with donor data when component mounts or donorData changes
  useEffect(() => {
    if (donorData?.body) {
      // Set gender
      const genderObj = genders.find(
        (g) => g.genderCode === donorData.body.gender
      );
      if (genderObj) setSelectGender(genderObj.genderCode);

      // Set blood group
      if (donorData?.body?.bloodGroup) {
        const apiBloodGroup = donorData.body.bloodGroup;
        const normalizedBloodGroup =
          BLOOD_GROUP_MAPPING[apiBloodGroup] || apiBloodGroup;

        const bloodObj = bloodGroups.find(
          (bg) =>
            bg.bloodGroupCode === normalizedBloodGroup ||
            bg.bloodGroupName === normalizedBloodGroup
        );

        if (bloodObj) {
          setBloodGroup(bloodObj.bloodGroupCode);
          // Update donor data if format differs
          if (donorData.body.bloodGroup !== bloodObj.bloodGroupCode) {
            handleInputChange("bloodGroup", bloodObj.bloodGroupCode);
          }
        }
      }

      console.log("Current bloodGroups data:", bloodGroups);
      console.log("Donor bloodGroup:", donorData?.body?.bloodGroup);

      // Set marital status
      const maritalStatusObj = maritalStatus.find(
        (ms) => ms.maritalStatusCode === donorData.body.maritalStatus
      );
      if (maritalStatusObj)
        setSelectMaritalStatus(maritalStatusObj.maritalStatusCode);

      // Set occupation
      const occupationObj = occupations.find(
        (occ) => occ.occupationCode === donorData.body.occupation
      );
      if (occupationObj) setSelectOccupation(occupationObj.occupationCode);

      // Set religion
      const religionObj = religion.find(
        (rel) => rel.religionCode === donorData.body.religion
      );
      if (religionObj) setSelectReligion(religionObj.religionCode);

      // Set state and district
      if (donorData.body.edonorStateName) {
        setSelectedState(donorData.body.edonorStateName);

        // Find districts for the state
        const stateObj = statesWithDistricts.find(
          (s) => s.stateCode === donorData.body?.edonorStateName
        );
        if (stateObj && donorData.body.edonorDistName) {
          setSelectedDistrict(donorData.body.edonorDistName);
        }
      }
    }
  }, [
    donorData,
    genders,
    bloodGroups,
    maritalStatus,
    occupations,
    religion,
    statesWithDistricts,
  ]);

  const mobileNoFromSession = sessionStorage.getItem("mobileNo");
  const tokenFromSession = sessionStorage.getItem("authToken");
  console.log("Mobile number inside profile : ", mobileNoFromSession);
  console.log("Token inside profile:", tokenFromSession);

  const convertToDDMMYYYY = (date) => {
    if (!date) return "";
    const [year, month, day] = date.split("-");
    return `${day}-${month}-${year}`;
  };

  const convertToISOFormat = (date) => {
    if (!date) return "";
    const [day, month, year] = date.split("-");
    return `${year}-${month}-${day}`;
  };

  const handleSave = async () => {
    if (!validateFields()) {
      alert("Please fix the errors in the form before saving.");
      return;
    }

    if (!donorData) {
      console.error("Donor data is not set in state:", donorData);
      alert("Donor data is missing. Unable to save.");
      return;
    }

    try {
      // Prepare the updated data object matching the API contract exactly
      const updatedData = {
        mobileNumber: donorData.body?.mobileno || "",
        firstName: donorData.body?.edonorFName || "",
        lastName: donorData.body?.edonorLName || "",
        bloodGroupCode: bloodGroup || donorData.body?.bloodGroup || "",
        stateCode: selectedState || donorData.body?.edonorStateName || "",
        districtCode: selectedDistrict || donorData.body?.edonorDistName || "",
        pincode: donorData.body?.donorPin || "",
        email: donorData.body?.edonorEmail || "",
        maritalStatusCode:
          selectMaritalStatus || donorData.body?.maritalStatus || "",
        spouseName: donorData.body?.spouce || "",
        occupationCode: selectOccupation || donorData.body?.occupation || "",
        houseNo: donorData.body?.hno || "",
        landmark: donorData.body?.landmark || "",
        genderCode: selectGender || donorData.body?.gender || "",
        religionCode: selectReligion || donorData.body?.religion || "",
        address: donorData.body?.address || "",
        cityLocation: donorData.body?.location || "",
        city: donorData.body?.donorCity || "",
        fatherName: donorData.body?.fatherName || "",
        dob: donorData.body?.dob ? convertToISOFormat(donorData.body.dob) : "",
      };

      console.log("Payload for API:", updatedData);

      const response = await axios.post(
        `${BaseUrl}/eraktkosh/update`,
        updatedData,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${tokenFromSession}`,
          },
        }
      );

      if (response.status === 200) {
        console.log("API response:", response.data);
        Swal.fire({
          // title: "Data saved successfully!",
          text: "Data saved successfully!",
          icon: "success",
        });
        setDonorData((prev) => ({
          ...prev,
          body: {
            ...prev.body,
            ...updatedData,
            bloodGroup: updatedData.bloodGroupCode,
            edonorStateName: updatedData.stateCode,
            edonorDistName: updatedData.districtCode,
            donorPin: updatedData.pincode,
            maritalStatus: updatedData.maritalStatusCode,
            occupation: updatedData.occupationCode,
            gender: updatedData.genderCode,
            religion: updatedData.religionCode,
            spouce: updatedData.spouseName,
            location: updatedData.cityLocation,
            dob: donorData.body?.dob,
          },
        }));
      } else {
        console.error("Unexpected response:", response.status, response.data);
        alert("Something went wrong. Please try again.");
      }
    } catch (error) {
      console.error("Error saving data:", error);
      if (error.response) {
        console.error("Error response data:", error.response.data);
      }
      alert("Failed to save data. Please try again later.");
    }
  };

  const validateFields = () => {
    const newErrors = {};

    if (
      !donorData.body?.edonorFName ||
      donorData.body.edonorFName.trim() === ""
    ) {
      newErrors.edonorFName = "Please Enter First Name";
    }
    if (!donorData.body?.dob || donorData.body.dob.trim() === "") {
      newErrors.dob = "Please Enter Date of Birth";
    }
    if (!donorData.body?.gender || donorData.body.gender.trim() === "") {
      newErrors.gender = "Please Select Gender";
    }
    if (
      !donorData.body?.edonorEmail ||
      donorData.body.edonorEmail.trim() === ""
    ) {
      newErrors.edonorEmail = "Please Enter Your Email";
    }

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (field, value) => {
    const nameFields = [
      "edonorFName",
      "edonorLName",
      "spouce",
      "fatherName",
    ];

    if (nameFields.includes(field)) {
      // Allow only letters and spaces (no numbers or special characters)
      const cleanedValue = value.replace(/[^a-zA-Z\s]/g, "");

      // Limit to 50 characters
      if (cleanedValue.length <= 50) {
        setDonorData((prevData) => ({
          ...prevData,
          body: {
            ...prevData.body,
            [field]: cleanedValue,
          },
        }));

        // Clear any previous error
        setErrors((prevErrors) => ({
          ...prevErrors,
          [field]: "",
        }));
      } else {
        setErrors((prevErrors) => ({
          ...prevErrors,
          [field]: "Maximum 50 characters allowed",
        }));
      }
    } else {
      // Default update for other fields
      setDonorData((prevData) => ({
        ...prevData,
        body: {
          ...prevData.body,
          [field]: value,
        },
      }));
    }
  };

  const handleStateChange = (value) => {
    setSelectedState(value);
    setSelectedDistrict(null);
    setDonorData((prevData) => ({
      ...prevData,
      body: {
        ...prevData.body,
        edonorStateName: value,
        edonorDistName: null,
      },
    }));
  };

  const handleDistrictChange = (value) => {
    setSelectedDistrict(value);
    setDonorData((prevData) => ({
      ...prevData,
      body: {
        ...prevData.body,
        edonorDistName: value,
      },
    }));
  };

  const { token } = theme.useToken();

  const panelStyle = {
    marginBottom: 24,
    background: token.colorFillAlter,
    borderRadius: token.borderRadiusLG,
    border: "none",
  };

  const states = statesWithDistricts || [];
  const districts = selectedState
    ? states.find((state) => state.stateCode === selectedState)?.districts || []
    : [];

  const getItems = (panelStyle) => [
    {
      key: "1",
      label: "Personal Details",
      children: (
        <div className="pt-1 mb-3">
          <div className="row">
            <div className="col-xl-4 col-lg-4 col-md-6 col-sm-6 col-12">
              <div className="mb-3 form-inputs">
                <label htmlFor="exampleInputEmail1" className="form-label mb-1">
                  First Name<span className="mendate">*</span>
                </label>
                <Input
                  placeholder="Enter your first name"
                  value={donorData.body?.edonorFName || ""}
                  maxLength={50}
                  onChange={(e) =>
                    handleInputChange("edonorFName", e.target.value)
                  }
                  style={{ borderColor: errors.edonorFName ? "red" : "" }}
                />
                {errors.edonorFName && (
                  <div className="text-danger">{errors.edonorFName}</div>
                )}
              </div>
            </div>

            <div className="col-xl-4 col-lg-4 col-md-6 col-sm-6 col-12">
              <div className="mb-3 form-inputs">
                <label htmlFor="exampleInputEmail1" className="form-label mb-1">
                  Last Name
                </label>
                <Input
                  placeholder="Enter your last name"
                  maxLength={50}
                  value={donorData.body?.edonorLName || ""}
                  onChange={(e) =>
                    handleInputChange("edonorLName", e.target.value)
                  }
                />
              </div>
            </div>

            <div className="col-xl-4 col-lg-4 col-md-6 col-sm-6 col-12">
              <div className="mb-3 d-flex flex-column">
                <label htmlFor="exampleInputEmail1" className="form-label mb-1">
                  Date of Birth<span className="mendate">*</span>
                </label>
                <DatePicker
                  placeholder="Enter Your Date of Birth"
                  className="custom-date-picker"
                  value={
                    donorData.body?.dob
                      ? dayjs(
                          convertToISOFormat(donorData.body.dob),
                          "YYYY-MM-DD"
                        )
                      : null
                  }
                  onChange={(date, dateString) =>
                    handleInputChange("dob", convertToDDMMYYYY(dateString))
                  }
                  allowClear
                  style={{ borderColor: errors.dob ? "red" : "" }}
                />
                {errors.dob && <div className="text-danger">{errors.dob}</div>}
              </div>
            </div>

            <div className="col-xl-4 col-lg-4 col-md-6 col-sm-6 col-12">
              <div className="d-flex flex-column">
                <div className="d-flex align-items-center">
                  <label htmlFor="gender" className="form-label mb-1">
                    Gender<span className="mendate">*</span>
                  </label>
                </div>
                <Select
                  showSearch
                  allowClear
                  style={{
                    width: "100%",
                    borderColor: errors.gender ? "red" : "",
                  }}
                  value={selectGender}
                  onChange={(value) => {
                    setSelectGender(value);
                    handleInputChange("gender", value);
                  }}
                  placeholder="Select Gender"
                  filterOption={(input, option) =>
                    (option?.label ?? "")
                      .toLowerCase()
                      .includes(input.toLowerCase())
                  }
                  options={genders.map((gender) => ({
                    value: gender.genderCode,
                    label: gender.genderName,
                  }))}
                />
                {errors.gender && (
                  <div className="text-danger">{errors.gender}</div>
                )}
              </div>
            </div>

            <div className="col-xl-4 col-lg-4 col-md-6 col-sm-6 col-12">
              <div className="mb-3 form-inputs">
                <label htmlFor="exampleInputEmail1" className="form-label mb-1">
                  Email<span className="mendate">*</span>
                </label>
                <Input
                  placeholder="Enter Email Address"
                  value={donorData.body?.edonorEmail || ""}
                  onChange={(e) =>
                    handleInputChange("edonorEmail", e.target.value)
                  }
                  onBlur={() => {
                    const email = donorData.body?.edonorEmail || "";
                    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                    setErrors((prev) => ({
                      ...prev,
                      edonorEmail:
                        email && !emailRegex.test(email)
                          ? "Invalid email address"
                          : "",
                    }));
                  }}
                  style={{ borderColor: errors.edonorEmail ? "red" : "" }}
                />
                {errors.edonorEmail && (
                  <div className="text-danger">{errors.edonorEmail}</div>
                )}
              </div>
            </div>

            <div className="col-xl-4 col-lg-4 col-md-6 col-sm-6 col-12">
              <div className="mb-3 form-inputs">
                <label htmlFor="exampleInputEmail1" className="form-label mb-1">
                  Mobile No.<span className="mendate">*</span>
                </label>
                <Input
                  placeholder="Enter Mobile Number"
                  disabled
                  value={donorData.body?.mobileno || ""}
                />
              </div>
            </div>
          </div>
        </div>
      ),
      style: panelStyle,
    },
    {
      key: "2",
      label: "Additional Information",
      children: (
        <div className="pt-1 mb-3">
          <div className="row">
            <div className="col-xl-4 col-lg-4 col-md-6 col-sm-6 col-12">
              <div className="d-flex flex-column">
                <label htmlFor="exampleInputEmail1" className="form-label mb-1">
                  Blood Group
                </label>
                <Select
                  showSearch
                  allowClear
                  style={{ width: "100%" }}
                  value={bloodGroup}
                  onChange={(value) => {
                    setBloodGroup(value);
                    handleInputChange("bloodGroup", value);
                  }}
                  placeholder="Select Blood group"
                  options={bloodGroups.map((blood) => ({
                    value: blood.bloodGroupCode,
                    label: blood.bloodGroupName,
                  }))}
                />
              </div>
            </div>

            <div className="col-xl-4 col-lg-4 col-md-6 col-sm-6 col-12">
              <div className="mb-3 form-inputs">
                <label htmlFor="exampleInputEmail1" className="form-label mb-1">
                  Father Name
                </label>
                <Input
                  placeholder="Enter Your Father Name"
                  maxLength={50}
                  value={donorData.body?.fatherName || ""}
                  onChange={(e) =>
                    handleInputChange("fatherName", e.target.value)
                  }
                />
              </div>
            </div>

            <div className="col-xl-4 col-lg-4 col-md-6 col-sm-6 col-12">
              <div className="d-flex flex-column">
                <label htmlFor="exampleInputEmail1" className="form-label mb-1">
                  Marital Status
                </label>
                <Select
                  showSearch
                  allowClear
                  style={{ width: "100%" }}
                  value={selectMaritalStatus}
                  onChange={(value) => {
                    setSelectMaritalStatus(value);
                    handleInputChange("maritalStatus", value);
                  }}
                  placeholder="Select Marital Status"
                  filterOption={(input, option) =>
                    (option?.label ?? "")
                      .toLowerCase()
                      .includes(input.toLowerCase())
                  }
                  options={maritalStatus.map((marriage) => ({
                    value: marriage.maritalStatusCode,
                    label: marriage.maritalStatusName,
                  }))}
                />
              </div>
            </div>

            <div className="col-xl-4 col-lg-4 col-md-6 col-sm-6 col-12">
              <div className="mb-3 form-inputs">
                <label htmlFor="exampleInputEmail1" className="form-label mb-1">
                  Spouse Name
                </label>
                <Input
                  placeholder="Enter Your Spouse Name"
                  maxLength={50}
                  value={donorData.body?.spouce || ""}
                  onChange={(e) => handleInputChange("spouce", e.target.value)}
                />
              </div>
            </div>

            <div className="col-xl-4 col-lg-4 col-md-6 col-sm-6 col-12">
              <div className="d-flex flex-column">
                <label htmlFor="exampleInputEmail1" className="form-label mb-1">
                  Occupation
                </label>
                <Select
                  showSearch
                  allowClear
                  style={{ width: "100%" }}
                  value={selectOccupation}
                  onChange={(value) => {
                    setSelectOccupation(value);
                    handleInputChange("occupation", value);
                  }}
                  placeholder="Select occupation"
                  filterOption={(input, option) =>
                    (option?.label ?? "")
                      .toLowerCase()
                      .includes(input.toLowerCase())
                  }
                  options={occupations.map((occupation) => ({
                    value: occupation.occupationCode,
                    label: occupation.occupationName,
                  }))}
                />
              </div>
            </div>

            <div className="col-xl-4 col-lg-4 col-md-6 col-sm-6 col-12">
              <div className="d-flex flex-column">
                <label htmlFor="exampleInputEmail1" className="form-label mb-1">
                  Religion
                </label>
                <Select
                  showSearch
                  allowClear
                  style={{ width: "100%" }}
                  value={selectReligion}
                  onChange={(value) => {
                    setSelectReligion(value);
                    handleInputChange("religion", value);
                  }}
                  placeholder="Select religion"
                  filterOption={(input, option) =>
                    (option?.label ?? "")
                      .toLowerCase()
                      .includes(input.toLowerCase())
                  }
                  options={religion.map((religion) => ({
                    value: religion.religionCode,
                    label: religion.religionName,
                  }))}
                />
              </div>
            </div>
          </div>
        </div>
      ),
      style: panelStyle,
    },
    {
      key: "3",
      label: "Address Details",
      children: (
        <div className="pt-1 mb-3">
          <div className="row">
            <div className="col-xl-4 col-lg-4 col-md-6 col-sm-6 col-12">
              <div className="mb-3 form-inputs">
                <label htmlFor="exampleInputEmail1" className="form-label mb-1">
                  H. No.
                </label>
                <Input
                  placeholder="Enter Your H. No."
                  value={donorData.body?.hno || ""}
                  onChange={(e) => handleInputChange("hno", e.target.value)}
                />
              </div>
            </div>

            <div className="col-xl-4 col-lg-4 col-md-6 col-sm-6 col-12">
              <div className="mb-3 form-inputs">
                <label htmlFor="exampleInputEmail1" className="form-label mb-1">
                  Street/ Address
                </label>
                <Input
                  placeholder="Enter your Street/ Address"
                  value={donorData.body?.address || ""}
                  onChange={(e) => handleInputChange("address", e.target.value)}
                />
              </div>
            </div>

            <div className="col-xl-4 col-lg-4 col-md-6 col-sm-6 col-12">
              <div className="mb-3 form-inputs">
                <label htmlFor="exampleInputEmail1" className="form-label mb-1">
                  Location
                </label>
                <Input
                  placeholder="Enter Your location"
                  value={donorData.body?.location || ""}
                  onChange={(e) =>
                    handleInputChange("location", e.target.value)
                  }
                />
              </div>
            </div>

            <div className="col-xl-4 col-lg-4 col-md-6 col-sm-6 col-12">
              <div className="mb-3 form-inputs">
                <label htmlFor="exampleInputEmail1" className="form-label mb-1">
                  City/ Village
                </label>
                <Input
                  placeholder="Enter Your City/Village"
                  value={donorData.body?.donorCity || ""}
                  onChange={(e) =>
                    handleInputChange("donorCity", e.target.value)
                  }
                />
              </div>
            </div>

            <div className="col-xl-4 col-lg-4 col-md-6 col-sm-6 col-12">
              <div className="d-flex flex-column">
                <label htmlFor="exampleInputEmail1" className="form-label mb-1">
                  State
                </label>
                <Select
                  showSearch
                  allowClear
                  style={{ width: "100%" }}
                  value={selectedState}
                  onChange={handleStateChange}
                  placeholder="Select State"
                  filterOption={(input, option) =>
                    (option?.label ?? "")
                      .toLowerCase()
                      .includes(input.toLowerCase())
                  }
                  options={states.map((state) => ({
                    value: state.stateCode,
                    label: state.stateName,
                  }))}
                />
              </div>
            </div>

            <div className="col-xl-4 col-lg-4 col-md-6 col-sm-6 col-12">
              <div className="d-flex flex-column">
                <label htmlFor="exampleInputEmail1" className="form-label mb-1">
                  District
                </label>
                <Select
                  showSearch
                  allowClear
                  style={{ width: "100%" }}
                  value={selectedDistrict}
                  onChange={handleDistrictChange}
                  placeholder="Select District"
                  filterOption={(input, option) =>
                    (option?.label ?? "")
                      .toLowerCase()
                      .includes(input.toLowerCase())
                  }
                  options={districts.map((district) => ({
                    value: district.districtCode,
                    label: district.districtName,
                  }))}
                />
              </div>
            </div>

            <div className="col-xl-4 col-lg-4 col-md-6 col-sm-6 col-12">
              <div className="d-flex flex-column">
                <label htmlFor="exampleInputEmail1" className="form-label mb-1">
                  Country
                </label>
                <Space wrap>
                  <Select
                    value="India"
                    style={{
                      width: "100%",
                    }}
                    disabled
                  />
                </Space>
              </div>
            </div>

            <div className="col-xl-4 col-lg-4 col-md-6 col-sm-6 col-12">
              <div className="mb-3 form-inputs">
                <label htmlFor="exampleInputEmail1" className="form-label mb-1">
                  Pin Code
                </label>
                <Input
                  placeholder="Enter Your Pincode"
                  maxLength={6}
                  value={donorData.body?.donorPin || ""}
                  onChange={(e) => {
                    const value = e.target.value;
                    if (/^\d{0,6}$/.test(value)) {
                      handleInputChange("donorPin", value);
                    }
                  }}
                />
              </div>
            </div>
            <div className="col-xl-4 col-lg-4 col-md-6 col-sm-6 col-12">
              <div className="mb-3 form-inputs">
                <label htmlFor="exampleInputEmail1" className="form-label mb-1">
                  Land Mark
                </label>
                <Input
                  placeholder="Enter Your landmark"
                  value={donorData.body?.landmark || ""}
                  onChange={(e) =>
                    handleInputChange("landmark", e.target.value)
                  }
                />
              </div>
            </div>
          </div>
        </div>
      ),
      style: panelStyle,
    },
  ];

  return (
    <>
      <div className="tabContent mb-3">
        <Collapse
          bordered={false}
          activeKey={activePanels}
          onChange={(keys) => setActivePanels(keys)}
          expandIcon={({ isActive }) => (
            <CaretRightOutlined rotate={isActive ? 90 : 0} />
          )}
          style={{ background: token.colorBgContainer }}
          items={getItems(panelStyle)}
        />

        <div className="mt-4 d-flex justify-content-end">
          <Button onClick={handleSave} type="primary">
            Save Changes
          </Button>
        </div>
      </div>
    </>
  );
}
