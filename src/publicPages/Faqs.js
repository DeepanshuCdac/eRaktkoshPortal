import React, { useEffect, useState } from "react";
import "../scss/faq.scss";
import { Collapse, Input, theme, Button, message } from "antd";
import { SearchOutlined, PlusOutlined, MinusOutlined } from "@ant-design/icons";
import axios from "axios";
import { BaseUrl } from "../utils/url";

const { TextArea } = Input;

const Faqs = () => {
  const [faqItems, setFaqItems] = useState([]);
  const [captchaImage, setCaptchaImage] = useState("");
  const [captchaText, setCaptchaText] = useState("");
  const [userEmail, setUserEmail] = useState("");
  const [emailError, setEmailError] = useState("");
  const [userQuestion, setUserQuestion] = useState("");
  const [userCaptchaInput, setUserCaptchaInput] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [searchText, setSearchText] = useState("");
  const { token } = theme.useToken();
  const [activeFilter, setActiveFilter] = useState("All");

  const panelStyle = {
    marginBottom: 10,
    borderRadius: token.borderRadiusLG,
  };

  const filteredFaqs = faqItems.filter((faq) => {
    const matchesSearch =
      faq.faqQuestion.toLowerCase().includes(searchText.toLowerCase()) ||
      faq.faqAnswer.toLowerCase().includes(searchText.toLowerCase());

    const matchesFilter =
      activeFilter === "All" || faq.faqType === activeFilter;

    return matchesSearch && matchesFilter;
  });

  useEffect(() => {
    const fetchInitialData = async () => {
      try {
        // fetching faq from api...
        const faqResponse = await axios.get(`${BaseUrl}/eraktkosh/faq/list`);
        if (Array.isArray(faqResponse.data)) {
          const faqsWithType = faqResponse.data.map((faq) => {
            // faq filters...
            if (
              faq.faqQuestion.toLowerCase().includes("blood availability") ||
              faq.faqAnswer.toLowerCase().includes("general")
            ) {
              return { ...faq, faqType: "General & Blood Availability" };
            } else if (
              faq.faqQuestion.toLowerCase().includes("donation") ||
              faq.faqAnswer.toLowerCase().includes("camp")
            ) {
              return { ...faq, faqType: "Blood Donation & Camps" };
            } else if (
              faq.faqQuestion.toLowerCase().includes("app") ||
              faq.faqAnswer.toLowerCase().includes("app")
            ) {
              return {
                ...faq,
                faqType: "Blood Center Registration & App Usage",
              };
            } else {
              return { ...faq, faqType: "General & Blood Availability" };
            }
          });
          setFaqItems(faqsWithType);
        }

        // captcha api....
        const captchaResponse = await axios.post(
          `${BaseUrl}/eraktkosh/regenerateCaptcha`
        );
        const data = captchaResponse.data;
        setCaptchaImage(data.captchaImage);
        setCaptchaText(data.captchaText);
        console.log("CAPTCHA fetched:", data);
      } catch (error) {
        console.error("Error fetching initial data:", error);
        message.error("Something went wrong while loading the page.");
      }
    };

    fetchInitialData();
  }, []);

  const fetchCaptcha = async () => {
    try {
      const response = await axios.post(
        `${BaseUrl}/eraktkosh/regenerateCaptcha`
      );
      const data = response.data;
      setCaptchaImage(data.captchaImage);
      setCaptchaText(data.captchaText);
      console.log("CAPTCHA refreshed:", data);
    } catch (error) {
      console.error("Error refreshing CAPTCHA:", error);
      message.error("Unable to refresh CAPTCHA.");
    }
  };

  const handleSubmit = async () => {
    if (!userQuestion || !userEmail || !userCaptchaInput) {
      message.warning("Please fill all fields.");
      return;
    }

    if (userCaptchaInput !== captchaText) {
      message.error("Invalid CAPTCHA. Please try again.");
      fetchCaptcha();
      return;
    }

    setIsSubmitting(true);

    try {
      const payload = {
        email: userEmail,
        question: userQuestion,
      };

      await axios.post(`${BaseUrl}/eraktkosh/faq/submit-question`, payload);

      message.success("Your question has been submitted successfully.");
      setUserEmail("");
      setUserQuestion("");
      setUserCaptchaInput("");
      fetchCaptcha();
    } catch (error) {
      console.error("Error submitting question:", error);
      message.error("Failed to submit question.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <div className="pageWrapper page-wrapper">
        <div className="container">
          <div className="d-xl-flex d-lg-flex d-md-flex d-sm-flex align-items-center justify-content-between py-3">
            <div className="d-flex align-items-center">
              <div className="inside_header">
                <h4 className="header-page mb-1">FAQ</h4>
                <div className="d-flex">
                  <a className="home_link me-2" href="/beta#/">
                    Home
                  </a>
                  <span className="home_link">&gt;</span>
                  <a href="javascript:void(0)" className="home_link ms-2">
                    FAQ
                  </a>
                </div>
              </div>
            </div>
            <div>
              <Input
                placeholder="Search FAQ"
                prefix={<SearchOutlined style={{ color: "#aaa" }} />}
                value={searchText}
                onChange={(e) => setSearchText(e.target.value)}
              />
            </div>
          </div>
        </div>
      </div>

      <div className="body_wrapper py-3">
        <div className="container">
          <p className="mb-2 searchResult">Question Related to</p>
          <div className="mb-2 d-flex gap-2 flex-wrap">
            <p
              className={`mb-0 filters ${
                activeFilter === "All" ? "active" : ""
              }`}
              onClick={() => setActiveFilter("All")}
            >
              {" "}
              All{" "}
            </p>
            <p
              className={`mb-0 filters ${
                activeFilter === "General & Blood Availability" ? "active" : ""
              }`}
              onClick={() => setActiveFilter("General & Blood Availability")}
            >
              {" "}
              General & Blood Availability{" "}
            </p>
            <p
              className={`mb-0 filters ${
                activeFilter === "Blood Donation & Camps" ? "active" : ""
              }`}
              onClick={() => setActiveFilter("Blood Donation & Camps")}
            >
              {" "}
              Blood Donation & Camps{" "}
            </p>
            <p
              className={`mb-0 filters ${
                activeFilter === "Blood Center Registration & App Usage"
                  ? "active"
                  : ""
              }`}
              onClick={() =>
                setActiveFilter("Blood Center Registration & App Usage")
              }
            >
              {" "}
              Blood Center Registration & App Usage{" "}
            </p>
          </div>
          <div className="row">
            <div className="col-9">
              {filteredFaqs.length > 0 ? (
                <Collapse
                  bordered={false}
                  defaultActiveKey={["1"]}
                  expandIcon={({ isActive }) =>
                    isActive ? <MinusOutlined /> : <PlusOutlined />
                  }
                  items={filteredFaqs.map((faq, index) => ({
                    key: `${index + 1}`,
                    label: faq.faqQuestion,
                    children: (
                      <div
                        dangerouslySetInnerHTML={{ __html: faq.faqAnswer }}
                      />
                    ),
                    style: panelStyle,
                  }))}
                />
              ) : (
                <div className="no-faq-found">
                  <p>No FAQs found for your search.</p>
                </div>
              )}
            </div>

            <div className="col-3">
              <p className="mb-1 searchResult">Could not find your question?</p>
              <div className="faq_query p-2">
                <TextArea
                  className="mb-2"
                  placeholder="Type your Question Here"
                  autoSize={{ minRows: 5 }}
                  value={userQuestion}
                  onChange={(e) => setUserQuestion(e.target.value)}
                />
                <Input
                  placeholder="Email ID"
                  className="mb-2 p-2"
                  value={userEmail}
                  onChange={(e) => setUserEmail(e.target.value)}
                  onBlur={() => {
                    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                    if (userEmail && !emailRegex.test(userEmail)) {
                      setEmailError("Invalid email address");
                    } else {
                      setEmailError("");
                    }
                  }}
                />
                {emailError && <div style={{ color: "#7F0210" }}>{emailError}</div>}

                <div className="d-flex mb-2 align-items-center gap-2">
                  {captchaImage && (
                    <div className="d-flex align-items-center">
                      <img
                        src={captchaImage}
                        alt="CAPTCHA"
                        style={{ height: "38px" }}
                      />
                      <img
                        style={{
                          cursor: "pointer",
                          width: "20px",
                          height: "20px",
                        }}
                        className=""
                        onClick={fetchCaptcha}
                        src="assets/images/refresh.png"
                      />
                    </div>
                  )}
                  <Input
                    placeholder="Captcha"
                    className="p-2"
                    value={userCaptchaInput}
                    onChange={(e) => setUserCaptchaInput(e.target.value)}
                  />
                </div>
                <div>
                  <Button
                    className="w-100 p-3"
                    type="primary"
                    onClick={handleSubmit}
                    loading={isSubmitting}
                  >
                    Submit
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Faqs;
