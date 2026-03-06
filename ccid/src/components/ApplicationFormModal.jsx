import React, { useEffect } from "react";
import {
  Modal,
  Form,
  Input,
  DatePicker,
  Select,
  Row,
  Col,
  Divider,
  message,
} from "antd";
import {
  FileTextOutlined,
  UserOutlined,
  CalendarOutlined,
  BankOutlined,
} from "@ant-design/icons";

import apiService from "../services/apiService";

const ApplicationFormModal = ({
  visible,
  onCancel,
  form,
  modalType,
  currentRecord, // truyền record khi edit

  reloadData,
  fetchApplications, // callback reload table
}) => {
  const [loading, setLoading] = React.useState(false);
  const [dataSource, setDataSource] = React.useState([]);
  const fetchData = async () => {
    let res = await apiService.stamps.getAll();
    if (res?.success === true) {
      setDataSource(res.data);
    }
  };
  useEffect(() => {
    fetchData();
  }, []);

  const handleSubmit = async () => {
    try {
      const values = await form.validateFields();

      const payload = {
        ...values,
        receiptDate: values.receiptDate
          ? values.receiptDate.format("YYYY-MM-DD")
          : null,
        resultDate: values.resultDate
          ? values.resultDate.format("YYYY-MM-DD")
          : null,
      };

      let response;
      setLoading(true);
      if (modalType === "add") {
        response = await apiService.applications.create(payload);
      }

      if (modalType === "edit") {
        response = await apiService.applications.update(
          currentRecord.id,
          payload,
        );
      }

      if (response.success) {
        message.success("Lưu thành công!");
        reloadData(); // reload table
        form.resetFields();
        onCancel();
        setLoading(false);
        if (fetchApplications) {
          fetchApplications();
        }
      } else {
        message.error(response.message || "Có lỗi xảy ra!");
      }
    } catch (error) {
      console.log("API ERROR:", error);
      message.error(error.response?.data?.message || "Lưu thất bại!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal
      title={
        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
          <FileTextOutlined style={{ fontSize: 18, color: "#1677ff" }} />
          <span>
            {modalType === "add"
              ? "Thêm Application"
              : modalType === "edit"
                ? "Sửa Application"
                : "Chi tiết Application"}
          </span>
        </div>
      }
      open={visible}
      onCancel={onCancel}
      onOk={modalType === "view" ? onCancel : handleSubmit}
      okText={modalType === "view" ? "Đóng" : "Lưu"}
      cancelText="Hủy"
      width={900}
      confirmLoading={loading}
      bodyStyle={{ maxHeight: "70vh", overflowY: "auto" }}
      destroyOnClose
    >
      <Form form={form} layout="vertical" disabled={modalType === "view"}>
        <Divider orientation="left">
          <FileTextOutlined /> Thông tin hồ sơ
        </Divider>

        <Row gutter={[16, 16]}>
          <Col span={12}>
            <Form.Item label="Hình thức nộp" name="submissionMethod">
              <Select placeholder="Chọn hình thức nộp">
                <Select.Option value="Trực tiếp">Trực tiếp</Select.Option>
                <Select.Option value="Qua bưu điện">Qua bưu điện</Select.Option>
                <Select.Option value="Trực tuyến">Trực tuyến</Select.Option>
              </Select>
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item label="Thông tin Tem" name={["legalizationStamp", "id"]}>
              <Select
                placeholder="Chọn thông tin Tem"
                disabled={modalType === "edit" || modalType === "view"}
                showSearch
                optionFilterProp="children"
              >
                {dataSource.map((item) => (
                  <Select.Option key={item.id} value={item.id}>
                    {`${item.signedBy} - ${item.stampNumber}`}
                  </Select.Option>
                ))}
              </Select>
            </Form.Item>
          </Col>
        </Row>

        <Divider orientation="left">
          <CalendarOutlined /> Thông tin thời gian
        </Divider>

        <Row gutter={[16, 16]}>
          <Col span={12}>
            <Form.Item
              label="Ngày nhận hồ sơ"
              name="receiptDate"
              rules={[{ required: true, message: "Vui lòng chọn ngày nhận!" }]}
            >
              <DatePicker style={{ width: "100%" }} format="DD/MM/YYYY" />
            </Form.Item>
          </Col>

          <Col span={12}>
            <Form.Item
              label="Ngày trả kết quả"
              name="resultDate"
              rules={[
                { required: true, message: "Vui lòng chọn ngày trả kết quả!" },
              ]}
            >
              <DatePicker style={{ width: "100%" }} format="DD/MM/YYYY" />
            </Form.Item>
          </Col>
        </Row>

        <Divider orientation="left">
          <BankOutlined /> Thông tin cơ quan giải quyết
        </Divider>

        <Row gutter={[16, 16]}>
          <Col span={24}>
            <Form.Item
              label="Cơ quan giải quyết"
              name="competentAuth"
              rules={[{ required: true, message: "Vui lòng nhập cơ quan!" }]}
            >
              <Input
                prefix={<BankOutlined />}
                placeholder="VD: Sở Ngoại vụ Hà Nội"
              />
            </Form.Item>
          </Col>
        </Row>

        <Divider orientation="left">
          <UserOutlined /> Thông tin người ký
        </Divider>

        <Row gutter={[16, 16]}>
          <Col span={12}>
            <Form.Item
              label="Người ký chứng nhận"
              name="certSignatory"
              rules={[{ required: true, message: "Vui lòng nhập tên!" }]}
            >
              <Input prefix={<UserOutlined />} />
            </Form.Item>
          </Col>

          <Col span={12}>
            <Form.Item
              label="Chức danh người ký"
              name="signatoryTitle"
              rules={[{ required: true, message: "Vui lòng nhập chức danh!" }]}
            >
              <Input />
            </Form.Item>
          </Col>
        </Row>
      </Form>
    </Modal>
  );
};

export default ApplicationFormModal;
