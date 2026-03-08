import React, { useRef } from "react";
import { Modal, Button, message } from "antd";
import { DownloadOutlined } from "@ant-design/icons";
import html2canvas from "html2canvas";
import logovn from "../assets/logovn.svg";
import dayjs from "dayjs";
const ViewModal = ({ open, onCancel, record }) => {
  console.log("ViewModal record:", record);
  const printRef = useRef(null);

  const dottedLine = {
    flex: 1,
    paddingBottom: "3px",
    backgroundImage:
      "repeating-linear-gradient(to right, black 0, black 2px, transparent 1px, transparent 4px)",
    backgroundPosition: "bottom",
    backgroundSize: "100% 2px",
    backgroundRepeat: "no-repeat",
    textAlign: "center",
    marginBottom: "15px",
  };
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
        <Button
          key="download"
          type="primary"
          icon={<DownloadOutlined />}
          onClick={handleDownloadImage}
        >
          Tải về JPG
        </Button>,
      ]}
    >
      <div ref={printRef}>
        <div
          style={{
            width: "850px",
            minHeight: "1275px",
            margin: "0 auto",
            paddingTop: "120px", // moved inside so html2canvas captures it
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
              Để xác thực chứng nhận này, hãy quét mã QR-Code hoặc truy cập
              đường dẫn:
            </div>

            <div className="italic">
              To verify this certificate, please scan the QR-Code or go to
            </div>

            <div className="italic">
              https://hopphaphoa.lanhsuvietnam.gov.vn/verify
            </div>
          </div>

          <div
            style={{
              borderBottom: "1px solid #000",
              marginBottom: "20px",
              marginTop: "10px",
            }}
          ></div>

          {/* LOGO & HEADER */}
          <div
            style={{
              textAlign: "center",
              marginBottom: "8px", // giảm từ 20 xuống
              lineHeight: "1.2", // giảm khoảng cách giữa các dòng
            }}
          >
            <div style={{ marginBottom: "6px" }}>
              {" "}
              {/* giảm từ 15 xuống */}
              <img
                src={logovn}
                alt="Logo"
                style={{
                  display: "block",
                  margin: "0 auto",
                  width: "80px",
                  height: "80px",
                }}
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
              marginBottom: "10px", // giảm từ 25 xuống
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
            <div style={{ marginBottom: "20px" }}>
              {/* Dòng 1 */}
              <div style={{ display: "flex", alignItems: "flex-end" }}>
                <div style={{ width: "75px", lineHeight: "1.2" }}>
                  <div
                    style={{ fontWeight: "bold", marginTop: "4px" }}
                    className="text-center"
                  >
                    {" "}
                    1. Quốc gia
                  </div>
                  <div
                    style={{ fontSize: "11px", fontStyle: "italic" }}
                    className="leading-tight text-center"
                  >
                    Country
                  </div>
                </div>

                <div
                  style={{
                    flex: 1,
                    paddingBottom: "2px",
                    backgroundImage:
                      "repeating-linear-gradient(to right, black 0, black 2px, transparent 1px, transparent 4px)",
                    backgroundPosition: "bottom",
                    backgroundSize: "1000% 2px",
                    backgroundRepeat: "no-repeat",
                    textAlign: "center",
                    marginBottom: "15px",
                  }}
                >
                  <span style={{ fontWeight: "bold text-center" }}>
                    {record?.country}
                  </span>
                </div>
              </div>

              {/* Tiêu đề document */}
              <div
                style={{
                  textAlign: "center",
                  marginTop: "18px",
                  lineHeight: "1.3",
                }}
              >
                <div style={{ fontWeight: "bold", fontSize: "16px" }}>
                  Giấy tờ, tài liệu này
                </div>

                <div style={{ fontStyle: "italic", fontSize: "11px" }}>
                  This public document
                </div>
              </div>
            </div>

            <div style={{ marginBottom: "10px" }}>
              <div style={{ display: "flex", alignItems: "flex-end" }}>
                {/* Bên trái */}
                <div style={{ width: "90px", lineHeight: "1.2" }}>
                  <div style={{ fontWeight: "bold" }}>2. do ông (bà)</div>
                  <div style={{ fontSize: "11px", fontStyle: "italic" }}>
                    has been signed by
                  </div>
                </div>

                {/* Dòng chấm + tên */}
                <div
                  style={{
                    flex: 1,
                    position: "relative",
                    margin: "0 8px",
                    paddingBottom: "3px",
                    backgroundImage:
                      "repeating-linear-gradient(to right, black 0, black 2px, transparent 1px, transparent 4px)",
                    backgroundPosition: "bottom",
                    backgroundSize: "1000% 2px",
                    backgroundRepeat: "no-repeat",
                    textAlign: "center",
                    marginBottom: "15px",
                  }}
                >
                  <span
                    style={{
                      fontWeight: "bold",
                      background: "#fff",
                      padding: "0 8px",
                    }}
                  >
                    {record?.signedBy}
                  </span>
                </div>

                {/* chữ ký */}
                <div
                  style={{
                    width: "14px",
                    fontWeight: "bold",
                    marginBottom: "15px",
                  }}
                >
                  ký
                </div>
              </div>
            </div>

            <div style={{ marginBottom: "12px" }}>
              <div style={{ display: "flex", alignItems: "flex-end" }}>
                {/* Label */}
                <div style={{ width: "107px", lineHeight: "1.2" }}>
                  <div style={{ fontWeight: "bold" }}>3. với chức danh</div>
                  <div style={{ fontSize: "11px", fontStyle: "italic" }}>
                    acting in the capacity of
                  </div>
                </div>

                {/* Dòng chấm + dữ liệu */}
                <div style={dottedLine}>
                  <span
                    style={{
                      fontWeight: "bold",
                      background: "#fff",
                      padding: "0 8px",
                    }}
                  >
                    {record?.signedTitle}
                  </span>
                </div>
              </div>
            </div>

            <div style={{ marginBottom: "12px" }}>
              <div style={{ display: "flex", alignItems: "flex-end" }}>
                {/* Label */}
                <div style={{ width: "107px", lineHeight: "1.2" }}>
                  <div style={{ fontWeight: "bold" }}>4.và con dấu của</div>
                  <div style={{ fontSize: "11px", fontStyle: "italic" }}>
                    bear the seal/stamp of
                  </div>
                </div>

                {/* Dòng chấm + dữ liệu */}
                <div style={dottedLine}>
                  <span
                    style={{
                      fontWeight: "bold",
                      background: "#fff",
                      padding: "0 8px",
                    }}
                  >
                    {record?.notaryOffice}
                  </span>
                </div>
              </div>
            </div>

            <div
              style={{
                textAlign: "center",
                fontWeight: "bold",
                marginBottom: "3px",
              }}
            >
              được chứng nhận lãnh sự
            </div>

            <div
              style={{
                textAlign: "center",
                fontSize: "10px",
                fontStyle: "italic",
                marginBottom: "20px",
              }}
            >
              Certified
            </div>

            {/* 5 & 6 */}
            <div
              style={{
                display: "flex",
                alignItems: "flex-end",
                marginBottom: "6px",
                width: "100%",
              }}
            >
              {/* 5. tại */}
              <div style={{ width: "70px", fontWeight: "bold" }}>5. tại</div>

              <div
                style={{
                  width: "40%", // tính toán phần còn lại sau khi trừ đi các phần cố định
                  textAlign: "center",
                  backgroundImage:
                    "repeating-linear-gradient(to right, black 0, black 2px, transparent 2px, transparent 6px)",
                  backgroundPosition: "bottom",
                  backgroundSize: "100% 2px",
                  backgroundRepeat: "no-repeat",
                  paddingBottom: "2px",
                }}
              >
                <span style={{ fontWeight: "bold" }}>
                  {record?.certifiedPlace}
                </span>
              </div>

              {/* khoảng cách giữa 5 và 6 */}
              <div style={{ width: "20%" }}></div>

              {/* 6. ngày */}
              <div style={{ width: "70px", fontWeight: "bold" }}>6. ngày</div>

              <div
                style={{
                  width: "40%",
                  textAlign: "center",
                  backgroundImage:
                    "repeating-linear-gradient(to right, black 0, black 2px, transparent 2px, transparent 6px)",
                  backgroundPosition: "bottom",
                  backgroundSize: "100% 2px",
                  backgroundRepeat: "no-repeat",
                  paddingBottom: "2px",
                }}
              >
                <span style={{ fontWeight: "bold" }}>
                  {dayjs(record?.certifiedDate).format("DD/MM/YYYY")}
                </span>
              </div>
            </div>

            {/* English line */}
            <div
              style={{
                display: "flex",
                fontSize: "10px",
                fontStyle: "italic",
                marginBottom: "18px",
              }}
            >
              <div style={{ width: "70px" }}></div>
              <div style={{ width: "220px" }}>at the</div>

              <div style={{ width: "40px" }}></div>

              <div style={{ width: "70px" }}></div>
              <div style={{ width: "200px" }}></div>
            </div>

            <div style={{ marginBottom: "12px" }}>
              <div style={{ display: "flex", alignItems: "flex-end" }}>
                {/* Label */}
                <div style={{ width: "107px", lineHeight: "1.2" }}>
                  <div style={{ fontWeight: "bold" }}>7.Cơ quan cấp</div>
                  <div style={{ fontSize: "11px", fontStyle: "italic" }}>
                    by
                  </div>
                </div>

                {/* Dòng chấm + dữ liệu */}
                <div style={dottedLine}>
                  <span
                    style={{
                      fontWeight: "bold",
                      background: "#fff",
                      padding: "0 8px",
                    }}
                  >
                    {record?.consularDepartment}
                  </span>
                </div>
              </div>
            </div>

            {/* ROW 8 */}
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "flex-start",
                marginBottom: "25px",
              }}
            >
              {/* LEFT - NUMBER */}
              <div style={{ flex: 1 }}>
                <div
                  style={{
                    textAlign: "center",
                    display: "flex",
                    alignItems: "flex-end",
                  }}
                >
                  <span style={{ fontWeight: "bold", marginRight: "6px" }}>
                    8. Số
                  </span>

                  <div
                    style={{
                      flex: 1,
                      position: "relative",
                      height: "25px",
                      marginRight: "40px",
                    }}
                  >
                    {/* dotted line */}
                    <div
                      style={{
                        position: "absolute",
                        bottom: "3px",
                        width: "100%",
                        height: "2px",
                        backgroundImage:
                          "repeating-linear-gradient(to right,#000 0,#000 3px,transparent 3px,transparent 6px)",
                      }}
                    />

                    <span
                      style={{
                        paddingBottom: "2px",
                        position: "relative",
                        background: "#fff",
                        paddingRight: "6px",
                        fontWeight: "bold",
                      }}
                    >
                      {record?.stampNumber}
                    </span>
                  </div>
                </div>

                <div
                  style={{
                    fontSize: "10px",
                    fontStyle: "italic",
                    marginTop: "2px",
                  }}
                >
                  No.
                </div>

                {/* BOTTOM SECTION */}
                <div style={{ display: "flex", marginTop: "10px" }}>
                  {/* LEFT SIDE */}
                  <div style={{ width: "320px", display: "flex" }}>
                    {/* QR */}
                    <div style={{ marginRight: "10px" }}>
                      <div
                        style={{
                          width: "90px",
                          height: "90px",
                          background: "#f2f2f2",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          fontSize: "10px",
                        }}
                      >
                        QR
                      </div>
                    </div>

                    {/* REMARKS */}
                    <div style={{ fontSize: "10px" }}>
                      <div style={{ fontWeight: "bold" }}>9. Ghi chú</div>
                      <div style={{ fontStyle: "italic", marginBottom: "3px" }}>
                        Remarks
                      </div>

                      <div
                        style={{
                          fontSize: "9px",
                          lineHeight: "1.3",
                          maxWidth: "190px",
                        }}
                      >
                        This certificate does not certify the content or the
                        form of the document for which it was issued; This
                        certificate is valid for use abroad only.
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* RIGHT - SIGNATURE TITLE */}
              <div style={{ textAlign: "center", width: "200px" }}>
                <div style={{ fontWeight: "bold" }}>Ký tên và đóng dấu</div>
                <div style={{ fontSize: "10px", fontStyle: "italic" }}>
                  Signature and seal/stamp
                </div>
                {/* RIGHT SIDE SIGNATURE */}
                <div className="abc" style={{ flex: 1, textAlign: "center" }}>
                  {/* SIGN AREA */}
                  <div style={{ height: "90px", marginBottom: "10px" }}>
                    {record?.signatureImage && (
                      <img
                        src={record.signatureImage}
                        style={{ maxHeight: "80px" }}
                      />
                    )}
                  </div>

                  {/* NAME */}
                  <div style={{ fontWeight: "bold", marginBottom: "4px" }}>
                    {record?.signedBy}
                  </div>

                  {/* TITLE */}
                  <div style={{ fontSize: "11px" }}>Head of Division</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Modal>
  );
};

export default ViewModal;
