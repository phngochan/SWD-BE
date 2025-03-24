import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../../components/Navbar";
import PropTypes from "prop-types";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import axios from "../../utils/axiosInstance";
import { toast } from "react-toastify";

const MyCalendar = () => {
    const [selectedDate, setSelectedDate] = useState(new Date());
    const [selectedTime, setSelectedTime] = useState(null);
    const [bookedSlots, setBookedSlots] = useState([]);
    const [events, setEvents] = useState([]);
    const [consultants, setConsultants] = useState([]);
    const [availableTimes, setAvailableTimes] = useState([]);
    const [selectedConsultant, setSelectedConsultant] = useState("");
    const [showConfirmModal, setShowConfirmModal] = useState(false);
    const id = localStorage.getItem("consultantId");
    const serviceId = localStorage.getItem("serviceId");
    const [serviceName, setServiceName] = useState("");
    const [serviceImage, setServiceImage] = useState("");
    const [consultantImage, setConsultantImage] = useState("");
    const navigate = useNavigate();
    const [servicePrice, setServicePrice] = useState("");

    useEffect(() => {
        if (id && id !== "null") {
            setSelectedConsultant(id);
        }
    }, [id]);

    const times = [
        "08:00", "09:00", "10:00", "11:00", "12:00",
        "13:00", "14:00", "15:00", "16:00", "17:00"
    ];

    useEffect(() => {
        const fetchService = async () => {
            try {
                const res = await axios.get(`/api/services/${serviceId}`);
                setServiceName(res.data.name);
                setServiceImage(res.data.image);
                setServicePrice(res.data.price); // Assuming the price is available in the response
            } catch (err) {
                console.error("Failed to fetch service name");
            }
        };

        if (serviceId) {
            fetchService();
        }
    }, [serviceId]);

    useEffect(() => {
        const fetchConsultantById = async () => {
            try {
                if (id && id !== "null") { // Kiểm tra cả null dạng string
                    const res = await axios.get(`/api/consultants/${id}`);
                    setConsultants(res.data);
                    setConsultantImage(res.data.image);
                }
            } catch (err) {
                toast.error("Failed to fetch consultant");
            }
        };

        fetchConsultantById();
    }, [id]); // Chỉ chạy khi id thay đổi

    useEffect(() => {
        if (selectedConsultant && selectedDate) {
            axios.get(`/api/booking-requests/${selectedConsultant}/pending-bookings`)
                .then(response => {
                    const pendingBookings = response.data;

                    // Extract booked time slots for the selected date
                    const bookedTimes = pendingBookings
                        .filter(booking => new Date(booking.date).toDateString() === new Date(selectedDate).toDateString())
                        .map(booking => booking.time.trim()); // Ensure time format consistency

                    setBookedSlots(bookedTimes);
                })
                .catch(error => console.error("Error fetching booked slots:", error));
        }
    }, [selectedConsultant, selectedDate]);

    useEffect(() => {
        const updateAvailableTimes = () => {
            const now = new Date();
            const selectedDay = new Date(selectedDate);
            const currentTime = now.getHours() * 60 + now.getMinutes();

            let filteredTimes;
            if (selectedDay.toDateString() === now.toDateString()) {
                filteredTimes = times.filter(time => {
                    const [hour, minute] = time.split(":");
                    const timeInMinutes = parseInt(hour) * 60 + parseInt(minute);
                    return timeInMinutes > currentTime;
                });
            } else {
                filteredTimes = times;
            }

            setAvailableTimes(filteredTimes);
            if (filteredTimes.length > 0) {
                setSelectedTime(filteredTimes[0]);
            } else {
                setSelectedTime(null);
            }
        };

        updateAvailableTimes();
    }, [selectedDate]);

    const [cart, setCart] = useState([]);
    const cartData = JSON.parse(localStorage.getItem("cart")) || [];
    useEffect(() => {
        setCart(cartData);
    }, []);

    const handleConfirmBooking = () => {
        setShowConfirmModal(true); // Chỉ hiển thị popup, không gửi API
    };

    const handleConfirm = async () => {
        try {
            console.log("🔄 Sending booking request...");
            const response = await createBookingRequest();

            if (response && response.status === 201) {
                console.log("✅ Booking successful! Preparing redirection...");
                setShowConfirmModal(false);

                // Display success message
                const successMessage = document.createElement("div");
                successMessage.innerText = `Successfully booked for ${selectedDate.toDateString()} at ${selectedTime}`;
                successMessage.style.position = "fixed";
                successMessage.style.top = "10%";
                successMessage.style.left = "50%";
                successMessage.style.transform = "translate(-50%, -10%)";
                successMessage.style.backgroundColor = "#4CAF50";
                successMessage.style.color = "white";
                successMessage.style.padding = "10px";
                successMessage.style.borderRadius = "5px";
                successMessage.style.zIndex = "1000";
                successMessage.style.fontSize = "14px";
                document.body.appendChild(successMessage);

                console.log("⏳ Redirecting in 2 seconds...");

                setTimeout(() => {
                    console.log("🚀 Redirecting to /about now!");
                    window.location.href = "/chúng tôi"; // Chuyển trang sau khi booking thành công
                }, 2000);
            } else {
                console.log("❌ Booking request did not return expected status:", response);
            }
        } catch (error) {
            console.error("❌ Error creating booking request:", error);
            if (error.response) {
                console.error("⚠️ Backend response error:", error.response.data);
                toast.error(`Failed to create booking: ${error.response.data.message || "Unknown error"}`);
            } else {
                toast.error("Failed to create booking request. Please try again.");
            }
        }
    };

    const handleTimeSelect = (time) => {
        setSelectedTime(time);
    };

    const handleCancel = () => {
        localStorage.setItem("serviceId", serviceId); // Lưu dịch vụ đã chọn
        window.location.href = "/chon-chuyen-vien"; // Chuyển về trang consultant khi bấm Cancel
    };

    const isTimeDisabled = (time) => {
        const now = new Date();
        const selectedDay = new Date(selectedDate);
        const currentTime = now.getHours() * 60 + now.getMinutes();
        const [hour, minute] = time.split(":");
        const timeInMinutes = parseInt(hour) * 60 + parseInt(minute);

        // Disable past slots for today
        if (selectedDay.toDateString() === now.toDateString() && timeInMinutes <= currentTime) {
            return true;
        }

        // Disable already booked slots
        return bookedSlots.includes(time.trim()); // Ensure consistency in time format
    };

    const tileDisabled = ({ date, view }) => {
        if (view === 'month') {
            const today = new Date().setHours(0, 0, 0, 0);
            const formattedDate = date.toISOString().split('T')[0]; // Format: YYYY-MM-DD

            // Disable past dates
            if (date < today) {
                return true;
            }

            // Disable fully booked dates
            return bookedSlots.includes(formattedDate);
        }
        return false;
    };

    const createBookingRequest = async () => {
        if (!serviceId || !selectedTime || !selectedDate) {
            toast.error("Please select a service, date, and time.");
            return null;
        }
        const localDate = new Date(selectedDate.getTime() - selectedDate.getTimezoneOffset() * 60000);

        try {
            const payload = {
                serviceID: serviceId,
                customerID: localStorage.getItem("userId") || sessionStorage.getItem("userId"),
                date: localDate.toISOString().split("T")[0],
                time: selectedTime,
                consultantID: id && id !== "null" ? id : null,
                status: "Pending",
                isConsultantAssignedByCustomer: !!id,
            };

            const response = await axios.post("/api/booking-requests/", payload);
            if (response.status === 201) {
                toast.success("Booking request created successfully!");
                return response;
            } else {
                console.error("❌ Unexpected response status:", response.status);
                return null;
            }
        } catch (error) {
            console.error("❌ Error creating booking request:", error);

            toast.error("This consultant is already booked at the selected date and time.");
            return null;
        }
    };

    const formatPrice = (price) => {
        return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(price);
    };

    return (
        <div className="bg-[#F8F4F2] min-h-screen flex flex-col">
            <Navbar cart={cart} setCart={setCart} /> {/* Pass setCart to Navbar */}
            <div className="flex-1 flex flex-col items-center justify-center p-4">
                <div className="absolute inset-0 bg-cover bg-center opacity-20 z-0" style={{ backgroundImage: "url('/images/skincare3.png')" }}></div>
                <h1 className="text-center text-4xl font-semibold my-4 mb-8">
                    Chăm sóc da cùng chuyên viên <span className="text-[#2B6A7C]">{consultants.firstName} {consultants.lastName}</span>
                </h1>
                <div className="bg-white p-6 rounded-lg shadow-lg flex flex-col md:flex-row gap-6 w-full max-w-6xl relative">

                    <div className="flex-1 relative z-10">
                        <Calendar
                            onChange={setSelectedDate}
                            value={selectedDate}
                            className="border rounded-lg  w-full h-full bg-white shadow-lg"
                            tileDisabled={tileDisabled}
                        />
                    </div>
                    <div className="flex-1 relative z-10">
                        <h3 className="text-lg font-semibold mb-4">Thời gian có sẵn cho {selectedDate.toDateString()}</h3>
                        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                            {times.map((time, index) => (
                                <button
                                    key={index}
                                    className={`border p-3 rounded-lg text-sm font-medium transition 
                                    ${selectedTime === time
                                            ? 'bg-[#2B6A7C] text-white'
                                            : isTimeDisabled(time)
                                                ? 'bg-gray-300 text-gray-400 cursor-not-allowed opacity-50'
                                                : 'bg-gray-100 hover:bg-[#1E4F60] hover:text-white'
                                        }`}
                                    onClick={() => handleTimeSelect(time)}
                                    aria-label={`Select time ${time}`}
                                    disabled={isTimeDisabled(time)}
                                >
                                    {time}
                                </button>
                            ))}
                        </div>
                        <div className="flex justify-center gap-4 mt-6">
                            <button
                                className="bg-[#2B6A7C] text-white px-6 py-2 rounded-lg hover:bg-[#1E4F60] transition"
                                onClick={handleConfirmBooking}
                                aria-label="Confirm booking"
                            >
                                Đặt lịch ngay
                            </button>
                            <button
                                className="bg-gray-300 text-gray-700 px-6 py-2 rounded-lg hover:bg-gray-400 transition"
                                onClick={handleCancel}
                                aria-label="Cancel booking"
                            >
                                Đóng
                            </button>
                        </div>
                    </div>
                </div>
            </div>
            {showConfirmModal && (
                <div className="fixed inset-0 bg-black bg-opacity-30 z-50 flex justify-center items-center backdrop-blur-sm">
                    <div className="bg-white p-8 rounded-3xl shadow-2xl w-[600px] max-w-[90%] animate-fadeIn transform transition-all duration-300 ease-in-out">
                        <h2 className="text-3xl font-semibold text-center text-[#2B6A7C] mb-6">Chi tiết lịch đặt</h2>
                        <div className="space-y-6 mb-8">
                            <div className="flex items-center justify-between">
                                <p className="text-gray-700 font-medium text-lg"><strong className="text-[#2B6A7C]">Dịch vụ:</strong> {serviceName}</p>
                                <img src={serviceImage} alt="Service" className="w-20 h-20 rounded-lg object-cover shadow-sm" />
                            </div>
                            {consultants && id !== "null" && (
                                <div className="flex items-center justify-between">
                                    <p className="text-gray-700 font-medium text-lg"><strong className="text-[#2B6A7C]">Nhân viên:</strong> {consultants.firstName} {consultants.lastName}</p>
                                    <img src={consultantImage} alt="Consultant" className="w-20 h-20 rounded-lg object-cover shadow-sm" />
                                </div>
                            )}
                            <p className="text-gray-700 font-medium text-lg"><strong className="text-[#2B6A7C]">Ngày:</strong> {selectedDate.toDateString()}</p>
                            <p className="text-gray-700 font-medium text-lg"><strong className="text-[#2B6A7C]">Giờ:</strong> {selectedTime}</p>
                            <p className="text-gray-700 font-medium text-lg"><strong className="text-[#2B6A7C]">Giá:</strong> {formatPrice(servicePrice)}</p>
                        </div>

                        <div className="flex justify-center gap-6">
                            <button
                                className="bg-[#2B6A7C] text-white px-8 py-3 rounded-lg shadow-md hover:bg-[#1E4F60] transition duration-200 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-[#2B6A7C] focus:ring-opacity-50"
                                onClick={handleConfirm}
                            >
                                Đặt lịch
                            </button>
                            <button
                                className="bg-gray-300 text-gray-700 px-8 py-3 rounded-lg shadow-md hover:bg-gray-400 transition duration-200 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-gray-300 focus:ring-opacity-50"
                                onClick={() => setShowConfirmModal(false)}
                            >
                                Đóng
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

MyCalendar.propTypes = {
    selectedDate: PropTypes.instanceOf(Date),
    selectedTime: PropTypes.string,
    times: PropTypes.arrayOf(PropTypes.string),
    handleTimeSelect: PropTypes.func,
    handleConfirm: PropTypes.func,
    handleCancel: PropTypes.func,
};

export default MyCalendar;

