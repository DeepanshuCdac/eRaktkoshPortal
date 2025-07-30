import React, { useState } from "react";
import {
  CaretRightOutlined,
  PlusOutlined,
  MinusOutlined,
} from "@ant-design/icons";
import { TabsProps, Button, Collapse, theme, Tabs } from "antd";

export default function Service() {
  const onChange = () => {
    console.log();
  };

  const text = {
    blood_availability:
      "The Blood Availability Search lets users quickly check real-time blood availability across registered blood center. By selecting State, District, Blood Group, Component and Location, users can easily find the required units. This tool supports patients, donors, and hospitals in making informed decisions during emergencies or planned treatments.",
    blood_center_directory:
      "The Blood Availability Search lets users quickly check real-time blood availability across registered blood center. By selecting State, District, Blood Group, Component and Location, users can easily find the required units. This tool supports patients, donors, and hospitals in making informed decisions during emergencies or planned treatments.",
    blood_donation_camps:
      "The Blood Availability Search lets users quickly check real-time blood availability across registered blood center. By selecting State, District, Blood Group, Component and Location, users can easily find the required units. This tool supports patients, donors, and hospitals in making informed decisions during emergencies or planned treatments.",
    donor_login:
      "The Blood Availability Search lets users quickly check real-time blood availability across registered blood center. By selecting State, District, Blood Group, Component and Location, users can easily find the required units. This tool supports patients, donors, and hospitals in making informed decisions during emergencies or planned treatments.",
    register_voluntary_camp:
      "The Blood Availability Search lets users quickly check real-time blood availability across registered blood center. By selecting State, District, Blood Group, Component and Location, users can easily find the required units. This tool supports patients, donors, and hospitals in making informed decisions during emergencies or planned treatments.",
  };

  const content_image = {
    blood_availability: "assets/landingPage/blood_availability_content.png",
    blood_center_directory: "assets/landingPage/blood_availability_content.png",
    blood_donation_camps: "assets/landingPage/blood_availability_content.png",
    donor_login: "assets/landingPage/blood_availability_content.png",
    register_voluntary_camp:
      "assets/landingPage/blood_availability_content.png",
  };

  const items = [
    {
      key: "1",
      label: (
        <div className="text-center">
          <img src="assets/landingPage/blood_availability_search.png" alt="" />
          <p className="mb-0 mt-2 tab__header__text">
            Blood Availability Search
          </p>
        </div>
      ),
      children: (
        <div className="d-flex">
          <div style={{ flex: 1 }}>
            <p className="">{text.blood_availability}</p>
            <Button className="btn__outlined">Blood Availability Search</Button>
          </div>
          <div style={{ flex: 1 }} className="d-flex justify-content-end">
            <img src={content_image.blood_availability} alt="" />
          </div>
        </div>
      ),
    },
    {
      key: "2",
      label: (
        <div className="text-center">
          <img src="assets/landingPage/blood_center_directory.png" alt="" />
          <p className="mb-0 mt-2 tab__header__text">Blood Center Directory</p>
        </div>
      ),
      children: (
        <div className="d-flex">
          <div style={{ flex: 1 }}>
            <p className="">{text.blood_center_directory}</p>
            <Button className="btn__outlined">Blood Center Directory</Button>
          </div>
          <div style={{ flex: 1 }} className="d-flex justify-content-end">
            <img src={content_image.blood_center_directory} alt="" />
          </div>
        </div>
      ),
    },
    {
      key: "3",
      label: (
        <div className="text-center">
          <img src="assets/landingPage/blood_donation_camp.png" alt="" />
          <p className="mb-0 mt-2 tab__header__text">Blood Donation Camps</p>
        </div>
      ),
      children: (
        <div className="d-flex">
          <div style={{ flex: 1 }}>
            <p className="">{text.blood_donation_camps}</p>
            <Button className="btn__outlined">Blood Donation Camps</Button>
          </div>
          <div style={{ flex: 1 }} className="d-flex justify-content-end">
            <img src={content_image.blood_donation_camps} alt="" />
          </div>
        </div>
      ),
    },
    {
      key: "4",
      label: (
        <div className="text-center">
          <img src="assets/landingPage/donor_login.png" alt="" />
          <p className="mb-0 mt-2 tab__header__text">Donor Login</p>
        </div>
      ),
      children: (
        <div className="d-flex">
          <div style={{ flex: 1 }}>
            <p className="">{text.donor_login}</p>
            <Button className="btn__outlined">Donor Login</Button>
          </div>
          <div style={{ flex: 1 }} className="d-flex justify-content-end">
            <img src={content_image.donor_login} alt="" />
          </div>
        </div>
      ),
    },
    {
      key: "5",
      label: (
        <div className="text-center">
          <img src="assets/landingPage/register_voluntary.png" alt="" />
          <p className="mb-0 mt-2 tab__header__text">
            Register Voluntary Blood Camps
          </p>
        </div>
      ),
      children: (
        <div className="d-flex">
          <div style={{ flex: 1 }}>
            <p className="">{text.register_voluntary_camp}</p>
            <Button className="btn__outlined">Register Voluntary Camps</Button>
          </div>
          <div style={{ flex: 1 }} className="d-flex justify-content-end">
            <img src={content_image.register_voluntary_camp} alt="" />
          </div>
        </div>
      ),
    },
  ];

  const btnLink = {
    blood_availability: "Find Blood Availability",
    blood_center_directory: "Blood Center Directory",
    blood_donation_camps: "Blood Donation Camps",
    donor_login: "Donor Login",
    register_voluntary_camp: "Register Voluntary Camp",
  };

  const getItems = (panelStyle) => [
    {
      key: "1",
      label: (
        <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
          <img
            src="assets/landingPage/blood_availability_search.png"
            alt="Blood Availability"
            style={{ width: "30px", height: "30px", objectFit: "contain" }}
          />
          <span className="tab__header__text">Blood Availability Search</span>
        </div>
      ),
      children: (
        <div className="d-flex flex-column align-items-center">
          <div className="mb-2">
            <p>{text.blood_availability}</p>
            <Button className="btn__outlined">
              {btnLink.blood_availability}
            </Button>
          </div>
          <img src={content_image.blood_availability} alt="" />
        </div>
      ),
      style: panelStyle,
    },
    {
      key: "2",
      label: (
        <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
          <img
            src="assets/landingPage/blood_center_directory.png"
            alt="Blood Center Directory"
            style={{ width: "30px", height: "30px", objectFit: "contain" }}
          />
          <span className="tab__header__text">Blood Center Directory</span>
        </div>
      ),
      children: (
        <div className="d-flex flex-column align-items-center">
          <div className="mb-2">
            <p>{text.blood_center_directory}</p>
            <Button className="btn__outlined">
              {btnLink.blood_center_directory}
            </Button>
          </div>
          <img src={content_image.blood_center_directory} alt="" />
        </div>
      ),
      style: panelStyle,
    },
    {
      key: "3",
      label: (
        <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
          <img
            src="assets/landingPage/blood_donation_camp.png"
            alt="Blood Donation Camp"
            style={{ width: "30px", height: "30px", objectFit: "contain" }}
          />
          <span className="tab__header__text">Blood Donation Camps</span>
        </div>
      ),
      children: (
        <div className="d-flex flex-column align-items-center">
          <div className="mb-2">
            <p>{text.blood_donation_camps}</p>
            <Button className="btn__outlined">
              {btnLink.blood_donation_camps}
            </Button>
          </div>
          <img src={content_image.blood_donation_camps} alt="" />
        </div>
      ),
      style: panelStyle,
    },
    {
      key: "4",
      label: (
        <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
          <img
            src="assets/landingPage/donor_login.png"
            alt="Donor Login"
            style={{ width: "30px", height: "30px", objectFit: "contain" }}
          />
          <span className="tab__header__text">Donor Login</span>
        </div>
      ),
      children: (
        <div className="d-flex flex-column align-items-center">
          <div className="mb-2">
            <p>{text.donor_login}</p>
            <Button className="btn__outlined">{btnLink.donor_login}</Button>
          </div>
          <img src={content_image.donor_login} alt="" />
        </div>
      ),
      style: panelStyle,
    },
    {
      key: "5",
      label: (
        <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
          <img
            src="assets/landingPage/register_voluntary.png"
            alt="Register Voluntary Blood Camp"
            style={{ width: "30px", height: "30px", objectFit: "contain" }}
          />
          <span className="tab__header__text">
            Register Voluntary Blood Camp
          </span>
        </div>
      ),
      children: (
        <div className="d-flex flex-column align-items-center">
          <div className="mb-2">
            <p>{text.register_voluntary_camp}</p>
            <Button className="btn__outlined">
              {btnLink.register_voluntary_camp}
            </Button>
          </div>
          <img src={content_image.register_voluntary_camp} alt="" />
        </div>
      ),
      style: panelStyle,
    },
  ];

  const { token } = theme.useToken();
  const panelStyle = {
    marginBottom: 15,
    borderRadius: token.borderRadiusLG,
    border: "none",
  };

  return (
    <>
      <section className="service mt-4">
        <div className="container">
          <div className="service__inner__section">
            <h3 className="section__heading mb-2">Our Services</h3>
            <div className="collapse__menu">
              <Collapse
                bordered={false}
                defaultActiveKey={["1"]}
                expandIcon={({ isActive }) =>
                  isActive ? <MinusOutlined /> : <PlusOutlined />
                }
                style={{ background: token.colorBgContainer }}
                items={getItems(panelStyle)}
              />
            </div>
            <div className="tab__view">
              <Tabs defaultActiveKey="1" items={items} onChange={onChange} />
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
