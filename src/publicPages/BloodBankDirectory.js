import React, { useEffect, useState } from "react";
import '../scss/bloodSearch.scss'
import { Input, DatePicker, Space, Select, Table, message } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { getApiData } from '../redux/slices/dataSlice';
import axios from "axios";
import { BaseUrl } from "../utils/url";

const { Search } = Input;

const BloodBankDirectory = () => {

    useEffect(() => {
        document.title = 'e-RaktKosh Blood Bank Directory'
    }, [])

    const dispatch = useDispatch();
    const { statesWithDistricts, status } = useSelector((state) => state.data);
    const [searchText, setSearchText] = useState("");
    const [selectedState, setSelectedState] = useState(null);
    const [selectedDistrict, setSelectedDistrict] = useState(null);
    const [bloodBanks, setBloodBanks] = useState([]);
    const [loading, setLoading] = useState(false);
    const [selectedCategory, setSelectedCategory] = useState(null);
    const [filteredBloodBanks, setFilteredBloodBanks] = useState([]); 


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

    const fetchNearestBloodBanks = async () => {
        if (!selectedState) {
            message.error("Please select state!");
            return;
        }

        setLoading(true);
        try {
            const response = await axios.get(`${BaseUrl}/eraktkosh/bloodbank/nearest`, {
                params: {
                    stateCode: selectedState,
                    districtCode: selectedDistrict || -1,
                },
            });

            const formattedData = response.data.map((item, index) => ({
                key: item.h_code || index,
                sNo: index + 1,
                name: item.name || "-",
                address: item.address || "-",
                phone: item.phone || "-",
                email: item.email || "-",
                category: item.hospitalType || "-",
                distance: item.distance || "-",
                type: "Camps",
            }));

            setBloodBanks(formattedData);
            setFilteredBloodBanks(formattedData);
        } catch (error) {
            console.error("Error fetching blood banks:", error);
            setBloodBanks([]);
        } finally {
            setLoading(false);
        }
    };

    const states = statesWithDistricts || [];
    const districts = selectedState
        ? states.find(state => state.stateCode === selectedState)?.districts || []
        : [];

    const columns = [
        { title: "S.No.", dataIndex: "sNo", key: "sNo", },
        { title: "Name", dataIndex: "name", key: "name", },
        { title: "Address", dataIndex: "address", key: "address", },
        { title: "Phone", dataIndex: "phone", key: "phone", },
        { title: "Email", dataIndex: "email", key: "email", },
        { title: "Category", dataIndex: "category", key: "category", },
        { title: "Distance", dataIndex: "distance", key: "distance", },
        {
            title: "Type", dataIndex: "type", key: "type",
            render: (_, record) => (
                <div className="d-flex flex-column">
                    <a href="/#/publicPages/campSchedule">Camps</a>
                    <a href="/#/publicPages/bloodAvailabilitySearch">Stock</a>
                </div>
            ),
        },
    ];

    const filterData = (category) => {
        if (!category) {
            setFilteredBloodBanks(bloodBanks);
            return;
        }
        const filtered = bloodBanks.filter(bank => bank.category.trim().toLowerCase() === category.trim().toLowerCase());
        setFilteredBloodBanks(filtered);
    };

    return (
        <>
            <div className="page-wrapper">
                <div className="container">
                    <h2 className="header-page mb-3">Nearest Blood Bank(BB)/ Blood Storage Unit(BSU)</h2>
                    <div className="widget px-3 py-3 mb-3">
                        <div className="row mx-4">
                            <div className="col-xl-3 col-lg-3 col-md-6 col-sm-6 mb-2 mb-xl-0 mb-lg-0">
                                <div className='d-flex flex-column'>
                                    <label htmlFor="orgType" className="form-label mb-1">Select Your State</label>
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
                            </div>
                            <div className="col-xl-3 col-lg-3 col-md-6 col-sm-6 mb-2 mb-xl-0 mb-lg-0">
                                <div className='d-flex flex-column'>
                                    <label htmlFor="orgType" className="form-label mb-1">Select Your District</label>
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
                            </div>
                            <div className="d-flex align-items-end justify-content-center col-xl-6 col-lg-6 col-md-6 col-sm-6 mb-2 mb-xl-0 mb-lg-0">
                                <div className="w-100" style={{ height: '64%' }}>
                                    <Search placeholder="Search" className="me-2" />
                                </div>
                            </div>
                        </div>
                        <div className="d-flex align-items-center justify-content-center mt-3">
                            <button
                                className="px-5 btn btn-primary-signIn"
                                onClick={fetchNearestBloodBanks}
                                disabled={loading}
                            >
                                {loading ? "Searching..." : "Search"}
                            </button>
                        </div>
                    </div>
                    <div className="d-flex justify-content-between align-items-center">
                        <div className="">
                            <div className="filterSection d-flex align-items-center justify-content-around px-2 py-1">
                                <div className="d-flex align-items-center">
                                    <p className="area mb-0 me-1">Category</p>
                                    <p className="number mb-0 me-1">4</p>
                                </div>
                                <Select
                                    style={{ width: 150 }}
                                    placeholder="Select Category"
                                    value={selectedCategory}
                                    onChange={(value) => {
                                        setSelectedCategory(value);
                                        filterData(value);
                                    }} >
                                    <Select.Option value={null}>All</Select.Option>
                                    <Select.Option value="Govt.">Govt.</Select.Option>
                                    <Select.Option value="Private">Private</Select.Option>
                                    <Select.Option value="Charitable/Vol">Charitable/Vol</Select.Option>
                                    <Select.Option value="Red Cross">Red Cross</Select.Option>
                                </Select>
                                <button
                                    className="btn px-2"
                                    onClick={() => {
                                        setSelectedCategory(null);
                                        setFilteredBloodBanks(bloodBanks);
                                    }} >
                                    <img src="assets/images/close.png" />
                                </button>
                            </div>
                        </div>
                        <div className="d-flex">
                            <Search
                                placeholder="Search Blood Bank"
                                className="me-2"
                                value={searchText}
                                onChange={(e) => {
                                    const value = e.target.value.toLowerCase();    
                                    setSearchText(value);

                                    if (!value) {
                                        setFilteredBloodBanks(bloodBanks);  
                                        return;
                                    }     

                                    const filtered = bloodBanks.filter(bank =>
                                        bank.name.toLowerCase().includes(value) ||
                                        bank.address.toLowerCase().includes(value) ||
                                        bank.phone.toLowerCase().includes(value) ||
                                        bank.email.toLowerCase().includes(value) ||
                                        bank.category.toLowerCase().includes(value)
                                    );
                                    setFilteredBloodBanks(filtered);
                                }} />
                            <button className="filter_btn d-flex align-items-center">
                                <img className="me-1" src="assets/images/filter.png" />
                                Filters
                            </button>
                        </div>
                    </div>

                    <Table
                        columns={columns}
                        dataSource={filteredBloodBanks}
                        rowKey="h_code"
                        pagination={{ pageSize: 10 }}
                        scroll={{ x: 1000 }} 
                        className="mt-3 mb-3"
                    />
                </div>
            </div>
        </>
    )
}

export default BloodBankDirectory