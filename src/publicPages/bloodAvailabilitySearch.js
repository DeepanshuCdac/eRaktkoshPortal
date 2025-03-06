import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getApiData } from '../redux/slices/dataSlice';
import '../scss/bloodSearch.scss'
import axios from 'axios';
import { Select, Space, Input, Table, Empty, message } from 'antd'
const { Search } = Input;

const BloodAvailabiltySearch = ({ useContainer }) => {

    const dispatch = useDispatch();
    const { statesWithDistricts, bloodGroups, componentList, status } = useSelector((state) => state.data);

    const [selectedState, setSelectedState] = useState(null);
    const [selectedDistrict, setSelectedDistrict] = useState(null);
    const [selectedBloodGroup, setSelectedBloodGroup] = useState(null);
    const [selectedComponent, setSelectedComponent] = useState(null);
    const [bloodStockData, setBloodStockData] = useState([]);
    const [filteredData, setFilteredData] = useState([]);
    const [searchText, setSearchText] = useState("");
    const [selectedCategory, setSelectedCategory] = useState(null);
    const [uniqueCategories, setUniqueCategories] = useState([]);

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

    const handleBloodGroupChange = (value) => {
        setSelectedBloodGroup(value);
    };

    const handleComponentChange = (value) => {
        setSelectedComponent(value);
    };

    const allCategories = ["Govt.", "Charitable/Vol", "Private", "Red Cross"];

    const handleCategoryChange = (value) => {
        console.log("Selected Category:", value);
        setSelectedCategory(value);
        if (value && value !== "All") {
            setFilteredData(
                bloodStockData.filter(item => item.type.trim().toLowerCase() === value.trim().toLowerCase())
            );
        } else {
            setFilteredData(bloodStockData);
        }
    };

    const states = statesWithDistricts || [];
    const districts = selectedState
        ? states.find(state => state.stateCode === selectedState)?.districts || []
        : [];

    const handleSearch = async () => {
        if (!selectedState) {
            message.error("Please select state!");
            return;
        }
        try {
            const formData = new URLSearchParams();
            formData.append('state', selectedState || 'all');
            formData.append('dist', selectedDistrict || '-1');
            formData.append('bbType', '-1');
            formData.append('bg', selectedBloodGroup || 'all');
            formData.append('bc', selectedComponent || '11');
            formData.append('start_index', '-1');
            formData.append('num_records', '10');
            formData.append('source', 'web');

            const response = await axios.post(
                'https://eraktkosh.mohfw.gov.in/Blood_Bank/service/eRaktkoshAPI/new/stock/state',
                formData,
                {
                    headers: {
                        'Content-Type': 'application/x-www-form-urlencoded'
                    }
                }
            );

            if (response.data.length > 1) {
                const data = response.data.slice(1);
                setBloodStockData(data);
                setFilteredData(data);

                const typesSet = new Set(data.map(item => item.type));
                setUniqueCategories([...typesSet]);
            } else {
                setBloodStockData([]);
                setFilteredData([]);
                setUniqueCategories([]);
            }
        } catch (error) {
            console.error("Error fetching blood stock data:", error);
        }
    };

    const handleTableSearch = (value) => {
        setSearchText(value);
        const lowercasedValue = value.toLowerCase();
        const filtered = bloodStockData.filter(item =>
            Object.values(item).some(field =>
                field && field.toString().toLowerCase().includes(lowercasedValue)
            )
        );
        setFilteredData(filtered);
    };

    const columns = [
        { title: 'S.No.', dataIndex: 'index', key: 'index', render: (text, record, index) => index + 1 },
        { title: 'Blood Bank', dataIndex: 'name', key: 'name' },
        { title: 'Category', dataIndex: 'type', key: 'type' },
        { title: 'Availability', dataIndex: 'available', key: 'available' },
        { title: 'Last Updated', dataIndex: 'lastUpdate', key: 'lastUpdate' },
        { title: 'Type', dataIndex: 'type', key: 'type' }
    ];

    return (
        <>
            <div className="page-wrapper">
                <div className={useContainer ? "container" : ""}>
                    <h2 className="header-page mb-3">Blood Stock Availability</h2>
                    <div className="widget px-3 py-3 mb-3">
                        <div className="row">
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
                            <div className="col-xl-3 col-lg-3 col-md-6 col-sm-6 mb-2 mb-xl-0 mb-lg-0">
                                <div className='d-flex flex-column'>
                                    <label htmlFor="orgType" className="form-label mb-1">Select Blood Group</label>
                                    <Space wrap>
                                        <Select
                                            style={{ width: '100%' }}
                                            value={selectedBloodGroup}
                                            onChange={handleBloodGroupChange}
                                            placeholder="Select Blood Group" >
                                            {bloodGroups.map((bloodGroup) => (
                                                <Select.Option key={bloodGroup.bloodGroupCode} value={bloodGroup.bloodGroupCode}>
                                                    {bloodGroup.bloodGroupName}
                                                </Select.Option>
                                            ))}
                                        </Select>
                                    </Space>
                                </div>
                            </div>
                            <div className="col-xl-3 col-lg-3 col-md-6 col-sm-6 mb-2 mb-xl-0 mb-lg-0">
                                <div className='d-flex flex-column'>
                                    <label htmlFor="orgType" className="form-label mb-1">Select Blood Component</label>
                                    <Space wrap>
                                        <Select
                                            style={{ width: '100%' }}
                                            value={selectedComponent}
                                            onChange={handleComponentChange}
                                            placeholder="Select Blood Component" >
                                            {componentList.map((component) => (
                                                <Select.Option key={component.componentCode} value={component.componentCode}>
                                                    {component.componentName}
                                                </Select.Option>
                                            ))}
                                        </Select>
                                    </Space>
                                </div>
                            </div>
                        </div>
                        <div className="d-flex align-items-center justify-content-center mt-3">
                            <button type="primary" onClick={handleSearch} className="btn btn-primary-signIn px-5">Search</button>
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
                                    value={selectedCategory}
                                    onChange={handleCategoryChange}
                                    placeholder="Select Category" >
                                    <Select.Option value="All">All</Select.Option>
                                    {allCategories.map((category, index) => (
                                        <Select.Option key={index} value={category}>
                                            {category}
                                        </Select.Option>
                                    ))}
                                </Select>
                                <button
                                    className="btn px-2"
                                    onClick={() => {
                                        setSelectedCategory(null); setFilteredData(bloodStockData);
                                    }}>
                                    <img src="assets/images/close.png" />
                                </button>

                            </div>
                        </div>
                        <div className="d-flex">
                            <Search
                                placeholder="Search Blood Bank"
                                className="me-2"
                                value={searchText}
                                onChange={(e) => handleTableSearch(e.target.value)}
                            />
                            <button className="filter_btn d-flex align-items-center">
                                <img className="me-1" src="assets/images/filter.png" />
                                Filters
                            </button>
                        </div>
                    </div>
                    <Table
                        columns={columns}
                        dataSource={filteredData}
                        rowKey="h_code"
                        pagination={{ pageSize: 10 }}
                        className="mt-3 mb-3"
                        scroll={{ x: 1000 }}
                    />
                </div>
            </div>
        </>
    )
}
export default BloodAvailabiltySearch