import { useRef, useState } from "react";
import { ProTable } from "@ant-design/pro-components";
import { Button, message, Modal, Form, ConfigProvider, Tag } from "antd";
import {
  PlusOutlined,
  EditOutlined,
  DeleteOutlined,
  EyeOutlined,
} from "@ant-design/icons";
import viVN from "antd/locale/vi_VN";
import AdminLayout from "../layout/AdminLayout";
import ApplicationFormModal from "../components/ApplicationFormModal";
import apiService from "../services/apiService";
import dayjs from "dayjs";
import "dayjs/locale/vi";

dayjs.locale("vi");

const Applications = () => {
  const actionRef = useRef();
  const [form] = Form.useForm();
  const [modalVisible, setModalVisible] = useState(false);
  const [modalType, setModalType] = useState("add");
  const [currentRecord, setCurrentRecord] = useState(null);
  const [loading, setLoading] = useState(false);

  // Columns definition
  const columns = [
    {
      title: "ID",
      dataIndex: "id",
      width: 60,
      search: false,
    },

    {
      title: "Ngày nhận",
      dataIndex: "receiptDate",
      width: 120,
      valueType: "date",
      render: (_, record) =>
        record.receiptDate
          ? dayjs(record.receiptDate).format("DD/MM/YYYY")
          : "-",
    },
    {
      title: "Cơ quan giải quyết",
      dataIndex: "competentAuth",
      width: 200,
      ellipsis: true,
    },
    {
      title: "Ngày trả kết quả",
      dataIndex: "resultDate",
      width: 130,
      valueType: "date",
      render: (_, record) =>
        record.resultDate ? dayjs(record.resultDate).format("DD/MM/YYYY") : "-",
      hideInSearch: true,
    },
    {
      title: "Người ký",
      dataIndex: "certSignatory",
      width: 150,
      ellipsis: true,
      hideInSearch: true,
    },
    {
      title: "Chức danh",
      dataIndex: "signatoryTitle",
      width: 150,
      hideInSearch: true,
    },
    {
      title: "Trạng thái",
      dataIndex: "status",
      width: 120,
      valueType: "select",
      valueEnum: {
        PENDING: { text: "Chờ xử lý", status: "Default" },
        PROCESSING: { text: "Đang xử lý", status: "Processing" },
        APPROVED: { text: "Đã duyệt", status: "Success" },
        REJECTED: { text: "Từ chối", status: "Error" },
        COMPLETED: { text: "Hoàn thành", status: "Success" },
      },
      render: (_, record) => {
        const statusConfig = {
          PENDING: { color: "default", text: "Chờ xử lý" },
          PROCESSING: { color: "processing", text: "Đang xử lý" },
          APPROVED: { color: "success", text: "Đã duyệt" },
          REJECTED: { color: "error", text: "Từ chối" },
          COMPLETED: { color: "success", text: "Hoàn thành" },
        };
        const config = statusConfig[record.status] || {
          color: "default",
          text: record.status,
        };
        return <Tag color={config.color}>{config.text}</Tag>;
      },
    },
    {
      title: "User ID",
      dataIndex: "userId",
      width: 100,
      hideInTable: true,
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
  const fetchApplications = async (params) => {
    try {
      const response = await apiService.applications.getAll();
      let data = response.data || [];

      if (params?.competentAuth) {
        data = data.filter((item) =>
          String(item.competentAuth || "")
            .toLowerCase()
            .includes(String(params.competentAuth).toLowerCase()),
        );
      }

      if (params?.receiptDate) {
        const searchDate = dayjs(params.receiptDate).format("YYYY-MM-DD");

        data = data.filter(
          (item) =>
            item.receiptDate &&
            dayjs(item.receiptDate).format("YYYY-MM-DD") === searchDate,
        );
      }

      return {
        data,
        success: response.success,
        total: data.length,
      };
    } catch (error) {
      message.error("Không thể tải danh sách applications: " + error);
      return {
        data: [],
        success: false,
        total: 0,
      };
    }
  };

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
      receiptDate: record.receiptDate ? dayjs(record.receiptDate) : null,
      resultDate: record.resultDate ? dayjs(record.resultDate) : null,
    });
    setModalVisible(true);
  };

  // Handle View
  const handleView = (record) => {
    setModalType("view");
    setCurrentRecord(record);
    form.setFieldsValue({
      ...record,
      receiptDate: record.receiptDate ? dayjs(record.receiptDate) : null,
      resultDate: record.resultDate ? dayjs(record.resultDate) : null,
    });
    setModalVisible(true);
  };

  // Handle Delete
  const handleDelete = (record) => {
    Modal.confirm({
      title: "Xác nhận xóa",
      content: `Bạn có chắc chắn muốn xóa application "${record.legalizationStamp.stampNumber}"?`,
      okText: "Xóa",
      okType: "danger",
      cancelText: "Hủy",
      onOk: async () => {
        try {
          const response = await apiService.applications.delete(record.id);
          if (response.success) {
            message.success("Xóa application thành công!");
            actionRef.current?.reload();
          }
        } catch (error) {
          message.error("Xóa application thất bại: " + error);
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
        receiptDate: values.receiptDate
          ? values.receiptDate.format("YYYY-MM-DD")
          : null,
        resultDate: values.resultDate
          ? values.resultDate.format("YYYY-MM-DD")
          : null,
      };

      if (modalType === "add") {
        const response = await apiService.applications.create(formattedValues);
        if (response.success) {
          message.success("Thêm application thành công!");
          setModalVisible(false);
          actionRef.current?.reload();
        }
      } else if (modalType === "edit") {
        const response = await apiService.applications.update(
          currentRecord.id,
          formattedValues,
        );
        if (response.success) {
          message.success("Cập nhật application thành công!");
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
          request={fetchApplications}
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
          headerTitle="Quản lý Applications"
          toolBarRender={() => [
            <Button
              key="add"
              type="primary"
              icon={<PlusOutlined />}
              onClick={handleAdd}
            >
              Thêm Application
            </Button>,
          ]}
          scroll={{ x: 1600 }}
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

        {/* Application Form Modal */}
        <ApplicationFormModal
          visible={modalVisible}
          onCancel={() => setModalVisible(false)}
          onSubmit={handleSubmit}
          form={form}
          currentRecord={currentRecord}
          modalType={modalType}
          loading={loading}
          fetchApplications={fetchApplications}
          reloadData={() => actionRef.current?.reload()}
        />
      </ConfigProvider>
    </AdminLayout>
  );
};

export default Applications;
