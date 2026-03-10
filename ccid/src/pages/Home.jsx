import React, { useEffect, useState } from "react";
import imgbgr from "../assets/bgrweb.jpg";
import tem from "../assets/tem.png"
import apiService from "../services/apiService";
import { useNavigate, useParams, useLocation } from "react-router-dom";
import dayjs from "dayjs";

const Home = () => {

    const [dataStamps, setDataStamps] = useState(null);
    const [loading, setLoading] = useState(true);
    const { code } = useParams();
    const navigate = useNavigate();
    const location = useLocation();


    const formatDay = (date) => {
      if (!date) return "";
      return dayjs(date).format("DD/MM/YYYY");
    };
    useEffect(() => {
       fetchStamps()
    }, [code]);

    const fetchStamps = async () => {
        try {
            setLoading(true);
            const response = await apiService.stamps.getCodeId(code);
            if (response.success) {
                setDataStamps(response.data);
                console.log("Fetched stamps:", response.data);
            } else {
                alert("Không tìm thấy thông tin");
                navigate("/verify");
            }
        } catch (error) {
            console.error("Error fetching stamps:", error);
            alert("Có lỗi xảy ra khi tải dữ liệu");
            navigate("/verify");
        } finally {
            setLoading(false);
        }
    };

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="text-center">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto"></div>
                    <p className="mt-4 text-gray-600">Đang tải dữ liệu...</p>
                </div>
            </div>
        );
    }

    if (!dataStamps) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="text-center">
                    <p className="text-red-500">Không tìm thấy dữ liệu</p>
                    <button 
                        onClick={() => navigate("/verify")}
                        className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                    >
                        Quay lại tra cứu
                    </button>
                </div>
            </div>
        );
    }


    return (
        <div
            className="min-h-screen relative  px-5 bg-cover  "
            style={{ backgroundImage: `url(${imgbgr})` }}
        >
            {/* Overlay làm tối nền */}
            <div className="absolute inset-0 bg-[#f2ede1]/40 "></div>
            {/* Content */}
            <div className="relative z-10 ">
                {/* HEADER */}
                <div className="max-w-8xl mx-auto pt-5 text-black">

                    {/* TITLE */}
                    <p
                        className="text-xl font-bold text-center"
                        style={{ fontFamily: "Montserrat, sans-serif", fontWeight: 700, marginRight: 20 }}
                    >
                        Kết quả tra cứu chứng nhận lãnh sự / hợp pháp hóa lãnh sự
                    </p>

                    {/* SUBTITLE + BUTTON */}
                    <div className="relative mt-5">

                        {/* Subtitle */}
                        <p
                            className="italic text-center text-[15px] font-medium font-['Montserrat']"
                        >
                            Consular authentication/legalisation results
                        </p>

                        {/* Button sát mép phải */}
                        <button
                            className="absolute right-0 top-1/2 -translate-y-1/2 px-4 py-1.5 text-white bg-[#797979] rounded-md text-[13px] font-['Montserrat'] hover:bg-[#5f5f5f] transition"
                            onClick={() => navigate("/verify")}
                        >
                            ← Quay lại (Back)
                        </button>

                    </div>
                </div>

                {/* CONTENT */}
                <div
                    className="mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3.5 items-stretch"
                    style={{
                        background: "#ffffffb5",

                        marginTop: " 21px",
                        padding: "10px 20px",
                        borderRadius: "16px",
                        border: "1px solid #d7d7d7",
                    }}
                >

                    {/* LEFT CARD */}
                    <div className="rounded-3xl flex flex-col h-full">
                        {/* Title */}
                        <h3
                            className="font-bold"
                            style={{
                                color: "#284393",
                                fontSize: "16px",
                                fontFamily: "Montserrat, sans-serif",
                                marginTop: " 15px"
                            }}
                        >
                            Thông tin hồ sơ
                        </h3>
                        <p className="italic " style={{ color: '#242424', fontSize: '13px', margin: 0, fontFamily: 'Montserrat, sans-serif' }}>
                            Application Information
                        </p>

                        {/* Box nội dung */}
                        <div className="bg-backgroundBlue py-2.5 px-5 flex-1" style={{
                            borderRadius: "16px",
                            border: "0.3px solid #d7d7d7",
                            marginTop: "18px",
                            flex: 1

                        }}>
                            <div className="text-[17px] ">
                                <div
                                    style={{ fontFamily: "Montserrat, sans-serif", color: "#242424", fontSize: "12px" }}
                                    className="text-text">
                                    Hình thức nộp hồ sơ{" "}
                                    <span className="italic">
                                        (Method of application submission):
                                    </span>
                                </div>

                                <div style={{ fontFamily: "Montserrat, sans-serif", color: "#242424", fontSize: "12px" }} className="text-text leading-tight mt-8">
                                    Ngày nhận hồ sơ (Date of receipt):

                                    <div className="font-bold text-lg " style={{ fontSize: '12px' }}>{formatDay(dataStamps?.application?.receiptDate)} </div>
                                </div>
                                <div style={{ fontFamily: "Montserrat, sans-serif", color: "#242424", fontSize: "12px" }} className="text-text leading-tight mt-5">
                                    Cơ quan giải quyết{" "}

                                    (Competent authority):

                                    <div className="font-bold text-lg " style={{ fontSize: '12px' }}>Cục Lãnh sự</div>
                                </div>

                                <div style={{ fontFamily: "Montserrat, sans-serif", color: "#242424", fontSize: "12px" }} className="text-text leading-tight mt-5">
                                    Ngày trả kết quả  (Date of result return):



                                    <div className="font-bold text-lg" style={{ fontSize: 12 }}>{ formatDay(dataStamps?.application?.resultDate) }</div>
                                </div>

                                <div style={{ fontFamily: "Montserrat, sans-serif", color: "#242424", fontSize: "12px" }} className="text-text mt-5">
                                    Người ký chứng nhận{" "}
                                    <span className="italic text-gray-600">
                                        (Certifying signatory):
                                    </span>

                                </div>

                                <div style={{ fontFamily: "Montserrat, sans-serif", color: "#242424", fontSize: "12px" }} className="text-text mt-8">
                                    Chức danh{" "}
                                    <span className="italic text-gray-600">
                                        (Title):
                                    </span>

                                </div>

                            </div>
                        </div>
                    </div>
                    {/* CENTER CARD */}
                    <div className="rounded-3xl flex flex-col h-full">
                        {/* Title */}
                        <h3
                            className="font-bold"
                            style={{
                                color: "#284393",
                                fontSize: "16px",
                                marginTop: " 15px",
                                fontFamily: "Montserrat, sans-serif",
                            }}
                        >
                            Thông tin hồ sơ
                        </h3>
                        <p className="italic " style={{ color: '#242424', fontSize: '13px', margin: 0, fontFamily: 'Montserrat, sans-serif' }}>
                            Document Information
                        </p>

                        {/* Box nội dung */}
                        <div className="bg-backgroundBlue py-2 px-5 flex-1" style={{
                            borderRadius: "16px",
                            border: "0.3px solid #d7d7d7",
                            marginTop: "18px",
                            flex: 1

                        }}>
                            <div className="rounded-3xl font-['Montserrat']">

                                {/* ===== Loại CV ===== */}
                                <div className="mb-6">
                                    <p className="text-[12px] text-[#284393] font-bold">
                                        Loại CV <span className="italic text-[#284393]" style={{ fontWeight: 400 }}>(Type of CV):</span> <b className="text-black font-bold">{dataStamps?.document?.cvType}</b>
                                    </p>

                                </div>

                                {/* ===== Thông tin giấy tờ ===== */}
                                <p className="text-[#284393] font-bold text-[12px] mt-8">
                                    Thông tin giấy tờ
                                    <span className="italic font-normal"> (Document Information)</span>

                                </p>


                                <div className=" text-[12px] text-[#242424] mt-3 font-normal">

                                    <div className=" leading-3">
                                        <p>
                                            Tên giấy tờ{" "}
                                            <span className="italic text-black">
                                                (Document title):
                                            </span>
                                        </p>
                                        <p className="font-bold mt-1">
                                            {dataStamps?.document?.documentTitle}
                                        </p>
                                    </div>

                                    <div className=" leading-3 mt-4">
                                        <p>
                                            Loại giấy tờ{" "}
                                            <span className="italic text-black">
                                                (Document Type):
                                            </span>
                                        </p>
                                        <p className="font-bold mt-1">{dataStamps?.document?.documentType}</p>
                                    </div>

                                    <div className=" leading-3 mt-4">
                                        <p>
                                            Tên người được cấp giấy tờ{" "}
                                            <span className="italic text-black">
                                                (Name of document holder):
                                            </span>
                                        </p>
                                        <p className="font-bold mt-1">{dataStamps?.document?.holderName}</p>
                                    </div>

                                    <div className=" leading-3 mt-4">
                                        <p>
                                            Số hiệu của giấy tờ{" "}
                                            <span className="italic text-black">
                                                (Document reference number):
                                            </span>
                                        </p>
                                        <p className="font-bold mt-1">{dataStamps?.document?.referenceNumber}</p>
                                    </div>

                                    <div className=" leading-3 mt-4">
                                        <p>
                                            Ngày cấp{" "}
                                            <span className="italic text-black">
                                                (Date of issue):
                                            </span>
                                        </p>
                                        <p className="font-bold mt-1">{ formatDay(dataStamps?.document?.issueDate)}</p>
                                    </div>

                                </div>

                                {/* ===== Thông tin cơ quan chứng thực ===== */}
                                <h3 className="text-[#284393] font-bold text-[12px] mt-8">
                                    Thông tin cơ quan sao/chứng thực giấy tờ
                                </h3>
                                <p className="italic text-[12px] text-[#284393] ">
                                    (Certifying / Notarizing Authority Information)
                                </p>

                                <div className=" text-[12px] text-[#242424]">
                                    <div className=" leading-3 mt-3">
                                        <p>
                                            Cơ quan{" "}
                                            <span className="italic text-black">
                                                (Authority):
                                            </span>
                                        </p>
                                        <p className="font-bold mt-1">
                                            {dataStamps?.document?.certifyingAuthority}
                                        </p>
                                    </div>

                                    <div className=" leading-3 mt-3">
                                        <p>
                                            Người ký{" "}
                                            <span className="italic text-black">
                                                (Signatory):
                                            </span>
                                        </p>
                                        <p className="font-bold mt-1">{dataStamps?.document?.certifyingSignatory}</p>
                                    </div>

                                    <div className=" leading-3 mt-3">
                                        <p>
                                            Chức danh{" "}
                                            <span className="italic text-black">
                                                (Title):
                                            </span>
                                        </p>
                                        <p className="font-bold mt-1">{dataStamps?.document?.certifyingTitle}</p>
                                    </div>

                                </div>

                            </div>
                        </div>
                    </div>

                    <div className="rounded-3xl flex flex-col h-full">
                        {/* Title */}
                        <h3
                            className="font-bold"
                            style={{
                                color: "#284393",
                                fontSize: "16px",
                                fontFamily: "Montserrat, sans-serif",
                                marginTop: " 15px"
                            }}
                        >
                            Thông tin tem CNLS / HPHLS
                        </h3>
                        <p className="italic " style={{ color: '#242424', fontSize: '13px', margin: 0, fontFamily: 'Montserrat, sans-serif' }}>
                            Consular Certification / Legalization Stamp Information
                        </p>

                        {/* Box nội dung */}
                        <div className="bg-backgroundBlue py-2 px-5 flex-1" style={{
                            borderRadius: "16px",
                            border: "0.3px solid #d7d7d7",
                            marginTop: "18px",
                            flex: 1

                        }}>

                            <img
                                src={dataStamps.image_url || tem}
                                alt="Tem CNLS"
                                className="w-full h-auto object-contain  "
                            />


                        </div>
                    </div>
                    {/* RIGHT CARD */}

                </div>
            </div>
        </div>
    );
};

// Component hiển thị 1 dòng info
const Info = ({ label, value }) => (
    <div className="flex justify-between border-b pb-2">
        <span className="text-gray-600">{label}</span>
        <strong className="text-gray-800">{value}</strong>
    </div>
);

export default Home;