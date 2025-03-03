import React, { useEffect, useState } from "react";
import '../scss/bloodSearch.scss'
import { Input, DatePicker, Space, Select, Table } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { getApiData } from '../redux/slices/dataSlice';

const onDateChange = (date, dateString) => {
    console.log(date, dateString);
};

const { Search } = Input;

const CampSchedule = ({ useContainer }) => {

    useEffect(() => {
        document.title = 'e-RaktKosh Camp Registration'
    }, []);

    const dispatch = useDispatch();
    const { statesWithDistricts, status } = useSelector((state) => state.data);

    const [selectedState, setSelectedState] = useState(null);
    const [selectedDistrict, setSelectedDistrict] = useState(null);

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

    const states = statesWithDistricts || [];
    const districts = selectedState
        ? states.find(state => state.stateCode === selectedState)?.districts || []
        : [];

        const columns = [
            { title: 'S.No.', dataIndex: 'index', key: 'index', render: (text, record, index) => index + 1 },
            { title: 'Date', dataIndex: 'date', key: 'date' },
            { title: 'Camp Name', dataIndex: 'type', key: 'type' },
            { title: 'Address', dataIndex: 'available', key: 'available' },
            { title: 'State', dataIndex: 'lastUpdate', key: 'lastUpdate' },
            { title: 'District', dataIndex: 'type', key: 'type' },
            { title: 'Contact', dataIndex: 'type', key: 'type' },
            { title: 'Conducted By', dataIndex: 'type', key: 'type' },
            { title: 'Organised By', dataIndex: 'type', key: 'type' },
            { title: 'Register', dataIndex: 'type', key: 'type' }
        ];

    return (
        <>
            <div className="page-wrapper">
                <div className="container">
                    <h2 className="header-page mb-3">Camp Schedule</h2>
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
                                <div className="w-100" style={{height: '64%'}}>
                                    <Space direction="vertical">
                                        <DatePicker className="h-100 w-100" onChange={onDateChange} />
                                    </Space>
                                </div>
                            </div>
                        </div>
                        <div className="d-flex align-items-center justify-content-center mt-3">
                            <button className="btn btn-primary-signIn px-5">Search</button>
                        </div>
                    </div>
                    <div className="d-xl-flex d-lg-flex d-md-flex d-sm-flex align-items-center justify-content-end mt-3 mb-3"> 
                        <div className="d-flex">
                            <Search placeholder="Search" className="me-2" />
                            <button className="filter_btn d-flex align-items-center">
                                <img className="me-1" src="assets/images/filter.png" />
                                Filters
                            </button>
                        </div>
                    </div>
                    <Table
                            columns={columns}
                            rowKey="h_code"
                            pagination={{ pageSize: 10 }}
                            className="mt-3 mb-3"
                        />
                </div>
            </div>
        </>
    )
}
export default CampSchedule