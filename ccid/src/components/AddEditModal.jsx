import React, { useEffect, useState } from "react";
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

  const [dataSign, setDataSign] = useState([]); // fix

  // ================= AUTO FILL WHEN EDIT =================
  useEffect(() => {
    if (editingRow) {
      form.setFieldsValue({
        ...editingRow,
        certifiedDate: editingRow.certifiedDate
          ? dayjs(editingRow.certifiedDate, "DD/MM/YYYY")
          : null,
        signature: {
    id: values.signature
  }
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
        certifiedDate: values.certifiedDate
          ? values.certifiedDate.format("DD/MM/YYYY")
          : null,

          signature: {
    id: values.signature
  }  
      };

      let res;

      if (editingRow) {
        res = await apiService.stamps.update(editingRow.id, formattedValues);
        if (res?.success) {
          message.success("Cập nhật thành công");
        }
      } else {
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

  // ================= FETCH SIGNATURE =================
  const fetchDataSign = async () => {
    try {
      const res = await apiService.signatures.getAll();

      if (res?.success ===true) {
        setDataSign(res.data);
      }

    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchDataSign();
  }, []);

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
              label="Do ông bà"
              rules={[{ required: true, message: "Vui lòng nhập tên người ký" }]}
            >
              <Input placeholder="Nhập tên người ký" />
            </Form.Item>
          </Col>
        </Row>

        <Row gutter={16}>
          <Col span={12}>
            <Form.Item name="signedTitle" label="Chức danh">
              <Input placeholder="Nhập chức danh" />
            </Form.Item>
          </Col>

          <Col span={12}>
            <Form.Item name="notaryOffice" label="Và con dấu của">
              <Input placeholder="Nhập tên cơ quan con dấu" />
            </Form.Item>
          </Col>

          <Col span={12}>
            <Form.Item name="certifiedPlace" label="Tại">
              <Input placeholder="Nhập địa điểm" />
            </Form.Item>
          </Col>
        </Row>

        <Row gutter={16}>
          <Col span={12}>
            <Form.Item name="certifiedDate" label="Ngày">
              <DatePicker format="DD/MM/YYYY" style={{ width: "100%" }} />
            </Form.Item>
          </Col>

          <Col span={12}>
            <Form.Item name="consularDepartment" label="Cơ quan cấp">
              <Input placeholder="Nhập cơ quan cấp" />
            </Form.Item>
          </Col>
        </Row>

        <Row gutter={16}>
          <Col span={12}>
            <Form.Item name="stampNumber" label="Số chứng nhận">
              <Input placeholder="Nhập số chứng nhận" />
            </Form.Item>
          </Col>

          <Col span={12}>
            <Form.Item
              name="signature"
              label="Ký tên và đóng dấu"
              rules={[{ required: true, message: "Vui lòng chọn chữ ký" }]}
            >
              <Select
                placeholder="Chọn chữ ký"
                showSearch
                optionFilterProp="children"
              >
                {dataSign.map((item) => (
                  <Option key={item.id} value={item.id}>
                    {item.name}
                  </Option>
                ))}
              </Select>
            </Form.Item>
          </Col>

        </Row>

      </Form>
    </Modal>
  );
};

export default AddEditModal;