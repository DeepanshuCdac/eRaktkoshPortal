import React from "react";
import { useCertificate } from "../context/CertificateContext";
import { generateCertificate } from "../utils/generateCertificate";
import { Button, Table, Tag } from "antd";

export default function DonorAdminHome({ onViewAllClick }) {
  const { certificateData, loading, error } = useCertificate();

  const isDataValid =
    Array.isArray(certificateData) && certificateData.length > 0;

  const onChange = (pagination, filters, sorter, extra) => {
    console.log("params", pagination, filters, sorter, extra);
  };

  function abbreviateText(text) {
    const maxLength = 24;
    if (text.length <= maxLength) {
      return text;
    }
    return `${text.slice(0, maxLength - 3)}...`;
  }

  const recentCertificates = isDataValid
    ? [...certificateData]
        .sort((a, b) => new Date(b.date) - new Date(a.date))
        .slice(0, 4)
        .map((item, index) => ({
          key: index + 1,
          serialNumber: index + 1,
          donationDate: item.date || "-",
          bloodBankName: item.bloodbank || "-",
          location: item.districtName || "-",
          status: "Completed",
          action: item,
        }))
    : [];

  const columns = [
    {
      title: "S.No.",
      dataIndex: "serialNumber",
      key: "serialNumber",
    },
    {
      title: "Donation Date",
      dataIndex: "donationDate",
      sorter: (a, b) => new Date(a.donationDate) - new Date(b.donationDate),
      key: "donationDate",
    },
    {
      title: "Blood Center Name",
      dataIndex: "bloodBankName",
      key: "bloodBankName",
      render: (text) => abbreviateText(text),
    },
    {
      title: "Location",
      dataIndex: "location",
      key: "location",
    },
    {
      title: "Donation Status",
      dataIndex: "status",
      key: "status",
      render: (status) => <Tag>{status}</Tag>,
    },
    {
      title: "Action",
      key: "action",
      render: (_, record) => (
        <>
          <div className="downlaod_box">
            <img src="assets/images/download.svg" alt="" />
            <Button
              type="link"
              className="ms-1"
              onClick={() => generateCertificate(record.action)}
            >
              Download
            </Button>
          </div>
        </>
      ),
    },
  ];

  return (
    <>
      <div className="tabContent mb-3">
        <div className="tabContainer">
          <div className="row">
            <div className="col-6">
              <div className="abha_widget p-3">
                <div className="d-flex align-items-center">
                  <img src="assets/images/abha.svg" alt="" />
                  <div className="d-flex align-items-center justify-content-between w-100">
                    <div className="ms-3">
                      <p className=" mb-0 abha_text">Generate/Verify ABHA</p>
                      <p className="mb-0 abha_subtext">
                        Create Your Digital Health ID & Access Seamless <br />{" "}
                        Healthcare Services.
                      </p>
                    </div>
                    <Button type="primary">Download & Verify ABHA</Button>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-6">
              <div className="donor_widget p-3 h-100 d-flex align-items-center">
                <div>
                  <p className="mb-0 donor_text">
                    You recently donated blood on
                  </p>
                  <p className="mb-0 donor_date">
                    {recentCertificates.length > 0
                      ? recentCertificates[0].donationDate
                      : "N/A"}
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="d-flex mb-0 w-100 mt-4">
            <h4 className="table_header mb-1 me-auto">
              Recent Donations & Certificates
            </h4>
            <a href="javascript:void(0)" onClick={onViewAllClick}>
              View All
            </a>
          </div>

          {loading && <div>Loading certificate data...</div>}
          {/* {error && (
            <div className="text-danger">
              No Donation Record Found.
            </div>
          )} */}

          <Table
            dataSource={recentCertificates}
            columns={columns}
            onChange={onChange}
            loading={loading}
            pagination={false}
            locale={{
              emptyText: "No donation records found",
            }}
          />

          <div className="d-flex mb-0 w-100 mt-4">
            <h4 className="table_header mb-1 me-auto">
              Inspiring quotes fom Real Heroes
            </h4>
          </div>
          <div>
            <div className="bg_inspire align-items-center justify-content-around">
              <div style={{ position: "relative" }}>
                <span class="carousel-quote quote-top-left">“</span>
                <span class="carousel-quote quote-bottom-right">”</span>
                <p className="inspire_text mb-0 text-center">
                  Donating blood isn't just saving lives — it's <br /> giving
                  someone a chance to hug their family <br /> again.
                </p>
              </div>
              <div className="d-flex align-items-center">
                <img src="assets/images/male.png" alt="" />
                <div className="ms-2">
                  <p className="mb-0 name">CDAC</p>
                  <p className="mb-0 designation">Noida</p>
                </div>
              </div>
              <img src="assets/images/doc.svg" alt="" />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
