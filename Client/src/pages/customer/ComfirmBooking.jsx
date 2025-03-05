import { useLocation, useNavigate } from "react-router-dom";

export default function ConfirmBooking() {
    const location = useLocation();
    const navigate = useNavigate();
    const { date, time } = location.state || {};

    if (!date || !time) {
        return (
            <div className="min-h-screen flex justify-center items-center">
                <p className="text-red-500 text-xl">Không có dữ liệu đặt lịch! Quay lại chọn lịch.</p>
            </div>
        );
    }

    return (
        <div className="min-h-screen flex flex-col justify-center items-center">
            <h1 className="text-3xl font-bold text-[#2B6A7C]">Xác nhận đặt lịch</h1>
            <p className="text-xl mt-4">📅 Ngày: <strong>{date}</strong></p>
            <p className="text-xl mt-2">⏰ Giờ: <strong>{time}</strong></p>
            <button
                className="mt-6 px-6 py-2 bg-[#2B6A7C] text-white rounded-md"
                onClick={() => navigate("/")}
            >
                Quay lại trang chủ
            </button>
        </div>
    );
}
