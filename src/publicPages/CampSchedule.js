import React, { useEffect, useState } from "react";
import "../scss/bloodSearch.scss";
import { Link } from "react-router-dom";
import { Input, DatePicker, Select, Table, message, Tooltip } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { getApiData } from "../redux/slices/dataSlice";
import axios from "axios";
import dayjs from "dayjs";
import { BaseUrl } from "../utils/url";
import { useLocation } from "react-router-dom";
import { SearchOutlined } from "@ant-design/icons";
import { logSearch } from "../components/logService";
import { useCampContext } from "../context/CampContext";
import { useHistory } from "react-router-dom";

const { Option } = Select;

const CampSchedule = () => {
  useEffect(() => {
    document.title = "e-RaktKosh Camp Registration";
  }, []);

  const dispatch = useDispatch();
  const { updateSelectedCamp } = useCampContext();
  const history = useHistory();
  const { statesWithDistricts } = useSelector((state) => state.data);
  const [selectedState, setSelectedState] = useState(null);
  const [selectedDistrict, setSelectedDistrict] = useState(null);
  const [selectedStartDate, setSelectedStartDate] = useState(
    dayjs().format("YYYY-MM-DD")
  );
  const [selectedEndDate, setSelectedEndDate] = useState(
    dayjs().format("YYYY-MM-DD")
  );
  const [dateDifference, setDateDifference] = useState(0);
  const [campData, setCampData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searchText, setSearchText] = useState("");
  const [selectedStateforUser, setSelectedStateforUser] = useState(null);
  const [selectedDistrictforUser, setSelectedDistrictforUser] = useState(null);
  const [email, setEmail] = useState("");
  const [isValid, setIsValid] = useState(true);
  const [mobileNo, setMobileNo] = useState("");
  const [pagination, setPagination] = useState({
    current: 1,
    pageSize: 5,
  });
  const [userDropdownsModified, setUserDropdownsModified] = useState(false);

  useEffect(() => {
    dispatch(getApiData());
  }, [dispatch]);

  const location = useLocation();

  const handleTableChange = (newPagination) => {
    setPagination(newPagination);
  };

  const getPageName = () => {
    const hashPath = window.location.hash.split("/").pop();
    const nameMap = {
      bloodAvailabilitySearch: "Blood Stock Availability",
      campSchedule: "Camp Schedule",
      bloodBankDirectory: "Blood Bank Directory",
    };
    return nameMap[hashPath] || "Select a service";
  };

  const handleServiceChange = (value) => {
    const urlMap = {
      service1: "/beta#/publicPages/bloodAvailabilitySearch",
      service2: "/beta#/publicPages/campSchedule",
      service3: "/beta#/publicPages/bloodBankDirectory",
    };

    if (urlMap[value]) {
      window.location.href = urlMap[value];
    }
  };

  const handleStateChange = (value) => {
    setSelectedState(value);
    setSelectedDistrict(null);

    // Only auto-populate user dropdowns if they haven't been manually modified
    if (!userDropdownsModified) {
      setSelectedStateforUser(value);
      setSelectedDistrictforUser(null);
    }
  };

  const handleDistrictChange = (value) => {
    setSelectedDistrict(value);

    if (!userDropdownsModified && selectedStateforUser === selectedState) {
      setSelectedDistrictforUser(value);
    }
  };

  const handleStateChangeforUser = (value) => {
    setSelectedStateforUser(value);
    setSelectedDistrictforUser(null);
    setUserDropdownsModified(true);
  };

  const handleDistrictChangeforUser = (value) => {
    setSelectedDistrictforUser(value);
    setUserDropdownsModified(true);
  };

  const disabledStartDate = (current) => {
    return current && current < dayjs().startOf("day");
  };

  const disabledEndDate = (current) => {
    const today = dayjs().startOf("day");
    const maxDate = today.add(1, "month");
    return current && (current < today || current > maxDate);
  };

  const handleStartDateChange = (date) => {
    const formattedDate = date ? dayjs(date).format("YYYY-MM-DD") : "";
    setSelectedStartDate(formattedDate);
    calculateDateDifference(formattedDate, selectedEndDate);
  };

  const handleEndDateChange = (date) => {
    const formattedDate = date ? dayjs(date).format("YYYY-MM-DD") : "";
    setSelectedEndDate(formattedDate);
    calculateDateDifference(selectedStartDate, formattedDate);
  };

  const calculateDateDifference = (start, end) => {
    if (start && end) {
      const diff = dayjs(end).diff(dayjs(start), "day");
      setDateDifference(diff);
    } else {
      setDateDifference(0);
    }
  };

  const fetchCampSchedule = async () => {
    if (!selectedState) {
      message.error("Please select state!");
      return;
    }

    setLoading(true);
    try {
      const searchLogData = {
        serviceType: "Camp Schedule",
        searchParams: {
          state: selectedState,
          district: selectedDistrict || null,
          startDate: selectedStartDate,
          endDate: selectedEndDate,
        },
        ipAddress: null,
      };
      logSearch(searchLogData).catch((e) =>
        console.error("Search logging failed:", e)
      );

      const response = await axios.get(`${BaseUrl}/eraktkosh/camps/details`, {
        params: {
          stateCode: selectedState,
          districtCode: selectedDistrict || -1,
          startDate: selectedStartDate || dayjs().format("YYYY-MM-DD"),
          endDate: selectedEndDate || dayjs().format("YYYY-MM-DD"),
        },
      });
      console.log("Camp Schedule API Response:", response.data);
      setCampData(response.data);
      setFilteredData(response.data);
    } catch (error) {
      message.error("Failed to fetch camp data. Please try again!");
      console.error("Error fetching camp details:", error);
    } finally {
      setLoading(false);
    }
  };

  const states = statesWithDistricts || [];
  const districts = selectedState
    ? states.find((state) => state.stateCode === selectedState)?.districts || []
    : [];

  const districts2 = selectedStateforUser
    ? states.find((state) => state.stateCode === selectedStateforUser)
        ?.districts || []
    : [];

  const handleSearch = (value) => {
    setSearchText(value);
    if (value) {
      const filtered = campData.filter((item) =>
        Object.values(item).some(
          (field) =>
            field &&
            field.toString().toLowerCase().includes(value.toLowerCase())
        )
      );
      setFilteredData(filtered);
    } else {
      setFilteredData(campData);
    }
  };

  const validateEmail = (email) => {
    const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return emailPattern.test(email);
  };

  const handleSubscribe = async () => {
    if (!selectedStateforUser || !selectedDistrictforUser || !email) {
      message.error("State, District, and Email are required.");
      return;
    }
    if (!validateEmail(email)) {
      message.error("Please enter a valid email address.");
      return;
    }

    if (mobileNo && mobileNo.length > 0 && !/^[6-9]\d{9}$/.test(mobileNo)) {
      message.error(
        "Please enter a valid 10-digit mobile number starting with 6-9."
      );
      return;
    }

    const payload = {
      stateCode: selectedStateforUser,
      districtCode: selectedDistrictforUser,
      email,
      mobileNo,
    };
    try {
      const response = await axios.post(
        `${BaseUrl}/eraktkosh/subscribe/register`,
        payload
      );

      if (response.data) {
        message.success(response.data);
        setEmail("");
        setMobileNo("");
      } else {
        message.success("Subscription successful!");
      }
    } catch (error) {
      console.error("API Error:", error);

      if (error.response && error.response.data && error.response.data) {
        message.error(error.response.data);
      } else {
        message.error("Error occurred while subscribing.");
      }
    }
  };

  const columns = [
    {
      title: "S.No.",
      dataIndex: "sNo",
      key: "sNo",
      render: (text, record, index) =>
        (pagination.current - 1) * pagination.pageSize + index + 1,
    },
    { title: "Date", dataIndex: "campDate", key: "campDate" },
    {
      title: "Camp Detail",
      key: "campDetail",
      render: (text, record) => (
        <div style={{ maxWidth: "300px" }}>
          <Tooltip title={record.campName}>
            <p className="camp-name mb-0">{record.campName}</p>
          </Tooltip>
          <span className="camp-venue mb-0">{record.campVenue}</span>
        </div>
      ),
    },
    {
      title: "State/District",
      key: "stateDistrict",
      render: (text, record) => (
        <div>
          <p className="mb-0">{record.stateName},</p>
          <span>{record.districtName}</span>
        </div>
      ),
    },
    { title: "Contact", dataIndex: "contact", key: "contact" },
    { title: "Conducted By", dataIndex: "hospName", key: "hospName" },
    { title: "Organised By", dataIndex: "conductedBy", key: "conductedBy" },
    { title: "Time", dataIndex: "campTime", key: "campTime" },
    {
      title: "Action",
      key: "register",
      render: (text, record) => (
        <div className="d-flex flex-column">
          <button
            className="action"
            onClick={() => {
              updateSelectedCamp(record); // Save camp data to context
              history.push("/publicPages/donorCampRegister"); // Changed from navigate
            }}
          >
            Register as Voluntary Donor
          </button>
        </div>
      ),
    },
  ];

  return (
    <>
      <div className="page_wrapper gradient_style">
        <div className="container">
          <h2 className="header-page mb-2 pt-3">Camp Schedule</h2>
          <div className="d-flex justify-content-between flex-wrap gap-3 container-style">
            <div className="input-wrapper-service">
              <label className="form-label mb-0">Select Services</label>
              <Select
                showSearch
                style={{ width: "100%" }}
                placeholder={getPageName()}
                onChange={handleServiceChange}
                filterOption={(input, option) => {
                  const label = option?.label ?? "";
                  return label.toLowerCase().includes(input.toLowerCase());
                }}
                options={[
                  { value: "service1", label: "Blood Stock Availability" },
                  { value: "service2", label: "Camp Schedule" },
                  { value: "service3", label: "Blood Bank Directory" },
                ]}
              />
            </div>
            <div className="input-wrapper-service">
              <label className="form-label mb-0">Select State</label>
              <Select
                showSearch
                style={{ width: "100%" }}
                value={selectedState}
                onChange={handleStateChange}
                placeholder="Select State"
                filterOption={(input, option) => {
                  const label = option?.label ?? "";
                  return label.toLowerCase().includes(input.toLowerCase());
                }}
                options={states.map((state) => ({
                  value: state.stateCode,
                  label: state.stateName,
                }))}
              />
            </div>
            <div className="input-wrapper-service">
              <label className="form-label mb-0">Select District</label>
              <Select
                showSearch
                style={{ width: "100%" }}
                value={selectedDistrict}
                onChange={handleDistrictChange}
                placeholder="Select District"
                filterOption={(input, option) => {
                  const label = option?.label ?? "";
                  return label.toLowerCase().includes(input.toLowerCase());
                }}
                options={districts.map((district) => ({
                  value: district.districtCode,
                  label: district.districtName,
                }))}
              />
            </div>
            <div className="input-wrapper-date">
              <label className="form-label mb-0">Start Date</label>
              <DatePicker
                className="custom-date-picker"
                onChange={handleStartDateChange}
                defaultValue={dayjs()}
                allowClear={false}
                suffixIcon={null}
                disabledDate={disabledStartDate}
              />
            </div>
            <div className="input-wrapper-date">
              <label className="form-label mb-0">To Date</label>
              <DatePicker
                className="custom-date-picker"
                onChange={handleEndDateChange}
                defaultValue={dayjs()}
                allowClear={false}
                suffixIcon={null}
                disabledDate={disabledEndDate}
              />
            </div>
            <div className="input-wrapper button-wrapper">
              <button
                onClick={fetchCampSchedule}
                className="btn btn-primary-signIn px-5"
              >
                {loading ? "Searching..." : "Search"}
              </button>
            </div>
          </div>
          <div className="user-tile px-4 py-1 mt-3 d-xl-flex align-items-center w-100">
            <div
              className="d-flex align-items-center me-auto mb-xl-0 mb-2"
              style={{ flex: 1 }}
            >
              <img
                src="assets/images/donorImg.png"
                style={{ width: "53px", height: "53px" }}
              />
              <div className="ms-3 d-flex flex-column">
                <p className="mb-0 user-notify">
                  Get Notified About Nearby Camps!
                </p>
                <p className="mb-0 user-alert">
                  Get alerts for nearby blood donation camps.
                </p>
              </div>
            </div>
            <div
              className="d-xl-flex d-lg-flex"
              style={{ flex: 2, gap: "10px" }}
            >
              <div
                className="d-flex mb-xl-0 mb-lg-0 mb-2"
                style={{ flex: 2, gap: "10px" }}
              >
                <div className="input-wrapper-state">
                  <Select
                    showSearch
                    style={{ width: "100%" }}
                    value={selectedStateforUser}
                    onChange={handleStateChangeforUser}
                    placeholder="Select State"
                    filterOption={(input, option) => {
                      const label = option?.label ?? "";
                      return label.toLowerCase().includes(input.toLowerCase());
                    }}
                    options={states.map((state) => ({
                      value: state.stateCode,
                      label: state.stateName,
                    }))}
                  />
                </div>
                <div className="input-wrapper-state">
                  <Select
                    showSearch
                    style={{ width: "100%" }}
                    value={selectedDistrictforUser}
                    onChange={handleDistrictChangeforUser}
                    placeholder="Select District"
                    filterOption={(input, option) => {
                      const label = option?.label ?? "";
                      return label.toLowerCase().includes(input.toLowerCase());
                    }}
                    options={districts2.map((district) => ({
                      value: district.districtCode,
                      label: district.districtName,
                    }))}
                  />
                </div>
              </div>
              <div className="d-flex" style={{ flex: 2, gap: "10px" }}>
                <Input
                  placeholder="Enter Email Address"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  style={{ borderColor: !isValid ? "red" : "" }}
                />
                {!isValid && message.error("Please enter valid Email.")}

                <Input
                  placeholder="Enter Mobile Number"
                  value={mobileNo}
                  onChange={(e) => {
                    const value = e.target.value;
                    if (/^\d*$/.test(value) && value.length <= 10) {
                      setMobileNo(value);
                    }
                  }}
                  onBlur={() => {
                    if (
                      !/^[6-9]\d{9}$/.test(mobileNo) ||
                      /^(.)\1{9}$/.test(mobileNo)
                    ) {
                      message.error(
                        "Enter a valid mobile number (10 digits, not starting with 0-5, and not all same)."
                      );
                      setMobileNo("");
                    }
                  }}
                />

                <div className="input-wrapper button-wrapper">
                  <button
                    className="btn btn-primary-outline px-3"
                    onClick={handleSubscribe}
                    disabled={loading}
                  >
                    {loading ? "Subscribing..." : "Subscribe"}
                  </button>
                </div>
              </div>
            </div>
          </div>

          <div className="d-xl-flex d-lg-flex d-md-flex d-sm-flex align-items-center justify-content-between mt-3 mb-3">
            <div className="d-flex align-items-center">
              <p className="mb-0 searchResult me-2">Search Result</p>
              <p className="mb-0 resultData px-2">
                Showing Last {dateDifference} Day Data
              </p>
            </div>
            <div className="">
              <Input
                placeholder="Search"
                value={searchText}
                onChange={(e) => handleSearch(e.target.value)}
                prefix={<SearchOutlined style={{ color: "#aaa" }} />}
              />
            </div>
          </div>
          <Table
            columns={columns}
            dataSource={filteredData}
            rowKey="camp_reqno"
            pagination={{
              current: pagination.current,
              pageSize: pagination.pageSize,
              showSizeChanger: true,
              pageSizeOptions: ["5", "10", "20", "50"],
            }}
            onChange={handleTableChange}
            loading={loading}
            className="custom-table mt-3"
            scroll={{ x: 1000 }}
            rowClassName={() => "custom-row"}
          />
        </div>
      </div>
    </>
  );
};

export default CampSchedule;
