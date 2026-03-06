import { useEffect, useRef, useState } from "react";
import { ProTable } from "@ant-design/pro-components";
import { Button, message, Modal, Form, ConfigProvider } from "antd";
import {
  PlusOutlined,
  EditOutlined,
  DeleteOutlined,
  EyeOutlined,
} from "@ant-design/icons";
import viVN from "antd/locale/vi_VN";
import AdminLayout from "../layout/AdminLayout";
import DocumentFormModal from "../components/DocumentFormModal";
import apiService from "../services/apiService";
import dayjs from "dayjs";
import "dayjs/locale/vi";

dayjs.locale("vi");

const Documents = () => {
  const actionRef = useRef();
  const [form] = Form.useForm();
  const [modalVisible, setModalVisible] = useState(false);
  const [modalType, setModalType] = useState("add");
  const [currentRecord, setCurrentRecord] = useState(null);
  const [loading, setLoading] = useState(false);
  const [certifications, setCertifications] = useState([]);
  // Columns definition
  const columns = [
    {
      title: "ID",
      dataIndex: "id",
      width: 60,
      search: false,
    },
    {
      title: "Application ID",
      dataIndex: "applicationId",
      width: 120,
      hideInTable: true,
    },
    {
      title: "Loại CV",
      dataIndex: "cvType",
      width: 100,
      valueType: "select",
      valueEnum: {
        CNLS: { text: "CNLS", status: "Processing" },
        HPLS: { text: "HPLS", status: "Success" },
        OTHER: { text: "Khác", status: "Default" },
      },
    },
    {
      title: "Tên giấy tờ",
      dataIndex: "documentTitle",
      width: 180,
      ellipsis: true,
    },
    {
      title: "Loại giấy tờ",
      dataIndex: "documentType",
      width: 120,
      valueType: "select",
      valueEnum: {
        "Bản chính": { text: "Bản chính", status: "Success" },
        "Bản sao": { text: "Bản sao", status: "Processing" },
        "Bản dịch": { text: "Bản dịch", status: "Warning" },
      },
    },
    {
      title: "Người giữ",
      dataIndex: "holderName",
      width: 150,
      ellipsis: true,
    },
    {
      title: "Số tham chiếu",
      dataIndex: "referenceNumber",
      width: 120,
    },
    {
      title: "Ngày cấp",
      dataIndex: "issueDate",
      width: 120,
      valueType: "date",
      render: (_, record) =>
        record.issueDate ? dayjs(record.issueDate).format("DD/MM/YYYY") : "-",
    },
    {
      title: "Cơ quan chứng thực",
      dataIndex: "certifyingAuthority",
      width: 200,
      ellipsis: true,
      hideInSearch: true,
    },
    {
      title: "Người ký",
      dataIndex: "certifyingSignatory",
      width: 150,
      hideInSearch: true,
    },
    {
      title: "Chức danh",
      dataIndex: "certifyingTitle",
      width: 150,
      hideInSearch: true,
    },
    {
      title: "Thao tác",
      valueType: "option",
      width: 150,
      fixed: "right",
      render: (_, record) => [
        <Button
          key="view"
          type="link"
          size="small"
          icon={<EyeOutlined />}
          onClick={() => handleView(record)}
        >
          Xem
        </Button>,
        <Button
          key="edit"
          type="link"
          size="small"
          icon={<EditOutlined />}
          onClick={() => handleEdit(record)}
        >
          Sửa
        </Button>,
        <Button
          key="delete"
          type="link"
          size="small"
          danger
          icon={<DeleteOutlined />}
          onClick={() => handleDelete(record)}
        >
          Xóa
        </Button>,
      ],
    },
  ];

  // Fetch data từ API
  const fetchDocuments = async (params) => {
    try {
      const response = await apiService.documents.getAll();
      let data = response.data || [];
      console.log("Fetched applications:", data);
      // Filter theo Application ID
      if (params?.applicationId) {
        const application = certifications.find(
          (app) => String(app.stampNumber) === String(params.applicationId),
        );

        if (application) {
          data = data.filter(
            (item) => Number(item.applicationId) === Number(application.id),
          );
        } else {
          data = [];
        }
      }

      // Filter theo loại CV
      if (params?.cvType) {
        data = data.filter((item) => item.cvType === params.cvType);
      }
      if (response.success) {
        return {
          data,
          success: true,
          total: data?.length || 0,
        };
      }

      return {
        data,
        success: false,
        total: 0,
      };
    } catch (error) {
      message.error("Không thể tải danh sách documents: " + error);
      return {
        data: [],
        success: false,
        total: 0,
      };
    }
  };
  ("");

  const fetchCertification = async () => {
    try {
      const res = await apiService.stamps.getAll();

      if (res?.success === true) {
        console.log("Fetched certifications:", res.data);
        setCertifications(res.data);
      } else {
        message.error("Không thể tải danh sách chứng nhận:", res?.message);
      }
    } catch (error) {
      message.error(
        "Có lỗi xảy ra khi tải danh sách chứng nhận: " + error.message,
      );

      if (error.response) {
        // Lỗi từ server (status 4xx, 5xx)
        console.error("Server error:", error.response.data);
      } else if (error.request) {
        // Không nhận được response
        console.error("No response received:", error.request);
      } else {
        // Lỗi khác
        console.error("Error:", error.message);
      }
    }
  };
  useEffect(() => {
    fetchCertification();
  }, []);

  // Handle Add
  const handleAdd = () => {
    setModalType("add");
    setCurrentRecord(null);
    form.resetFields();
    setModalVisible(true);
  };

  // Handle Edit
  const handleEdit = (record) => {
    setModalType("edit");
    setCurrentRecord(record);
    form.setFieldsValue({
      ...record,
      issueDate: record.issueDate ? dayjs(record.issueDate) : null,
    });
    setModalVisible(true);
  };

  // Handle View
  const handleView = (record) => {
    setModalType("view");
    setCurrentRecord(record);
    form.setFieldsValue({
      ...record,
      issueDate: record.issueDate ? dayjs(record.issueDate) : null,
    });
    setModalVisible(true);
  };

  // Handle Delete
  const handleDelete = (record) => {
    Modal.confirm({
      title: "Xác nhận xóa",
      content: `Bạn có chắc chắn muốn xóa document "${record.documentTitle}"?`,
      okText: "Xóa",
      okType: "danger",
      cancelText: "Hủy",
      onOk: async () => {
        try {
          const response = await apiService.documents.delete(record.id);
          if (response.success) {
            message.success("Xóa document thành công!");
            actionRef.current?.reload();
          }
        } catch (error) {
          message.error("Xóa document thất bại: " + error);
        }
      },
    });
  };

  // Handle Submit Modal
  const handleSubmit = async () => {
    try {
      setLoading(true);
      const values = await form.validateFields();

      const formattedValues = {
        ...values,
        issueDate: values.issueDate
          ? values.issueDate.format("YYYY-MM-DD")
          : null,
      };

      if (modalType === "add") {
        const response = await apiService.documents.create(formattedValues);
        if (response.success) {
          message.success("Thêm document thành công!");
          setModalVisible(false);
          actionRef.current?.reload();
        }
      } else if (modalType === "edit") {
        const response = await apiService.documents.update(
          currentRecord.id,
          formattedValues,
        );
        if (response.success) {
          message.success("Cập nhật document thành công!");
          setModalVisible(false);
          actionRef.current?.reload();
        }
      }
    } catch (error) {
      if (error.errorFields) {
        message.error("Vui lòng kiểm tra lại thông tin!");
      } else {
        message.error("Có lỗi xảy ra: " + error);
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <AdminLayout>
      <ConfigProvider locale={viVN}>
        <ProTable
          columns={columns}
          actionRef={actionRef}
          request={fetchDocuments}
          rowKey="id"
          search={{
            labelWidth: "auto",
            searchText: "Tìm kiếm",
            resetText: "Đặt lại",
            submitText: "Tìm",
            collapseRender: false,
          }}
          pagination={{
            defaultPageSize: 10,
            showSizeChanger: true,
            showQuickJumper: true,
            showTotal: (total) => `Tổng ${total} bản ghi`,
          }}
          dateFormatter="string"
          headerTitle="Quản lý Documents"
          toolBarRender={() => [
            <Button
              key="add"
              type="primary"
              icon={<PlusOutlined />}
              onClick={handleAdd}
            >
              Thêm Document
            </Button>,
          ]}
          scroll={{ x: 1800 }}
          options={{
            reload: true,
            density: true,
            setting: true,
          }}
          locale={{
            emptyText: "Không có dữ liệu",
            selectAll: "Chọn tất cả",
            selectInvert: "Đảo ngược lựa chọn",
            selectionAll: "Chọn tất cả dữ liệu",
          }}
        />

        {/* Document Form Modal */}
        <DocumentFormModal
          visible={modalVisible}
          onCancel={() => setModalVisible(false)}
          onSubmit={handleSubmit}
          form={form}
          modalType={modalType}
          loading={loading}
          certifications={certifications}
        />
      </ConfigProvider>
    </AdminLayout>
  );
};

export default Documents;
