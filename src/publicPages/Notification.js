import React, { useEffect, useState } from "react";
import { BaseUrl } from "../utils/url";

const Notification = () => {
    const [notifications, setNotifications] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [selectedNotification, setSelectedNotification] = useState(null);
    const [modalTitle, setModalTitle] = useState("");
    const [modalContent, setModalContent] = useState("");
    const [modalLoading, setModalLoading] = useState(false);

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

    const handleNotificationClick = async (notification) => {
        if (notification.isUrl === 1) return;

        setSelectedNotification(notification);
        setModalLoading(true);

        try {
            const response = await fetch(`${BaseUrl}/eraktkosh/notifications/popup`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ id: notification.id }),
            });

            if (!response.ok) {
                throw new Error("Failed to fetch notification details");
            }

            const data = await response.json();
            setModalTitle(data.title);
            setModalContent(data.data);
        } catch (err) {
            console.error("Error fetching notification details:", err);
            setModalTitle("Error");
            setModalContent("Could not fetch details.");
        } finally {
            setModalLoading(false);
        }
    };

    const closeModal = () => {
        setSelectedNotification(null);
        setModalTitle("");
        setModalContent("");
    };

    if (loading) return <p>Loading notifications...</p>;
    if (error) return <p style={{ color: "red" }}>Error: {error}</p>;

    return (
        <div style={{ padding: "20px", maxWidth: "600px", margin: "auto" }}>
            <h2>Latest Notifications</h2>
            <ul style={{ listStyle: "none", padding: 0 }}>
                {notifications.map((notification) => (
                    <li
                        key={notification.id}
                        style={{
                            marginBottom: "10px",
                            padding: "10px",
                            border: "1px solid #ddd",
                            borderRadius: "5px",
                            cursor: "pointer",
                            backgroundColor: "#f9f9f9",
                        }}
                        onClick={() => handleNotificationClick(notification)}
                    >
                        <strong>{notification.title}</strong>
                        {notification.isUrl === 1 && notification.docUrl ? (
                            <p><a href={notification.docUrl} target="_blank" rel="noopener noreferrer">View Document</a></p>
                        ) : (
                            <p>Click for more details</p>
                        )}
                    </li>
                ))}
            </ul>

            {/* Modal Component */}
            {selectedNotification && (
                <div style={modalStyles.overlay} onClick={closeModal}>
                    <div style={modalStyles.modal} onClick={(e) => e.stopPropagation()}>
                        <h3>{modalTitle}</h3>
                        {modalLoading ? (
                            <p>Loading...</p>
                        ) : (
                            <div dangerouslySetInnerHTML={{ __html: modalContent }} />
                        )}
                        <button style={modalStyles.closeButton} onClick={closeModal}>Close</button>
                    </div>
                </div>
            )}

        </div>
    );
};

const modalStyles = {
    overlay: {
        position: "fixed",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        backgroundColor: "rgba(0, 0, 0, 0.5)",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
    },
    modal: {
        backgroundColor: "#fff",
        padding: "20px",
        borderRadius: "8px",
        boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)",
        maxWidth: "500px",
        width: "90%",
    },
    closeButton: {
        marginTop: "10px",
        padding: "8px 12px",
        border: "none",
        backgroundColor: "#ff4d4d",
        color: "#fff",
        borderRadius: "5px",
        cursor: "pointer",
    }
};
export default Notification;
