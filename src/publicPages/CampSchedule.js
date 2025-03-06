import React, { useEffect, useState } from "react";
import '../scss/bloodSearch.scss'
import { Input, DatePicker, Space, Select, Table, message } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { getApiData } from '../redux/slices/dataSlice';
import axios from "axios";
import dayjs from "dayjs";
import { BaseUrl } from "../utils/url";

const { Search } = Input;

const CampSchedule = ({ useContainer }) => {
    useEffect(() => {
        document.title = 'e-RaktKosh Camp Registration';
    }, []);

    const dispatch = useDispatch();
    const { statesWithDistricts } = useSelector((state) => state.data);

    const [selectedState, setSelectedState] = useState(null);
    const [selectedDistrict, setSelectedDistrict] = useState(null);
    const [selectedDate, setSelectedDate] = useState(null);
    const [campData, setCampData] = useState([]);
    const [filteredData, setFilteredData] = useState([]);
    const [loading, setLoading] = useState(false);
    const [searchText, setSearchText] = useState("");

    useEffect(() => {
        dispatch(getApiData());
    }, [dispatch]);

    const handleStateChange = (value) => {
        setSelectedState(value);
        setSelectedDistrict(null);
    };

    const handleDistrictChange = (value) => {
        setSelectedDistrict(value);
    };

    const handleDateChange = (date, dateString) => {
        setSelectedDate(dateString);
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
                    districtCode: selectedDistrict,
                    campDate: selectedDate
                }
            });
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

    const columns = [
        { title: 'S.No.', dataIndex: 'index', key: 'index', render: (text, record, index) => index + 1 },
        { title: 'Date', dataIndex: 'campDate', key: 'campDate' },
        { title: 'Time', dataIndex: 'campTime', key: 'campTime' },
        { title: 'Camp Name', dataIndex: 'campName', key: 'campName' },
        { title: 'Address', dataIndex: 'campVenue', key: 'campVenue' },
        { title: 'State', dataIndex: 'stateName', key: 'stateName' },
        { title: 'District', dataIndex: 'districtName', key: 'districtName' },
        { title: 'Contact', dataIndex: 'contact', key: 'contact' },
        { title: 'Conducted By', dataIndex: 'conductedBy', key: 'conductedBy' },
        {
            title: 'Register', key: 'register', render: (text, record) => (
                <div className="d-flex flex-column">
                    <a href="/beta#/pages/portaldonorRegister">Register</a>
                </div>
            )
        }
    ];

    return (
        <>
            <div className="page-wrapper">
                <div className={useContainer ? "container" : ""}>
                    <h2 className="header-page mb-3">Camp Schedule</h2>
                    <div className="widget px-3 py-3 mb-3">
                        <div className="row mx-4">
                            <div className="col-xl-3 col-lg-3 col-md-6 col-sm-6 mb-2">
                                <label className="form-label mb-1">Select Your State</label>
                                <Space wrap>
                                    <Select
                                        style={{ width: '100%' }}
                                        value={selectedState}
                                        onChange={handleStateChange}
                                        placeholder="Select State" >
                                        {states.map((state) => (
                                            <Select.Option key={state.stateCode} value={state.stateCode}>
                                                {state.stateName}
                                            </Select.Option>
                                        ))}
                                    </Select>
                                </Space>
                            </div>
                            <div className="col-xl-3 col-lg-3 col-md-6 col-sm-6 mb-2">
                                <label className="form-label mb-1">Select Your District</label>
                                <Space wrap>
                                    <Select
                                        style={{ width: '100%' }}
                                        value={selectedDistrict}
                                        onChange={handleDistrictChange}
                                        placeholder="Select District"
                                        disabled={!selectedState} >
                                        {districts.map((district) => (
                                            <Select.Option key={district.districtCode} value={district.districtCode}>
                                                {district.districtName}
                                            </Select.Option>
                                        ))}
                                    </Select>
                                </Space>
                            </div>
                            <div className="d-flex align-items-end justify-content-center col-xl-6 col-lg-6 col-md-6 col-sm-6 mb-2">
                                <div className="w-100" style={{ height: '64%' }}>
                                    <Space direction="vertical">
                                        <DatePicker
                                            className="h-100 w-100"
                                            onChange={handleDateChange}
                                            defaultValue={dayjs()}
                                            format="YYYY-MM-DD"
                                        />
                                    </Space>
                                </div>
                            </div>
                        </div>
                        <div className="d-flex align-items-center justify-content-center mt-3">
                            <button onClick={fetchCampSchedule} className="btn btn-primary-signIn px-5">
                                {loading ? "Loading..." : "Search"}
                            </button>
                        </div>
                    </div>
                    <div className="d-xl-flex d-lg-flex d-md-flex d-sm-flex align-items-center justify-content-end mt-3 mb-3">
                        <div className="d-flex">
                            <Search
                                placeholder="Search"
                                className="me-2"
                                value={searchText}
                                onChange={(e) => handleSearch(e.target.value)} />
                            <button className="filter_btn d-flex align-items-center">
                                <img className="me-1" src="assets/images/filter.png" />
                                Filters
                            </button>
                        </div>
                    </div>
                    <Table
                        columns={columns}
                        dataSource={filteredData}
                        rowKey="camp_reqno"
                        pagination={{ pageSize: 10 }}
                        loading={loading}
                        className="mt-3 mb-3"
                        scroll={{ x: 1000 }}
                    />
                </div>
            </div>
        </>
    );
};

export default CampSchedule;
