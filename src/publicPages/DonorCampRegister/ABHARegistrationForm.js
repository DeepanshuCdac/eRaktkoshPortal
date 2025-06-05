import React from "react";
import { Input, Select, Button } from "antd";

const AbhaRegistrationForm = ({
  formData,
  mobileNumber,
  selectedGender,
  selectedState,
  selectedDistrict,
  states,
  districts,
  genders,
  usingExistingAbha,
  abhaNumber,
  handleNameChange,
  handleAgeChange,
  handleGenderChange,
  handleFormChange,
  handleStateChange,
  handleDistrictChange,
  handleHealthIdChange,
  handleCreateAbhaNumber,
  loading,
}) => {
  return (
    <div>
      <h3 className="mb-1 camp_header">Create ABHA/Camp Pre Registration</h3>
      <div className="widget p-3 mb-3">
        <div className="row">
          <div className="col-4">
            <div className="mb-3 form-inputs">
              <label className="form-label mb-1">
                Name<span className="mendate">*</span>
              </label>
              <Input
                placeholder="Enter your name"
                value={formData.firstName}
                onChange={handleNameChange}
              />
            </div>
          </div>
          <div className="col-4">
            <div className="mb-3 form-inputs">
              <label className="form-label mb-1">
                Age<span className="mendate">*</span>
              </label>
              <Input
                placeholder="Enter your age"
                value={formData.age}
                onChange={handleAgeChange}
              />
            </div>
          </div>
          <div className="col-4">
            <div className="mb-3 form-inputs">
              <label className="form-label mb-1">
                Gender<span className="mendate">*</span>
              </label>
              <Select
                showSearch
                allowClear
                placeholder="Select Gender"
                value={selectedGender}
                onChange={handleGenderChange}
                filterOption={(input, option) =>
                  (option?.label ?? "")
                    .toLowerCase()
                    .includes(input.toLowerCase())
                }
                options={genders.map((gender) => ({
                  value: gender.genderCode,
                  label: gender.genderName,
                }))}
                className="w-100"
              />
            </div>
          </div>
          <div className="col-4">
            <div className="mb-3 form-inputs">
              <label className="form-label mb-1">
                Father Name<span className="mendate">*</span>
              </label>
              <Input
                placeholder="Enter your father's name"
                value={formData.fatherName}
                onChange={handleFormChange("fatherName")}
              />
            </div>
          </div>
          <div className="col-4">
            <div className="mb-3 form-inputs">
              <label className="form-label mb-1">
                Mobile<span className="mendate">*</span>
              </label>
              <Input
                placeholder="Enter your mobile"
                value={mobileNumber}
                readOnly
              />
            </div>
          </div>
          <div className="col-4">
            <div className="mb-3 form-inputs">
              <label className="form-label mb-1">Email</label>
              <Input
                placeholder="Enter your email"
                value={formData.email}
                onChange={handleFormChange("email")}
              />
            </div>
          </div>
          <div className="col-4">
            <div className="mb-3 form-inputs">
              <label className="form-label mb-1">Address<span className="mendate">*</span></label>
              <Input
                placeholder="Enter Address"
                value={formData.address}
                onChange={handleFormChange("address")}
              />
            </div>
          </div>
          <div className="col-4">
            <div className="mb-3 form-inputs">
              <label className="form-label mb-1">
                State<span className="mendate">*</span>
              </label>
              <Select
                showSearch
                allowClear
                placeholder="Select State"
                value={selectedState}
                onChange={handleStateChange}
                filterOption={(input, option) =>
                  (option?.label ?? "")
                    .toLowerCase()
                    .includes(input.toLowerCase())
                }
                options={states.map((state) => ({
                  value: state.stateCode,
                  label: state.stateName,
                }))}
                className="w-100"
              />
            </div>
          </div>
          <div className="col-4 d-flex" style={{ gap: "18px" }}>
            <div className="mb-3 form-inputs" style={{ width: "48%" }}>
              <label className="form-label mb-1">
                District<span className="mendate">*</span>
              </label>
              <Select
                showSearch
                allowClear
                placeholder="Select District"
                value={selectedDistrict}
                onChange={handleDistrictChange}
                disabled={!selectedState}
                filterOption={(input, option) =>
                  (option?.label ?? "")
                    .toLowerCase()
                    .includes(input.toLowerCase())
                }
                options={districts.map((district) => ({
                  value: district.districtCode,
                  label: district.districtName,
                }))}
                className="w-100"
              />
            </div>
            <div className="mb-3 form-inputs" style={{ width: "48%" }}>
              <label className="form-label mb-1">Pincode</label>
              <Input
                placeholder="Enter Pincode"
                value={formData.pincode}
                onChange={handleFormChange("pincode")}
              />
            </div>
          </div>
        </div>
      </div>
      <div className="widget p-3 ">
        <div className="row">
          {!usingExistingAbha ? (
            <div className="col-6 d-flex align-items-center gap-3">
              <p className="mb-0 abha_txt me-2">Enter ABHA Address</p>
              <Input
                placeholder="Enter your ABHA address (e.g., deepanshu124)"
                value={formData.healthId.replace("@sbx", "")}
                onChange={handleHealthIdChange}
                addonAfter="@sbx"
              />
              <Button
                className="px-5 py-3 abha_btn"
                type="primary"
                loading={loading}
                onClick={handleCreateAbhaNumber}
                disabled={!formData.healthId}
              >
                Create ABHA Address
              </Button>
            </div>
          ) : (
            <div className="d-flex">
              <div className="col-6 d-flex align-items-center gap-3">
                <p className="mb-0 abha_txt_key me-2">ABHA Address:</p>
                <p className="mb-0 abha_txt me-2">{formData.healthId}</p>
              </div>
              <div className="col-6 d-flex align-items-center gap-3">
                <p className="mb-0 abha_txt_key me-2">ABHA Number:</p>
                <p className="mb-0 abha_txt me-2">{abhaNumber}</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AbhaRegistrationForm;