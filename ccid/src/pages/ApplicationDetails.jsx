import React from 'react';
import { Row, Col, Card, Descriptions, Image } from 'antd';
import AdminLayout from '../layout/AdminLayout';
import '../styles/ApplicationDetails.css';

const ApplicationDetails = () => {
  // sample static data matching screenshot
  const applicationInfo = {
    submissionMethod: 'CNLS',
    receiptDate: '23/02/2026',
    competentAuth: 'Cục Lãnh sự',
    resultDate: '25/02/2026',
    signatory: '',
    title: '',
  };

  const documentInfo = {
    cvType: 'CNLS',
    documentTitle: 'Bằng cao đẳng/College Degree',
    documentType: 'Bản dịch',
    holderName: 'TRẦN PHÚC THỊNH',
    referenceNumber: '15364',
    issueDate: '05/02/2026',
    authority: 'VPCC Nguyễn Huệ, P. Ô Chợ Dừa, TP. Hà Nội',
    signatory: 'Lê Như Tuấn',
    title: '',
  };

  return (
    <AdminLayout>
      <div style={{ padding: '24px' }}>
        <Row gutter={16}>
          <Col xs={24} md={8}>
            <Card title="Thông tin hồ sơ (Application Information)">
              <Descriptions column={1} bordered size="small">
                <Descriptions.Item label="Hình thức nộp hồ sơ">
                  {applicationInfo.submissionMethod}
                </Descriptions.Item>
                <Descriptions.Item label="Ngày nhận hồ sơ">
                  {applicationInfo.receiptDate}
                </Descriptions.Item>
                <Descriptions.Item label="Cơ quan giải quyết">
                  {applicationInfo.competentAuth}
                </Descriptions.Item>
                <Descriptions.Item label="Ngày trả kết quả">
                  {applicationInfo.resultDate}
                </Descriptions.Item>
                <Descriptions.Item label="Người ký chứng nhận">
                  {applicationInfo.signatory}
                </Descriptions.Item>
                <Descriptions.Item label="Chức danh">
                  {applicationInfo.title}
                </Descriptions.Item>
              </Descriptions>
            </Card>
          </Col>

          <Col xs={24} md={8}>
            <Card title="Thông tin giấy tờ (Document Information)">
              <Descriptions column={1} bordered size="small">
                <Descriptions.Item label="Loại CV (Type of CV)">
                  {documentInfo.cvType}
                </Descriptions.Item>
                <Descriptions.Item label="Tên giấy tờ (Document title)">
                  {documentInfo.documentTitle}
                </Descriptions.Item>
                <Descriptions.Item label="Loại giấy tờ (Document Type)">
                  {documentInfo.documentType}
                </Descriptions.Item>
                <Descriptions.Item label="Tên người được cấp giấy tờ">
                  {documentInfo.holderName}
                </Descriptions.Item>
                <Descriptions.Item label="Số hiệu của giấy tờ">
                  {documentInfo.referenceNumber}
                </Descriptions.Item>
                <Descriptions.Item label="Ngày cấp">
                  {documentInfo.issueDate}
                </Descriptions.Item>
                <Descriptions.Item label="Cơ quan (Authority)">
                  {documentInfo.authority}
                </Descriptions.Item>
                <Descriptions.Item label="Người ký (Signatory)">
                  {documentInfo.signatory}
                </Descriptions.Item>
                <Descriptions.Item label="Chức danh (Title)">
                  {documentInfo.title}
                </Descriptions.Item>
              </Descriptions>
            </Card>
          </Col>

          <Col xs={24} md={8}>
            <Card title="Thông tin tem CNLS / HPHLS">
              <Image
                src="/placeholder-stamp.png"
                alt="Consular Certification Stamp"
                style={{ maxWidth: '100%' }}
                preview={false}
              />
            </Card>
          </Col>
        </Row>
      </div>
    </AdminLayout>
  );
};

export default ApplicationDetails;
