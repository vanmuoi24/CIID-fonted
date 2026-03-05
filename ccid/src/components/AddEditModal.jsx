import React, { useEffect } from "react";
import { Modal, Form, Input, Select, DatePicker, message, Row, Col } from "antd";
import dayjs from "dayjs";
import apiService from "../services/apiService";

const { Option } = Select;

const AddEditModal = ({
  open,
  onCancel,
  onSubmit,
  editingRow,
  form,
}) => {
  // ================= AUTO FILL WHEN EDIT =================
  useEffect(() => {
    if (editingRow) {
      form.setFieldsValue({
        ...editingRow,
        date: editingRow.date
          ? dayjs(editingRow.date, "DD/MM/YYYY")
          : null,
      });
    }
  }, [editingRow, form]);

  // ================= SUBMIT =================
  const handleSubmit = () => {
    form.submit();
  };
  const handleFinish = async (values) => {
    try {
      const formattedValues = {
        ...values,
        date: values.date
          ? values.date.format("DD/MM/YYYY")
          : null,
      };

      let res;

      if (editingRow) {
        // UPDATE
        res = await apiService.stamps.update(
          editingRow.id,
          formattedValues
        );

        if (res?.success) {
          message.success("Cập nhật thành công");
        }
      } else {
        // CREATE
        res = await apiService.stamps.create(formattedValues);

        if (res?.success) {
          message.success("Thêm mới thành công");
        }
      }

      if (res?.success) {
        onSubmit(formattedValues);
      }

    } catch (error) {
      console.error(error);
      message.error("Có lỗi xảy ra");
    }
  };
  return (
    <Modal
      title={editingRow ? "Chỉnh sửa chứng nhận" : "Thêm mới chứng nhận"}
      open={open}
      onCancel={onCancel}
      onOk={handleSubmit}
      okText={editingRow ? "Cập nhật" : "Thêm mới"}
      cancelText="Hủy"
      width={1000}
      destroyOnClose
    >
      <Form form={form} layout="vertical" onFinish={handleFinish}>

  {/* Hàng 1 */}
  <Row gutter={16}>
    <Col span={12}>
      <Form.Item
        name="country"
        label="Quốc gia"
        rules={[{ required: true, message: "Vui lòng nhập quốc gia" }]}
      >
        <Input placeholder="Nhập quốc gia" />
      </Form.Item>
    </Col>

    <Col span={12}>
      <Form.Item
        name="signedBy"
        label="Tên người ký"
        rules={[{ required: true, message: "Vui lòng nhập tên người ký" }]}
      >
        <Input placeholder="Nhập tên người ký" />
      </Form.Item>
    </Col>
  </Row>

  {/* Hàng 2 */}
  <Row gutter={16}>
    <Col span={12}>
      <Form.Item
        name="signedTitle"   // 🔥 sửa từ capacity
        label="Chức danh"
      >
        <Input placeholder="Nhập chức danh" />
      </Form.Item>
    </Col>
 <Col span={12}>
      <Form.Item
        name="notaryOffice"   // 🔥 sửa từ capacity
        label="Và con dấu của"
      >
        <Input placeholder="Nhập tên cơ quan con dấu" />
      </Form.Item>
    </Col>

    <Col span={12}>
      <Form.Item
        name="certifiedPlace"   // 🔥 sửa từ at
        label="Tại"
      >
        <Input placeholder="Nhập địa điểm" />
      </Form.Item>
    </Col>
  </Row>

  {/* Hàng 3 */}
  <Row gutter={16}>
    <Col span={12}>
      <Form.Item
        name="certifiedDate"   // 🔥 sửa từ date
        label="Ngày"
      >
        <DatePicker
          format="DD/MM/YYYY"
          style={{ width: "100%" }}
        />
      </Form.Item>
    </Col>

    <Col span={12}>
      <Form.Item
        name="consularDepartment"   // 🔥 sửa từ issuedBy
        label="Cơ quan cấp"
      >
        <Input placeholder="Nhập cơ quan cấp" />
      </Form.Item>
    </Col>
  </Row>

  {/* Hàng 4 */}
  <Row gutter={16}>
    <Col span={12}>
      <Form.Item
        name="stampNumber"   // 🔥 sửa từ number
        label="Số chứng nhận"
      >
        <Input placeholder="Nhập số chứng nhận" />
      </Form.Item>
    </Col>
  </Row>

</Form>
    </Modal>
  );
};

export default AddEditModal;