import React, { useEffect, useRef, useState } from "react";
import AdminLayout from "../layout/AdminLayout";
import { ProTable } from "@ant-design/pro-components";
import { Form, Button, ConfigProvider } from "antd";
import viVN from "antd/locale/vi_VN";
import dayjs from "dayjs";
import "dayjs/locale/vi";

import AddEditModal from "../components/AddEditModal";
import ViewModal from "../components/ViewModal";
import DeleteModal from "../components/DeleteModal";
import apiService from "../services/apiService";
import ImageModal from "../components/Image";

dayjs.locale("vi");

const CertificationManagement = () => {
  const actionRef = useRef();
  const [form] = Form.useForm();

  const [dataSource, setDataSource] = useState([
   
  ]);

  const [modalOpen, setModalOpen] = useState(false);
  const [viewModalOpen, setViewModalOpen] = useState(false);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [modalOpenImg , setModalOpenImg] = useState(false);
  const [editingRow, setEditingRow] = useState(null);
  const [selectedRecord, setSelectedRecord] = useState(null);



  const fetchData = async () => {


    let res = await apiService.stamps.getAll();
    if (res?.success === true) {
      setDataSource(res.data);
    }
  }
  useEffect(() => {
    fetchData();
  }, [])

  // ================= SUBMIT =================
  const handleSubmit = (values) => {
    const formattedValues = {
      ...values,
      date: values.date?.format("DD/MM/YYYY"),
    };

    if (editingRow) {
      setDataSource((prev) =>
        prev.map((item) =>
          item.id === editingRow.id ? { ...item, ...formattedValues } : item
        )
      );
    } else {
      const newItem = {
        id: Date.now(),
        ...formattedValues,
      };
      setDataSource((prev) => [...prev, newItem]);
    }

    setModalOpen(false);
    setEditingRow(null);
    form.resetFields();
  };

  // ================= DELETE =================
  const handleDelete = () => {
    setDataSource((prev) =>
      prev.filter((item) => item.id !== selectedRecord.id)
    );
    setDeleteModalOpen(false);
    setSelectedRecord(null);
  };

  // ================= COLUMNS =================
  const columns = [
    {
      title: "Quốc gia",
      dataIndex: "country",
      search: true,
      ellipsis: true,
    },
    {
      title: "do ông (bà)",
      dataIndex: "signedBy",
      search: true,
      render: (_, record) => {
        const prefix = record.gender === "female" ? "Bà" : "Ông";
        return `${prefix} ${record.signedBy}`;
      },
    },
    {
      title: "Chức danh",
      dataIndex: "signedTitle",
      search: true,
    },
    {
      title: "Con dấu của",
      dataIndex: "notaryOffice",
      search: false,
      ellipsis: true,
    },
    {
      title: "Tại",
      dataIndex: "certifiedPlace",
      search: false,
    },
    {
      title: "Cơ Quan Cấp",
      dataIndex: "consularDepartment",
      search: false,
    },
    {
      title: "Số",
      dataIndex: "stampNumber",
      search: false,
      copyable: true,
    },
    {
      title: "Thao tác",
      valueType: "option",
      width: 150,
      render: (_, record) => [
        <a
          key="view"
          onClick={() => {
            setSelectedRecord(record);
            setViewModalOpen(true);
          }}
        >
          Xem
        </a>,
        <a
          key="edit"
          onClick={() => {
            setEditingRow(record);
            form.setFieldsValue({
              ...record,
              date: dayjs(record.date, "DD/MM/YYYY"),
            });
            setModalOpen(true);
          }}
        >
          Sửa
        </a>,
        <a
          key="delete"
          onClick={() => {
            setSelectedRecord(record);
            setDeleteModalOpen(true);
          }}
          style={{ color: "red" }}
        >
          Xóa
        </a>,

        
      ],
    },
  ];

  return (
    <ConfigProvider locale={viVN}>
      <AdminLayout>
        <ProTable
          headerTitle="Quản lý Chứng nhận lãnh sự"
          actionRef={actionRef}
          rowKey="id"
          columns={columns}
          dataSource={dataSource}
          pagination={{ pageSize: 5 }}
          search={{ labelWidth: 100 }}
          toolBarRender={() => [
            <Button
              type="primary"
              key="add"
              onClick={() => {
                setEditingRow(null);
                form.resetFields();
                setModalOpen(true);
              }}
            >
              + Thêm mới
            </Button>,

            <Button
              type="dashed"
              key="addTemp"
              onClick={() => {
            setModalOpenImg(true);
              }}
            >
              + Thêm mới ảnh vào temp
            </Button>,
          ]}
        />

        <AddEditModal
          open={modalOpen}
          onCancel={() => {
            setModalOpen(false);
            setEditingRow(null);
            form.resetFields();
          }}
          onSubmit={handleSubmit}
          editingRow={editingRow}
          form={form}
        />

        <ViewModal
          open={viewModalOpen}
          onCancel={() => setViewModalOpen(false)}
          record={selectedRecord}
        />

        <DeleteModal
          open={deleteModalOpen}
          onCancel={() => {
            setDeleteModalOpen(false);
            setSelectedRecord(null);
          }}
          onConfirm={handleDelete}
          record={selectedRecord}
        />

        <ImageModal
          open={modalOpenImg}
          setOpen={setModalOpenImg}
        />
        
      </AdminLayout>
    </ConfigProvider>
  );
};

export default CertificationManagement;