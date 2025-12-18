import {
  Button,
  Checkbox,
  Collapse,
  DatePicker,
  Input,
  Select,
  theme,
  Form,
  message,
} from "antd";
import React, { useState, useEffect } from "react";
import { CaretRightOutlined } from "@ant-design/icons";
import { useDispatch, useSelector } from "react-redux";
import { getApiData } from "../redux/slices/dataSlice";
import "../scss/addBloodBank.scss";
import dayjs from "dayjs";
import axios from "axios";
import { BaseUrl } from "../utils/url";
import Swal from "sweetalert2";

export default function AddBloodBank() {
  const [checkboxErrors, setCheckboxErrors] = useState({});
  const [fieldErrors, setFieldErrors] = useState({});
  const [activePanels, setActivePanels] = useState(["1"]);
  const [selectedState, setSelectedState] = useState(null);
  const [selectedDistrict, setSelectedDistrict] = useState(null);
  const [checkboxStates, setCheckboxStates] = useState({
    donorType: [],
    donationType: [],
    componentType: [],
    bagType: [],
    ttiType: [],
  });
  const [isLoaded, setIsLoaded] = useState("");
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const { statesWithDistricts } = useSelector((state) => state.data);
  const [form] = Form.useForm();

  // Form states for validation
  const [formValues, setFormValues] = useState({
    state: null,
    district: null,
    hospCity: "",
    bldbankName: "",
    parentHospName: "",
    hospShortName: "",
    category: null,
    contactPerson: "",
    dghsSupported: null,
    hospEmail: "",
    hospContact: "",
    licenceNo: "",
    registrationDate: null,
    licenceFromDate: null,
    licenceToDate: null,
    helplineNo: "",
    componentFacility: null,
    apheresisFacility: null,
    noOfBed: "",
    hospAdd1: "",
    hospAdd2: "",
    pincode: "",
    hospLatitude: "",
    hospLongitude: "",
    hospWebsite: "",
  });

  useEffect(() => {
    const id = requestAnimationFrame(() => setIsLoaded(true));
    return () => cancelAnimationFrame(id);
  }, []);

  const monthNames = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];

  // format date as "26-Nov-2025"
  const formatDateToDDMMMYYYY = (date) => {
    if (!date) return "";

    const day = date.date();
    const monthIndex = date.month();
    const year = date.year();
    const month = monthNames[monthIndex];

    return `${day}-${month}-${year}`;
  };

  useEffect(() => {
    dispatch(getApiData());
  }, [dispatch]);

  const states = statesWithDistricts || [];
  const districts = selectedState
    ? states.find((state) => state.stateCode === selectedState)?.districts || []
    : [];

  const handleStateChange = (value) => {
    setSelectedState(value);
    setSelectedDistrict(null);
    setFormValues((prev) => ({ ...prev, state: value, district: null }));
    setFieldErrors((prev) => ({
      ...prev,
      state: undefined,
      district: undefined,
    }));
  };

  const handleDistrictChange = (value) => {
    setSelectedDistrict(value);
    setFormValues((prev) => ({ ...prev, district: value }));
    setFieldErrors((prev) => ({ ...prev, district: undefined }));
  };

  const handleInputChange = (field, value) => {
    setFormValues((prev) => ({ ...prev, [field]: value }));
    setFieldErrors((prev) => ({ ...prev, [field]: undefined }));
  };

  const handleDateChange = (field, date) => {
    setFormValues((prev) => ({ ...prev, [field]: date }));
    setFieldErrors((prev) => ({ ...prev, [field]: undefined }));
  };

  const handleSelectChange = (field, value) => {
    setFormValues((prev) => ({ ...prev, [field]: value }));
    setFieldErrors((prev) => ({ ...prev, [field]: undefined }));
  };

  const handleCheckboxChange = (type, value, checked) => {
    setCheckboxStates((prev) => {
      const newArray = checked
        ? [...prev[type], value]
        : prev[type].filter((item) => item !== value);

      return {
        ...prev,
        [type]: newArray,
      };
    });

    // clear checkbox error when at least one is checked
    if (checked) {
      setCheckboxErrors((prev) => ({ ...prev, [type]: undefined }));
    }
  };

  const validateRequired = (field, value, fieldName) => {
    if (!value || (typeof value === "string" && value.trim() === "")) {
      return `${fieldName} is required`;
    }
    return null;
  };

  const validateEmail = (email) => {
    if (!email) return "Email is required";

    const trimmedEmail = email.trim();
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailRegex.test(trimmedEmail)) {
      return "Please enter a valid email address";
    }
    return null;
  };

  const validatePhone = (phone) => {
    if (!phone) return "Contact Number is required";
    const phoneRegex = /^[6-9]\d{9}$/;
    if (!phoneRegex.test(phone)) {
      return "Please enter valid 10-digit mobile number starting with 6-9";
    }
    return null;
  };

  const validatePincode = (pincode) => {
    if (!pincode) return "Pincode is required";
    const pincodeRegex = /^\d{6}$/;
    if (!pincodeRegex.test(pincode)) {
      return "Pincode must contain exactly 6 digits";
    }
    return null;
  };

  const validateName = (name, fieldName) => {
    if (!name) return `${fieldName} is required`;
    if (name.length < 3) return `${fieldName} must be at least 3 characters`;
    const nameRegex = /^[A-Za-z\s.,'-]+$/;
    if (!nameRegex.test(name)) {
      return `Please enter a valid ${fieldName.toLowerCase()}`;
    }
    return null;
  };

  const validateLicenseDates = () => {
    const { licenceFromDate, licenceToDate } = formValues;
    if (!licenceFromDate) return null;
    if (!licenceToDate) return null;

    if (licenceToDate.isBefore(licenceFromDate)) {
      return "License To Date must be after From Date";
    }
    return null;
  };

  const validateHelpline = (helpline) => {
    if (!helpline) return null;
    const digitsOnly = helpline.replace(/\D/g, "");
    if (digitsOnly.length < 10) {
      return "Helpline number must be at least 10 digits";
    }
    return null;
  };

  const validateWebsite = (website) => {
    if (!website) return null;
    const urlRegex = /^(https?:\/\/)?([\w-]+\.)+[\w-]{2,}(\/\S*)?$/;
    if (!urlRegex.test(website)) {
      return "Please enter a valid website URL";
    }
    return null;
  };

  const validateCoordinates = (coord, type) => {
    if (!coord) return null;
    const coordRegex = /^-?\d+(\.\d+)?$/;
    if (!coordRegex.test(coord)) {
      return `Please enter valid ${type}`;
    }

    const num = parseFloat(coord);
    if (type === "latitude" && (num < -90 || num > 90)) {
      return "Latitude must be between -90 and 90";
    }
    if (type === "longitude" && (num < -180 || num > 180)) {
      return "Longitude must be between -180 and 180";
    }
    return null;
  };

  const validateNumber = (num, fieldName) => {
    if (!num) return null;
    if (isNaN(num) || parseInt(num) < 0) {
      return `Please enter valid ${fieldName}`;
    }
    return null;
  };

  // at least one checkbox should be checked in each section
  const validateCheckboxes = () => {
    const newCheckboxErrors = {};
    let isValid = true;

    // Check each checkbox section
    Object.keys(checkboxStates).forEach((type) => {
      if (checkboxStates[type].length === 0) {
        const fieldName = type.replace(/([A-Z])/g, " $1").trim();
        newCheckboxErrors[
          type
        ] = `At least one option is required in ${fieldName}`;
        isValid = false;
      }
    });

    setCheckboxErrors(newCheckboxErrors);
    return isValid;
  };

  const validateForm = () => {
    const newFieldErrors = {};
    let isValid = true;

    // required fields validation
    const requiredFields = [
      { field: "state", name: "State" },
      { field: "district", name: "District" },
      { field: "bldbankName", name: "Blood Bank Name" },
      { field: "category", name: "Category" },
      { field: "contactPerson", name: "Contact Person" },
      { field: "dghsSupported", name: "DGHS Supported" },
      { field: "licenceNo", name: "License Number" },
      { field: "registrationDate", name: "Registration Date" },
      { field: "licenceFromDate", name: "License From Date" },
      { field: "licenceToDate", name: "License To Date" },
      { field: "componentFacility", name: "Component Facility" },
      { field: "apheresisFacility", name: "Apheresis Facility" },
      { field: "hospAdd1", name: "Address 1" },
      { field: "pincode", name: "Pincode" },
    ];

    requiredFields.forEach(({ field, name }) => {
      const error = validateRequired(field, formValues[field], name);
      if (error) {
        newFieldErrors[field] = error;
        isValid = false;
      }
    });

    // email validation
    const emailError = validateEmail(formValues.hospEmail);
    if (emailError) {
      newFieldErrors.hospEmail = emailError;
      isValid = false;
    }

    // phone validation
    const phoneError = validatePhone(formValues.hospContact);
    if (phoneError) {
      newFieldErrors.hospContact = phoneError;
      isValid = false;
    }

    // name validations
    // const bankNameError = validateName(
    //   formValues.bldbankName,
    //   "Blood Bank Name"
    // );
    // if (bankNameError && !newFieldErrors.bldbankName) {
    //   newFieldErrors.bldbankName = bankNameError;
    //   isValid = false;
    // }

    const contactPersonError = validateName(
      formValues.contactPerson,
      "Contact Person"
    );
    if (contactPersonError && !newFieldErrors.contactPerson) {
      newFieldErrors.contactPerson = contactPersonError;
      isValid = false;
    }

    // license date validation
    const licenseDateError = validateLicenseDates();
    if (licenseDateError) {
      newFieldErrors.licenceToDate = licenseDateError;
      isValid = false;
    }

    // pincode validation
    const pincodeError = validatePincode(formValues.pincode);
    if (pincodeError && !newFieldErrors.pincode) {
      newFieldErrors.pincode = pincodeError;
      isValid = false;
    }

    // Optional fields validation
    const helplineError = validateHelpline(formValues.helplineNo);
    if (helplineError) {
      newFieldErrors.helplineNo = helplineError;
      isValid = false;
    }

    const websiteError = validateWebsite(formValues.hospWebsite);
    if (websiteError) {
      newFieldErrors.hospWebsite = websiteError;
      isValid = false;
    }

    const latitudeError = validateCoordinates(
      formValues.hospLatitude,
      "latitude"
    );
    if (latitudeError) {
      newFieldErrors.hospLatitude = latitudeError;
      isValid = false;
    }

    const longitudeError = validateCoordinates(
      formValues.hospLongitude,
      "longitude"
    );
    if (longitudeError) {
      newFieldErrors.hospLongitude = longitudeError;
      isValid = false;
    }

    const bedError = validateNumber(formValues.noOfBed, "number of beds");
    if (bedError) {
      newFieldErrors.noOfBed = bedError;
      isValid = false;
    }

    setFieldErrors(newFieldErrors);
    return isValid;
  };

  const submitBloodBankData = async (apiData) => {
    try {
      setLoading(true);
      const response = await axios.post(`${BaseUrl}/bloodbank/add`, apiData, {
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (response.status === 200) {
        return response.data;
      }
      throw new Error("API call failed");
    } catch (error) {
      console.error("Error submitting data:", error);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async () => {
    try {
      const isFormValid = validateForm();
      const areCheckboxesValid = validateCheckboxes();

      if (!isFormValid || !areCheckboxesValid) {
        Swal.fire({
          title: "Error!",
          text: "Please fix all validation errors before submitting.",
          icon: "error",
          confirmButtonText: "OK",
        });
        return;
      }

      const selectedStateObj = states.find(
        (state) => state.stateCode === selectedState
      );
      const selectedDistrictObj = districts.find(
        (district) => district.districtCode === selectedDistrict
      );

      const apiData = {
        pincode: formValues.pincode,
        hospWebsite: formValues.hospWebsite || "",
        registrationDate: formValues.registrationDate
          ? formatDateToDDMMMYYYY(formValues.registrationDate)
          : "",
        hospCity: formValues.hospCity || "",
        parentHospName: formValues.parentHospName || "",
        hospShortName: formValues.hospShortName || "",
        hospEmail: formValues.hospEmail,
        licenceNo: formValues.licenceNo,
        licenceFromDate: formValues.licenceFromDate
          ? formatDateToDDMMMYYYY(formValues.licenceFromDate)
          : "",
        licenceToDate: formValues.licenceToDate
          ? formatDateToDDMMMYYYY(formValues.licenceToDate)
          : "",
        stateCode: selectedStateObj
          ? parseInt(selectedStateObj.stateCode)
          : null,
        districtCode: selectedDistrictObj
          ? parseInt(selectedDistrictObj.districtCode)
          : null,
        bldbankName: formValues.bldbankName,
        contactPerson: formValues.contactPerson,
        dghsSupported: formValues.dghsSupported === "yes" ? 1 : 0,
        hospContact: formValues.hospContact,
        helplineNo: formValues.helplineNo || "",
        noOfBed: formValues.noOfBed || "0",
        hospLatitude: formValues.hospLatitude
          ? parseFloat(formValues.hospLatitude)
          : 0,
        hospLongitude: formValues.hospLongitude
          ? parseFloat(formValues.hospLongitude)
          : 0,
        hospAdd1: formValues.hospAdd1,
        hospAdd2: formValues.hospAdd2 || "",
        componentFacility: formValues.componentFacility === "yes" ? 1 : 0,
        componentTypes: checkboxStates.componentType,
        apheresisFacility: formValues.apheresisFacility === "yes" ? 1 : 0,
        ttiType: checkboxStates.ttiType,
        donorTypes: checkboxStates.donorType,
        donationTypes: checkboxStates.donationType,
        bagTypes: checkboxStates.bagType,
        hospType: formValues.category,
      };

      console.log("Form data to submit:", apiData);

      const result = await submitBloodBankData(apiData);
      Swal.fire({
        title: "Success!",
        text: "Blood bank details submitted successfully!",
        icon: "success",
        confirmButtonText: "OK",
      });

      setFormValues({
        state: null,
        district: null,
        hospCity: "",
        bldbankName: "",
        parentHospName: "",
        hospShortName: "",
        category: null,
        contactPerson: "",
        dghsSupported: null,
        hospEmail: "",
        hospContact: "",
        licenceNo: "",
        registrationDate: null,
        licenceFromDate: null,
        licenceToDate: null,
        helplineNo: "",
        componentFacility: null,
        apheresisFacility: null,
        noOfBed: "",
        hospAdd1: "",
        hospAdd2: "",
        pincode: "",
        hospLatitude: "",
        hospLongitude: "",
        hospWebsite: "",
      });
      setSelectedState(null);
      setSelectedDistrict(null);
      setCheckboxStates({
        donorType: [],
        donationType: [],
        componentType: [],
        bagType: [],
        ttiType: [],
      });
      setFieldErrors({});
      setCheckboxErrors({});
    } catch (error) {
      console.error("Form submission failed:", error);
      if (error.response) {
        Swal.fire({
          title: "Error!",
          text: "Form submission failed",
          icon: "error",
          confirmButtonText: "OK",
        });
      } else {
        Swal.fire({
          title: "Error!",
          text: "Submission failed. Please try again.",
          icon: "error",
          confirmButtonText: "OK",
        });
      }
    }
  };

  const handleCancel = () => {
    setFormValues({
      state: null,
      district: null,
      hospCity: "",
      bldbankName: "",
      parentHospName: "",
      hospShortName: "",
      category: null,
      contactPerson: "",
      dghsSupported: null,
      hospEmail: "",
      hospContact: "",
      licenceNo: "",
      registrationDate: null,
      licenceFromDate: null,
      licenceToDate: null,
      helplineNo: "",
      componentFacility: null,
      apheresisFacility: null,
      noOfBed: "",
      hospAdd1: "",
      hospAdd2: "",
      pincode: "",
      hospLatitude: "",
      hospLongitude: "",
      hospWebsite: "",
    });
    setSelectedState(null);
    setSelectedDistrict(null);
    setCheckboxStates({
      donorType: [],
      donationType: [],
      componentType: [],
      bagType: [],
      ttiType: [],
    });
    setFieldErrors({});
    setCheckboxErrors({});
    Swal.fire({
      title: "Info!",
      text: "Form cleared",
      icon: "success",
      confirmButtonText: "OK",
    });
  };

  const { token } = theme.useToken();

  const panelStyle = {
    marginBottom: 24,
    background: token.colorFillAlter,
    borderRadius: token.borderRadiusLG,
    border: "none",
  };

  const dateFormat = "DD-MMM-YYYY";

  const getItems = (panelStyle) => [
    {
      key: "1",
      label: (
        <>
          Blood Bank Address <span className="text-danger">*</span>
        </>
      ),
      children: (
        <div className="pt-1 mb-3">
          <div className="row">
            <div className="col-xl-4 col-lg-4 col-md-6 col-sm-6 col-12 mb-2">
              <div className="d-flex flex-column">
                <div className="form-group">
                  <label htmlFor="state" className="form-label mb-1">
                    State<span className="mendate">*</span>
                  </label>
                  <Select
                    id="state"
                    showSearch
                    allowClear
                    style={{ width: "100%" }}
                    value={selectedState}
                    onChange={handleStateChange}
                    placeholder="Select State"
                    status={fieldErrors.state ? "error" : ""}
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
                  {fieldErrors.state && (
                    <div className="text-danger small mt-1">
                      {fieldErrors.state}
                    </div>
                  )}
                </div>
              </div>
            </div>

            <div className="col-xl-4 col-lg-4 col-md-6 col-sm-6 col-12 mb-2">
              <div className="d-flex flex-column">
                <div className="form-group">
                  <label htmlFor="district" className="form-label mb-1">
                    District<span className="mendate">*</span>
                  </label>
                  <Select
                    id="district"
                    showSearch
                    allowClear
                    style={{ width: "100%" }}
                    value={selectedDistrict}
                    onChange={handleDistrictChange}
                    placeholder="Select District"
                    disabled={!selectedState}
                    status={fieldErrors.district ? "error" : ""}
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
                  {fieldErrors.district && (
                    <div className="text-danger small mt-1">
                      {fieldErrors.district}
                    </div>
                  )}
                </div>
              </div>
            </div>

            <div className="col-xl-4 col-lg-4 col-md-6 col-sm-6 col-12 mb-2">
              <div className="form-group">
                <label htmlFor="hospCity" className="form-label mb-1">
                  City
                </label>
                <Input
                  id="hospCity"
                  name="hospCity"
                  placeholder="Enter your city"
                  value={formValues.hospCity}
                  onChange={(e) =>
                    handleInputChange("hospCity", e.target.value)
                  }
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
      label: (
        <>
          Blood Bank Details <span className="text-danger">*</span>
        </>
      ),
      children: (
        <div className="pt-1 mb-3">
          <div className="row">
            <div className="col-xl-4 col-lg-4 col-md-6 col-sm-6 col-12 mb-2">
              <div className="form-group">
                <label htmlFor="bldbankName" className="form-label mb-1">
                  Blood Bank Name<span className="mendate">*</span>
                </label>
                <Input
                  id="bldbankName"
                  name="bldbankName"
                  placeholder="Enter blood bank name"
                  value={formValues.bldbankName}
                  onChange={(e) =>
                    handleInputChange("bldbankName", e.target.value)
                  }
                  status={fieldErrors.bldbankName ? "error" : ""}
                />
                {fieldErrors.bldbankName && (
                  <div className="text-danger small mt-1">
                    {fieldErrors.bldbankName}
                  </div>
                )}
              </div>
            </div>

            <div className="col-xl-4 col-lg-4 col-md-6 col-sm-6 col-12 mb-2">
              <div className="form-group">
                <label htmlFor="parentHospName" className="form-label mb-1">
                  Parent Hospital Name
                </label>
                <Input
                  id="parentHospName"
                  name="parentHospName"
                  placeholder="Enter parent hospital name"
                  value={formValues.parentHospName}
                  onChange={(e) =>
                    handleInputChange("parentHospName", e.target.value)
                  }
                />
              </div>
            </div>

            <div className="col-xl-4 col-lg-4 col-md-6 col-sm-6 col-12 mb-2">
              <div className="form-group">
                <label htmlFor="hospShortName" className="form-label mb-1">
                  Short Name
                </label>
                <Input
                  id="hospShortName"
                  name="hospShortName"
                  placeholder="Enter short name"
                  value={formValues.hospShortName}
                  onChange={(e) =>
                    handleInputChange("hospShortName", e.target.value)
                  }
                />
              </div>
            </div>

            <div className="col-xl-4 col-lg-4 col-md-6 col-sm-6 col-12 mb-2">
              <div className="d-flex flex-column">
                <div className="form-group">
                  <label htmlFor="category" className="form-label mb-1">
                    Category<span className="mendate">*</span>
                  </label>
                  <Select
                    id="category"
                    showSearch
                    allowClear
                    style={{ width: "100%" }}
                    placeholder="Select category"
                    value={formValues.category}
                    onChange={(value) => handleSelectChange("category", value)}
                    status={fieldErrors.category ? "error" : ""}
                    filterOption={(input, option) =>
                      (option?.label ?? "")
                        .toLowerCase()
                        .includes(input.toLowerCase())
                    }
                    options={[
                      { value: "1", label: "Government Hospital" },
                      { value: "2", label: "Private Hospital" },
                      { value: "3", label: "Charitable Trust" },
                      { value: "4", label: "Red Cross" },
                    ]}
                  />
                  {fieldErrors.category && (
                    <div className="text-danger small mt-1">
                      {fieldErrors.category}
                    </div>
                  )}
                </div>
              </div>
            </div>

            <div className="col-xl-4 col-lg-4 col-md-6 col-sm-6 col-12 mb-2">
              <div className="form-group">
                <label htmlFor="contactPerson" className="form-label mb-1">
                  Contact Person<span className="mendate">*</span>
                </label>
                <Input
                  id="contactPerson"
                  name="contactPerson"
                  placeholder="Enter name"
                  value={formValues.contactPerson}
                  onChange={(e) =>
                    handleInputChange("contactPerson", e.target.value)
                  }
                  status={fieldErrors.contactPerson ? "error" : ""}
                />
                {fieldErrors.contactPerson && (
                  <div className="text-danger small mt-1">
                    {fieldErrors.contactPerson}
                  </div>
                )}
              </div>
            </div>

            <div className="col-xl-4 col-lg-4 col-md-6 col-sm-6 col-12 mb-2">
              <div className="d-flex flex-column">
                <div className="form-group">
                  <label htmlFor="dghsSupported" className="form-label mb-1">
                    DGHS Supported<span className="mendate">*</span>
                  </label>
                  <Select
                    id="dghsSupported"
                    showSearch
                    allowClear
                    style={{ width: "100%" }}
                    placeholder="Select option"
                    value={formValues.dghsSupported}
                    onChange={(value) =>
                      handleSelectChange("dghsSupported", value)
                    }
                    options={[
                      { value: "yes", label: "Yes" },
                      { value: "no", label: "No" },
                    ]}
                  />
                  {fieldErrors.dghsSupported && (
                    <div className="text-danger small mt-1">
                      {fieldErrors.dghsSupported}
                    </div>
                  )}
                </div>
              </div>
            </div>

            <div className="col-xl-4 col-lg-4 col-md-6 col-sm-6 col-12 mb-2">
              <div className="form-group">
                <label htmlFor="hospEmail" className="form-label mb-1">
                  Email ID<span className="mendate">*</span>
                </label>
                <Input
                  id="hospEmail"
                  name="hospEmail"
                  placeholder="Enter your email"
                  value={formValues.hospEmail}
                  onChange={(e) =>
                    handleInputChange("hospEmail", e.target.value)
                  }
                  inputMode="email"
                  autoComplete="email"
                  status={fieldErrors.hospEmail ? "error" : ""}
                />
                {fieldErrors.hospEmail && (
                  <div className="text-danger small mt-1">
                    {fieldErrors.hospEmail}
                  </div>
                )}
              </div>
            </div>

            <div className="col-xl-4 col-lg-4 col-md-6 col-sm-6 col-12 mb-2">
              <div className="form-group">
                <label htmlFor="hospContact" className="form-label mb-1">
                  Contact Number<span className="mendate">*</span>
                </label>
                <Input
                  id="hospContact"
                  name="hospContact"
                  placeholder="Enter contact number"
                  maxLength={10}
                  value={formValues.hospContact}
                  onChange={(e) =>
                    handleInputChange("hospContact", e.target.value)
                  }
                  status={fieldErrors.hospContact ? "error" : ""}
                />
                {fieldErrors.hospContact && (
                  <div className="text-danger small mt-1">
                    {fieldErrors.hospContact}
                  </div>
                )}
              </div>
            </div>

            <div className="col-xl-4 col-lg-4 col-md-6 col-sm-6 col-12 mb-2">
              <div className="form-group">
                <label htmlFor="licenceNo" className="form-label mb-1">
                  License Number<span className="mendate">*</span>
                </label>
                <Input
                  id="licenceNo"
                  name="licenceNo"
                  placeholder="Enter license number"
                  value={formValues.licenceNo}
                  onChange={(e) =>
                    handleInputChange("licenceNo", e.target.value)
                  }
                  status={fieldErrors.licenceNo ? "error" : ""}
                />
                {fieldErrors.licenceNo && (
                  <div className="text-danger small mt-1">
                    {fieldErrors.licenceNo}
                  </div>
                )}
              </div>
            </div>

            <div className="col-xl-4 col-lg-4 col-md-6 col-sm-6 col-12 mb-2">
              <div className="d-flex flex-column">
                <div className="form-group d-flex flex-column">
                  <label htmlFor="registrationDate" className="form-label mb-1">
                    Blood Bank First Registration Date
                    <span className="mendate">*</span>
                  </label>
                  <DatePicker
                    id="registrationDate"
                    placeholder="DD-MM-YYYY"
                    className="custom-date-picker"
                    allowClear
                    format={dateFormat}
                    value={formValues.registrationDate}
                    onChange={(date) =>
                      handleDateChange("registrationDate", date)
                    }
                    disabledDate={(current) =>
                      current &&
                      (current > dayjs().endOf("day") ||
                        (formValues.licenceFromDate &&
                          current >
                            dayjs(formValues.licenceFromDate).endOf("day")))
                    }
                    status={fieldErrors.registrationDate ? "error" : ""}
                  />

                  {fieldErrors.registrationDate && (
                    <div className="text-danger small mt-1">
                      {fieldErrors.registrationDate}
                    </div>
                  )}
                </div>
              </div>
            </div>

            <div className="col-xl-4 col-lg-4 col-md-6 col-sm-6 col-12 mb-2">
              <div className="d-flex flex-column">
                <div className="form-group d-flex flex-column">
                  <label htmlFor="licenceFromDate" className="form-label mb-1">
                    License Start Date<span className="mendate">*</span>
                  </label>
                  <DatePicker
                    id="licenceFromDate"
                    placeholder="DD-MM-YYYY"
                    className="custom-date-picker"
                    allowClear
                    format={dateFormat}
                    value={formValues.licenceFromDate}
                    onChange={(date) =>
                      handleDateChange("licenceFromDate", date)
                    }
                    disabledDate={(current) =>
                      formValues.registrationDate &&
                      current &&
                      current <
                        dayjs(formValues.registrationDate).startOf("day")
                    }
                    status={fieldErrors.licenceFromDate ? "error" : ""}
                  />

                  {fieldErrors.licenceFromDate && (
                    <div className="text-danger small mt-1">
                      {fieldErrors.licenceFromDate}
                    </div>
                  )}
                </div>
              </div>
            </div>

            <div className="col-xl-4 col-lg-4 col-md-6 col-sm-6 col-12 mb-2">
              <div className="d-flex flex-column">
                <div className="form-group d-flex flex-column">
                  <label htmlFor="licenceToDate" className="form-label mb-1">
                    License End Date<span className="mendate">*</span>
                  </label>
                  <DatePicker
                    id="licenceToDate"
                    placeholder="DD-MM-YYYY"
                    className="custom-date-picker"
                    allowClear
                    format={dateFormat}
                    value={formValues.licenceToDate}
                    onChange={(date) => handleDateChange("licenceToDate", date)}
                    status={fieldErrors.licenceToDate ? "error" : ""}
                  />
                  {fieldErrors.licenceToDate && (
                    <div className="text-danger small mt-1">
                      {fieldErrors.licenceToDate}
                    </div>
                  )}
                </div>
              </div>
            </div>

            <div className="col-xl-4 col-lg-4 col-md-6 col-sm-6 col-12 mb-2">
              <div className="form-group">
                <label htmlFor="helplineNo" className="form-label mb-1">
                  Helpline Number
                </label>
                <Input
                  id="helplineNo"
                  name="helplineNo"
                  maxLength={10}
                  placeholder="Enter helpline number"
                  value={formValues.helplineNo}
                  onChange={(e) =>
                    handleInputChange("helplineNo", e.target.value)
                  }
                  status={fieldErrors.helplineNo ? "error" : ""}
                />
                {fieldErrors.helplineNo && (
                  <div className="text-danger small mt-1">
                    {fieldErrors.helplineNo}
                  </div>
                )}
              </div>
            </div>

            <div className="col-xl-4 col-lg-4 col-md-6 col-sm-6 col-12 mb-2">
              <div className="d-flex flex-column">
                <div className="form-group">
                  <label
                    htmlFor="componentFacility"
                    className="form-label mb-1"
                  >
                    Component Facility<span className="mendate">*</span>
                  </label>
                  <Select
                    id="componentFacility"
                    showSearch
                    allowClear
                    style={{ width: "100%" }}
                    placeholder="Select option"
                    value={formValues.componentFacility}
                    onChange={(value) =>
                      handleSelectChange("componentFacility", value)
                    }
                    options={[
                      { value: "yes", label: "Yes" },
                      { value: "no", label: "No" },
                    ]}
                  />
                  {fieldErrors.componentFacility && (
                    <div className="text-danger small mt-1">
                      {fieldErrors.componentFacility}
                    </div>
                  )}
                </div>
              </div>
            </div>

            <div className="col-xl-4 col-lg-4 col-md-6 col-sm-6 col-12 mb-2">
              <div className="d-flex flex-column">
                <div className="form-group">
                  <label
                    htmlFor="apheresisFacility"
                    className="form-label mb-1"
                  >
                    Apheresis Facility<span className="mendate">*</span>
                  </label>
                  <Select
                    id="apheresisFacility"
                    showSearch
                    allowClear
                    style={{ width: "100%" }}
                    placeholder="Select option"
                    value={formValues.apheresisFacility}
                    onChange={(value) =>
                      handleSelectChange("apheresisFacility", value)
                    }
                    options={[
                      { value: "yes", label: "Yes" },
                      { value: "no", label: "No" },
                    ]}
                  />
                  {fieldErrors.apheresisFacility && (
                    <div className="text-danger small mt-1">
                      {fieldErrors.apheresisFacility}
                    </div>
                  )}
                </div>
              </div>
            </div>

            <div className="col-xl-4 col-lg-4 col-md-6 col-sm-6 col-12 mb-2">
              <div className="form-group">
                <label htmlFor="noOfBed" className="form-label mb-1">
                  No. of beds
                </label>
                <Input
                  id="noOfBed"
                  name="noOfBed"
                  type="number"
                  min={0}
                  placeholder="Enter number of beds"
                  value={formValues.noOfBed}
                  onChange={(e) => handleInputChange("noOfBed", e.target.value)}
                  status={fieldErrors.noOfBed ? "error" : ""}
                />
                {fieldErrors.noOfBed && (
                  <div className="text-danger small mt-1">
                    {fieldErrors.noOfBed}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      ),
      style: panelStyle,
    },
    {
      key: "3",
      label: (
        <>
          Postal Address <span className="text-danger">*</span>
        </>
      ),
      children: (
        <div className="pt-1 mb-3">
          <div className="row">
            <div className="col-xl-4 col-lg-4 col-md-6 col-sm-6 col-12 mb-2">
              <div className="form-group">
                <label htmlFor="hospAdd1" className="form-label mb-1">
                  Address 1<span className="mendate">*</span>
                </label>
                <Input
                  id="hospAdd1"
                  name="hospAdd1"
                  placeholder="Enter address line 1"
                  value={formValues.hospAdd1}
                  onChange={(e) =>
                    handleInputChange("hospAdd1", e.target.value)
                  }
                  status={fieldErrors.hospAdd1 ? "error" : ""}
                />
                {fieldErrors.hospAdd1 && (
                  <div className="text-danger small mt-1">
                    {fieldErrors.hospAdd1}
                  </div>
                )}
              </div>
            </div>

            <div className="col-xl-4 col-lg-4 col-md-6 col-sm-6 col-12 mb-2">
              <div className="form-group">
                <label htmlFor="hospAdd2" className="form-label mb-1">
                  Address 2
                </label>
                <Input
                  id="hospAdd2"
                  name="hospAdd2"
                  placeholder="Enter address line 2"
                  value={formValues.hospAdd2}
                  onChange={(e) =>
                    handleInputChange("hospAdd2", e.target.value)
                  }
                />
              </div>
            </div>

            <div className="col-xl-4 col-lg-4 col-md-6 col-sm-6 col-12 mb-2">
              <div className="form-group">
                <label htmlFor="pincode" className="form-label mb-1">
                  Pincode<span className="mendate">*</span>
                </label>
                <Input
                  id="pincode"
                  name="pincode"
                  maxLength={6}
                  placeholder="Enter pincode"
                  value={formValues.pincode}
                  onChange={(e) =>
                    handleInputChange(
                      "pincode",
                      e.target.value.replace(/\D/g, "")
                    )
                  }
                  inputMode="numeric"
                  pattern="[0-9]*"
                  status={fieldErrors.pincode ? "error" : ""}
                />

                {fieldErrors.pincode && (
                  <div className="text-danger small mt-1">
                    {fieldErrors.pincode}
                  </div>
                )}
              </div>
            </div>

            <div className="col-xl-4 col-lg-4 col-md-6 col-sm-6 col-12 mb-2">
              <div className="form-group">
                <label htmlFor="hospLatitude" className="form-label mb-1">
                  Latitude
                </label>
                <Input
                  id="hospLatitude"
                  name="hospLatitude"
                  placeholder="Enter latitude"
                  value={formValues.hospLatitude}
                  onChange={(e) => {
                    let value = e.target.value;

                    // allow only digits, dot, minus
                    value = value.replace(/[^0-9.-]/g, "");

                    // regex: max 2 digits before dot, max 6 after dot
                    const regex = /^-?\d{0,2}(\.\d{0,6})?$/;

                    if (!regex.test(value)) return;

                    handleInputChange("hospLatitude", value);
                  }}
                  inputMode="decimal"
                  status={fieldErrors.hospLatitude ? "error" : ""}
                />

                {fieldErrors.hospLatitude && (
                  <div className="text-danger small mt-1">
                    {fieldErrors.hospLatitude}
                  </div>
                )}
              </div>
            </div>

            <div className="col-xl-4 col-lg-4 col-md-6 col-sm-6 col-12 mb-2">
              <div className="form-group">
                <label htmlFor="hospLongitude" className="form-label mb-1">
                  Longitude
                </label>
                <Input
                  id="hospLongitude"
                  name="hospLongitude"
                  // maxLength={2}
                  placeholder="Enter longitude"
                  value={formValues.hospLongitude}
                  onChange={(e) => {
                    let value = e.target.value;

                    value = value.replace(/[^0-9.-]/g, "");

                     const regex = /^-?\d{0,2}(\.\d{0,6})?$/;

                    if (!regex.test(value)) return;

                    handleInputChange("hospLongitude", value);
                  }}
                  inputMode="decimal"
                  status={fieldErrors.hospLongitude ? "error" : ""}
                />

                {fieldErrors.hospLongitude && (
                  <div className="text-danger small mt-1">
                    {fieldErrors.hospLongitude}
                  </div>
                )}
              </div>
            </div>

            <div className="col-xl-4 col-lg-4 col-md-6 col-sm-6 col-12 mb-2">
              <div className="form-group">
                <label htmlFor="hospWebsite" className="form-label mb-1">
                  Website
                </label>
                <Input
                  id="hospWebsite"
                  name="hospWebsite"
                  placeholder="Enter website URL"
                  value={formValues.hospWebsite}
                  onChange={(e) =>
                    handleInputChange("hospWebsite", e.target.value)
                  }
                  status={fieldErrors.hospWebsite ? "error" : ""}
                />
                {fieldErrors.hospWebsite && (
                  <div className="text-danger small mt-1">
                    {fieldErrors.hospWebsite}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      ),
      style: panelStyle,
    },
    {
      key: "4",
      label: (
        <>
          Donor Type <span className="text-danger">*</span>
        </>
      ),
      children: (
        <div className="pt-1 mb-3">
          <div className="row">
            <div className="col-12 mb-2">
              {checkboxErrors.donorType && (
                <div className="text-danger">{checkboxErrors.donorType}</div>
              )}
            </div>
            <div className="col-xl-3 col-lg-3 col-md-4 col-sm-4 col-6">
              <Checkbox
                className="mb-3"
                onChange={(e) =>
                  handleCheckboxChange(
                    "donorType",
                    "Voluntary",
                    e.target.checked
                  )
                }
                checked={checkboxStates.donorType.includes("Voluntary")}
              >
                Voluntary
              </Checkbox>
            </div>
            <div className="col-xl-3 col-lg-3 col-md-4 col-sm-4 col-6">
              <Checkbox
                className="mb-3"
                onChange={(e) =>
                  handleCheckboxChange(
                    "donorType",
                    "Replacement",
                    e.target.checked
                  )
                }
                checked={checkboxStates.donorType.includes("Replacement")}
              >
                Replacement
              </Checkbox>
            </div>
            <div className="col-xl-3 col-lg-3 col-md-4 col-sm-4 col-6">
              <Checkbox
                className="mb-3"
                onChange={(e) =>
                  handleCheckboxChange(
                    "donorType",
                    "Directed",
                    e.target.checked
                  )
                }
                checked={checkboxStates.donorType.includes("Directed")}
              >
                Directed
              </Checkbox>
            </div>
            <div className="col-xl-3 col-lg-3 col-md-4 col-sm-4 col-6">
              <Checkbox
                className="mb-3"
                onChange={(e) =>
                  handleCheckboxChange(
                    "donorType",
                    "Autologous",
                    e.target.checked
                  )
                }
                checked={checkboxStates.donorType.includes("Autologous")}
              >
                Autologous
              </Checkbox>
            </div>
            <div className="col-xl-3 col-lg-3 col-md-4 col-sm-4 col-6">
              <Checkbox
                className="mb-3"
                onChange={(e) =>
                  handleCheckboxChange("donorType", "Family", e.target.checked)
                }
                checked={checkboxStates.donorType.includes("Family")}
              >
                Family
              </Checkbox>
            </div>
            <div className="col-xl-3 col-lg-3 col-md-4 col-sm-4 col-6">
              <Checkbox
                className="mb-3"
                onChange={(e) =>
                  handleCheckboxChange(
                    "donorType",
                    "Replacement External",
                    e.target.checked
                  )
                }
                checked={checkboxStates.donorType.includes(
                  "Replacement External"
                )}
              >
                Replacement External
              </Checkbox>
            </div>
          </div>
        </div>
      ),
      style: panelStyle,
    },
    {
      key: "5",
      label: (
        <>
          Donation Type <span className="text-danger">*</span>
        </>
      ),
      children: (
        <div className="pt-1 mb-3">
          <div className="row">
            <div className="col-12 mb-2">
              {checkboxErrors.donationType && (
                <div className="text-danger">{checkboxErrors.donationType}</div>
              )}
            </div>
            <div className="col-xl-3 col-lg-3 col-md-4 col-sm-4 col-6">
              <Checkbox
                className="mb-3"
                onChange={(e) =>
                  handleCheckboxChange(
                    "donationType",
                    "Whole Blood",
                    e.target.checked
                  )
                }
                checked={checkboxStates.donationType.includes("Whole Blood")}
              >
                Whole Blood
              </Checkbox>
            </div>
            <div className="col-xl-3 col-lg-3 col-md-4 col-sm-4 col-6">
              <Checkbox
                className="mb-3"
                onChange={(e) =>
                  handleCheckboxChange(
                    "donationType",
                    "Apheresis",
                    e.target.checked
                  )
                }
                checked={checkboxStates.donationType.includes("Apheresis")}
              >
                Apheresis
              </Checkbox>
            </div>
            <div className="col-xl-3 col-lg-3 col-md-4 col-sm-4 col-6">
              <Checkbox
                className="mb-3"
                onChange={(e) =>
                  handleCheckboxChange(
                    "donationType",
                    "Leucaperesis",
                    e.target.checked
                  )
                }
                checked={checkboxStates.donationType.includes("Leucaperesis")}
              >
                Leucaperesis
              </Checkbox>
            </div>
            <div className="col-xl-3 col-lg-3 col-md-4 col-sm-4 col-6">
              <Checkbox
                className="mb-3"
                onChange={(e) =>
                  handleCheckboxChange(
                    "donationType",
                    "Plasmapheresis",
                    e.target.checked
                  )
                }
                checked={checkboxStates.donationType.includes("Plasmapheresis")}
              >
                Plasmapheresis
              </Checkbox>
            </div>
            <div className="col-xl-3 col-lg-3 col-md-4 col-sm-4 col-6">
              <Checkbox
                className="mb-3"
                onChange={(e) =>
                  handleCheckboxChange(
                    "donationType",
                    "Plateletpheresis",
                    e.target.checked
                  )
                }
                checked={checkboxStates.donationType.includes(
                  "Plateletpheresis"
                )}
              >
                Plateletpheresis
              </Checkbox>
            </div>
          </div>
        </div>
      ),
      style: panelStyle,
    },
    {
      key: "6",
      label: (
        <>
          Component Type <span className="text-danger">*</span>
        </>
      ),
      children: (
        <div className="pt-1 mb-3">
          <div className="row">
            <div className="col-12 mb-2">
              {checkboxErrors.componentType && (
                <div className="text-danger">
                  {checkboxErrors.componentType}
                </div>
              )}
            </div>
            <div className="col-xl-3 col-lg-3 col-md-4 col-sm-4 col-6">
              <Checkbox
                className="mb-3"
                onChange={(e) =>
                  handleCheckboxChange(
                    "componentType",
                    "Whole Blood",
                    e.target.checked
                  )
                }
                checked={checkboxStates.componentType.includes("Whole Blood")}
              >
                Whole Blood
              </Checkbox>
            </div>
            <div className="col-xl-3 col-lg-3 col-md-4 col-sm-4 col-6">
              <Checkbox
                className="mb-3"
                onChange={(e) =>
                  handleCheckboxChange(
                    "componentType",
                    "Packed Red Blood Cells",
                    e.target.checked
                  )
                }
                checked={checkboxStates.componentType.includes(
                  "Packed Red Blood Cells"
                )}
              >
                Packed Red Blood Cells
              </Checkbox>
            </div>
            <div className="col-xl-3 col-lg-3 col-md-4 col-sm-4 col-6">
              <Checkbox
                className="mb-3"
                onChange={(e) =>
                  handleCheckboxChange(
                    "componentType",
                    "Fresh Frozen Plasma",
                    e.target.checked
                  )
                }
                checked={checkboxStates.componentType.includes(
                  "Fresh Frozen Plasma"
                )}
              >
                Fresh Frozen Plasma
              </Checkbox>
            </div>
            <div className="col-xl-3 col-lg-3 col-md-4 col-sm-4 col-6">
              <Checkbox
                className="mb-3"
                onChange={(e) =>
                  handleCheckboxChange(
                    "componentType",
                    "Platelet Concentrate",
                    e.target.checked
                  )
                }
                checked={checkboxStates.componentType.includes(
                  "Platelet Concentrate"
                )}
              >
                Platelet Concentrate
              </Checkbox>
            </div>
            <div className="col-xl-3 col-lg-3 col-md-4 col-sm-4 col-6">
              <Checkbox
                className="mb-3"
                onChange={(e) =>
                  handleCheckboxChange(
                    "componentType",
                    "Cryoprecipitate",
                    e.target.checked
                  )
                }
                checked={checkboxStates.componentType.includes(
                  "Cryoprecipitate"
                )}
              >
                Cryoprecipitate
              </Checkbox>
            </div>
            <div className="col-xl-3 col-lg-3 col-md-4 col-sm-4 col-6">
              <Checkbox
                className="mb-3"
                onChange={(e) =>
                  handleCheckboxChange(
                    "componentType",
                    "Single Donor Plasma",
                    e.target.checked
                  )
                }
                checked={checkboxStates.componentType.includes(
                  "Single Donor Plasma"
                )}
              >
                Single Donor Plasma
              </Checkbox>
            </div>
            <div className="col-xl-3 col-lg-3 col-md-4 col-sm-4 col-6">
              <Checkbox
                className="mb-3"
                onChange={(e) =>
                  handleCheckboxChange(
                    "componentType",
                    "Cryo Poor Plasma",
                    e.target.checked
                  )
                }
                checked={checkboxStates.componentType.includes(
                  "Cryo Poor Plasma"
                )}
              >
                Cryo Poor Plasma
              </Checkbox>
            </div>
          </div>
        </div>
      ),
      style: panelStyle,
    },
    {
      key: "7",
      label: (
        <>
          Bag Type <span className="text-danger">*</span>
        </>
      ),
      children: (
        <div className="pt-1 mb-3">
          <div className="row">
            <div className="col-12 mb-2">
              {checkboxErrors.bagType && (
                <div className="text-danger">{checkboxErrors.bagType}</div>
              )}
            </div>
            <div className="col-xl-3 col-lg-3 col-md-4 col-sm-4 col-6">
              <Checkbox
                className="mb-3"
                onChange={(e) =>
                  handleCheckboxChange("bagType", "Single", e.target.checked)
                }
                checked={checkboxStates.bagType.includes("Single")}
              >
                Single (350/450ml)
              </Checkbox>
            </div>
            <div className="col-xl-3 col-lg-3 col-md-4 col-sm-4 col-6">
              <Checkbox
                className="mb-3"
                onChange={(e) =>
                  handleCheckboxChange("bagType", "Double", e.target.checked)
                }
                checked={checkboxStates.bagType.includes("Double")}
              >
                Double (350/450ml)
              </Checkbox>
            </div>
            <div className="col-xl-3 col-lg-3 col-md-4 col-sm-4 col-6">
              <Checkbox
                className="mb-3"
                onChange={(e) =>
                  handleCheckboxChange("bagType", "Triple", e.target.checked)
                }
                checked={checkboxStates.bagType.includes("Triple")}
              >
                Triple (350/450ml)
              </Checkbox>
            </div>
            <div className="col-xl-3 col-lg-3 col-md-4 col-sm-4 col-6">
              <Checkbox
                className="mb-3"
                onChange={(e) =>
                  handleCheckboxChange("bagType", "Quadruple", e.target.checked)
                }
                checked={checkboxStates.bagType.includes("Quadruple")}
              >
                Quadruple (450 ml) with inline filter
              </Checkbox>
            </div>
            <div className="col-xl-3 col-lg-3 col-md-4 col-sm-4 col-6">
              <Checkbox
                className="mb-3"
                onChange={(e) =>
                  handleCheckboxChange(
                    "bagType",
                    "Quadruple without inline filter",
                    e.target.checked
                  )
                }
                checked={checkboxStates.bagType.includes(
                  "Quadruple without inline filter"
                )}
              >
                Quadruple (450 ml) without inline filter
              </Checkbox>
            </div>
            <div className="col-xl-3 col-lg-3 col-md-4 col-sm-4 col-6">
              <Checkbox
                className="mb-3"
                onChange={(e) =>
                  handleCheckboxChange("bagType", "Penta Bag", e.target.checked)
                }
                checked={checkboxStates.bagType.includes("Penta Bag")}
              >
                Penta Bag (450 ml)
              </Checkbox>
            </div>
            <div className="col-xl-3 col-lg-3 col-md-4 col-sm-4 col-6">
              <Checkbox
                className="mb-3"
                onChange={(e) =>
                  handleCheckboxChange(
                    "bagType",
                    "Transfer Bags",
                    e.target.checked
                  )
                }
                checked={checkboxStates.bagType.includes("Transfer Bags")}
              >
                Transfer Bags
              </Checkbox>
            </div>
            <div className="col-xl-3 col-lg-3 col-md-4 col-sm-4 col-6">
              <Checkbox
                className="mb-3"
                onChange={(e) =>
                  handleCheckboxChange(
                    "bagType",
                    "Apheresis Kits",
                    e.target.checked
                  )
                }
                checked={checkboxStates.bagType.includes("Apheresis Kits")}
              >
                Apheresis Kits
              </Checkbox>
            </div>
          </div>
        </div>
      ),
      style: panelStyle,
    },
    {
      key: "8",
      label: (
        <>
          TTI Type <span className="text-danger">*</span>
        </>
      ),
      children: (
        <div className="pt-1 mb-3">
          <div className="row">
            <div className="col-12 mb-2">
              {checkboxErrors.ttiType && (
                <div className="text-danger">{checkboxErrors.ttiType}</div>
              )}
            </div>
            <div className="col-xl-3 col-lg-3 col-md-4 col-sm-4 col-6">
              <Checkbox
                className="mb-3"
                onChange={(e) =>
                  handleCheckboxChange("ttiType", "HIV", e.target.checked)
                }
                checked={checkboxStates.ttiType.includes("HIV")}
              >
                HIV 1&2
              </Checkbox>
            </div>
            <div className="col-xl-3 col-lg-3 col-md-4 col-sm-4 col-6">
              <Checkbox
                className="mb-3"
                onChange={(e) =>
                  handleCheckboxChange(
                    "ttiType",
                    "Hepatitis-B",
                    e.target.checked
                  )
                }
                checked={checkboxStates.ttiType.includes("Hepatitis-B")}
              >
                Hepatitis-B
              </Checkbox>
            </div>
            <div className="col-xl-3 col-lg-3 col-md-4 col-sm-4 col-6">
              <Checkbox
                className="mb-3"
                onChange={(e) =>
                  handleCheckboxChange(
                    "ttiType",
                    "Hepatitis-C",
                    e.target.checked
                  )
                }
                checked={checkboxStates.ttiType.includes("Hepatitis-C")}
              >
                Hepatitis-C
              </Checkbox>
            </div>
            <div className="col-xl-3 col-lg-3 col-md-4 col-sm-4 col-6">
              <Checkbox
                className="mb-3"
                onChange={(e) =>
                  handleCheckboxChange("ttiType", "Syphilis", e.target.checked)
                }
                checked={checkboxStates.ttiType.includes("Syphilis")}
              >
                Syphilis
              </Checkbox>
            </div>
            <div className="col-xl-3 col-lg-3 col-md-4 col-sm-4 col-6">
              <Checkbox
                className="mb-3"
                onChange={(e) =>
                  handleCheckboxChange("ttiType", "Malaria", e.target.checked)
                }
                checked={checkboxStates.ttiType.includes("Malaria")}
              >
                Malaria
              </Checkbox>
            </div>
          </div>
        </div>
      ),
      style: panelStyle,
    },
  ];

  return (
    <>
      <div className="pageWrapper page-wrapper">
        <div className="container">
          <div className="d-xl-flex d-lg-flex d-md-flex d-sm-flex align-items-center justify-content-between py-3">
            <div className="d-flex align-items-center">
              <div className="inside_header">
                <h4 className="header-page mb-1">Add Your Blood Center</h4>
                <div className="d-flex">
                  <a className="home_link me-2" href="/eraktkoshPortal/#/">
                    Home
                  </a>
                  <span className="home_link">&gt;</span>
                  <a href="javascript:void(0)" className="home_link ms-2">
                    Add Your Blood Center
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className={`fade-in${isLoaded ? " loaded" : ""}`}>
        <div className="donorAdmin py-3">
          <div className="container">
            <div className="tabContent mb-3">
              <div>
                <Collapse
                  bordered={false}
                  activeKey={activePanels}
                  onChange={(keys) => setActivePanels(keys)}
                  style={{ background: token.colorBgContainer }}
                  expandIcon={({ isActive }) => (
                    <CaretRightOutlined rotate={isActive ? 90 : 0} />
                  )}
                  items={getItems(panelStyle)}
                />
              </div>

              <div className="mt-4 d-flex gap-4 justify-content-end">
                <Button type="primary" onClick={handleSubmit} loading={loading}>
                  Save
                </Button>
                <Button
                  type="primary"
                  onClick={handleCancel}
                  disabled={loading}
                >
                  Cancel
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
