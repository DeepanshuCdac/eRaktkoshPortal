import React, { useEffect, useState, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getApiData } from "../redux/slices/dataSlice";
import "../scss/bloodSearch.scss";
import axios from "axios";
import { useLocation } from "react-router-dom";
import { SearchOutlined } from "@ant-design/icons";
import {
  Select,
  Input,
  Table,
  message,
  Pagination,
  Tooltip,
  Button,
  Modal,
  AutoComplete,
  Spin,
} from "antd";
import { BaseUrl } from "../utils/url";
import { logSearch } from "../components/logService";
import NestedBloodAvailabilityTable from "../components/NestedBloodAvailabilityTable";

// const { Option } = Select;

const BloodAvailabiltySearch = ({ fromDonorAdmin }) => {
  const dispatch = useDispatch();
  const { statesWithDistricts, bloodGroups, componentList } = useSelector(
    (state) => state.data
  );
  const [selectedState, setSelectedState] = useState(null);
  const [selectedDistrict, setSelectedDistrict] = useState(null);
  const [bloodBanks, setBloodBanks] = useState([]);
  const [bloodCenterInput, setBloodCenterInput] = useState("");
  const [selectedHospital, setSelectedHospital] = useState(null);
  const [selectedBloodGroup, setSelectedBloodGroup] = useState(null);
  const [selectedComponent, setSelectedComponent] = useState("12");
  const [bloodStockData, setBloodStockData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [searchText, setSearchText] = useState("");
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(5);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isNotifyModalOpen, setIsNotifyModalOpen] = useState(false);
  const [selectedRecord, setSelectedRecord] = useState(null);
  const [expandedRowKeys, setExpandedRowKeys] = useState(null);
  const [emailAddress, setEmailAddress] = useState("");
  const [emailError, setEmailError] = useState("");
  const [selectedNotifyState, setSelectedNotifyState] = useState(null);
  const [selectedNotifyDistrict, setSelectedNotifyDistrict] = useState(null);
  const [selectedNotifyHospitals, setSelectedNotifyHospitals] = useState([]);
  const [selectedNotifyBloodGroup, setSelectedNotifyBloodGroup] =
    useState(null);
  const [selectedNotifyComponent, setSelectedNotifyComponent] = useState(null);
  const [notifyEmail, setNotifyEmail] = useState("");
  const [notifyMobile, setNotifyMobile] = useState("");
  const [notifyBloodBanks, setNotifyBloodBanks] = useState([]);
  const [notifyDistricts, setNotifyDistricts] = useState([]);

  useEffect(() => {
    dispatch(getApiData());
  }, [dispatch]);

  // const location = useLocation();

  const handlePageChange = (page, size) => {
    setCurrentPage(page);
    setPageSize(size);
  };

  const showModal = (record) => {
    setSelectedRecord(record);
    setIsModalOpen(true);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const paginatedData = useMemo(() => {
    return filteredData.slice(
      (currentPage - 1) * pageSize,
      currentPage * pageSize
    );
  }, [filteredData, currentPage, pageSize]);

  const getPageName = () => {
    const hashPath = window.location.hash.split("/").pop();
    const nameMap = {
      bloodAvailabilitySearch: "Blood Availability",
      campSchedule: "Camp Schedule",
      bloodBankDirectory: "Blood Center Directory",
    };
    return nameMap[hashPath] || "Select a service";
  };

  const handleServiceChange = (value) => {
    const urlMap = {
      service1: "/eraktkoshPortal/#/publicPages/bloodAvailabilitySearch",
      service2: "/eraktkoshPortal/#/publicPages/campSchedule",
      service3: "/eraktkoshPortal/#/publicPages/bloodBankDirectory",
    };
    if (urlMap[value]) window.location.href = urlMap[value];
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

  const fetchBloodBanks = async (stateCode, districtCode) => {
    if (!stateCode) return;

    try {
      const response = await axios.get(`${BaseUrl}/eraktkosh/bloodbanks`, {
        params: { stateCode, ...(districtCode && { districtCode }) },
      });
      setBloodBanks(Array.isArray(response.data) ? response.data : []);
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
      stateCode: selectedState || "all",
      districtId: selectedDistrict || null,
      componentId: selectedComponent || 11,
      bloodGroupId: selectedBloodGroup || null,
      ...(hospitalCode && { hospitalCodes: hospitalCode }),
    };

    try {
      const searchLogData = {
        serviceType: "Blood Availability",
        searchParams: {
          state: selectedState,
          district: selectedDistrict || null,
          bloodCenter: selectedHospital?.hospitalName,
          bloodCenterCode: selectedHospital?.hospitalCode,
          bloodCenterInput: bloodCenterInput,
          bloodGroup: selectedBloodGroup,
          bloodComponent: selectedComponent,
        },
        ipAddress: null,
      };
      logSearch(searchLogData).catch((e) =>
        console.error("Search logging failed:", e)
      );

      setLoading(true);
      const response = await axios.get(
        `${BaseUrl}/eraktkosh/blood-availability`,
        { params }
      );

      if (response.data.length > 0) {
        const processedData = response.data.map((item, index) => {
          const components = item.components || {};
          const keys = Object.keys(components);
          let availableQty = "";

          if (keys.length === 1) {
            availableQty = components[keys[0]]?.available_WithQty || "";
          } else {
            availableQty =
              components["Packed Red Blood Cells"]?.available_WithQty || "";
          }
          return {
            ...item,
            available_WithQty: availableQty,
            uniqueKey: `${index}-${Date.now()}`,
          };
        });

        let finalFilteredData = processedData;
        if (!selectedHospital && bloodCenterInput?.trim()) {
          const keyword = bloodCenterInput.trim().toLowerCase();
          finalFilteredData = processedData.filter((item) =>
            (item.hospitalname?.toLowerCase() || "").includes(keyword)
          );
        }
        setBloodStockData(processedData);
        setFilteredData(finalFilteredData);
        setCurrentPage(1);
      } else {
        setBloodStockData([]);
        setFilteredData([]);
      }
    } catch (error) {
      console.error("Error fetching blood stock data:", error);
      message.error("Failed to fetch blood availability data");
    } finally {
      setLoading(false);
    }
  };

  const handleTableSearch = (value) => {
    setSearchText(value);
    setCurrentPage(1);
    const filtered = bloodStockData.filter((item) =>
      Object.values(item).some(
        (field) =>
          field && field.toString().toLowerCase().includes(value.toLowerCase())
      )
    );
    setFilteredData(filtered);
  };

  const columns = [
    { title: "S.No.", dataIndex: "sNo", key: "sNo" },
    {
      title: "Blood Center",
      key: "bloodBank",
       width: 400,
      render: (_, record) => (
        <div>
          <Tooltip title={record.hospitalname}>
            <p className="camp-name mb-0">{record.hospitalname}</p>
          </Tooltip>
          <p className="camp-venue mb-0">{record.hospitaladd}, {record.hospitalcontact}</p>
          {/* <p className="camp-venue mb-0"></p> */}
        </div>
      ),
    },
    {
      title: "Category",
      dataIndex: "hospitalType",
      key: "hospitalType",
      render: (text) => {
        const styleMap = {
          "Govt.": {
            color: "#3c7bc6",
            padding: "1px 13px",
            borderRadius: "13px",
            fontSize: "12px",
            border: "1px solid rgba(60, 123, 198, 0.47)",
            fontWeight: "bold",
          },
          Private: {
            color: "#359811",
            padding: "1px 13px",
            borderRadius: "13px",
            fontSize: "12px",
            border: "1px solid rgba(53, 152, 17, 0.47)",
            fontWeight: "bold",
          },
          "Charitable/Vol": {
            color: "#bc5a00",
            padding: "1px 13px",
            borderRadius: "13px",
            fontSize: "12px",
            border: "1px solid rgba(188, 90, 0, 0.47)",
            fontWeight: "bold",
          },
          "Red Cross ": {
            whiteSpace: "nowrap",
            color: "#D10808",
            padding: "1px 13px",
            borderRadius: "13px",
            fontSize: "12px",
            border: "1px solid rgba(209, 8, 8, 0.47)",
            fontWeight: "bold",
          },
        };
        return <span style={styleMap[text] || {}}>{text}</span>;
      },
    },
    {
      title: "Availability",
      key: "available_WithQty",
      dataIndex: "available_WithQty",
       width: 300,
      render: (availableQty) => (
        <span
          style={{
            color: availableQty ? "#14930E" : "#B92120",
            fontWeight: "500",
          }}
        >
          {availableQty || "Not Available"}
        </span>
      ),
    },
    { title: "Last Updated", dataIndex: "entrydate", key: "entrydate" },
    { title: "Type", dataIndex: "type", key: "type" },
    {
      title: "",
      key: "details",
      render: (_, record) => (
        <a
          href="javascript:void(0)"
          style={{ color: "#1A6093" }}
          onClick={() => showModal(record)}
        >
          Share
        </a>
      ),
    },
  ];

  const CustomBodyRow = ({ children, record, ...restProps }) => {
    if (!children[0]?.props?.record) return <tr {...restProps}>{children}</tr>;

    return (
      <>
        <tr {...restProps} style={{ borderBottom: 0 }}>
          {children}
        </tr>
        <tr style={{ borderBottom: "none", width: "100%" }}>
          <td
            colSpan={columns.length}
            style={{ textAlign: "center", padding: "5px" }}
          >
            <NestedBloodAvailabilityTable
              hospitalCode={children[0].props.record.hospitalCode}
              selectedState={selectedState}
              selectedDistrict={selectedDistrict}
              bloodGroups={bloodGroups}
              expandedRowKeys={expandedRowKeys}
              uniqueKey={children[0].props.record.uniqueKey}
              onExpandChange={(key) => {
                if (expandedRowKeys === key) {
                  setExpandedRowKeys(null);
                } else {
                  setExpandedRowKeys(key);
                }
              }}
            />
          </td>
        </tr>
      </>
    );
  };

  const states = statesWithDistricts || [];
  const districts = selectedState
    ? states.find((state) => state.stateCode === selectedState)?.districts || []
    : [];

  const handleSendEmail = async () => {
    if (!emailAddress) {
      message.error("Please Enter Your Email Address");
    }

    const payload = {
      email: emailAddress,
      hospitalCode: selectedRecord?.hospitalCode || null,
      stateCode: selectedState,
    };

    try {
      const response = await axios.post(
        `${BaseUrl}/eraktkosh/blood-availability/send`,
        payload
      );
      message.success(response.data || "Email sent successfully!");
      setIsModalOpen(false);
      setEmailAddress("");
    } catch (error) {
      console.error("Error sending email:", error);
      message.error("Failed to send email. Please try again.");
    }
  };

  const handleWhatsAppShare = () => {
    if (!selectedRecord) return;

    const message =
      `Blood Center Details:\n` +
      `*Name:* ${selectedRecord.hospitalname}\n` +
      `*Address:* ${selectedRecord.hospitaladd}\n` +
      `*Contact:* ${selectedRecord.hospitalcontact}\n` +
      // `*Availability:* ${
      //   selectedRecord.available_WithQty || "Not Available"
      // }\n` +
      `*Last Updated:* ${selectedRecord.entrydate}`;

    const encodedMessage = encodeURIComponent(message);

    const whatsappUrl = `whatsapp://send?text=${encodedMessage}`;
    window.open(whatsappUrl, "_blank");
  };

  const getSelectedFieldsDisplat = () => {
    const parts = [];

    if (selectedState) {
      const state = states.find((s) => s.stateCode === selectedState);
      parts.push(state?.stateName || selectedState);
    }

    if (selectedDistrict) {
      const district = districts.find(
        (d) => d.districtCode === selectedDistrict
      );
      parts.push(district?.districtName || selectedDistrict);
    }

    if (selectedHospital?.hospitalName || bloodCenterInput) {
      parts.push(selectedHospital?.hospitalName || bloodCenterInput);
    }

    if (selectedBloodGroup) {
      const bloodGroup = bloodGroups.find(
        (bg) => bg.bloodGroupCode === selectedBloodGroup
      );
      parts.push(bloodGroup?.bloodGroupName || selectedBloodGroup);
    }

    if (selectedComponent) {
      const component = componentList.find(
        (c) => c.componentCode === selectedComponent
      );
      parts.push(component?.componentName || selectedComponent);
    }

    return parts.length > 0 ? parts.join(" / ") : "All results";
  };

  const handleNotifyStateChange = (value) => {
    setSelectedNotifyState(value);
    setSelectedNotifyDistrict(null);
    fetchNotifyBloodBanks(value, null);

    // Update districts for notify modal
    const selectedStateData = states.find((state) => state.stateCode === value);
    setNotifyDistricts(selectedStateData?.districts || []);
  };

  const handleNotifyDistrictChange = (value) => {
    setSelectedNotifyDistrict(value);
    fetchNotifyBloodBanks(selectedNotifyState, value);
  };

  const fetchNotifyBloodBanks = async (stateCode, districtCode) => {
    if (!stateCode) return;

    try {
      const response = await axios.get(`${BaseUrl}/eraktkosh/bloodbanks`, {
        params: { stateCode, ...(districtCode && { districtCode }) },
      });
      setNotifyBloodBanks(Array.isArray(response.data) ? response.data : []);
    } catch (error) {
      console.error("Error fetching blood center:", error);
      setNotifyBloodBanks([]);
    }
  };

  const handleNotifySubmit = async () => {
    // Validate required fields
    if (!selectedNotifyState) {
      message.error("Please select state!");
      return;
    }

    if (!selectedNotifyDistrict) {
      message.error("Please select district!");
      return;
    }

    if (selectedNotifyHospitals.length === 0) {
      message.error("Please select at least one hospital!");
      return;
    }

    if (!selectedNotifyBloodGroup) {
      message.error("Please select blood group!");
      return;
    }

    if (!notifyEmail) {
      message.error("Please enter email!");
      return;
    }

    const payload = {
      stateCode: selectedNotifyState,
      districtCode: selectedNotifyDistrict,
      bloodGroupCode: selectedNotifyBloodGroup,
      emailId: notifyEmail,
      bloodComponentId: selectedNotifyComponent,
      mobileNo: notifyMobile,
      hospitalCodes: selectedNotifyHospitals.map((h) => h.hospitalCode),
    };

    try {
      setLoading(true);
      const response = await axios.post(
        `${BaseUrl}/eraktkosh/notify_me/bloodsearch`,
        payload
      );

      message.success(
        response.data.message || "Notification request submitted successfully!"
      );
      setIsNotifyModalOpen(false);
      resetNotifyFields();
    } catch (error) {
      console.error("Error submitting notification:", error);
      message.error("Failed to submit notification. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const resetNotifyFields = () => {
    setSelectedNotifyState(null);
    setSelectedNotifyDistrict(null);
    setSelectedNotifyHospitals([]);
    setSelectedNotifyBloodGroup(null);
    setSelectedNotifyComponent(null);
    setNotifyEmail("");
    setNotifyMobile("");
  };

  const handleNotifyModalOpen = () => {
    setSelectedNotifyState(selectedState || null);
    setSelectedNotifyDistrict(selectedDistrict || null);
    setSelectedNotifyBloodGroup(selectedBloodGroup || null);
    setSelectedNotifyComponent(selectedComponent || null);

    if (selectedHospital) {
      setSelectedNotifyHospitals([selectedHospital]);
    } else {
      setSelectedNotifyHospitals([]);
    }

    if (selectedState) {
      const selectedStateData = states.find(
        (state) => state.stateCode === selectedState
      );
      setNotifyDistricts(selectedStateData?.districts || []);
      fetchNotifyBloodBanks(selectedState, selectedDistrict);
    }

    setIsNotifyModalOpen(true);
  };

  return (
    <div className="page_wrapper gradient_style page-wrapper">
      <div className="container">
        <h2 className="header-page mb-2 pt-3">Blood Availability</h2>
        <div className="d-flex flex-wrap gap-1 container-style">
          {!fromDonorAdmin && (
            <div className="input-wrapper-field">
              <label className="form-label mb-0">Select Services</label>
              <Select
                showSearch
                style={{ width: "100%" }}
                placeholder={getPageName()}
                onChange={handleServiceChange}
                filterOption={(input, option) =>
                  (option?.label ?? "")
                    .toLowerCase()
                    .includes(input.toLowerCase())
                }
                options={[
                  { value: "service1", label: "Blood Availability" },
                  { value: "service2", label: "Camp Schedule" },
                  { value: "service3", label: "Blood Center Directory" },
                ]}
              />
            </div>
          )}
          <div className="input-wrapper-field">
            <label className="form-label mb-0">Select State</label>
            <Select
              showSearch
              allowClear
              style={{ width: "100%" }}
              value={selectedState}
              onChange={handleStateChange}
              placeholder="Select"
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
          </div>
          <div className="input-wrapper-field">
            <label className="form-label mb-0">Select District</label>
            <Select
              showSearch
              allowClear
              style={{ width: "100%" }}
              value={selectedDistrict}
              onChange={handleDistrictChange}
              placeholder="Select"
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
          </div>
          <div className="input-wrapper-field">
            <label className="form-label mb-0">Select Blood Center</label>
            <AutoComplete
              allowClear
              style={{ width: "100%" }}
              placeholder="Type hospital name"
              value={bloodCenterInput}
              onChange={(value, option) => {
                setBloodCenterInput(value);
                setSelectedHospital(option ? option.item : null);
              }}
              options={bloodBanks
                .filter((bank) =>
                  bank.hospitalName
                    .toLowerCase()
                    .includes(bloodCenterInput.toLowerCase())
                )
                .map((bank) => ({
                  value: bank.hospitalName,
                  label: bank.hospitalName,
                  item: bank,
                }))}
              filterOption={false}
            />
          </div>
          <div className="input-wrapper-field">
            <label className="form-label mb-1">Select Blood Group</label>
            <Select
              showSearch
              allowClear
              style={{ width: "100%" }}
              value={selectedBloodGroup}
              onChange={setSelectedBloodGroup}
              placeholder="Select Blood"
              filterOption={(input, option) =>
                (option?.label ?? "")
                  .toLowerCase()
                  .includes(input.toLowerCase())
              }
              options={[
                { value: null, label: "All" },
                ...bloodGroups.map((bloodGroup) => ({
                  value: bloodGroup.bloodGroupCode,
                  label: bloodGroup.bloodGroupName,
                })),
              ]}
            />
          </div>

          <div className="input-wrapper-field">
            <label className="form-label mb-1">Select Blood Component</label>
            <Select
              showSearch
              allowClear
              style={{ width: "100%" }}
              value={selectedComponent}
              onChange={setSelectedComponent}
              placeholder="Select Blood Component"
              filterOption={(input, option) =>
                (option?.label ?? "")
                  .toLowerCase()
                  .includes(input.toLowerCase())
              }
              options={componentList.map((component) => ({
                value: component.componentCode,
                label: component.componentName,
              }))}
            />
          </div>
          <div className="input-wrapper button-wrapper">
            <button
              className="px-5 btn btn-primary-signIn"
              onClick={handleSearch}
              disabled={loading}
            >
              {loading ? <Spin size="small" /> : "Search"}
            </button>
          </div>
        </div>
        <div className="d-xl-flex d-lg-flex d-md-flex d-sm-flex align-items-center justify-content-between mt-3 mb-3">
          <div className="d-flex align-items-center">
            <p className="mb-0 searchResult me-2">Selected Fields</p>
            <p className="mb-0 resultData px-2">{getSelectedFieldsDisplat()}</p>
          </div>
          <div>
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
            sNo: (currentPage - 1) * pageSize + index + 1,
            uniqueKey:
              item.uniqueKey || `${(currentPage - 1) * pageSize + index}`,
          }))}
          components={{ body: { row: CustomBodyRow } }}
          rowKey="uniqueKey"
          pagination={false}
          className="mt-3 blood_availability_table"
          scroll={{ x: 1000 }}
          loading={loading}
        />
        <div className="d-flex align-items-center mb-3 justify-content-end">
          {/* <div className="px-2 py-1 notify_box d-flex align-items-center">
            <p className="notify_text mb-0">
              Can't find your Blood Group/Component
            </p>
            <div
              className="d-flex align-items-center notify_bell ms-2"
              style={{ cursor: "pointer" }}
              onClick={handleNotifyModalOpen}
            >
              <p style={{ padding: "1px 10px" }} className="mb-0">
                Notify Me
              </p>
            </div>
          </div> */}
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

      <Modal
        open={isModalOpen}
        onCancel={handleCancel}
        footer={null}
        className="details_modal"
      >
        {selectedRecord && (
          <div>
            <p className="mb-0 modal_header">Blood Center Name</p>
            <p className="mb-1 hospName">{selectedRecord.hospitalname}</p>
            <p className="mb-1 hospAdd">{selectedRecord.hospitaladd}</p>
            <p
              className="mb-1 hospAdd pb-2"
              style={{ borderBottom: "2px solid #E6E6E6" }}
            >
              {(() => {
                const contactInfo = {
                  Phone: "",
                  Fax: "",
                  Email: "",
                };

                // Parse the contact string
                selectedRecord.hospitalcontact.split(",").forEach((item) => {
                  const [label, value] = item
                    .split(":")
                    .map((part) => part.trim());
                  if (label === "Phone") {
                    // Take only the first phone number if multiple exist
                    const firstPhone = value.split(",")[0].trim();
                    contactInfo.Phone = firstPhone;
                  } else if (label in contactInfo) {
                    contactInfo[label] = value;
                  }
                });

                return (
                  <div className="hospital-contact">
                    <div className="contact-line">
                      {contactInfo.Phone && (
                        <span className="me-3">
                          <span className="labelStyle">Phone:</span>{" "}
                          <span className="hospAdd">{contactInfo.Phone}</span>
                        </span>
                      )}
                      {contactInfo.Fax && contactInfo.Fax !== "-" && (
                        <span className="me-3">
                          <span className="labelStyle">Fax:</span>{" "}
                          <span className="hospAdd">{contactInfo.Fax}</span>
                        </span>
                      )}
                      {(!contactInfo.Fax || contactInfo.Fax === "-") &&
                        contactInfo.Email && (
                          <span className="me-3">
                            <span className="labelStyle">Email:</span>{" "}
                            <span className="hospAdd">{contactInfo.Email}</span>
                          </span>
                        )}
                    </div>
                    {contactInfo.Fax &&
                      contactInfo.Fax !== "-" &&
                      contactInfo.Email && (
                        <div className="contact-line">
                          <span className="me-3">
                            <span className="labelStyle">Email:</span>{" "}
                            <span className="hospAdd">{contactInfo.Email}</span>
                          </span>
                        </div>
                      )}
                  </div>
                );
              })()}
            </p>
            <p
              className="mb-1 mt-2"
              style={{ fontSize: "14px", fontWeight: "500", color: "#000" }}
            >
              Send Blood Center Details
            </p>
            <div className="d-flex">
              <div className="d-flex flex-column">
                <Input
                  className="me-3"
                  value={emailAddress}
                  onChange={(e) => setEmailAddress(e.target.value)}
                  placeholder="Your EmailID"
                  onBlur={() => {
                    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                    if (emailAddress && !emailRegex.test(emailAddress)) {
                      setEmailError("Invalid email address");
                    } else {
                      setEmailError("");
                    }
                  }}
                />
                {emailError && (
                  <div style={{ color: "#7F0210" }}>{emailError}</div>
                )}
              </div>
              <Button onClick={handleSendEmail} type="primary">
                {" "}
                Send{" "}
              </Button>
              <Button
                onClick={handleWhatsAppShare}
                style={{
                  border: "1px solid #2AB540",
                  marginLeft: 8,
                  background: "#fff",
                  color: "#2AB540",
                  fontWeight: "400",
                  fontSize: "14px",
                }}
                type="primary"
              >
                <img src={`${process.env.PUBLIC_URL}/assets/images/whatsapp-logo.svg`} />
                Whatsapp
              </Button>
            </div>
          </div>
        )}
      </Modal>

      {/* Notify Modal */}
      <Modal
        title="Tell Us Your requirement"
        open={isNotifyModalOpen}
        className="notify_modal"
        onCancel={() => setIsNotifyModalOpen(false)}
        footer={[
          <Button
            key="submit"
            type="primary"
            onClick={handleNotifySubmit}
            loading={loading}
          >
            Submit
          </Button>,
        ]}
      >
        <div className="row">
          <div className="col-6">
            <div className="input-wrapper-field mb-2">
              <label className="form-label mb-0">Select State*</label>
              <Select
                showSearch
                allowClear
                style={{ width: "100%" }}
                placeholder="Select"
                value={selectedNotifyState}
                onChange={handleNotifyStateChange}
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
          </div>
          <div className="col-6">
            <div className="input-wrapper-field mb-2">
              <label className="form-label mb-0">Select District*</label>
              <Select
                showSearch
                allowClear
                style={{ width: "100%" }}
                placeholder="Select"
                value={selectedNotifyDistrict}
                onChange={handleNotifyDistrictChange}
                filterOption={(input, option) => {
                  const label = option?.label ?? "";
                  return label.toLowerCase().includes(input.toLowerCase());
                }}
                options={notifyDistricts.map((district) => ({
                  value: district.districtCode,
                  label: district.districtName,
                }))}
              />
            </div>
          </div>
          <div className="col-12">
            <div className="input-wrapper-field mb-2">
              <label className="form-label mb-0">
                Select Blood Center(s)* (Max 5)
              </label>
              <Select
                mode="multiple"
                maxCount={5}
                style={{ width: "100%" }}
                placeholder="Select hospitals"
                value={selectedNotifyHospitals.map((h) => h.hospitalCode)}
                onChange={(values, options) => {
                  setSelectedNotifyHospitals(options.map((opt) => opt.item));
                }}
                options={notifyBloodBanks.map((bank) => ({
                  value: bank.hospitalCode,
                  label: bank.hospitalName,
                  item: bank,
                }))}
                filterOption={(input, option) =>
                  option.label.toLowerCase().includes(input.toLowerCase())
                }
              />
            </div>
          </div>
          <div className="col-6">
            <div className="input-wrapper-field mb-2">
              <label className="form-label mb-1">Select Blood Group*</label>
              <Select
                showSearch
                allowClear
                style={{ width: "100%" }}
                placeholder="Select Blood"
                value={selectedNotifyBloodGroup}
                onChange={setSelectedNotifyBloodGroup}
                filterOption={(input, option) =>
                  (option?.label ?? "")
                    .toLowerCase()
                    .includes(input.toLowerCase())
                }
                options={bloodGroups.map((bloodGroup) => ({
                  value: bloodGroup.bloodGroupCode,
                  label: bloodGroup.bloodGroupName,
                }))}
              />
            </div>
          </div>
          <div className="col-6">
            <div className="input-wrapper-field mb-2">
              <label className="form-label mb-1">Select Blood Component</label>
              <Select
                showSearch
                allowClear
                style={{ width: "100%" }}
                placeholder="Select Blood Component"
                value={selectedNotifyComponent}
                onChange={setSelectedNotifyComponent}
                filterOption={(input, option) =>
                  (option?.label ?? "")
                    .toLowerCase()
                    .includes(input.toLowerCase())
                }
                options={componentList.map((component) => ({
                  value: component.componentCode,
                  label: component.componentName,
                }))}
              />
            </div>
          </div>
          <div className="col-6">
            <div className="input-wrapper-field mb-2">
              <label className="form-label mb-0">Enter Email*</label>
              <Input
                value={notifyEmail}
                onChange={(e) => setNotifyEmail(e.target.value)}
                placeholder="Enter Email ID"
                onBlur={() => {
                  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                  if (notifyEmail && !emailRegex.test(notifyEmail)) {
                    setEmailError("Invalid email address");
                  } else {
                    setEmailError("");
                  }
                }}
              />
              {emailError && (
                <div style={{ color: "#7F0210" }}>{emailError}</div>
              )}
            </div>
          </div>
          <div className="col-6">
            <div className="input-wrapper-field mb-2">
              <label className="form-label mb-0">Enter Mobile No.</label>
              <Input
                value={notifyMobile}
                onChange={(e) => {
                  const value = e.target.value;
                  if (/^\d{0,10}$/.test(value)) {
                    setNotifyMobile(value);
                  }
                }}
                placeholder="Mobile No."
                maxLength={10}
              />
            </div>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default BloodAvailabiltySearch;
