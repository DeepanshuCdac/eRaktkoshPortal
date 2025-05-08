import React, { useState, useEffect } from "react";
import { Table, Spin, message, Button } from "antd";
import axios from "axios";
import { BaseUrl } from "../utils/url";

const NestedBloodAvailabilityTable = ({
  hospitalCode,
  selectedState,
  selectedDistrict,
  bloodGroups = [],
  expandedRowKeys,
  uniqueKey,
  onExpandChange,
  isModal = false,
}) => {
  const [loading, setLoading] = useState(false);
  const [nestedData, setNestedData] = useState(null);

  const nestedColumns = [
    { title: "S.No.", dataIndex: "sNo", key: "sNo" },
    {
      title: "Blood Component",
      dataIndex: "bloodComponent",
      key: "bloodComponent",
    },
    ...(bloodGroups || []).map((group) => ({
      title: group.bloodGroupName,
      dataIndex: group.bloodGroupName,
      key: group.bloodGroupCode,
    })),
  ];

  const fetchDetailedComponentData = async () => {
    if (!selectedState) return {};
    try {
      const response = await axios.get(
        `${BaseUrl}/eraktkosh/blood-availability`,
        {
          params: {
            stateCode: selectedState,
            districtId: selectedDistrict || null,
            hospitalCodes: hospitalCode,
          },
        }
      );
      return response.data[0]?.components || {};
    } catch (error) {
      console.error("Error fetching detailed component data:", error);
      return {};
    }
  };

  useEffect(() => {
    const loadNestedData = async () => {
      if (expandedRowKeys === uniqueKey) {
        setLoading(true);
        try {
          const detailedComponents = await fetchDetailedComponentData();
          const nestedDataResult = [];
          let count = 1;

          Object.keys(detailedComponents)
            .filter((component) => component !== "Unknown")
            .forEach((key) => {
              if (!detailedComponents[key]?.available_WithQty) return;

              const result = detailedComponents[key].available_WithQty
                .split(",")
                .reduce((acc, item) => {
                  const [key, value] = item.split(":").map((str) => str.trim());
                  acc[key] = Number(value);
                  return acc;
                }, {});

              nestedColumns.forEach((column) => {
                if (
                  !["sNo", "bloodComponent"].includes(column.dataIndex) &&
                  !result[column.dataIndex]
                ) {
                  result[column.dataIndex] = "-";
                }
              });

              nestedDataResult.push({
                sNo: count++,
                bloodComponent: key,
                ...result,
              });
            });

          setNestedData(nestedDataResult);
        } catch (error) {
          message.error("Failed to load detailed component data");
          console.error(error);
        } finally {
          setLoading(false);
        }
      }
    };

    loadNestedData();
  }, [expandedRowKeys, uniqueKey]);

  return (
    <>
      {!isModal && (
        <Button
          type="link"
          style={{
            color: "#000",
            fontWeight: 500,
            padding: 0,
            background: "#E0EBDB",
            width: "100%",
            textAlign: "left",
          }}
          onClick={() => onExpandChange(uniqueKey)}
        >
          {expandedRowKeys === uniqueKey
            ? "Hide Stock Availability"
            : "View Stock Availability"}
        </Button>
      )}

      {(isModal || expandedRowKeys === uniqueKey) && (
        <div
          style={{
            padding: "6px 0px",
            backgroundColor: "#fff",
            margin: "0",
          }}
        >
          {loading ? (
            <div style={{ textAlign: "center", padding: "24px" }}>
              <Spin size="large" />
            </div>
          ) : (
            <Table
              className="mb-1 nested_table"
              columns={nestedColumns}
              dataSource={nestedData}
              pagination={false}
              rowKey="key"
              scroll={{ x: "max-content" }}
            />
          )}
        </div>
      )}
    </>
  );
};

export default NestedBloodAvailabilityTable;
