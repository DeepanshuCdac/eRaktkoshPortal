import React, { useEffect, useState } from "react";
import '../scss/bloodSearch.scss'
import { Input, Space, Select, Table, message, Tooltip, Modal, Pagination } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { getApiData } from '../redux/slices/dataSlice';
import axios from "axios";
import { BaseUrl } from "../utils/url";
import { useLocation } from "react-router-dom";
import { SearchOutlined } from "@ant-design/icons";

const { Option } = Select;

const haversineDistance = (lat1, lon1, lat2, lon2) => {
    const toRad = (value) => (value * Math.PI) / 180;

    const R = 6371; // Radius of Earth in KM
    const dLat = toRad(lat2 - lat1);
    const dLon = toRad(lon2 - lon1);

    const a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
        Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) *
        Math.sin(dLon / 2) * Math.sin(dLon / 2);

    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return R * c;
};

const BloodBankDirectory = () => {

    const dispatch = useDispatch();
    const { statesWithDistricts, status } = useSelector((state) => state.data);
    const [selectedState, setSelectedState] = useState(null);
    const [selectedDistrict, setSelectedDistrict] = useState(null);
    const [bloodBanks, setBloodBanks] = useState([]);
    const [loading, setLoading] = useState(false);
    const [filteredBloodBanks, setFilteredBloodBanks] = useState([]);
    const [filteredData, setFilteredData] = useState([]);
    const [searchText, setSearchText] = useState("");
    const [userLocation, setUserLocation] = useState({ lat: null, lon: null });
    const [isModalOpen, setIsModalOpen] = useState(false)
    const [campData, setCampData] = useState(null)
    const [modalLoading, setModalLoading] = useState(false)
    const [currentPage, setCurrentPage] = useState(1);
    const [pageSize, setPageSize] = useState(5);

    useEffect(() => {
        dispatch(getApiData());
    }, [dispatch]);

    useEffect(() => {
        document.title = 'e-RaktKosh Blood Bank Directory';

        sessionStorage.removeItem("geoPermissionDenied");
    }, []);

    useEffect(() => {
        const geoPermissionDenied = sessionStorage.getItem("geoPermissionDenied");

        if (!geoPermissionDenied && "geolocation" in navigator) {
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    setUserLocation({
                        lat: position.coords.latitude,
                        lon: position.coords.longitude,
                    });
                },
                (error) => {
                    console.error("Error fetching location:", error);
                    sessionStorage.setItem("geoPermissionDenied", "true");
                },
                { enableHighAccuracy: true }
            );
        } else {
            console.warn("Geolocation is not supported or denied.");
        }
    }, []);

    const location = useLocation();

    const handlePageChange = (page, pageSize) => {
        setCurrentPage(page);
        setPageSize(pageSize);
    };

    const paginatedData = filteredBloodBanks.slice(
        (currentPage - 1) * pageSize,
        currentPage * pageSize
    );

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

            const formattedData = response.data.map((item, index) => {
                let distance = "-";
                if (userLocation.lat && userLocation.lon && item.latitude && item.longitude) {
                    distance = haversineDistance(userLocation.lat, userLocation.lon, item.latitude, item.longitude).toFixed(2) + " km";
                }

                return {
                    key: item.h_code || index,
                    sNo: index + 1,
                    name: item.name || "-",
                    address: item.address || "-",
                    phone: item.phone || "-",
                    email: item.email || "-",
                    category: item.hospitalType || "-",
                    distance: distance,
                    hospitalCode: item.hospitalCode,
                };
            });

            setBloodBanks(formattedData);
            setFilteredBloodBanks(formattedData);
        } catch (error) {
            console.error("Error fetching blood banks:", error);
            setBloodBanks([]);
        } finally {
            setLoading(false);
        }
    };

    // Camps link inside the nearest blook bank table...
    const fetchCampData = async (hospitalCode) => {
        setModalLoading(true)

        try {
            const response = await axios.get(`${BaseUrl}/eraktkosh/camps/hospitalCode`, {
                params: { hospitalCode }
            })
            setCampData(response.data);
            setIsModalOpen(true);
        }
        catch (error) {
            console.error("Error fetching camp data:", error);
            message.error("Failed to fetch camp details.");
        } finally {
            setModalLoading(false);
        }
    }

    const handleSearch = (value) => {
        setSearchText(value);
        if (value) {
            const filtered = bloodBanks.filter((item) =>
                Object.values(item).some((field) =>
                    field && field.toString().toLowerCase().includes(value.toLowerCase())
                )
            );
            setFilteredBloodBanks(filtered);
        } else {
            setFilteredBloodBanks(bloodBanks);
        }
    };

    const states = statesWithDistricts || [];
    const districts = selectedState
        ? states.find(state => state.stateCode === selectedState)?.districts || []
        : [];

    const columns = [
        { title: "S.No.", dataIndex: "sNo", key: "sNo" },
        {
            title: 'Blood Bank', key: 'bloodBank',
            render: (text, record) => (
                <div style={{ maxWidth: "300px" }}>
                    <Tooltip title={record.name}>
                        <p className="camp-name mb-0">{record.name}</p>
                    </Tooltip>
                    <span className="camp-venue mb-0">{record.address}</span>
                </div>
            )
        },
        {
            title: "Category", dataIndex: "category", key: "category",
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

                return <span style={style}>{text}</span>;
            }
        },
        {
            title: "Distance", dataIndex: "distance", key: "distance",
            render: (text) => (
                <span style={{ color: "#fff", background: "#a0a0a0", whiteSpace: "nowrap", padding: '2px 5px', borderRadius: '5px', fontSize: '11px' }}>{text}</span>
            ),
        },
        { title: "Phone", dataIndex: "phone", key: "phone" },
        { title: "Email", dataIndex: "email", key: "email" },
        {
            title: "Action", dataIndex: "action", key: "action",
            render: (_, record) => (
                <div className="d-flex flex-column">
                    <a href="" className="stockStatus mb-2 px-3">Stock</a>
                    <a
                        href="#"
                        className="campStatus px-3"
                        onClick={(e) => {
                            e.preventDefault();
                            fetchCampData(record.hospitalCode);
                        }}
                    >
                        Camps
                    </a>
                </div>
            ),
        },
    ];

    return (
        <>
            <div className="page_wrapper gradient_style">
                <div className="container">
                    <h2 className="header-page mb-2 pt-3">Nearest Blood Bank(BB)/ Blood Storage Unit(BSU)</h2>
                    <div className="d-flex justify-content-between flex-wrap gap-3 container-style">
                        <div className="input-wrapper-service">
                            <label className="form-label mb-0">Select Services</label>
                            <Select style={{ width: "100%" }} onChange={handleServiceChange} placeholder={getPageName()}>
                                <Option value="service1">Blood Stock Availability</Option>
                                <Option value="service2">Camp Schedule</Option>
                                <Option value="service3">Blood Bank Directory</Option>
                            </Select>
                        </div>
                        <div className='input-wrapper-service'>
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
                        <div className='input-wrapper-service'>
                            <label htmlFor="orgType" className="form-label mb-1">Select Your District</label>
                            <Space wrap>
                                <Select
                                    style={{ width: '100%' }}
                                    value={selectedDistrict}
                                    onChange={handleDistrictChange}
                                    placeholder="Select District">
                                    {districts.map((district) => (
                                        <Select.Option key={district.districtCode} value={district.districtCode}>
                                            {district.districtName}
                                        </Select.Option>
                                    ))}
                                </Select>
                            </Space>
                        </div>
                        <div className="input-wrapper button-wrapper">
                            <button className="px-5 btn btn-primary-signIn" onClick={fetchNearestBloodBanks}>
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
                                onChange={(e) => handleSearch(e.target.value)}
                                prefix={<SearchOutlined style={{ color: "#aaa" }} />}
                            />
                        </div>
                    </div>
                    <Table
                        columns={columns}
                        dataSource={paginatedData}
                        rowKey="h_code"
                        pagination={false}
                        loading={loading}
                        scroll={{ x: 1000 }}
                        className="mt-3 pb-3"
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
                            total={filteredBloodBanks.length}
                            showSizeChanger
                            pageSizeOptions={["5", "10", "20", "50"]}
                            onChange={handlePageChange}
                            className="text-center"
                        />
                    </div>
                    <Modal
                        title="Camp Details"
                        open={isModalOpen}
                        onCancel={() => setIsModalOpen(false)}
                        footer={null} >
                        {modalLoading ? (
                            <p>Loading camp details...</p>
                        ) : campData && campData.length > 0 ? (
                            campData.map((camp, idx) => (
                                <div key={idx} style={{ marginBottom: '1rem' }}>
                                    <p><strong>Camp Name:</strong> {camp.campName}</p>
                                    <p><strong>Date:</strong> {camp.campDate}</p>
                                    <p><strong>Venue:</strong> {camp.venue}</p>
                                    <hr />
                                </div>
                            ))
                        ) : (
                            <p>No camps available for this blood bank.</p>
                        )}
                    </Modal>
                </div>
            </div>
        </>
    )
}

export default BloodBankDirectory