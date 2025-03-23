import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import { motion } from "framer-motion";
import axios from "../../utils/axiosInstance";

export default function Skinconsultation() {
    const navigate = useNavigate();
    const { id } = useParams();
    const [visibleNoteIndex, setVisibleNoteIndex] = useState(null);
    const [consultants, setConsultants] = useState([]);
    const [cart, setCart] = useState([]);
    const [feedbacks, setFeedbacks] = useState([]);
    const cartData = JSON.parse(localStorage.getItem("cart")) || [];
    useEffect(() => {
        setCart(cartData);
    }, []);

    useEffect(() => {
        fetchConsultants();
        fetchFeedbacks();
    }, []);

    const fetchConsultants = async () => {
        try {
            const res = await axios.get("/api/consultants");
            setConsultants(
                res.data.map((c) => ({
                    ...c,
                    note: c.note,
                    image: c.image,
                }))
            );
        } catch (err) {
            console.error("Failed to fetch consultants:", err);
        }
    };

    const fetchFeedbacks = async () => {
        try {
            const res = await axios.get("/api/feedbacks");
            setFeedbacks(res.data);
        } catch (err) {
            console.error("Failed to fetch feedbacks:", err);
        }
    };

    const getFeedbackForConsultant = (consultantId) => {
        return feedbacks.filter(feedback => feedback.consultantId === consultantId);
    };

    const getAverageRating = (consultantId) => {
        const feedbacksForConsultant = getFeedbackForConsultant(consultantId);
        const totalRating = feedbacksForConsultant.reduce((sum, feedback) => sum + feedback.consultantRating, 0);
        return (totalRating / feedbacksForConsultant.length).toFixed(1);
    };

    const getCustomerName = (bookingRequestId) => {
        const feedback = feedbacks.find(feedback => feedback.bookingRequestId === bookingRequestId);
        return feedback && feedback.bookingRequestId && feedback.bookingRequestId.customerId
            ? feedback.bookingRequestId.customerId.name
            : "Customer";
    };

    const handleBookingNow = async (consultantId) => {
        localStorage.setItem("consultantId", consultantId);
        sessionStorage.setItem("consultantId", consultantId);
        localStorage.setItem(
            "serviceUrl",
            `/services/${id}/chon-chuyen-vien/${consultantId}/lich-hen`
        );
        sessionStorage.setItem(
            "serviceUrl",
            `/services/${id}/chon-chuyen-vien/${consultantId}/lich-hen`
        );
        navigate(`/services/${id}/chon-chuyen-vien/${consultantId}/lich-hen`);
    };

    const handleViewMore = (index) => {
        setVisibleNoteIndex(visibleNoteIndex === index ? null : index);
    };

    return (
        <div className="main-container w-full min-h-screen bg-[#F5F5F5]">
            <Navbar cart={cart} setCart={setCart} /> {/* Pass setCart to Navbar */}
            {/* Services Hero Section */}
            <div className="h-[500px] w-full flex items-center justify-center text-white text-center"
                style={{
                    backgroundImage: "url('/images/service.png')",
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                    backgroundRepeat: "no-repeat",
                    backgroundAttachment: "fixed"
                }}>
                <h1 className="text-5xl font-semibold bg-opacity-50 px-6 py-4 rounded-lg">Chọn chuyên viên của bạn</h1>
            </div>

            {/* Main Content */}
            <div className="w-full max-w-[1200px] mx-auto py-8 px-4">
                {/* Consultants List */}
                <div className="space-y-6">
                    {consultants.map((consultant, index) => (
                        <div
                            key={consultant._id}
                            className="flex flex-col md:flex-row items-start bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 gap-6"
                        >
                            {/* Consultant Image */}
                            <div className="w-[150px] h-[150px] flex-shrink-0">
                                {consultant.image ? (
                                    <img
                                        src={consultant.image}
                                        alt="Consultant"
                                        className="w-full h-full object-cover rounded-lg"
                                    />
                                ) : (
                                    <div className="w-full h-full bg-gray-200 rounded-lg flex items-center justify-center text-gray-500">
                                        No Image
                                    </div>
                                )}
                            </div>

                            {/* Consultant Details */}
                            <div className="flex-1">
                                <h2 className="text-2xl font-semibold text-[#2B6A7C]">
                                    {consultant.firstName} {consultant.lastName}
                                </h2>
                                <p className="text-gray-600 mt-2">{consultant.note}</p>

                                {/* Additional Notes */}
                                {visibleNoteIndex === index && (
                                    <div className="text-gray-600 mt-2">
                                        <p>No additional notes available.</p>
                                        <div className="mt-4">
                                            <h3 className="text-xl font-semibold">Customer Feedback</h3>
                                            <p><strong>Average Rating:</strong> {getAverageRating(consultant._id)}⭐</p>
                                            {getFeedbackForConsultant(consultant._id).slice(0, 3).map(feedback => (
                                                <div key={feedback._id} className="mt-2">
                                                    <p><strong>{getCustomerName(feedback.bookingRequestId)}:</strong> {feedback.consultantComment}</p>
                                                </div>
                                            ))}
                                            {getFeedbackForConsultant(consultant._id).length > 3 && (
                                                <p className="mt-2 text-blue-500">View more comments...</p>
                                            )}
                                        </div>
                                    </div>
                                )}

                                {/* Buttons */}
                                <div className="flex gap-4 mt-4">
                                    <button
                                        className="px-6 py-2 bg-[#A7DFEC] text-[#2B6A7C] rounded-full hover:bg-[#2B6A7C] hover:text-white transition duration-300"
                                        onClick={() => handleViewMore(index)}
                                    >
                                        {visibleNoteIndex === index ? "Hide" : "Xem thêm"}
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
                {/* Booking Now Button */}
                <div className="fixed bottom-4 right-4">
                    {/* Ping effect */}
                    <span className="absolute -inset-1 inline-flex h-full w-full animate-ping rounded-full bg-green-500 opacity-75"></span>

                    {/* Animated Button */}
                    <motion.button
                        onClick={() => navigate("/services")}
                        className="relative px-6 py-3 text-white rounded-full shadow-lg pacifico-regular focus:outline-none focus:ring-4 focus:ring-green-300"
                        style={{
                            background: "linear-gradient(135deg, #6B8E23, #32CD32)",
                            boxShadow: "0 4px 15px rgba(0, 0, 0, 0.2)",
                        }}
                        animate={{
                            y: [0, -5, 5, -5, 0], // Floating animation
                            transition: {
                                duration: 7,
                                repeat: Infinity,
                                ease: "easeInOut",
                            },
                        }}
                        whileHover={{ scale: 1.1, rotate: 5, boxShadow: "0 8px 25px rgba(0, 0, 0, 0.3)" }}
                        whileTap={{ scale: 0.95 }}
                    >
                        Book Now
                    </motion.button>
                </div>
            </div>
            <Footer />
        </div>
    );
}

