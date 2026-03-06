import {
  Modal,
  Form,
  Input,
  DatePicker,
  Select,
  Row,
  Col,
  Divider,
} from "antd";
import {
  FileTextOutlined,
  UserOutlined,
  CalendarOutlined,
  BankOutlined,
} from "@ant-design/icons";
import dayjs from "dayjs";

const DocumentFormModal = ({
  visible,
  onCancel,
  onSubmit,
  form,
  modalType,
  loading,
  certifications, // danh sách certifications để chọn khi tạo/sửa application
}) => {
  return (
    <Modal
      title={
        <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
          <FileTextOutlined style={{ fontSize: "20px", color: "#1890ff" }} />
          <span>
            {modalType === "add"
              ? "Thêm Document"
              : modalType === "edit"
                ? "Sửa Document"
                : "Chi tiết Document"}
          </span>
        </div>
      }
      open={visible}
      onCancel={onCancel}
      onOk={modalType === "view" ? onCancel : onSubmit}
      okText={modalType === "view" ? "Đóng" : "Lưu"}
      cancelText="Hủy"
      width={900}
      confirmLoading={loading}
      cancelButtonProps={{
        style: { display: modalType === "view" ? "none" : "inline-block" },
      }}
      bodyStyle={{ maxHeight: "70vh", overflowY: "auto" }}
    >
      <Form form={form} layout="vertical" disabled={modalType === "view"}>
        {/* Thông tin cơ bản */}
        <Divider orientation="left">
          <FileTextOutlined /> Thông tin cơ bản
        </Divider>

        <Row gutter={16}>
          <Col span={8}>
            <Form.Item
              label="Certification"
              name="applicationId"
              rules={[
                { required: true, message: "Vui lòng chọn Certification!" },
              ]}
            >
              <Select
                placeholder="Chọn Certification"
                showSearch
                optionFilterProp="label"
                disabled={modalType !== "add"} // Không cho phép thay đổi certification khi edit
                options={certifications?.map((item) => ({
                  value: item.id,
                  label: `${
                    item.stampNumber
                      ? `${item.signedBy} - ${item.stampNumber}`
                      : item.signedBy
                  }`,
                }))}
              ></Select>
            </Form.Item>
          </Col>

          <Col span={8}>
            <Form.Item
              label="Loại CV"
              name="cvType"
              rules={[{ required: true, message: "Vui lòng chọn loại CV!" }]}
            >
              <Select placeholder="Chọn loại CV">
                <Select.Option value="CNLS">CNLS</Select.Option>
                <Select.Option value="HPLS">HPLS</Select.Option>
                <Select.Option value="OTHER">Khác</Select.Option>
              </Select>
            </Form.Item>
          </Col>

          <Col span={8}>
            <Form.Item
              label="Loại giấy tờ"
              name="documentType"
              rules={[
                { required: true, message: "Vui lòng chọn loại giấy tờ!" },
              ]}
            >
              <Select placeholder="Chọn loại giấy tờ">
                <Select.Option value="Bản chính">Bản chính</Select.Option>
                <Select.Option value="Bản sao">Bản sao</Select.Option>
                <Select.Option value="Bản dịch">Bản dịch</Select.Option>
              </Select>
            </Form.Item>
          </Col>
        </Row>

        <Row gutter={16}>
          <Col span={16}>
            <Form.Item
              label="Tên giấy tờ"
              name="documentTitle"
              rules={[
                { required: true, message: "Vui lòng nhập tên giấy tờ!" },
              ]}
            >
              <Input
                prefix={<FileTextOutlined />}
                placeholder="VD: Bằng cao đẳng"
              />
            </Form.Item>
          </Col>

          <Col span={8}>
            <Form.Item
              label="Số tham chiếu"
              name="referenceNumber"
              rules={[
                { required: true, message: "Vui lòng nhập số tham chiếu!" },
              ]}
            >
              <Input placeholder="VD: 15364" />
            </Form.Item>
          </Col>
        </Row>

        {/* Thông tin người giữ */}
        <Divider orientation="left">
          <UserOutlined /> Thông tin người giữ
        </Divider>

        <Row gutter={16}>
          <Col span={16}>
            <Form.Item
              label="Người giữ"
              name="holderName"
              rules={[
                { required: true, message: "Vui lòng nhập tên người giữ!" },
              ]}
            >
              <Input
                prefix={<UserOutlined />}
                placeholder="VD: TRẦN PHÚC THỊNH"
              />
            </Form.Item>
          </Col>

          <Col span={8}>
            <Form.Item
              label="Ngày cấp"
              name="issueDate"
              rules={[{ required: true, message: "Vui lòng chọn ngày cấp!" }]}
            >
              <DatePicker
                style={{ width: "100%" }}
                format="DD/MM/YYYY"
                placeholder="Chọn ngày cấp"
                prefix={<CalendarOutlined />}
              />
            </Form.Item>
          </Col>
        </Row>

        {/* Thông tin cơ quan chứng thực */}
        <Divider orientation="left">
          <BankOutlined /> Thông tin cơ quan chứng thực
        </Divider>

        <Row gutter={16}>
          <Col span={24}>
            <Form.Item
              label="Cơ quan chứng thực"
              name="certifyingAuthority"
              rules={[
                {
                  required: true,
                  message: "Vui lòng nhập cơ quan chứng thực!",
                },
              ]}
            >
              <Input.TextArea
                rows={2}
                placeholder="VD: VPCC Nguyễn Huệ, P. Ô Chợ Dừa, TP. Hà Nội"
              />
            </Form.Item>
          </Col>
        </Row>

        <Row gutter={16}>
          <Col span={12}>
            <Form.Item
              label="Người ký"
              name="certifyingSignatory"
              rules={[
                { required: true, message: "Vui lòng nhập tên người ký!" },
              ]}
            >
              <Input prefix={<UserOutlined />} placeholder="VD: Lê Như Tuân" />
            </Form.Item>
          </Col>

          <Col span={12}>
            <Form.Item
              label="Chức danh"
              name="certifyingTitle"
              rules={[{ required: true, message: "Vui lòng nhập chức danh!" }]}
            >
              <Input placeholder="VD: Công chứng viên" />
            </Form.Item>
          </Col>
        </Row>
      </Form>
    </Modal>
  );
};

export default DocumentFormModal;
