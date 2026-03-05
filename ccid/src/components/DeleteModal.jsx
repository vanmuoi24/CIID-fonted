import React from "react";
import { Modal, message } from "antd";
import { ExclamationCircleOutlined } from "@ant-design/icons";
import apiService from "../services/apiService";

const DeleteModal = ({
  open,
  onCancel,
  onConfirm,
  record,
}) => {
  const handleDelete = async () => {

    try{
      let res = await apiService.stamps.delete(record.id);
      if(res?.success){
        message.success("Xóa thành công");
      }
    }catch(error){
      message.error("Xóa thất bại");
    }
    onConfirm(); 
  };

  return (
    <Modal
      title={
        <span>
          <ExclamationCircleOutlined style={{ color: "#ff4d4f", marginRight: 8 }} />
          Xác nhận xóa
        </span>
      }
      open={open}
      onCancel={onCancel}
      onOk={handleDelete}
      okText="Xóa"
      cancelText="Hủy"
      okButtonProps={{ danger: true }}
    >
      <p>
        Bạn có chắc chắn muốn xóa chứng nhận số{" "}
        <strong>{record?.number}</strong> không?
      </p>
      <p style={{ color: "#666", fontSize: 12 }}>
        Hành động này không thể hoàn tác.
      </p>
    </Modal>
  );
};

export default DeleteModal;
