import React from "react";
import { Modal, Button } from "antd";

export default function SuccessModal({
  visible,
  onClose,
  onDownload,
  title,
  content,
}) {
  return (
    <Modal
      open={visible}
      title={title || "Success"}
      footer={[
        <Button
          className="px-4"
          key="download"
          type="primary"
          onClick={onDownload}
        >
          Download Certificate
        </Button>,
        <Button type="secondary" className="px-4" key="close" onClick={onClose}>
          Close
        </Button>,
      ]}
      onCancel={onClose}
      maskClosable={false}  
      keyboard={false}      
    >
      <p>{content}</p>
    </Modal>
  );
}
