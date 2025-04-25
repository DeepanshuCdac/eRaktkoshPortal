import React, { useEffect, useState } from "react";
import '../scss/bloodSearch.scss'
import { Input, DatePicker, Select, Table, message, Tooltip } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { getApiData } from '../redux/slices/dataSlice';
import axios from "axios";
import dayjs from "dayjs";
import { BaseUrl } from "../utils/url";
import { useLocation } from "react-router-dom";
import { SearchOutlined } from "@ant-design/icons";

const { Option } = Select;

const CampSchedule = ({ useContainer }) => {
    useEffect(() => {
        document.title = 'e-RaktKosh Camp Registration';
    }, []);

    const dispatch = useDispatch();
    const { statesWithDistricts } = useSelector((state) => state.data);
    const [selectedState, setSelectedState] = useState(null);
    const [selectedDistrict, setSelectedDistrict] = useState(null);
    const [selectedStartDate, setSelectedStartDate] = useState(dayjs().format("YYYY-MM-DD"));
    const [selectedEndDate, setSelectedEndDate] = useState(dayjs().format("YYYY-MM-DD"));
    const [dateDifference, setDateDifference] = useState(0);
    const [campData, setCampData] = useState([]);
    const [filteredData, setFilteredData] = useState([]);
    const [loading, setLoading] = useState(false);
    const [searchText, setSearchText] = useState("");
    const [selectedStateforUser, setSelectedStateforUser] = useState(null);
    const [selectedDistrictforUser, setSelectedDistrictforUser] = useState(null);
    const [email, setEmail] = useState("")
    const [isValid, setIsValid] = useState(true);
    const [mobileNo, setMobileNo] = useState("")
    const [pagination, setPagination] = useState({
        current: 1,
        pageSize: 5,
    });

    useEffect(() => {
        dispatch(getApiData());
    }, [dispatch]);

    const location = useLocation();

    const handleTableChange = (newPagination) => {
        setPagination(newPagination);
    };

    const getPageName = () => {
        const path = location.pathname.split("/").filter(Boolean).pop();
        return path ? path.charAt(0).toUpperCase() + path.slice(1) : "Select a service";
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

        if (!selectedStateforUser) {
            setSelectedStateforUser(value);
            setSelectedDistrictforUser(null);
        }
    };

    const handleDistrictChange = (value) => {
        setSelectedDistrict(value);

        if (!selectedDistrictforUser) {
            setSelectedDistrictforUser(value);
        }
    };

    const handleStateChangeforUser = (value) => {
        setSelectedStateforUser(value);
        setSelectedDistrictforUser(null);
    };

    const handleDistrictChangeforUser = (value) => {
        setSelectedDistrictforUser(value);
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
            const response = await axios.get(`${BaseUrl}/eraktkosh/camps/details`, {
                params: {
                    stateCode: selectedState,
                    districtCode: selectedDistrict || -1,
                    startDate: selectedStartDate || dayjs().format("YYYY-MM-DD"),
                    endDate: selectedEndDate || dayjs().format("YYYY-MM-DD")
                }
            });
            console.log("Camp Schedule API Response:", response.data);
            setCampData(response.data);
            setFilteredData(response.data)
        } catch (error) {
            message.error("Failed to fetch camp data. Please try again!");
            console.error("Error fetching camp details:", error);
        } finally {
            setLoading(false);
        }
    };

    const states = statesWithDistricts || [];
    const districts = selectedState
        ? states.find(state => state.stateCode === selectedState)?.districts || []
        : [];

    const districts2 = selectedStateforUser
        ? states.find(state => state.stateCode === selectedStateforUser)?.districts || []
        : [];

    const handleSearch = (value) => {
        setSearchText(value);
        if (value) {
            const filtered = campData.filter((item) =>
                Object.values(item).some((field) =>
                    field && field.toString().toLowerCase().includes(value.toLowerCase())
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

        const payload = {
            stateCode: selectedStateforUser,
            districtCode: selectedDistrictforUser,
            email,
            mobileNo,
        }
        try {
            const response = await axios.post(`${BaseUrl}/eraktkosh/subscribe/register`, payload);

            if (response.data) {
                message.success(response.data);
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
            title: 'S.No.', dataIndex: 'sNo', key: 'sNo', render: (text, record, index) =>
                (pagination.current - 1) * pagination.pageSize + index + 1
        },
        { title: 'Date', dataIndex: 'campDate', key: 'campDate' },
        {
            title: 'Camp Detail',
            key: 'campDetail',
            render: (text, record) => (
                <div style={{ maxWidth: "300px" }}>
                    <Tooltip title={record.campName}>
                        <p className="camp-name mb-0">{record.campName}</p>
                    </Tooltip>
                    <span className="camp-venue mb-0">{record.campVenue}</span>
                </div>
            )
        },
        {
            title: 'State/District',
            key: 'stateDistrict',
            render: (text, record) => (
                <div>
                    <p className="mb-0">{record.stateName},</p>
                    <span>{record.districtName}</span>
                </div>
            )
        },
        { title: 'Contact', dataIndex: 'contact', key: 'contact' },
        { title: 'Conducted By', dataIndex: 'hospName', key: 'hospName' },
        { title: 'Organised By', dataIndex: 'conductedBy', key: 'conductedBy' },
        { title: 'Time', dataIndex: 'campTime', key: 'campTime' },
        {
            title: 'Action', key: 'register', render: (text, record) => (
                <div className="d-flex flex-column">
                    <a href="/beta#/pages/portaldonorRegister" className="action">Register as Voluntary Donor</a>
                </div>
            )
        }
    ];

    return (
        <>
            <div className="page_wrapper gradient_style">
                <div className={useContainer ? "container" : ""}>
                    <h2 className="header-page mb-2 pt-3">Camp Schedule</h2>
                    <div className="d-flex justify-content-between flex-wrap gap-3 container-style">
                        <div className="input-wrapper-service">
                            <label className="form-label mb-0">Select Services</label>
                            <Select style={{ width: "100%" }} onChange={handleServiceChange} placeholder={getPageName()}>
                                <Option value="service1">Blood Stock Availability</Option>
                                <Option value="service2">Camp Schedule</Option>
                                <Option value="service3">Blood Bank Directory</Option>
                            </Select>
                        </div>
                        <div className="input-wrapper-service">
                            <label className="form-label mb-0">Select State</label>
                            <Select
                                style={{ width: "100%" }}
                                value={selectedState}
                                onChange={handleStateChange}
                                placeholder="Select State">
                                {states.map((state) => (
                                    <Select.Option key={state.stateCode} value={state.stateCode}>
                                        {state.stateName}
                                    </Select.Option>
                                ))}
                            </Select>
                        </div>
                        <div className="input-wrapper-service">
                            <label className="form-label mb-0">Select Your District</label>
                            <Select
                                style={{ width: "100%" }}
                                value={selectedDistrict}
                                onChange={handleDistrictChange}
                                placeholder="Select District">
                                {districts.map((district) => (
                                    <Select.Option key={district.districtCode} value={district.districtCode}>
                                        {district.districtName}
                                    </Select.Option>
                                ))}
                            </Select>
                        </div>
                        <div className="input-wrapper-date">
                            <label className="form-label mb-0">Start Date</label>
                            <DatePicker className="custom-date-picker" onChange={handleStartDateChange} defaultValue={dayjs()} allowClear={false} suffixIcon={null} />
                        </div>
                        <div className="input-wrapper-date">
                            <label className="form-label mb-0">To Date</label>
                            <DatePicker className="custom-date-picker" onChange={handleEndDateChange} defaultValue={dayjs()} allowClear={false} suffixIcon={null} />
                        </div>
                        <div className="input-wrapper button-wrapper">
                            <button onClick={fetchCampSchedule} className="btn btn-primary-signIn px-5">
                                {loading ? "Searching..." : "Search"}
                            </button>
                        </div>
                    </div>
                    <div className="user-tile px-4 py-1 mt-3 d-xl-flex align-items-center w-100">
                        <div className="d-flex align-items-center me-auto mb-xl-0 mb-2" style={{ flex: 1 }}>
                            <img src="assets/images/donorImg.png" style={{ width: '53px', height: '53px' }} />
                            <div className="ms-3 d-flex flex-column">
                                <p className="mb-0 user-notify">Get Notified About Nearby Camps!</p>
                                <p className="mb-0 user-alert">Get alerts for nearby blood donation camps.</p>
                            </div>
                        </div>
                        <div className="d-xl-flex d-lg-flex" style={{ flex: 2, gap: '10px' }}>
                            <div className="d-flex mb-xl-0 mb-lg-0 mb-2" style={{ flex: 2, gap: '10px' }}>
                                <div className="input-wrapper-state">
                                    <Select
                                        style={{ width: "100%" }}
                                        value={selectedStateforUser}
                                        onChange={handleStateChangeforUser}
                                        placeholder="Select State">
                                        {states.map((state) => (
                                            <Select.Option key={state.stateCode} value={state.stateCode}>
                                                {state.stateName}
                                            </Select.Option>
                                        ))}
                                    </Select>
                                </div>
                                <div className="input-wrapper-state">
                                    <Select
                                        style={{ width: "100%" }}
                                        value={selectedDistrictforUser}
                                        onChange={handleDistrictChangeforUser}
                                        placeholder="Select District">
                                        {districts2.map((district) => (
                                            <Select.Option key={district.districtCode} value={district.districtCode}>
                                                {district.districtName}
                                            </Select.Option>
                                        ))}
                                    </Select>
                                </div>
                            </div>
                            <div className="d-flex" style={{ flex: 2, gap: '10px' }}>
                                <Input placeholder="Enter Email Address" value={email} onChange={(e) => setEmail(e.target.value)}
                                    style={{ borderColor: !isValid ? "red" : "" }} />
                                {!isValid && message.error("Please enter valid Email.")}

                                <Input placeholder="Enter Mobile Number" value={mobileNo}
                                    onChange={(e) => {
                                        const value = e.target.value;
                                        if (/^\d*$/.test(value) && value.length <= 10) {
                                            setMobileNo(value);
                                        }
                                    }}
                                    onBlur={() => {
                                        if (!/^[6-9]\d{9}$/.test(mobileNo) || /^(.)\1{9}$/.test(mobileNo)) {
                                            message.error("Enter a valid mobile number (10 digits, not starting with 0-5, and not all same).");
                                            setMobileNo("");
                                        }
                                    }}
                                />

                                <div className="input-wrapper button-wrapper">
                                    <button className="btn btn-primary-outline px-3" onClick={handleSubscribe}>
                                        Subscribe
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="d-xl-flex d-lg-flex d-md-flex d-sm-flex align-items-center justify-content-between mt-3 mb-3">
                        <div className="d-flex align-items-center">
                            <p className="mb-0 searchResult me-2">Search Result</p>
                            <p className="mb-0 resultData px-2">Showing Last {dateDifference} Day Data</p>
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
