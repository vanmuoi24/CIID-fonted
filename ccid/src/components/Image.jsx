import React, { useEffect, useState } from "react";
import { Modal, Upload, Button, Form, Select, message } from "antd";
import { UploadOutlined } from "@ant-design/icons";
import apiService from "../services/apiService";

const ImageModal = ({ open, setOpen }) => {

    const [form] = Form.useForm();
    const [dataSource, setDataSource] = useState([]);
    const [file, setFile] = useState(null);
    const [fileList, setFileList] = useState([]);
    const [loading, setLoading] = useState(false);

    const handleSubmit = async () => {
        try {

            const values = await form.validateFields();

            if (!file) {
                message.error("Vui lòng chọn ảnh");
                return;
            }

            setLoading(true);

            const formData = new FormData();
            formData.append("file", file);

            const res = await apiService.stamps.updateImage(values.stampId, formData);

            if (res) {
                message.success("Upload thành công");

                form.resetFields();
                setFile(null);
                setFileList([]);

                setOpen(false);
            }

        } catch (error) {
            console.log(error);
            message.error("Upload thất bại");
        } finally {
            setLoading(false);
        }
    };

    const fetchData = async () => {
        try {
            const res = await apiService.stamps.getAll();
            if (res?.success) {
                setDataSource(res.data);
            }
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        if (open) {
            fetchData();
        }
    }, [open]);

    const handleCancel = () => {
        setOpen(false);
        form.resetFields();
        setFile(null);
        setFileList([]);
    };

    return (
        <Modal
            title="Thêm ảnh vào Temp"
            open={open}
            onCancel={handleCancel}
            width={500}
            footer={[
                <Button key="cancel" onClick={handleCancel}>
                    Hủy
                </Button>,
                <Button
                    key="submit"
                    type="primary"
                    loading={loading}
                    onClick={handleSubmit}
                >
                    Lưu
                </Button>,
            ]}
        >

            <Form form={form} layout="vertical">

                {/* Chọn stamp */}
                <Form.Item
                    label="Chọn người ký"
                    name="stampId"
                    rules={[{ required: true, message: "Vui lòng chọn" }]}
                >
                    <Select placeholder="Chọn người cần thêm ảnh">
                        {dataSource.map((item) => (
                            <Select.Option key={item.id} value={item.id}>
                                {`${item.signedBy} - ${item.stampNumber}`}
                            </Select.Option>
                        ))}
                    </Select>
                </Form.Item>

                {/* Upload ảnh */}
                <Form.Item label="Hình ảnh">
                    <Upload
                        listType="picture"
                        fileList={fileList}
                        beforeUpload={(file) => {
                            setFile(file);
                            setFileList([file]);
                            return false;
                        }}
                        onRemove={() => {
                            setFile(null);
                            setFileList([]);
                        }}
                        maxCount={1}
                    >
                        <Button icon={<UploadOutlined />}>
                            Chọn ảnh
                        </Button>
                    </Upload>
                </Form.Item>

            </Form>

        </Modal>
    );
};

export default ImageModal;