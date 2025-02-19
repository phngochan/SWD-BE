import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Calendar() {
    const [selectedDate, setSelectedDate] = useState("");
    const [selectedTime, setSelectedTime] = useState("");
    const navigate = useNavigate();

    const handleConfirmBooking = () => {
        if (selectedDate && selectedTime) {
            navigate("/xac-nhan-dat-lich", { state: { date: selectedDate, time: selectedTime } });
        } else {
            alert("Vui lòng chọn ngày và giờ!");
        }
    };

    return (
        <div className="min-h-screen bg-[#F5F5F5] flex flex-col justify-center items-center">
            <h1 className="text-3xl font-bold text-[#2B6A7C]">Chọn Ngày & Giờ</h1>
            <div className="bg-white p-6 rounded-lg shadow-md w-96 mt-6">
                <label className="block text-gray-700">Chọn ngày:</label>
                <input
                    type="date"
                    className="w-full border p-2 mt-1 rounded-md"
                    value={selectedDate}
                    onChange={(e) => setSelectedDate(e.target.value)}
                />
                <label className="block text-gray-700 mt-4">Chọn giờ:</label>
                <input
                    type="time"
                    className="w-full border p-2 mt-1 rounded-md"
                    value={selectedTime}
                    onChange={(e) => setSelectedTime(e.target.value)}
                />
                <button
                    className="mt-6 px-6 py-2 bg-[#2B6A7C] text-white rounded-md w-full"
                    onClick={handleConfirmBooking}
                >
                    Xác nhận đặt lịch
                </button>
            </div>
        </div>
    );
}
