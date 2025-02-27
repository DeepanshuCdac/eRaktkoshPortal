import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getApiData } from '../redux/slices/dataSlice';
import '../scss/bloodSearch.scss'
import axios from 'axios';
import { Select, Space, Input, Table } from 'antd'
const { Search } = Input;

const BloodAvailabiltySearch = ({useContainer}) => {

    const dispatch = useDispatch();
    const { statesWithDistricts, bloodGroups, componentList, status } = useSelector((state) => state.data);

    const [selectedState, setSelectedState] = useState(null);
    const [selectedDistrict, setSelectedDistrict] = useState(null);
    const [selectedBloodGroup, setSelectedBloodGroup] = useState(null);
    const [selectedComponent, setSelectedComponent] = useState(null);
    const [bloodStockData, setBloodStockData] = useState([]);

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

    const states = statesWithDistricts || [];
    const districts = selectedState
        ? states.find(state => state.stateCode === selectedState)?.districts || []
        : [];

    const handleSearch = async () => {
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
                setBloodStockData(response.data.slice(1));
            } else {
                setBloodStockData([]);
            }
        } catch (error) {
            console.error("Error fetching blood stock data:", error);
        }
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
                        {/* <h4 className="widget-header text-center mb-4">Search Blood Stock</h4> */}
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
                    <div className="d-xl-flex d-lg-flex d-md-flex d-sm-flex align-items-center justify-content-between mt-3 mb-3">
                        <div className="pagination-view d-flex align-items-center mb-2 mb-xl-0 mb-lg-0 mb-md-0 mb-sm-0">
                            <p className="area mb-0 me-1">Show</p>
                            <p className="button mb-0 me-1">6</p>
                            <p className="mb-0 area">entries</p>
                        </div>
                        <div className="d-flex">
                            <Search placeholder="Search" className="me-2" />
                            <button className="filter_btn d-flex align-items-center">
                                <img className="me-1" src="assets/images/filter.png" />
                                Filters
                            </button>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-xl-8 col-lg-8 col-md-10 col-12">
                            <div className="row">
                                <div className="col-xl-4 col-lg-4 col-md-4 col-12 pe-xl-0 mb-xl-0 mb-lg-0 mb-md-0 mb-2">
                                    <div className="filterSection d-flex align-items-center justify-content-around px-2 py-1">
                                        <div className="d-flex align-items-center">
                                            <p className="area mb-0 me-1">Area</p>
                                            <p className="number mb-0 me-1">4</p>
                                        </div>
                                        <button className="btn selected px-1">Selected<img className="ms-1" src="assets/images/arrow_down.png" /></button>
                                        <button className="btn px-2"><img src="assets/images/close.png" /></button>
                                    </div>
                                </div>
                                <div className="col-xl-4 col-lg-4 col-md-4 col-12 pe-xl-0 mb-xl-0 mb-lg-0 mb-md-0 mb-2">
                                    <div className="filterSection d-flex align-items-center justify-content-around px-2 py-1">
                                        <div className="d-flex align-items-center">
                                            <p className="area mb-0 me-1">Category</p>
                                            <p className="number mb-0 me-1">4</p>
                                        </div>
                                        <button className="d-flex align-items-center btn selected px-1">Selected<img className="ms-1" src="assets/images/arrow_down.png" /></button>
                                        <button className="btn px-2"><img src="assets/images/close.png" /></button>
                                    </div>
                                </div>
                                <div className="col-xl-4 col-lg-4 col-md-4 col-12 pe-xl-0 mb-xl-0 mb-lg-0 mb-md-0 mb-2">
                                    <div className="filterSection d-flex align-items-center justify-content-around px-2 py-1">
                                        <div className="d-flex align-items-center">
                                            <p className="area mb-0 me-1">State</p>
                                            <p className="number mb-0 me-1">4</p>
                                        </div>
                                        <button className="d-flex align-items-center btn selected px-1">Selected<img className="ms-1" src="assets/images/arrow_down.png" /></button>
                                        <button className="btn px-2"><img src="assets/images/close.png" /></button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <Table
                        columns={columns}
                        dataSource={bloodStockData}
                        rowKey="h_code"
                        pagination={{ pageSize: 6 }}
                        className="mt-3 mb-3"
                    />
                </div>
            </div>
        </>
    )
}
export default BloodAvailabiltySearch