import React, { useEffect } from "react";
import { Modal, Upload, Button, Form, Input, Select } from "antd";
import { UploadOutlined } from "@ant-design/icons";
import apiService from "../services/apiService";

const ImageModal = ({ open, setOpen }) => {
    const [form] = Form.useForm();
    const [dataSource, setDataSource] = React.useState([]);
    const handleSubmit = () => {
        form.validateFields().then((values) => {
            console.log("DATA:", values);
            setOpen(false);
            form.resetFields();
        });
    };


    const fetchData = async () => {
        let res = await apiService.stamps.getAll();
        if (res?.success === true) {
            setDataSource(res.data);
        }
    };
    useEffect(() => {
        fetchData();
    }, []);

    return (
        <Modal
            title="Thêm ảnh vào Temp"
            open={open}
            onCancel={() => setOpen(false)}
            width={500}
            footer={[
                <Button key="cancel" onClick={() => setOpen(false)}>
                    Hủy
                </Button>,
                <Button key="submit" type="primary" onClick={handleSubmit}>
                    Lưu
                </Button>,
            ]}
        >
            <Form form={form} layout="vertical">

                {/* Chọn Ông/Bà */}
                <Form.Item
                    label="Danh xưng"
                    name="gender"
                    rules={[{ required: true, message: "Vui lòng chọn Ông/Bà" }]}
                >
                    <Select placeholder="Chọn ông bà cần thêm ảnh">
                        {dataSource.map((item) => (
                            <Select.Option key={item.id} value={item.id}>
                                {`${item.signedBy} - ${item.stampNumber}`}
                            </Select.Option>
                        ))}
                    </Select>
                </Form.Item>

                {/* Tên */}


                {/* Upload ảnh */}
                <Form.Item label="Hình ảnh">
                    <Upload
                        name="file"
                        listType="picture"
                        beforeUpload={() => false}
                    >
                        <Button icon={<UploadOutlined />}>Chọn ảnh</Button>
                    </Upload>
                </Form.Item>

            </Form>
        </Modal>
    );
};

export default ImageModal;