import React, { useRef } from "react";
import { Modal, Button, message } from "antd";
import { DownloadOutlined } from "@ant-design/icons";
import html2canvas from "html2canvas";
import logovn  from "../assets/logovn.svg"
const ViewModal = ({ open, onCancel, record }) => {
    const printRef = useRef(null);

    const handleDownloadImage = async () => {
        if (!printRef.current) return;

        try {
            message.loading({ content: "Đang tạo ảnh...", key: "download" });

            const canvas = await html2canvas(printRef.current, {
                scale: 2,
                useCORS: true,
                logging: false,
                backgroundColor: "#ffffff",
            });

            const link = document.createElement("a");
            link.href = canvas.toDataURL("image/jpeg", 0.95);
            link.download = `Chứng nhận lãnh sự - ${record?.number || "document"}.jpg`;
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);

            message.success({ content: "Tải xuống thành công!", key: "download" });
        } catch (error) {
            console.error("Error:", error);
            message.error({
                content: "Lỗi khi tải xuống. Vui lòng thử lại!",
                key: "download",
            });
        }
    };

    if (!record) return null;

    const prefix = record.gender === "female" ? "bà" : "ông";

    return (
        <Modal
            open={open}
            onCancel={onCancel}
            width={950}
            style={{ top: 20 }}
            footer={[
                <Button key="download" type="primary" icon={<DownloadOutlined />} onClick={handleDownloadImage}>
                    Tải về JPG
                </Button>,
            ]}
        >
            <div ref={printRef}>
                <div
                    style={{
                        width: "850px",
                        minHeight: "1200px",
                        margin: "0 auto",
                        paddingTop: "99px", // moved inside so html2canvas captures it
                        padding: "40px 50px",
                        background: "#fff",
                        fontFamily: "Times New Roman, serif",
                        fontSize: "13px",
                        lineHeight: "1.5",
                    }}
                >
                    {/* VERIFY QR CODE SECTION */}
                    <div
                        style={{
                            textAlign: "center",
                            fontSize: "15px",

                            color: "#242424",
                            lineHeight: "1.2",
                            fontWeight: 400,
                        }}
                    >
                        <div>
                            Để xác thực chứng nhận này, hãy quét mã QR-Code hoặc truy cập đường dẫn:
                        </div>

                        <div className="italic">
                            To verify this certificate, please scan the QR-Code or go to
                        </div>

                        <div className="italic">
                            https://hopphaphoa.lanhsuvietnam.gov.vn/verify
                        </div>
                    </div>

                    <div style={{ borderBottom: "1px solid #000", marginBottom: "20px", marginTop: "10px" }}></div>

                    {/* LOGO & HEADER */}
                    <div
                        style={{
                            textAlign: "center",
                            marginBottom: "8px",   // giảm từ 20 xuống
                            lineHeight: "1.2",     // giảm khoảng cách giữa các dòng
                        }}
                    >
                        <div style={{ marginBottom: "6px" }}>   {/* giảm từ 15 xuống */}
                            <img
                                src={logovn}
                                alt="Logo"
                                style={{ display: "block", margin: "0 auto", width: "80px", height: "80px" }}
                            />
                        </div>

                        <div
                            style={{
                                fontSize: "18px",
                                fontWeight: "bold",
                                margin: 0,
                                lineHeight: "1.1",
                            }}
                        >
                            BỘ NGOẠI GIAO NƯỚC CHXHCN VIỆT NAM
                        </div>

                        <div
                            style={{
                                fontSize: "18px",
                                fontStyle: "italic",
                                margin: 0,
                                lineHeight: "1.1",
                            }}
                        >
                            MINISTRY OF FOREIGN AFFAIRS OF THE S.R. OF VIETNAM
                        </div>
                    </div>

                    {/* TITLE */}
                    <div
                        style={{
                            textAlign: "center",
                            marginBottom: "10px",   // giảm từ 25 xuống
                            lineHeight: "1.3",
                        }}
                    >
                        <div
                            style={{
                                fontSize: "20px",
                                fontWeight: "bold",
                                margin: 0,
                                lineHeight: "1.3",
                            }}
                        >
                            CHỨNG NHẬN LÃNH SỰ
                        </div>

                        <div
                            style={{
                                fontSize: "14px",
                                fontStyle: "italic",
                                margin: 0,
                                lineHeight: "1",
                            }}
                        >
                            CONSULAR AUTHENTICATION
                        </div>
                    </div>

                    {/* CONTENT */}
                    <div style={{ marginBottom: "30px" }}>
                        <div style={{ display: "flex", marginBottom: "12px" }}>
                            <div style={{ width: "200px" }}>
                                <span style={{ fontWeight: "bold" }}>1. Quốc gia</span>
                            </div>
                            <div style={{ flex: 1, borderBottom: "1px dotted #000", paddingBottom: "2px" }}>
                                <span style={{ fontWeight: "bold" }}>{record.country}</span>
                            </div>chỉnh 
                        </div>
                        <div style={{ fontSize: "10px", marginBottom: "15px", marginLeft: "200px" }}>
                            Country
                        </div>

                        <div style={{ textAlign: "center", fontWeight: "bold", marginBottom: "5px" }}>
                            {record.document}
                        </div>
                        <div style={{ textAlign: "center", fontStyle: "italic", fontSize: "10px", marginBottom: "15px" }}>
                            This public document
                        </div>

                        <div style={{ display: "flex", marginBottom: "12px" }}>
                            <div style={{ width: "200px" }}>
                                <span style={{ fontWeight: "bold" }}>2. do {prefix}</span>
                            </div>
                            <div style={{ flex: 1, borderBottom: "1px dotted #000", paddingBottom: "2px" }}>
                                <span style={{ fontWeight: "bold" }}>{record.signedBy}</span>
                            </div>
                            <span style={{ fontWeight: "bold", marginLeft: "10px" }}>ký</span>
                        </div>
                        <div style={{ fontSize: "10px", marginBottom: "15px", marginLeft: "200px" }}>
                            has been signed by
                        </div>

                        <div style={{ display: "flex", marginBottom: "12px" }}>
                            <div style={{ width: "200px" }}>
                                <span style={{ fontWeight: "bold" }}>3. với chức danh</span>
                            </div>
                            <div style={{ flex: 1, borderBottom: "1px dotted #000", paddingBottom: "2px" }}>
                                <span style={{ fontWeight: "bold" }}>{record.capacity}</span>
                            </div>
                        </div>
                        <div style={{ fontSize: "10px", marginBottom: "15px", marginLeft: "200px" }}>
                            acting in the capacity of
                        </div>

                        <div style={{ display: "flex", marginBottom: "12px" }}>
                            <div style={{ width: "200px" }}>
                                <span style={{ fontWeight: "bold" }}>4. và con dấu của</span>
                            </div>
                            <div style={{ flex: 1, borderBottom: "1px dotted #000", paddingBottom: "2px" }}>
                                <span style={{ fontWeight: "bold" }}>{record.sealOf}</span>
                            </div>
                        </div>
                        <div style={{ fontSize: "10px", marginBottom: "15px", marginLeft: "200px" }}>
                            bear the seal/stamp of
                        </div>

                        <div style={{ textAlign: "center", fontWeight: "bold", marginBottom: "15px" }}>
                            được chứng nhận lãnh sự
                        </div>
                        <div style={{ textAlign: "center", fontSize: "10px", marginBottom: "20px", fontStyle: "italic" }}>
                            Certified
                        </div>

                        <div style={{ display: "flex", marginBottom: "12px" }}>
                            <div style={{ width: "150px" }}>
                                <span style={{ fontWeight: "bold" }}>5. tại</span>
                            </div>
                            <div style={{ flex: 1, borderBottom: "1px dotted #000", paddingBottom: "2px" }}>
                                <span style={{ fontWeight: "bold" }}>{record.at}</span>
                            </div>
                            <div style={{ width: "100px", marginLeft: "20px" }}>
                                <span style={{ fontWeight: "bold" }}>6. ngày</span>
                            </div>
                            <div style={{ width: "150px", borderBottom: "1px dotted #000", paddingBottom: "2px" }}>
                                <span style={{ fontWeight: "bold" }}>{record.date}</span>
                            </div>
                        </div>
                        <div style={{ display: "flex", fontSize: "10px", marginBottom: "20px" }}>
                            <div style={{ width: "150px" }}>at the</div>
                            <div style={{ flex: 1 }}></div>
                            <div style={{ width: "100px", marginLeft: "20px" }}></div>
                            <div style={{ width: "150px" }}></div>
                        </div>

                        <div style={{ display: "flex", marginBottom: "12px" }}>
                            <div style={{ width: "200px" }}>
                                <span style={{ fontWeight: "bold" }}>7. Cơ quan cấp</span>
                            </div>
                            <div style={{ flex: 1, borderBottom: "1px dotted #000", paddingBottom: "2px" }}>
                                <span style={{ fontWeight: "bold" }}>{record.issuedBy}</span>
                            </div>
                        </div>
                        <div style={{ fontSize: "10px", marginBottom: "15px", marginLeft: "200px" }}>
                            by
                        </div>

                        <div style={{ display: "flex", marginBottom: "12px" }}>
                            <div style={{ width: "200px" }}>
                                <span style={{ fontWeight: "bold" }}>8. Số</span>
                            </div>
                            <div style={{ flex: 1, borderBottom: "1px dotted #000", paddingBottom: "2px" }}>
                                <span style={{ fontWeight: "bold" }}>{record.number}</span>
                            </div>
                        </div>
                        <div style={{ fontSize: "10px", marginBottom: "20px", marginLeft: "200px" }}>
                            No.
                        </div>
                    </div>

                    {/* BOTTOM SECTION */}
                    <div style={{ display: "flex", marginTop: "40px" }}>
                        {/* LEFT SIDE - QR & REMARKS */}
                        <div style={{ width: "200px", marginRight: "20px" }}>
                            <div style={{ marginBottom: "15px", textAlign: "center" }}>
                                <div style={{ width: "80px", height: "80px", background: "#f0f0f0", margin: "0 auto", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "10px" }}>
                                    QR Code
                                </div>
                            </div>
                            <div style={{ fontSize: "10px", fontWeight: "bold", marginBottom: "5px" }}>
                                9. Ghi chú
                            </div>
                            <div style={{ fontSize: "9px", lineHeight: "1.3", textAlign: "justify" }}>
                                <p style={{ margin: "0 0 5px 0" }}>
                                    Remarks
                                </p>
                                <p style={{ margin: "0", fontSize: "8px" }}>
                                    This certificate does not certify the content or the form of the document for which it was issued; This certificate is valid for use abroad only.
                                </p>
                            </div>
                        </div>

                        {/* RIGHT SIDE - SIGNATURE */}
                        <div style={{ flex: 1 }}>
                            <div style={{ display: "flex", justifyContent: "flex-end" }}>
                                <div style={{ textAlign: "center" }}>
                                    <div style={{ marginBottom: "80px", height: "80px" }}>
                                        <div style={{ fontStyle: "italic", fontSize: "11px", marginBottom: "5px" }}>
                                            Ký tên và đóng dấu
                                        </div>
                                    </div>
                                    <div style={{ borderTop: "1px solid #000", paddingTop: "10px", minWidth: "150px" }}>
                                        <div style={{ fontWeight: "bold", fontSize: "12px", marginBottom: "2px" }}>
                                            {record.signedBy || ""}
                                        </div>
                                        <div style={{ fontSize: "10px" }}>
                                            Head of Division
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div style={{ marginTop: "20px", fontSize: "8px" }}>
                        Signature and seal/stamp
                    </div>
                </div>
            </div>
        </Modal>
    );
};

export default ViewModal;