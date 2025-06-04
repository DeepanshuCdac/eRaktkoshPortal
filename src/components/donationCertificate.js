import React, { useState } from "react";
import { useCertificate } from "../context/CertificateContext";
import { generateCertificate } from "../utils/generateCertificate";
import { Table, Tag, Pagination, Input, Button } from "antd";
import dayjs from "dayjs";
import "../../src/scss/donationCertificate.scss";

const DonationCertificate = ({ onBack }) => {
  const { certificateData, loading, error } = useCertificate();
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 10; // Set your preferred page size

  const isDataValid =
    Array.isArray(certificateData) && certificateData.length > 0;

  function abbreviateText(text) {
    const maxLength = 24;
    if (text.length <= maxLength) {
      return text;
    }
    return `${text.slice(0, maxLength - 3)}...`;
  }

  // Filter data based on search term
  const filteredData = isDataValid
    ? certificateData.filter((item) => {
        const bloodbankMatches = item.bloodbank
          ?.toLowerCase()
          .includes(searchTerm.toLowerCase());
        const donationDateMatches = item.date
          ? dayjs(item.date, "DD-MMM-YY")
              .format("DD-MMM-YY")
              .includes(searchTerm)
          : false;
        return bloodbankMatches || donationDateMatches;
      })
    : [];

  // Sort by date (newest first) and paginate
  const sortedData = [...filteredData].sort(
    (a, b) => new Date(b.date) - new Date(a.date)
  );
  const paginatedData = sortedData.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize
  );

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  // Table columns configuration
  const columns = [
    {
      title: "S.No.",
      dataIndex: "serialNumber",
      key: "serialNumber",
      render: (text, record, index) => (currentPage - 1) * pageSize + index + 1,
    },
    {
      title: "Donation Date",
      dataIndex: "date",
      key: "date",
      sorter: (a, b) => new Date(a.date) - new Date(b.date),
      render: (date) => date || "N/A",
    },
    {
      title: "Blood Center Name",
      dataIndex: "bloodbank",
      key: "bloodbank",
      render: (text) => abbreviateText(text || "Unknown Hospital"),
    },
    {
      title: "Location",
      dataIndex: "districtName",
      key: "location",
      render: (location) => location || "N/A",
    },
    {
      title: "Donation Status",
      key: "status",
      render: () => <Tag>Completed</Tag>,
    },
    {
      title: "Action",
      key: "action",
      render: (_, record) => (
        <>
          <div className="downlaod_box">
            <img src="assets/images/download.svg" alt="" />
            <Button type="link" className="ms-1" onClick={() => generateCertificate(record)}>
              Download
            </Button>
          </div>
        </>
      ),
    },
  ];

  return (
    <>
      <div className="back mb-1">
        <button className="back_btn p-0" onClick={onBack}>
          <img src="assets/images/backBtn.png" alt="" />
          Back
        </button>
      </div>

      <div className="certificate-functions mb-2 d-flex align-items-center justify-content-between">
        <h4 className="table_header mb-0">Previous Donations & Certificates</h4>
        <div className="d-flex">
          <div className="ms-1 search d-flex align-items-center">
            <div className="d-flex search-input align-items-center">
              <img
                className="img-fluid me-2"
                style={{ height: "14px", width: "14px" }}
                src="assets/images/search.png"
                alt=""
              />
              <Input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                style={{ fontSize: "14px" }}
                className="form-control"
                placeholder="Search by blood center or date"
              />
            </div>
          </div>
        </div>
      </div>

      <div className="tabContent">
        {loading && <div className="pb-4">Loading certificate data...</div>}
        {error && (
          <div className="text-danger">
            Error loading certificate data: {error}
          </div>
        )}

        <Table
          columns={columns}
          dataSource={paginatedData}
          loading={loading}
          pagination={false}
          locale={{
            emptyText: !loading && !error ? "No donation records found" : null,
          }}
          rowKey={(record, index) => index}
        />

        <div className="pagination-container mt-4 mb-3">
          <Pagination
            total={filteredData.length}
            pageSize={pageSize}
            current={currentPage}
            onChange={handlePageChange}
            showTotal={(total, range) =>
              `${range[0]}-${range[1]} of ${total} items`
            }
          />
        </div>
      </div>
    </>
  );
};

export default DonationCertificate;
