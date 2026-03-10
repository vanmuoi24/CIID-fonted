import React, { useEffect, useRef, useState } from "react";
import { Modal, Button, message } from "antd";
import { DownloadOutlined } from "@ant-design/icons";
import html2canvas from "html2canvas";
import logovn from "../assets/logovn.svg";
import dayjs from "dayjs";
import apiService from "../services/apiService";
import {
  Sign1, Sign2
} from "../assets/icon"
import { useParams } from "react-router-dom";
const ViewModal = ({ open, onCancel, record }) => {

  const printRef = useRef(null);
  const [qrCode, setQrCode] = React.useState(null);
  const { code } = useParams()
  const [dataTemp, setDataTemp] = useState()

  const formatDay = (date) => {
    if (!date) return "";
    return dayjs(date).format("DD/MM/YYYY");
  };
  const dottedLine = {
    flex: 1,
    paddingBottom: "3px",
    borderBottom: "3px dotted black",
    backgroundPosition: "bottom",
    backgroundSize: "100% 2px",
    backgroundRepeat: "no-repeat",
    textAlign: "center",
    marginBottom: "15px",
  };


  const fetchQR = async () => {
    try {
      const res = await apiService.stamps.getQR(record.id);

      const imageUrl = URL.createObjectURL(res)
      setQrCode(imageUrl);

    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (record?.id) {

      fetchQR();
    }
  }, [record?.id]);
  const handleDownloadImage = async () => {
    console.log("123")
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
      title={
        <div style={{ display: "flex", alignItems: "center" }}>


          <Button
            type="primary"
            icon={<DownloadOutlined />}
            onClick={handleDownloadImage}
          >
            Tải JPG
          </Button>
        </div>
      }
      footer={null}
    >
      <div ref={printRef}>
        <div
          style={{
            width: "850px",
            minHeight: "1275px",
            paddingTop: "84px",
            paddingLeft: "55px",
            paddingRight: "55px",
            background: "#fff",
            fontFamily: "Times New Roman, serif",
            fontSize: "13px",
            lineHeight: "1.5",
            margin: "0 auto",
          }}
        >
          {/* VERIFY QR CODE SECTION */}
          <div
            style={{
              textAlign: "center",
              fontSize: "18px",

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
              marginTop: "15px",
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
                  width: "110px",
                  height: "110px",
                }}
              />
            </div>

            <div
              style={{
                fontSize: "24px",
                fontWeight: "bold",
                margin: 0,
                lineHeight: "1.1",
              }}
            >
              BỘ NGOẠI GIAO NƯỚC CHXHCN VIỆT NAM
            </div>

            <div
              style={{
                fontSize: "24px",
                fontStyle: "italic",
                margin: 0,
                lineHeight: "1.3",

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
                fontSize: "24px",
                fontWeight: "bold",
                margin: 0,
                lineHeight: "1.3",
              }}
            >
              CHỨNG NHẬN LÃNH SỰ
            </div>

            <div
              style={{
                fontSize: "24px",
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
              <div style={{ display: "flex", alignItems: "flex-end", marginTop: "40px" }}>
                <div style={{ width: "110px", lineHeight: "1.2" }}>
                  <div
                    style={{ fontWeight: "bold", marginTop: "4px", fontSize: "24px" }}
                    className="text-center"
                  >
                    {" "}
                    1.Quốc gia
                  </div>
                  <div
                    style={{ fontSize: "21px", fontStyle: "italic" }}
                    className="leading-tight text-center"
                  >
                    Country
                  </div>
                </div>

                <div
                  style={{
                    flex: 1,
                    paddingBottom: "5px",
                    borderBottom: "3px dotted black",
                    backgroundPosition: "bottom",
                    backgroundSize: "1000% 2px",
                    backgroundRepeat: "no-repeat",
                    textAlign: "center",
                    marginBottom: "20px",
                    marginLeft: "10px"
                  }}
                >
                  <span style={{ fontWeight: "700", fontSize: "23px", }}>
                    {record?.country}
                  </span>
                </div>
              </div>

              {/* Tiêu đề document */}
              <div
                style={{
                  textAlign: "center",

                  lineHeight: "1.3",
                  marginRight: "10px"
                }}
              >
                <div style={{ fontWeight: "700", fontSize: "24px" }}>
                  Giấy tờ, tài liệu này
                </div>

                <div style={{ fontStyle: "italic", fontSize: "22px" }}>
                  This public document
                </div>
              </div>
            </div>

            <div style={{ marginBottom: "10px" }}>
              <div style={{ display: "flex", alignItems: "flex-end" }}>
                {/* Bên trái */}
                <div style={{ width: "200px", lineHeight: "1.2" }}>
                  <div style={{ fontWeight: "bold", fontSize: "24px" }}>2.do ông (bà)</div>
                  <div style={{ fontSize: "23px", fontStyle: "italic", marginLeft: "18px" ,width:"200px"}}>
                    has been signed by
                  </div>
                </div>

                {/* Dòng chấm + tên */}
                <div
                  style={{
                    flex: 1,
                    position: "absolute",
                    margin: "0 8px",
                    paddingBottom: "3px",
                    borderBottom: "3px dotted black",
                    backgroundPosition: "bottom",
                    backgroundSize: "1000% 2px",
                    backgroundRepeat: "no-repeat",
                    textAlign: "center",
                    marginBottom: "15px",
                    width: "66%",
                    left: "23%"
                  }}
                >
                  <span
                    style={{
                      fontWeight: "bold",
                      background: "#fff",
                      padding: "0 8px",
                      fontSize: "24px"
                    }}
                  >
                    {record?.signedBy}
                  </span>
                </div>

                {/* chữ ký */}
                <div
                  style={{
                    width: "26px",
                    fontWeight: "bold",
                    marginBottom: "20px",
                    fontSize: "24px",
                    marginLeft: "550px"
                  }}
                >
                  ký
                </div>
              </div>
            </div>

            <div style={{ marginBottom: "12px" }}>
              <div style={{ display: "flex", alignItems: "flex-end" }}>
                {/* Label */}
                <div style={{ width: "260px", lineHeight: "1.2" }}>
                  <div style={{ fontWeight: "bold", fontSize: "24px" }}>3.với chức danh</div>
                  <div style={{ fontSize: "23px", fontStyle: "italic" }} className="text-center">
                    acting in the capacity of
                  </div>
                </div>

                {/* Dòng chấm + dữ liệu */}
                <div style={{

                  flex: 1,
                  paddingBottom: "3px",
                  borderBottom: "3px dotted black",
                  backgroundPosition: "bottom",
                  backgroundSize: "100% 2px",
                  backgroundRepeat: "no-repeat",
                  textAlign: "center",
                  marginBottom: "15px",
                  width: "64%",
                  left: "27%",
                  position: "absolute",

                }}>
                  <span
                    style={{
                      fontWeight: "bold",
                      background: "#fff",
                      padding: "0 8px",
                      fontSize: "24px"
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
                <div style={{ width: "240px", lineHeight: "1.2" }}>
                  <div style={{ fontWeight: "bold", fontSize: "24px" }}>4.và con dấu của</div>
                  <div style={{ fontSize: "23px", fontStyle: "italic" }} className="text-center">
                    bear the seal/stamp of
                  </div>
                </div>

                {/* Dòng chấm + dữ liệu */}
                <div style={{

                  flex: 1,
                  paddingBottom: "3px",
                  borderBottom: "3px dotted black",
                  backgroundPosition: "bottom",
                  backgroundSize: "100% 2px",
                  backgroundRepeat: "no-repeat",
                  textAlign: "center",
                  marginBottom: "15px",
                  width: "63%",
                  left: "28%",
                  position: "absolute",

                }}>
                  <span
                    style={{
                      fontWeight: "bold",
                      background: "#fff",
                      padding: "0 8px",
                      fontSize: "24px"
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
                fontSize: "24px"
              }}
            >
              được chứng nhận lãnh sự
            </div>

            <div
              style={{
                textAlign: "center",

                fontStyle: "italic",
              
                fontSize: "23px",
                lineHeight: "0.5"
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
              <div style={{ width: "65px", fontWeight: "bold", fontSize: "24px" }}>5.tại</div>

              <div
                style={{
                  width: "40%", // tính toán phần còn lại sau khi trừ đi các phần cố định
                  textAlign: "center",
                  borderBottom: "3px dotted black",
                  backgroundPosition: "bottom",
                  backgroundSize: "100% 2px",
                  backgroundRepeat: "no-repeat",
                  paddingBottom: "2px",
                }}
              >
                <span style={{ fontWeight: "bold", fontSize: "24px" }}>
                  {record?.certifiedPlace}
                </span>
              </div>

              {/* khoảng cách giữa 5 và 6 */}
              <div style={{ width: "20%" }}></div>

              {/* 6. ngày */}
              <div style={{ width: "88px", fontWeight: "bold", fontSize: "24px" }}>6.ngày</div>

              <div
                style={{
                  width: "40%",
                  textAlign: "center",
                  borderBottom: "3px dotted black",
                  backgroundPosition: "bottom",
                  backgroundSize: "100% 2px",
                  backgroundRepeat: "no-repeat",
                  paddingBottom: "2px",
                }}
              >
                <span style={{ fontWeight: "bold", fontSize: "24px" }}>
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
                lineHeight: "0",
                marginLeft: "15px"

              }}
            >

              <div style={{ width: "220px", fontSize: "23px" }}>at the</div>

            </div>

            <div style={{ marginBottom: "12px", marginTop: "25px" }}>
              <div style={{ display: "flex", alignItems: "flex-end" }}>
                {/* Label */}
                <div style={{ width: "150px", lineHeight: "1.2" }}>
                  <div style={{ fontWeight: "bold", fontSize: "24px" }}>7.Cơ quan cấp</div>
                  <div style={{ fontSize: "23px", fontStyle: "italic", marginLeft: "20px" ,lineHeight:"0.8"}}>
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
                      fontSize: "24px"
                    }}
                  >
                    {record?.consularDepartment}
                  </span>
                </div>
              </div>
            </div>

            {/* ROW 8 */}

            {/* TOP SECTION */}
            <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "25px" }}>

              {/* LEFT - NUMBER */}
              <div style={{ flex: 1 }}>

                <div style={{ display: "flex", alignItems: "center" }}>
                  <span style={{ fontWeight: "bold", fontSize: "24px", marginRight: "6px" }}>
                    8.Số
                  </span>

                  {/* dotted line */}
                  <div
                    style={{
                      width: "55%",
                      borderBottom: "3px dotted black",
                      position: "relative",
                      height: "20px",

                    }}
                  >
                    <span
                      style={{
                        position: "absolute",
                        left: "50%",
                        transform: "translateX(-50%)",
                        fontWeight: "bold",
                        fontSize: "23px",
                        bottom: "1px"
                      }}
                    >
                      {record?.stampNumber}
                    </span>
                  </div>
                </div>

                <div style={{ fontStyle: "italic", fontSize: "23px", marginLeft: '18px',lineHeight:"0.8" }}>
                  No.
                </div>

              </div>


              {/* RIGHT - SIGN TITLE */}
              <div style={{ width: "260px", textAlign: "center", position: "relative" }}>

                <div style={{ fontWeight: "bold", fontSize: "24px" }}>
                  Ký tên và đóng dấu
                </div>

                <div style={{ fontStyle: "italic", fontSize: "21px" }}>
                  Signature and seal/stamp
                </div>

                {/* SIGNATURE OVERLAY */}
                <div
                  style={{
                    position: "absolute",
                    top: "10px",
                    left: "50%",
                    transform: "translateX(-50%)",
                    zIndex: 2
                  }}
                >

                  {
                    record?.signature?.name === "Trần Thanh Vân"
                      ? <Sign1 width={300} height={400} />
                      : <Sign2 width={300} height={160} />
                  }

                </div>

                {/* SPACE giữ layout */}
                <div style={{ height: "100px", marginBottom: "10px" }} />

                <div style={{ fontWeight: "bold", fontSize: "24px" }}>
                  {record?.signature.name}
                </div>

                <div style={{ fontSize: "24px" }}>
                  Head of Division
                </div>

              </div>

            </div>



            {/* BOTTOM SECTION */}
            {/* REMARKS SECTION */}
            <div style={{ display: "flex", alignItems: "flex-start", position: "absolute",bottom:"60px" }}>

              {/* LEFT SIDE */}
              <div style={{ width: "110px", textAlign: "left" }}>

                <div style={{ fontWeight: "bold", fontSize: "24px" }}>
                  9.Ghi chú
                </div>

                <div style={{ fontStyle: "italic", fontSize: "23px", lineHeight: "0.7" }}>
                  Remarks
                </div>

                {/* QR */}
                <div style={{ width: "100%", height: "100%" , position:'absolute' ,right:"20px",top:"70px"}}>
                  <img
                    src={qrCode}
                    alt="QR Code"
                    style={{
                      width: "130px",
                      height: "130px",
                      objectFit: "contain",
                     
                    
                    }}
                  />
                </div>

              </div>

              {/* RIGHT TEXT */}
              <div
                style={{
                  flex: 1,
                  fontSize: "18px",
                  fontStyle: "italic",
                  lineHeight: "1.4",
                  maxWidth: "240px",
                  textAlign: "center",
                  lineHeight:"1.3",
                  marginTop:"60px"
               
               
                }}
              >
                This certificate does not certify the content or the form of the
                document for which it was issued; This certificate is valid for use
                abroad only.
              </div>

            </div>

            <div>


            </div>
          </div>


        </div>
      </div>
    </Modal>
  );
};

export default ViewModal;