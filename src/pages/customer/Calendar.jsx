import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../../components/Navbar";
import PropTypes from "prop-types";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import Swal from "sweetalert2";

const SkincareBooking = () => {
    const [selectedDate, setSelectedDate] = useState(new Date());
    const [selectedTime, setSelectedTime] = useState(null);
    const navigate = useNavigate();

    const times = [
        "08:00 AM", "09:00 AM", "10:00 AM", "11:00 AM", "12:00 PM",
        "01:00 PM", "02:00 PM", "03:00 PM", "04:00 PM", "05:00 PM"
    ];

    const handleTimeSelect = (time) => {
        setSelectedTime(time);
    };

    // const handleConfirm = () => {
    //     const confirmPurchase = window.confirm("Bạn có muốn mua thêm sản phẩm chăm sóc da mặt không?");
    //     if (confirmPurchase) {
    //         navigate("/san-pham-bo-sung"); // Chuyển đến trang mua sản phẩm
    //     } else {
    //         alert(`Xác nhận đặt lịch vào ${selectedDate.toDateString()} lúc ${selectedTime}`);
    //     }
    // };
    const handleConfirm = () => {
        Swal.fire({
            title: "Mua thêm sản phẩm?",
            text: "Bạn có muốn mua thêm sản phẩm chăm sóc da mặt không?",
            icon: "question",
            showCancelButton: true,
            confirmButtonColor: "#A7DFEC",
            cancelButtonColor: "#d33",
            confirmButtonText: "Có, mua ngay!",
            cancelButtonText: "Không, cảm ơn",
        }).then((result) => {
            if (result.isConfirmed) {
                navigate("/san-pham-bo-sung"); // Điều hướng đến trang sản phẩm
            } else {
                Swal.fire(
                    "Đặt lịch thành công!",
                    `Bạn đã đặt lịch vào ${selectedDate.toDateString()} lúc ${selectedTime}`,
                    "success"
                    
                );navigate("/xac-nhan-thong-tin");
            }
        });
    };

    const handleCancel = () => {
        // Add cancel logic here
        setSelectedTime(null);
        navigate("/")
    };

    return (
        <div className="bg-[#F8F4F2] min-h-screen">
            <Navbar />
            <div className="max-w-4xl mx-auto p-4">
                <h2 className="text-center text-xl font-semibold my-4">Skincare Consultation with </h2>
                <div className="bg-white p-4 rounded-lg shadow-md flex gap-6">
                    <div>
                        <Calendar
                            onChange={setSelectedDate}
                            value={selectedDate}
                            className="border rounded-lg p-2"
                        />
                    </div>
                    <div className="flex-1">
                        <h3 className="text-lg font-semibold mb-2">Available Times for {selectedDate.toDateString()}</h3>
                        <div className="grid grid-cols-3 gap-2">
                            {times.map((time, index) => (
                                <button
                                    key={index}
                                    className={`border p-2 rounded-lg text-xs font-medium ${selectedTime === time ? 'bg-[#A7DFEC] text-white' : 'bg-gray-100 hover:bg-[#a4b0b3]'}`}
                                    onClick={() => handleTimeSelect(time)}
                                    aria-label={`Select time ${time}`}
                                >
                                    {time}
                                </button>
                            ))}
                        </div>
                        <div className="flex justify-center gap-4 mt-4">
                            <button
                                className="bg-[#A7DFEC] text-white px-4 py-2 rounded-lg"
                                onClick={handleConfirm}
                                aria-label="Confirm booking"
                            >
                                Confirm
                            </button>
                            <button
                                className="text-gray-500"
                                onClick={handleCancel}
                                aria-label="Cancel booking"
                            >
                                Cancel
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

SkincareBooking.propTypes = {
    selectedDate: PropTypes.instanceOf(Date),
    selectedTime: PropTypes.string,
    times: PropTypes.arrayOf(PropTypes.string),
    handleTimeSelect: PropTypes.func,
    handleConfirm: PropTypes.func,
    handleCancel: PropTypes.func,
};

export default SkincareBooking;