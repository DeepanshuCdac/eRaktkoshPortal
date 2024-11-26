import React, { useState } from "react";
import { useCertificate } from "../context/CertificateContext";
import { generateCertificate } from "../utils/generateCertificate";

import { Pagination } from "antd";
import dayjs from "dayjs";

const DonationCertificate = ({ onBack }) => {
  const { certificateData, loading, error } = useCertificate();
  const [view, setView] = useState("list");
  const [searchTerm, setSearchTerm] = useState("");

  const [currentPage, setCurrentPage] = useState(1); // State for current page
  const pageSize = 9; // Number of items per page

  // Check if the certificateData is an array and contains data
  const isDataValid = Array.isArray(certificateData) && certificateData.length > 0;

  const filteredData = isDataValid
    ? certificateData.filter((item) => {
      const bloodbankMatches = item.bloodbank?.toLowerCase().includes(searchTerm.toLowerCase());
      const donationDateMatches = item.date
        ? dayjs(item.date, "DD-MMM-YY").format("DD-MMM-YY").includes(searchTerm)
        : false

      // Match either bloodbank name or donation date
      return bloodbankMatches || donationDateMatches;
    })
    : [];

  // Paginate data
  const paginatedData = filteredData.slice((currentPage - 1) * pageSize, currentPage * pageSize);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  function abbreviateText(text) {
    const maxLength = 24;

    // if the text is in limit return same
    if (text.length <= maxLength) {
      return text;
    }
    // else truncate and add ellipsis
    return `${text.slice(0, maxLength - 3)}...`;
  }

  return (
    <>

      <div className="back mb-3">
        <button className="back_btn" onClick={onBack}>
          <img src="assets/images/backBtn.png" alt="" />
          Back
        </button>
      </div>

      <div className="certificate-functions mb-2 d-flex align-items-center justify-content-between">
        <h4 className="widgeHeader mb-0">Donor Certificate</h4>
        <div className="d-flex">
          <div className="ms-1 toggle d-flex align-items-center">

            {/* list view */}
            <div className={`toggle-list d-flex align-items-center justify-content-center ${view === "list" ? "active" : ""}`}
              onClick={() => setView("list")}
              style={{
                cursor: "pointer",
                backgroundColor: view === "list" ? "#C0222B" : "#fff"
              }}
            >
              <img
                className="me-2"
                src="assets/images/toggle-inactive.png"
                alt="Active Toggle"
                style={{
                  display: view === "list" ? "block" : "none",
                  filter: "invert(100%) brightness(200%)"
                }}
              />
              <img
                src="assets/images/toggle-list.png"
                alt="List Icon"
                style={{
                  filter: view === "list" ? "invert(100%) brightness(200%)" : "none",
                  width: "14px",
                  height: "14px",
                }}
              />
            </div>

            {/* tabular view */}
            <div className={`toggle-table d-flex align-items-center justify-content-center ${view === "table" ? "active" : ""}`}
              onClick={() => setView("table")}
              style={{
                cursor: "pointer",
                backgroundColor: view === "table" ? "#C0222B" : "#fff"
              }}
            >
              <img
                className="me-2"
                src="assets/images/toggle-inactive.png"
                alt="Active Toggle"
                style={{
                  display: view === "table" ? "block" : "none",
                  filter: "invert(100%) brightness(200%)"
                }}
              />
              <img
                src="assets/images/toggle-table.png"
                alt="Table Icon"
                style={{
                  filter: view === "table" ? "invert(100%) brightness(200%)" : "none"
                }}
              />
            </div>
          </div>
          <div className="ms-1 search d-flex align-items-center">
            <div className="d-flex search-input align-items-center">
              <img className="img-fluid me-2" style={{ height: "14px", width: "14px" }} src="assets/images/search.png" alt="" />
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                style={{ fontSize: "14px" }}
                className="form-control"
                placeholder="Search "
              />
            </div>
          </div>
        </div>
      </div>

      {view === "list" && (
        <div className="widget p-4 pb-0">
          {loading && <div className="pb-4">Loading certificate data...</div>}
          {error && <div className="text-danger">Error loading certificate data: {error}</div>}
          {!loading && !error && paginatedData.length > 0 ? (
            <div className="row">
              {paginatedData.map((item, index) => (
                <div key={index} className="col-xl-4 mb-4">
                  <div className="d-flex align-items-start">
                    <img style={{ height: "30px" }} src="assets/images/pdf.png" alt="Pdf" />
                    <div style={{ marginLeft: "12px" }}>
                      <p className="mb-0 widgeText">{abbreviateText(item.bloodbank || "Unknown Hospital")}</p>
                      <p className="mb-0 donationTxt">
                        Donation Date:{" "}
                        <span className="mb-0 donation-date">{item.date || "N/A"}</span>
                      </p>
                      <button className="btn btn-link p-0" onClick={() => generateCertificate(item)}>
                        Download
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            !loading && !error && <div className="pb-4">No donation records found.</div>
          )}
        </div>
      )}

      {view === "table" && <div className="widgetTable p-4">
       <div className="">
       <table className="table">
          <thead>
            <tr>
              <th scope="col">Donation Date</th>
              <th scope="col">Blood Bank Name</th>
              <th scope="col">Appreciation Certificate</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <th scope="row">11th Oct 2024</th>
              <td>AIIMS Delhi</td>
              <td>Download</td>
            </tr>
            <tr>
            <th scope="row">11th Oct 2024</th>
              <td>AIIMS Delhi</td>
              <td>Download</td>
            </tr>
            <tr>
            <th scope="row">11th Oct 2024</th>
              <td>AIIMS Delhi</td>
              <td>Download</td>
            </tr>
          </tbody>
        </table>

       </div>
      </div>}

      {/* Ant Design Pagination */}
      <div className="pagination-container mt-4 mb-3">
        <Pagination
          total={filteredData.length}
          pageSize={pageSize}
          current={currentPage}
          onChange={handlePageChange}
          showTotal={(total, range) => `${range[0]}-${range[1]} of ${total} items`}
        />
      </div>
    </>
  )
}


export default DonationCertificate;
