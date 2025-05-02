import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getApiData } from '../redux/slices/dataSlice';
import '../scss/bloodSearch.scss'
import axios from 'axios';
import { useLocation } from "react-router-dom";
import { SearchOutlined } from "@ant-design/icons";
import { Select, Space, Input, Table, message, Pagination, Tooltip, Button, Modal, AutoComplete } from 'antd'
import { BaseUrl } from '../utils/url';
const { Search } = Input;
const { Option } = Select;

const BloodAvailabiltySearch = ({ useContainer }) => {

    const dispatch = useDispatch();
    const { statesWithDistricts, bloodGroups, componentList, status } = useSelector((state) => state.data);
    const [selectedState, setSelectedState] = useState(null);
    const [selectedDistrict, setSelectedDistrict] = useState(null);
    const [bloodBanks, setBloodBanks] = useState([]);
    const [bloodCenterInput, setBloodCenterInput] = useState("");
    const [selectedHospital, setSelectedHospital] = useState(null);
    const [selectedBloodGroup, setSelectedBloodGroup] = useState(null);
    const [selectedComponent, setSelectedComponent] = useState('12');
    const [bloodStockData, setBloodStockData] = useState([]);
    const [filteredData, setFilteredData] = useState([]);
    const [searchText, setSearchText] = useState("");
    const [loading, setLoading] = useState(false);
    const [uniqueCategories, setUniqueCategories] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [pageSize, setPageSize] = useState(5);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedRecord, setSelectedRecord] = useState(null);

    useEffect(() => {
        dispatch(getApiData());
    }, [dispatch]);

    const location = useLocation();

    const getPageName = () => {
        const path = location.pathname.split("/").filter(Boolean).pop();
        return path ? path.charAt(0).toUpperCase() + path.slice(1) : "Select a service";
    };

    const handlePageChange = (page, pageSize) => {
        setCurrentPage(page);
        setPageSize(pageSize);
    };

    const showModal = (record) => {
        setSelectedRecord(record);
        setIsModalOpen(true);
    };
    const handleCancel = () => {
        setIsModalOpen(false);
    };

    const paginatedData = filteredData.slice(
        (currentPage - 1) * pageSize,
        currentPage * pageSize
    );

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
        fetchBloodBanks(value, null);
    };

    const handleDistrictChange = (value) => {
        setSelectedDistrict(value);
        fetchBloodBanks(selectedState, value);
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

    const fetchBloodBanks = async (stateCode, districtCode) => {
        if (!stateCode) return;

        try {
            const response = await axios.get(`${BaseUrl}/eraktkosh/bloodbanks`, {
                params: {
                    stateCode,
                    ...(districtCode && { districtCode }),
                },
            });

            if (response.data && Array.isArray(response.data)) {
                setBloodBanks(response.data);
            } else {
                setBloodBanks([]);
            }
        } catch (error) {
            console.error("Error fetching blood center:", error);
            setBloodBanks([]);
        }
    };

    const handleSearch = async () => {
        if (!selectedState) {
            message.error("Please select state!");
            return;
        }

        const hospitalCode = selectedHospital?.hospitalCode || null;

        const params = {
            stateCode: selectedState || 'all',
            districtId: selectedDistrict || null,
            componentId: selectedComponent || 11,
            bloodGroupId: selectedBloodGroup || null,
            ...(hospitalCode && { hospitalCodes: hospitalCode })
        };

        console.log(" API Request Params:", params);

        try {
            const response = await axios.get(`${BaseUrl}/eraktkosh/blood-availability`, { params });

            console.log(" Raw API Response:", response.data);

            if (response.data.length > 0) {
                const processedData = response.data.map((item) => {
                    const components = item.components || {};
                    const keys = Object.keys(components);

                    let availableQty = "";

                    if (keys.length === 1) {
                        const onlyComponent = components[keys[0]];
                        availableQty = onlyComponent?.available_WithQty || "";
                    } else {
                        const prbcComponent = components["Packed Red Blood Cells"];
                        availableQty = prbcComponent?.available_WithQty || "";
                    }
                    return {
                        ...item,
                        available_WithQty: availableQty
                    };
                });

                let finalFilteredData = processedData;

                if (!selectedHospital && bloodCenterInput?.trim()) {
                    const keyword = bloodCenterInput.trim().toLowerCase();
                    console.log(" Keyword Filter:", keyword);

                    finalFilteredData = processedData.filter(item => {
                        const hospitalname = item.hospitalname?.toLowerCase() || "";
                        return hospitalname.includes(keyword);
                    });
                    console.log(" Final Filtered Data (keyword-based):", finalFilteredData);
                }
                setBloodStockData(processedData);
                setFilteredData(finalFilteredData);
                setCurrentPage(1);

                const typesSet = new Set(finalFilteredData.map(item => item.type));
                setUniqueCategories([...typesSet]);
            } else {
                setBloodStockData([]);
                setFilteredData([]);
                setUniqueCategories([]);
            }
        } catch (error) {
            console.error(" Error fetching blood stock data:", error);
        }
    };

    const handleTableSearch = (value) => {
        setSearchText(value);
        setCurrentPage(1);
        const lowercasedValue = value.toLowerCase();
        const filtered = bloodStockData.filter(item =>
            Object.values(item).some(field =>
                field && field.toString().toLowerCase().includes(lowercasedValue)
            )
        );
        setFilteredData(filtered);
    };

    const columns = [
        { title: "S.No.", dataIndex: "sNo", key: "sNo" },
        {
            title: 'Blood Center',
            key: 'bloodBank',
            render: (text, record) => (
                <div style={{ maxWidth: "300px" }}>
                    <Tooltip title={record.hospitalname}>
                        <p className="camp-name mb-0">{record.hospitalname}</p>
                    </Tooltip>
                    <p className="camp-venue mb-0">{record.hospitaladd}</p>
                </div>
            )
        },
        {
            title: "Category", dataIndex: "hospitalType", key: "hospitalType",
            render: (text) => {
                let style = {};
                if (text === "Govt.") {
                    style = { color: "#3c7bc6", padding: "1px 13px", borderRadius: "13px", fontSize: "12px", border: "1px solid rgba(60, 123, 198, 0.47)", fontWeight: "bold" };

                } else if (text === "Private") {
                    style = { color: "#359811", padding: "1px 13px", borderRadius: "13px", fontSize: "12px", border: "1px solid rgba(53, 152, 17, 0.47)", fontWeight: "bold" };

                } else if (text === "Charitable/Vol") {
                    style = { color: "#bc5a00", padding: "1px 13px", borderRadius: "13px", fontSize: "12px", border: "1px solid rgba(188, 90, 0, 0.47)", fontWeight: "bold" };

                } else if (text === "Red Cross ") {
                    style = { whiteSpace: "nowrap", color: "#D10808", padding: "1px 13px", borderRadius: "13px", fontSize: "12px", border: "1px solid rgba(209, 8, 8, 0.47)", fontWeight: "bold" };
                }

                return <span style={style}>{text}</span>
            }
        },
        {
            title: 'Availability',
            key: 'available_WithQty',
            dataIndex: 'available_WithQty',
            render: (availableQty) => (
                <span style={{ color: availableQty ? '#14930E' : '#B92120', fontWeight: '500' }}>
                    {availableQty || "Not Available"}
                </span>
            )
        },
        { title: 'Last Updated', dataIndex: 'entrydate', key: 'entrydate' },
        { title: 'Type', dataIndex: 'type', key: 'type' },
        {
            title: 'Action',
            key: 'action',
            render: (_, record) => (
                <a href='javascript:void(0)' style={{ color: "#1A6093" }} onClick={() => showModal(record)} > Details </a>
            ),
        }
    ];

    return (
        <>
            <div className="page_wrapper gradient_style">
                <div className={useContainer ? "container" : ""}>
                    <h2 className="header-page mb-2 pt-3">Blood Availability</h2>
                    <div className="d-flex flex-wrap gap-1 container-style">
                        <div className="input-wrapper-field">
                            <label className="form-label mb-0">Select Services</label>
                            <Select
                                showSearch style={{ width: '100%' }} placeholder={getPageName()} onChange={handleServiceChange}
                                filterOption={(input, option) => {
                                    const label = option?.label ?? '';
                                    return label.toLowerCase().includes(input.toLowerCase())
                                }}
                                options={[
                                    { value: 'service1', label: 'Blood Availability' },
                                    { value: 'service2', label: 'Camp Schedule' },
                                    { value: 'service3', label: 'Blood Center Directory' },
                                ]}
                            />
                        </div>
                        <div className="input-wrapper-field">
                            <label htmlFor="orgType" className="form-label mb-0">Select State</label>
                            <Space wrap>
                                <Select
                                    showSearch allowClear style={{ width: '100%' }} value={selectedState}
                                    onChange={handleStateChange} placeholder="Select"
                                    filterOption={(input, option) => {
                                        const label = option?.label ?? '';
                                        return label.toLowerCase().includes(input.toLowerCase());
                                    }}
                                    options={states.map((state) => ({
                                        value: state.stateCode, label: state.stateName,
                                    }))}
                                />
                            </Space>
                        </div>

                        <div className="input-wrapper-field">
                            <label htmlFor="orgType" className="form-label mb-0">Select District</label>
                            <Space wrap>
                                <Select
                                    showSearch allowClear style={{ width: '100%' }} value={selectedDistrict}
                                    onChange={handleDistrictChange} placeholder="Select"
                                    filterOption={(input, option) => {
                                        const label = option?.label ?? '';
                                        return label.toLowerCase().includes(input.toLowerCase());
                                    }}
                                    options={districts.map((district) => ({
                                        value: district.districtCode, label: district.districtName,
                                    }))}
                                />
                            </Space>
                        </div>
                        <div className="input-wrapper-field">
                            <label htmlFor="orgType" className="form-label mb-0">Select District</label>
                            <AutoComplete
                                allowClear
                                style={{ width: '100%' }}
                                placeholder="Type hospital name"
                                value={bloodCenterInput}
                                onChange={(value, option) => {
                                    console.log(" Input Changed:", value, "Option:", option);
                                    setBloodCenterInput(value);
                                    setSelectedHospital(option ? option.item : null);
                                }}
                                options={bloodBanks
                                    .filter(bank =>
                                        bank.hospitalName.toLowerCase().includes(bloodCenterInput.toLowerCase())
                                    )
                                    .map(bank => ({
                                        value: bank.hospitalName,
                                        label: bank.hospitalName,
                                        item: bank,
                                    }))
                                }
                                filterOption={false}
                            />
                        </div>
                        <div className="input-wrapper-field">
                            <label htmlFor="orgType" className="form-label mb-1">Select Blood Group</label>
                            <Space wrap>
                                <Select
                                    showSearch
                                    allowClear
                                    style={{ width: '100%' }}
                                    value={selectedBloodGroup}
                                    onChange={handleBloodGroupChange}
                                    placeholder="Select Blood"
                                    filterOption={(input, option) => {
                                        const label = option?.label ?? '';
                                        return label.toLowerCase().includes(input.toLowerCase());
                                    }}
                                    options={[
                                        { value: null, label: 'All' },
                                        ...bloodGroups.map((bloodGroup) => ({
                                            value: bloodGroup.bloodGroupCode,
                                            label: bloodGroup.bloodGroupName,
                                        })),
                                    ]}
                                />
                            </Space>
                        </div>

                        <div className="input-wrapper-field">
                            <label htmlFor="orgType" className="form-label mb-1">Select Blood Component</label>
                            <Space wrap>
                                <Select
                                    showSearch allowClear style={{ width: '100%' }} value={selectedComponent}
                                    onChange={handleComponentChange} placeholder="Select Blood Component"
                                    filterOption={(input, option) => {
                                        const label = option?.label ?? '';
                                        return label.toLowerCase().includes(input.toLowerCase());
                                    }}
                                    options={componentList.map((component) => ({
                                        value: component.componentCode, label: component.componentName,
                                    }))}
                                />
                            </Space>
                        </div>
                        <div className="input-wrapper button-wrapper">
                            <button className="px-5 btn btn-primary-signIn" onClick={handleSearch}>
                                {loading ? "Searching..." : "Search"}
                            </button>
                        </div>
                    </div>
                    <div className="d-xl-flex d-lg-flex d-md-flex d-sm-flex align-items-center justify-content-between mt-3 mb-3">
                        <div className="d-flex align-items-center">
                            <p className="mb-0 searchResult me-2">Search Result</p>
                        </div>
                        <div className="">
                            <Input
                                placeholder="Search"
                                value={searchText}
                                onChange={(e) => handleTableSearch(e.target.value)}
                                prefix={<SearchOutlined style={{ color: "#aaa" }} />}
                            />
                        </div>
                    </div>
                    <Table
                        columns={columns}
                        dataSource={paginatedData.map((item, index) => ({
                            ...item,
                            sNo: (currentPage - 1) * pageSize + index + 1
                        }))}
                        rowKey="h_code"
                        pagination={false}
                        className="mt-3"
                        scroll={{ x: 1000 }}
                    />
                    <div className="d-flex align-items-center justify-content-between">
                        <div className="px-2 py-1 notify_box d-flex align-items-center">
                            <p className="notify_text mb-0">Can't find your Blood Group/Component</p>
                            <div style={{ padding: '1px 10px' }} className="d-flex align-items-center notify_bell ms-2">
                                <img src="" />
                                <p className="mb-0 ">Notify Me</p>
                            </div>
                        </div>
                        <Pagination
                            current={currentPage}
                            pageSize={pageSize}
                            total={filteredData.length}
                            showSizeChanger
                            pageSizeOptions={["5", "10", "20", "50"]}
                            onChange={handlePageChange}
                            className="mt-3 text-center"
                        />
                    </div>
                </div>

                <Modal open={isModalOpen} onCancel={handleCancel} footer={null}>
                    {selectedRecord && (
                        <div>
                            <p className='mb-0 modal_header'>Blood Center Name</p>
                            <p className='mb-1 hospName'>{selectedRecord.hospitalname}</p>
                            <p className='mb-1 hospAdd'>{selectedRecord.hospitaladd}</p>
                            <p className='mb-1 hospAdd pb-2' style={{ borderBottom: '2px solid #E6E6E6' }}>
                                {selectedRecord.hospitalcontact.split(',').map((item, index) => {
                                    const [label, value] = item.split(':').map(part => part.trim());
                                    return (
                                        <span key={index} className='me-3'>
                                            <span className='labelStyle'>{label}:</span>{' '}
                                            <span className='hospAdd'>{value}</span>
                                        </span>
                                    );
                                })}
                            </p>
                            <p className='mb-1 mt-2' style={{ fontSize: '14px', color: '#000', }}>Send Blood Center Detail and Location</p>
                            <div className='d-flex'>
                                <Input className='me-3' placeholder="Your EmailID/Mobile No" />
                                <Button type="primary">Send</Button>
                            </div>
                        </div>
                    )}
                </Modal>
            </div>
        </>
    )
}
export default BloodAvailabiltySearch