import React, { use } from "react";
import imgbgr from "../assets/bgrweb.jpg";
import tem from "../assets/tem.png"
import { useEffect } from "react";
import apiService from "../services/apiService";

import { data, useParams } from "react-router-dom";
const Home = () => {

    const [dataStamps, setDataStamps] = React.useState([]);
    const { code } = useParams();
    useEffect(() => {
        fetchStamps();
    }, []);

    const fetchStamps = async () => {
        try {
            const response = await apiService.stamps.getCodeId(code);
            if (response.success) {
                setDataStamps(response.data || []);
                console.log("Fetched stamps:", response.data);
            }


        } catch (error) {

            message.error("Không thể tải danh sách stamps: " + error);
        }
    };


    return (
        <div
            className="min-h-screen relative  px-5 bg-cover  "
            style={{ backgroundImage: `url(${imgbgr})` }}
        >
            {/* Overlay làm tối nền */}
            <div className="absolute inset-0 bg-black/1 backdrop-blur-[0.9px]"></div>
            {/* Content */}
            <div className="relative z-10 ">
                {/* HEADER */}
                <div className="max-w-8xl mx-auto pt-4 text-black">

                    {/* TITLE */}
                    <p
                        className="text-xl font-bold text-center"
                        style={{ fontFamily: "Montserrat, sans-serif", fontWeight: 700 }}
                    >
                        Kết quả tra cứu chứng nhận lãnh sự / hợp pháp hóa lãnh sự
                    </p>

                    {/* SUBTITLE + BUTTON */}
                    <div className="relative mt-3">

                        {/* Subtitle */}
                        <p
                            className="italic text-center text-[15px] font-medium font-['Montserrat']"
                        >
                            Consular authentication/legalisation results
                        </p>

                        {/* Button sát mép phải */}
                        <button
                            className="absolute right-0 top-1/2 -translate-y-1/2 px-4 py-1.5 text-white bg-[#797979] rounded-md text-[13px] font-['Montserrat'] hover:bg-[#5f5f5f] transition"
                        >
                            ← Quay lại (Back)
                        </button>

                    </div>
                </div>

                {/* CONTENT */}
                <div
                    className="mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 items-stretch"
                    style={{
                        background: "#ffffffb5",
                    
                        marginTop:" 30px",
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
                                marginTop:" 15px"
                            }}
                        >
                            Thông tin hồ sơ
                        </h3>
                        <p className="italic " style={{ color: '#242424', fontSize: '13px', margin: 0, fontFamily: 'Montserrat, sans-serif' }}>
                            Application Information
                        </p>

                        {/* Box nội dung */}
                        <div className="bg-backgroundBlue py-2 px-5 flex-1" style={{
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
                                   
                                    <div className="font-bold text-lg " style={{ fontSize: '12px' }}>{dataStamps?.application?.receiptDate}</div>
                                </div>
                                <div style={{ fontFamily: "Montserrat, sans-serif", color: "#242424", fontSize: "12px" }} className="text-text leading-tight mt-5">
                                    Cơ quan giải quyết{" "}
                               
                                        (Competent authority):
                               
                                    <div className="font-bold text-lg " style={{ fontSize: '12px' }}>Cục Lãnh sự</div>
                                </div>

                                <div style={{ fontFamily: "Montserrat, sans-serif", color: "#242424", fontSize: "12px" }} className="text-text leading-tight mt-5">
                                    Ngày trả kết quả  (Date of result return):
                                  
                                       
                                    
                                    <div className="font-bold text-lg" style={{ fontSize: 12 }}>{dataStamps?.application?.resultDate}</div>
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
                                       marginTop:" 15px",
                                fontFamily: "Montserrat, sans-serif",
                            }}
                        >
                            Thông tin hồ sơ
                        </h3>
                        <p className="italic " style={{ color: '#242424', fontSize: '13px', margin: 0, fontFamily: 'Montserrat, sans-serif' }}>
                            Document Information
                        </p>

                        {/* Box nội dung */}
                        <div className="bg-backgroundBlue py-4 px-4 flex-1" style={{
                            borderRadius: "16px",
                            border: "1px solid #d7d7d7",
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
                                <p className="text-[#284393] font-bold text-[12px]">
                                    Thông tin giấy tờ
                                    <span className="italic font-normal"> (Document Information)</span>

                                </p>


                                <div className="space-y-5 text-[12px] text-[#242424] mt-4 font-normal">

                                    <div>
                                        <p>
                                            Tên giấy tờ{" "}
                                            <span className="italic text-gray-600">
                                                (Document title):
                                            </span>
                                        </p>
                                        <p className="font-bold mt-1">
                                            {dataStamps?.document?.documentTitle}
                                        </p>
                                    </div>

                                    <div>
                                        <p>
                                            Loại giấy tờ{" "}
                                            <span className="italic text-gray-600">
                                                (Document Type):
                                            </span>
                                        </p>
                                        <p className="font-bold mt-1">{dataStamps?.document?.documentType}</p>
                                    </div>

                                    <div>
                                        <p>
                                            Tên người được cấp giấy tờ{" "}
                                            <span className="italic text-gray-600">
                                                (Name of document holder):
                                            </span>
                                        </p>
                                        <p className="font-bold mt-1">{dataStamps?.document?.holderName}</p>
                                    </div>

                                    <div>
                                        <p>
                                            Số hiệu của giấy tờ{" "}
                                            <span className="italic text-gray-600">
                                                (Document reference number):
                                            </span>
                                        </p>
                                        <p className="font-bold mt-1">{dataStamps?.document?.referenceNumber}</p>
                                    </div>

                                    <div>
                                        <p>
                                            Ngày cấp{" "}
                                            <span className="italic text-gray-600">
                                                (Date of issue):
                                            </span>
                                        </p>
                                        <p className="font-bold mt-1">{dataStamps?.document?.issueDate}</p>
                                    </div>

                                </div>

                                {/* ===== Thông tin cơ quan chứng thực ===== */}
                                <h3 className="text-[#284393] font-bold text-[12px] mt-10">
                                    Thông tin cơ quan sao/chứng thực giấy tờ
                                </h3>
                                <p className="italic text-[12px] text-[#284393] mb-6">
                                    (Certifying / Notarizing Authority Information)
                                </p>

                                <div className="space-y-5 text-[12px] text-[#242424]">
                                    <div>
                                        <p>
                                            Cơ quan{" "}
                                            <span className="italic text-gray-600">
                                                (Authority):
                                            </span>
                                        </p>
                                        <p className="font-bold mt-1">
                                            {dataStamps?.document?.certifyingAuthority}
                                        </p>
                                    </div>

                                    <div>
                                        <p>
                                            Người ký{" "}
                                            <span className="italic text-gray-600">
                                                (Signatory):
                                            </span>
                                        </p>
                                        <p className="font-bold mt-1">{dataStamps?.document?.certifyingSignatory}</p>
                                    </div>

                                    <div>
                                        <p>
                                            Chức danh{" "}
                                            <span className="italic text-gray-600">
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
                                       marginTop:" 15px"
                            }}
                        >
                            Thông tin tem CNLS / HPHLS
                        </h3>
                        <p className="italic " style={{ color: '#242424', fontSize: '13px', margin: 0, fontFamily: 'Montserrat, sans-serif' }}>
                            Consular Certification / Legalization Stamp Information
                        </p>

                        {/* Box nội dung */}
                        <div className="bg-backgroundBlue py-4 px-4 flex-1" style={{
                            borderRadius: "16px",
                            border: "1px solid #d7d7d7",
                       marginTop: "18px",
                            flex: 1

                        }}>

                            <img
                                src={tem}
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