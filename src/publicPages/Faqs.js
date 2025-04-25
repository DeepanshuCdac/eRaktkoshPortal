import React, { useEffect, useState } from "react";
import '../scss/faq.scss'
import { Collapse, Input, theme } from 'antd';
import { SearchOutlined, CaretRightOutlined } from "@ant-design/icons";
import axios from "axios";
import { BaseUrl } from "../utils/url";

const Faqs = () => {

    const [faqItems, setFaqItems] = useState([]);

    const { token } = theme.useToken();

    const panelStyle = {
        marginBottom: 24,
        // background: token.colorFillAlter,
        borderRadius: token.borderRadiusLG,
        border: 'none',
    };

    const getItems = (style) => {
        return faqItems.map((faq, index) => ({
            key: `${index + 1}`,
            label: faq.faqQuestion,
            children: <p>{faq.faqAnswer}</p>,
            style: style
        }));
    };

    useEffect(() => {
        const fetchFaqs = async () => {
            try {
                const response = await axios.get(`${BaseUrl}/eraktkosh/faq/list`);
                if (Array.isArray(response.data)) {
                    setFaqItems(response.data);
                }
            } catch (error) {
                console.error("Error fetching FAQs:", error);
            }
        };

        fetchFaqs();
    }, []);

    return (
        <>
            <div className="pageWrapper">
                <div className="container">
                    <div className="d-xl-flex d-lg-flex d-md-flex d-sm-flex align-items-center justify-content-between py-3">
                        <div className="d-flex align-items-center">
                            <div className="inside_header">
                                <h4 className="header-page mb-1">FAQ</h4>
                                <div className="d-flex">
                                    <a className="home_link me-2" href="/beta#/">Home</a>
                                    <span className="home_link">&gt;</span>
                                    <a href="javascript:void(0)" className="home_link ms-2">FAQ</a>
                                </div>
                            </div>
                        </div>
                        <div>
                            <Input
                                placeholder="Search FAQ"
                                prefix={<SearchOutlined style={{ color: "#aaa" }} />}
                            />
                        </div>
                    </div>
                </div>
            </div>
            <div className="body_wrapper py-3">
                <div className="container">
                    <p className="mb-3 searchResult">Question Related to</p>
                    <div className="row">
                        <div className="col-9">
                            <Collapse
                                bordered={false}
                                defaultActiveKey={['1']}
                                expandIcon={({ isActive }) => <CaretRightOutlined rotate={isActive ? 90 : 0} />}
                                style={{ background: token.colorBgContainer }}
                                items={getItems(panelStyle)}
                            />
                        </div>
                        <div className="col-3">
                            <p className="mb-3 searchResult">Could not find your question ?</p>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Faqs