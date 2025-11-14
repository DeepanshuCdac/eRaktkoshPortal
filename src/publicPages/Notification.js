import React, { useEffect, useState, useRef } from "react";
import ReactDOM from "react-dom";
import '../scss/bloodSearch.scss';
import { BaseUrl } from "../utils/url";
import { Input } from 'antd';
import { SearchOutlined } from "@ant-design/icons";

const Notification = () => {
    const [notifications, setNotifications] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [selectedNotification, setSelectedNotification] = useState(null);
    const [modalTitle, setModalTitle] = useState("");
    const [modalContent, setModalContent] = useState("");
    const [modalLoading, setModalLoading] = useState(false);
    const [modalTop, setModalTop] = useState(0);
    const containerRef = useRef(null);
    const handleRef = useRef({});
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [searchTerm, setSearchTerm] = useState("")
    useEffect(() => {
        const fetchNotifications = async () => {
            try {
                const response = await fetch(`${BaseUrl}/eraktkosh/notifications/ticker`);
                if (!response.ok) {
                    throw new Error("Failed to fetch notifications");
                }
                let data = await response.json();
                setNotifications(data);
            } catch (error) {
                console.error("Error fetching notifications:", error);
                setError(error.message);
            } finally {
                setLoading(false);
            }
        };

        fetchNotifications();
    }, []);

    const handleNotificationClick = async (notification, id) => {
        if (notification.isUrl === 1) return;

        const rect = handleRef.current[id]?.getBoundingClientRect();
        const containerRect = containerRef.current?.getBoundingClientRect();
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        const topPosition = rect ? rect.bottom + scrollTop - (containerRect?.top + scrollTop) : 0;

        setModalTop(topPosition);
        setSelectedNotification(notification);
        setModalLoading(true);

        try {
            const response = await fetch(`${BaseUrl}/eraktkosh/notifications/popup`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ id: notification.id }),
            });

            if (!response.ok) throw new Error("Failed to fetch notification details");

            const data = await response.json();
            setModalTitle(data.title);
            setModalContent(data.data);
            setTimeout(() => setIsModalVisible(true), 50);
        } catch (err) {
            console.error("Error fetching notification details:", err);
            setModalTitle("Error");
            setModalContent("Could not fetch details.");
            setIsModalVisible(true);
        } finally {
            setModalLoading(false);
        }
    };

    const closeModal = () => {
        setIsModalVisible(false);
        setTimeout(() => {
            setSelectedNotification(null);
            setModalTitle("");
            setModalContent("");
        }, 300);
    };

    if (loading) return <p className="gradient_style page-wrapper">Loading notifications...</p>;
    if (error) return <p className="gradient_style page-wrapper" style={{ color: "red" }}>Error: {error}</p>

    const filteredNotification = notifications.filter(notification =>
        notification.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        notification.startDate.toLowerCase().includes(searchTerm.toLowerCase())
    )

    return (
        <>
            <div className="pageWrapper page-wrapper">
                <div className="container">
                    <div className="d-xl-flex d-lg-flex d-md-flex d-sm-flex align-items-center justify-content-between py-3">
                        <div className="d-flex align-items-center">
                            <div className="inside_header">
                                <h4 className="header-page mb-1">Notifications</h4>
                                <div className="d-flex">
                                    <a className="home_link me-2" href="/beta#/">Home</a>
                                    <span className="home_link">&gt;</span>
                                    <a href="javascript:void(0)" className="home_link ms-2">Notifications</a>
                                </div>
                            </div>
                        </div>
                        <div>
                            <Input
                                placeholder="Search"
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                prefix={<SearchOutlined style={{ color: "#aaa" }} />}
                            />
                        </div>
                    </div>
                </div>
            </div>

            <div className="body_wrapper py-3">
                <div className="container" ref={containerRef} style={{ position: "relative" }}>
                    <p className="mb-3 searchResult">Latest Notifications</p>
                    <div className="row">
                        {filteredNotification.length === 0 ? (
                            <div className="col-12 text-center py-5">
                                <p className="text-muted">No data available.</p>
                            </div>
                        ) : (
                            filteredNotification.map((notification, index) => (
                                <div className="col-xl-4 col-lg-4 col-md-6 col-sm-6 col-12" key={notification.id}>
                                    <div
                                        ref={(el) => handleRef.current[notification.id] = el}
                                        className={`equal-height ${selectedNotification && selectedNotification.id !== notification.id ? "faded" : ""}`}
                                        style={{
                                            marginBottom: "20px", padding: "10px", border: "1px solid #eaeaea",
                                            borderRadius: "5px", cursor: "pointer", backgroundColor: "#fff", position: "relative",
                                            zIndex: selectedNotification?.id === notification.id ? 10 : 1,
                                        }}
                                        onClick={() => handleNotificationClick(notification, notification.id)} >
                                        {index === 0 && (
                                            <p className="mb-0 batch px-1">Latest Upload</p>
                                        )}
                                        <div className="d-flex align-items-start h-100">
                                            <img className="me-2" src={`${process.env.PUBLIC_URL}/assets/images/pdf.png`} alt="pdf" />
                                            <div className="w-100 h-100 d-flex flex-column justify-content-between">
                                                <h5 className="notification_title mb-1">{notification.title}</h5>
                                                <div className="d-flex justify-content-between">
                                                    <p className="published_date mb-0">
                                                        Published Date: {notification.startDate}
                                                    </p>
                                                    {notification.isUrl === 1 && notification.docUrl ? (
                                                        <a className="document" href={notification.docUrl} target="_blank" rel="noopener noreferrer">
                                                            Download Now
                                                        </a>
                                                    ) : (
                                                        <a className="document">View Detail</a>
                                                    )}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            )))}
                    </div>

                    {selectedNotification && (
                        <>
                            <div className={`overlay ${isModalVisible ? 'fade-in' : 'fade-out'}`} onClick={closeModal} />
                            <div
                                className={`custom-modal ${isModalVisible ? 'show' : 'hide'}`}
                                style={{ ...modalStyles, top: `${modalTop + 15}px`, position: 'absolute', zIndex: 20 }} >
                                <div className="d-flex align-items-start justify-content-between">
                                    <h4 className="notification_title_modal">{modalTitle}</h4>
                                    <img onClick={closeModal} src={`${process.env.PUBLIC_URL}/assets/images/close.png`} style={{ cursor: "pointer" }} />
                                </div>
                                {modalLoading ? (
                                    <p>Loading...</p>
                                ) : (
                                    <div className="notification_body" dangerouslySetInnerHTML={{ __html: modalContent.replace(/<\/?strong>/g, ""), }} />
                                )}
                            </div>
                        </>
                    )}
                </div>
            </div>
        </>
    );
};

const modalStyles = {
    width: "98%",
    backgroundColor: "#fff",
    border: "1px solid #eaeaea",
    zIndex: 10,
    borderRadius: "5px",
    padding: "20px",
};

export default Notification;
