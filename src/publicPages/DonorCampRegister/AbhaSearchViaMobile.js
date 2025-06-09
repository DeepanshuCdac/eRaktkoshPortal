import React, { useState } from "react";
import { Button, Input, Table, message } from "antd";
import axios from "axios";
import { BaseUrl } from "../../utils/url";

const AbhaSearchViaMobile = ({ 
  mobileNumber, 
  abhaData,
  setMobileNumber, 
  setFlowType, 
  setOtpSent, 
  setLoading, 
  selectedCamp,
  setAbhaData,
  setSelectedAbhaRecord,
  setsearchViaMobTaxId
}) => {
  const [searchLoading, setSearchLoading] = useState(false);

  const searchAbhaNumberViaMobile = async () => {
    try {
      const response = await axios.post(
        `${BaseUrl}/eraktkosh/abha/commonABHACall`,
        {
          mobile: mobileNumber,
          APIKey: "SearchAbhaNumberViaMobile",
          HospitalCode: `campid${selectedCamp?.campReqNo}`,
        }
      );
      return response.data;
    } catch (error) {
      console.error("Error searching ABHA:", error);
      throw error;
    }
  };

  const sendOtpForExistingAbha = async (record) => {
    try {
      const response = await axios.post(
        `${BaseUrl}/eraktkosh/abha/commonABHACall`,
        {
          loginId: record.ABHA.index,
          txnId: record.txnId,
          APIKey: "AbhaSearchRequestOtp",
          HospitalCode: `campid${selectedCamp?.campReqNo}`,
        }
      );

      if (response.data?.txnId) {
        return response.data.txnId;
      }
      throw new Error(response.data?.message || "Failed to send OTP");
    } catch (error) {
      console.error("Error sending OTP for existing ABHA:", error);
      throw error;
    }
  };

  const handleSearch = async () => {
    if (!mobileNumber || mobileNumber.length !== 10) {
      message.error("Please enter a valid 10-digit mobile number");
      return;
    }

    setSearchLoading(true);
    try {
      const responseData = await searchAbhaNumberViaMobile();

      if (Array.isArray(responseData) && responseData.length > 0) {
        const flattenedData = responseData.flatMap((item) =>
          item.ABHA.map((abha) => ({
            txnId: item.txnId,
            ABHA: abha,
          }))
        );

        setAbhaData(flattenedData);
        message.success(`${flattenedData.length} ABHA number(s) found`);
      } else {
        message.info("No ABHA numbers found for this mobile number");
      }
    } catch (error) {
      console.error("Error:", error);
      message.error(
        error.response?.data?.message ||
          "Failed to check for existing ABHA numbers"
      );
    } finally {
      setSearchLoading(false);
    }
  };

  const handleUseExistingAbha = async (record) => {
    setFlowType("existing");
    setSelectedAbhaRecord(record);
    setLoading(true);

    try {
      const txnId = await sendOtpForExistingAbha(record);
      message.success("OTP sent successfully");
      setsearchViaMobTaxId(txnId);
      setOtpSent(true);
      setAbhaData(null);
    } catch (error) {
      message.error(error.message || "Failed to send OTP");
    } finally {
      setLoading(false);
    }
  };

  const columns = [
    {
      title: "ABHA Number",
      dataIndex: "ABHA",
      key: "ABHA",
      render: (abha) => abha?.ABHANumber || "N/A",
    },
    {
      title: "Name",
      dataIndex: "ABHA",
      key: "name",
      render: (abha) => abha?.name || "N/A",
    },
    {
      title: "Gender",
      dataIndex: "ABHA",
      key: "gender",
      render: (abha) => abha?.gender || "N/A",
    },
    {
      title: "Action",
      key: "action",
      render: (_, record) => (
        <Button
          type="primary"
          onClick={() => handleUseExistingAbha(record)}
        >
          Use This ABHA
        </Button>
      ),
    },
  ];

  return (
    <div className="d-flex align-items-end gap-3">
          <div className="form-inputs">
            <Input
              placeholder="Enter mobile number"
              value={mobileNumber}
              onChange={(e) => {
                const value = e.target.value;
                if (/^\d{0,10}$/.test(value)) {
                  setMobileNumber(value);
                }
              }}
              maxLength={10}
            />
          </div>
        <div className="">
          <Button
            onClick={handleSearch}
            loading={searchLoading}
          >
            Verify
          </Button>
        </div>

      {abhaData && (
        <div className="mt-3">
          <Table
            columns={columns}
            dataSource={abhaData}
            rowKey={(record) => record.ABHA?.ABHANumber || Math.random()}
            pagination={false}
          />
        </div>
      )}
    </div>
  );
};

export default AbhaSearchViaMobile;