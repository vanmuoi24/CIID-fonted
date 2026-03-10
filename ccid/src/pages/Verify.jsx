import React, { useEffect, useState } from "react";
import imgbgr from "../assets/bgrweb.jpg";
import tem from "../assets/logovn.svg";
import { useNavigate } from "react-router-dom";
import apiService from "../services/apiService";

const Verify = () => {

    const [codeInput, setCodeInput] = useState("");
    const [captcha, setCaptcha] = useState("");
    const [errors, setErrors] = useState({});
    const [isLoading, setIsLoading] = useState(false);
    let navigate = useNavigate();

    const [captchaUrl, setCaptchaUrl] = useState(
        `https://ciid-backend.onrender.com/api/captcha?${Date.now()}`
    );

    const reloadCaptcha = () => {
        setCaptchaUrl(`https://ciid-backend.onrender.com/api/captcha?${Date.now()}`);
        setCaptcha(""); // Clear captcha input when reloading
    };

    const validateForm = () => {
        const newErrors = {};

        if (!codeInput.trim()) {
            newErrors.code = "Vui lòng nhập số hiệu";
        }

        if (!captcha.trim()) {
            newErrors.captcha = "Vui lòng nhập mã bảo mật";
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSearch = async () => {
        // Clear previous errors
        setErrors({});

        // Validate form
        if (!validateForm()) {
            return;
        }

        setIsLoading(true);

        try {
            const response = await apiService.stamps.searchStamp({
                code: codeInput.trim(),
                captcha: captcha.trim()
            });

            if (response.data) {
                // Navigate to home page with the code in URL and pass data
                navigate(`/verify/${response.data.verificationCode}`, {
                    state: { stampData: response.data }
                });
            } else {
                // Show error message
                alert(response.message || "Có lỗi xảy ra. Vui lòng thử lại.");
                // Reload captcha after failed attempt
                reloadCaptcha();
            }
        } catch (error) {
            console.error("Search error:", error);
            alert(error.response?.data?.message || "Có lỗi xảy ra. Vui lòng thử lại.");
            // Reload captcha after error
            reloadCaptcha();
        } finally {
            setIsLoading(false);
        }
    };

    const handleKeyPress = (e) => {
        if (e.key === 'Enter' && !isLoading) {
            handleSearch();
        }
    };


    return (
<div
    className="min-h-screen bg-cover flex flex-col items-center relative"
    style={{ backgroundImage: `url(${imgbgr})` }}
>

    {/* Overlay chỉ làm mờ ảnh nền */}

            {/* HEADER */}

            <div className="text-center mt-4">

                <img
                    src={tem}
                    alt="logo"
                    className="mx-auto mb-2"
                    style={{ width: "100px" }}
                />

                <p
                    className="font-bold uppercase"
                    style={{
                        fontSize: "20.5px",
                        fontFamily: "Montserrat, sans-serif",
                        marginTop: "25px",
                        color: "#252525"
                    }}
                >
                    BỘ NGOẠI GIAO NƯỚC CHXHCN VIỆT NAM
                </p>

                <p
                    className="text-sm italic"
                    style={{
                        fontSize: "15px",
                        fontFamily: "Montserrat, sans-serif",
                        marginTop: "10px",
                        fontWeight: "500",
                        color: "#252525",
                    }}
                >
                    MINISTRY OF FOREIGN AFFAIRS OF THE S.R. OF VIETNAM
                </p>

                <h2
                    style={{
                        fontSize: "20px",
                        fontFamily: "Montserrat, sans-serif",
                        marginTop: "25px",
                        color: "#252525",
                        fontWeight: "700"
                    }}
                >
                    Tra cứu chứng nhận lãnh sự / hợp pháp hóa lãnh sự
                </h2>

                <p
                    className="italic"
                    style={{
                        fontSize: "15px",
                        fontFamily: "Montserrat, sans-serif",
                        fontWeight: "500",
                        color: "#252525",
                        marginTop: "10px"
                    }}
                >
                    Look up results of consular authentication/legalisation.
                </p>

            </div>

            {/* FORM */}

            <div className="bg-white rounded-xl mt-8 w-[377px] px-5 py-1 border border-gray-300">

                {/* Số hiệu */}

                <div>

                    <label style={{
                        fontSize: "12px",
                        fontFamily: "Montserrat, sans-serif",
                        fontWeight: "400",
                        color: "#252525",
                    }}>
                        Số hiệu/No *
                    </label>

                    <input
                        type="text"
                        value={codeInput}
                        onChange={(e) => setCodeInput(e.target.value)}
                        onKeyPress={handleKeyPress}
                        disabled={isLoading}
                        className={`w-full border rounded px-2 py-2 mt-1 outline-none h-8 border-b-black 
                        ${errors.code ? "border-red-500" : "border-gray-300"}`}
                    />

                    {errors.code && (
                        <p className="text-red-500 text-sm mt-1">
                            {errors.code}
                        </p>
                    )}

                </div>


                {/* CAPTCHA */}

                <div className="mt-4">

                    <label style={{
                        fontSize: "12px",
                        fontFamily: "Montserrat, sans-serif",
                        fontWeight: "400",
                        color: "#252525",
                    }}>
                        Mã bảo mật
                    </label>

                    <div className="flex items-center gap-2 mt-1">

                        <img
                            src={captchaUrl}
                            alt="captcha"
                            className="h-7 border border-gray-300 rounded-md"
                        />

                        <button
                            onClick={reloadCaptcha}
                            disabled={isLoading}
                            className="border px-2 rounded hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            <i className="dx-icon dx-icon-refresh" style={{ color: "black", background: "#95a1c9", borderRadius: "4px", padding: "2px" }}></i>
                        </button>

                    </div>

                </div>


                {/* Nhập captcha */}

                <div className="mt-4">

                    <label style={{
                        fontSize: "12px",
                        fontFamily: "Montserrat, sans-serif",
                        fontWeight: "400",
                        color: "#252525",
                    }}>
                        Nhập mã bảo mật *
                    </label>

                    <input
                        type="text"
                        value={captcha}
                        onChange={(e) => setCaptcha(e.target.value)}
                        onKeyPress={handleKeyPress}
                        disabled={isLoading}
                        className={`w-full border rounded px-2 py-2 mt-1 outline-none h-8 border-b-black 
                        ${errors.captcha ? "border-red-500" : "border-gray-300"}`}
                    />

                    {errors.captcha && (
                        <p className="text-red-500 text-sm mt-1">
                            {errors.captcha}
                        </p>
                    )}

                </div>


                {/* BUTTON */}

                <button
                    onClick={handleSearch}
                    disabled={isLoading}
                    className="w-full h-8 mt-10 flex items-center justify-center gap-2 text-white rounded hover:bg-blue-900 transition bg-[#284594] disabled:opacity-50 disabled:cursor-not-allowed"
                    style={{
                        fontSize: "12px",
                        fontFamily: "Montserrat, sans-serif",
                        fontWeight: "400",
                        marginBottom: "20px"

                    }}
                >
                    {isLoading ? (
                        <>
                            <i className="dx-icon dx-icon-refresh dx-icon-spin"></i>
                            Đang tra cứu...
                        </>
                    ) : (
                        <>
                            <i className="dx-icon dx-icon-send"></i>
                            Tra cứu
                        </>
                    )}
                </button>

            </div>

        </div>
    );
};

export default Verify;