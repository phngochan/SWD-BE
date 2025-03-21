import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import ImageGallery from "react-image-gallery";
import "react-image-gallery/styles/css/image-gallery.css";

export default function ServiceDetails() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [service, setService] = useState(null);
    const [comments, setComments] = useState([]);
    const [error, setError] = useState(null);
    const [showLoginModal, setShowLoginModal] = useState(false);
    const [showImagePopup, setShowImagePopup] = useState(false);
    const [galleryImages, setGalleryImages] = useState([]);

    useEffect(() => {
        axios
            .get(`/api/services/${id}`)
            .then((response) => {
                setService(response.data);
                setGalleryImages([
                    response.data.image,
                    response.data.effectimage,
                    response.data.resultimage,
                    response.data.sensationimage,
                ].filter(img => img)); // Loại bỏ ảnh null hoặc undefined
            })
            .catch((error) => {
                console.error("Error fetching service:", error);
                setError("Failed to load service details.");
                setService(null);
            });

        axios
            .get(`/api/comments/services/${id}/feedbacks`)
            .then((response) => setComments(response.data))
            .catch((error) => {
                console.error("Error fetching comments:", error);
                setComments([]);
            });
    }, [id]);

    const handleBookingNow = async () => {
        const token = localStorage.getItem("authToken") || sessionStorage.getItem("authToken");
        if (!token) {
            setShowLoginModal(true);
            return;
        }
        localStorage.setItem("serviceId", id);
        sessionStorage.setItem("serviceId", id);
        localStorage.setItem("serviceUrl", `/services/${id}/chon-chuyen-vien`);
        sessionStorage.setItem("serviceUrl", `/services/${id}/chon-chuyen-vien`);
        navigate(`/services/${id}/chon-chuyen-vien`);
        console.log("Navigating to:", `/services/${id}/chon-chuyen-vien`);
    };

    const handleLoginRedirect = () => {
        setShowLoginModal(false);
        navigate("/login");
    };

    if (error) return <div className="text-red-600 text-center mt-10">{error}</div>;
    if (!service) return <div className="text-center text-gray-600 mt-10">Loading...</div>;

    return (
        <div className="main-container w-full h-auto bg-[#f9faef] relative overflow-hidden mx-auto my-0">
            <Navbar />

            <div className="max-w-7xl mx-auto p-4 bg-white shadow-lg rounded-lg mt-10 mb-10">
                <button
                    onClick={() => navigate("/services")}
                    className="mb-2 text-lg text-[#2B6A7C] hover:text-[#A7DFEC] self-end"
                >
                    ← Trở về danh sách dịch vụ
                </button>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center bg-white p-8 rounded-lg shadow-lg">
                    {service.image && (
                        <img
                            src={service.image}
                            alt={service.name}
                            className="w-full h-96 object-cover rounded-xl border-4 border-gray-200 shadow-lg transition-transform transform hover:scale-105 duration-300 cursor-pointer"
                            onClick={() => setShowImagePopup(true)}
                        />
                    )}
                    <div>
                        <h1 className="text-5xl font-extrabold text-[#2B6A7C] leading-tight">{service.name}</h1>
                        <p className="mt-6 text-lg text-gray-700 leading-relaxed">{service.description}</p>
                        <div
                            className="text-gray-600 mt-6 leading-relaxed border-t-2 border-gray-200 pt-6"
                            dangerouslySetInnerHTML={{ __html: service.detaildescription }}
                        />
                    </div>
                </div>

                {/* Additional Images */}
                <div className="mt-8 grid grid-cols-2 md:grid-cols-4 gap-6">
                    {[service.effectimage, service.resultimage, service.sensationimage].filter(img => img).map((img, index) => (
                        <img
                            key={index}
                            src={img}
                            alt={`Service Image ${index}`}
                            className="w-full h-40 object-cover rounded-xl shadow-lg transition-transform transform hover:scale-105 duration-300 cursor-pointer"
                            onClick={() => setShowImagePopup(true)}
                        />
                    ))}
                </div>

                {/* Ratings & Comments */}
                <div className="mt-4 bg-gray-50 p-8 rounded-lg shadow-lg">
                    <h2 className="text-3xl font-extrabold text-[#2B6A7C] ">Đánh giá khách hàng</h2>
                    {comments.length === 0 ? (
                        <p className="text-gray-500 mt-6 text-lg">Chưa có đánh giá.</p>
                    ) : (
                        <div className="mt-6 space-y-8">
                            {comments.map((comment, index) => (
                                <div key={index} className="border-b border-gray-200 pb-6">
                                    <p className="font-semibold text-gray-800 text-lg">{comment.user}</p>
                                    <p className="text-gray-700 mt-2 leading-relaxed">{comment.text}</p>
                                    <span className="text-yellow-500 text-xl mt-2 inline-block">⭐ {comment.rating}</span>
                                </div>
                            ))}
                        </div>
                    )}
                </div>

                {/* Booking Button */}
                <div className="flex justify-center mt-4">
                    <button
                        onClick={handleBookingNow}
                        className="w-[169px] h-[44px] rounded-full border-solid border-[1px] text-[20px] font-bold leading-[24px] text-[#ffff] pacifico-regular flex items-center justify-center hover:bg-[#bddde4] bg-[#A7DFEC] transition duration-300"
                        style={{
                            boxShadow: '0 4px 15px rgba(0, 0, 0, 0.2)',
                            transition: 'all 0.3s ease-in-out',
                        }}
                        onMouseEnter={(e) => {
                            e.currentTarget.style.transform = 'scale(1.1) rotate(3deg)';
                            e.currentTarget.style.boxShadow = '0 6px 20px rgba(0, 0, 0, 0.3)';
                        }}
                        onMouseLeave={(e) => {
                            e.currentTarget.style.transform = 'scale(1.05)';
                            e.currentTarget.style.boxShadow = '0 4px 15px rgba(0, 0, 0, 0.2)';
                        }}
                    >
                        Đặt Lịch Ngay
                    </button>
                </div>
            </div>

            {/* Custom Login Modal */}
            {showLoginModal && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
                    <div className="bg-white p-6 rounded-xl shadow-lg max-w-sm w-full text-center">
                        <h3 className="text-xl font-bold text-gray-800 mb-4">
                            Đăng nhập để đặt lịch
                        </h3>
                        <p className="text-gray-600">Bạn cần đăng nhập để được đặt lịch. Bạn có muốn đặt lịch không?</p>
                        <div className="flex justify-center gap-4 mt-4">
                            <button
                                className="py-2 px-6 bg-gray-300 text-gray-800 rounded-lg hover:bg-gray-400 transition"
                                onClick={() => setShowLoginModal(false)}
                            >
                                Đóng
                            </button>
                            <button
                                className="py-2 px-6 bg-[#A7DFEC] text-white rounded-lg hover:bg-[#2B6A7C] transition"
                                onClick={handleLoginRedirect}
                            >
                                Đăng nhập
                            </button>
                        </div>
                    </div>
                </div>
            )}



            {/* Image Popup */}
            {showImagePopup && (
                <div
                    className="fixed inset-0 bg-black bg-opacity-80 flex justify-center items-center z-50"
                    onClick={() => setShowImagePopup(false)}
                >
                    {/* Nút đóng */}
                    <button
                        className="absolute top-5 right-5 bg-gray-800 text-white p-2 rounded-full hover:bg-gray-600 transition z-50"
                        onClick={() => setShowImagePopup(false)}
                    >
                        ✖
                    </button>

                    <div
                        className="w-[80%] max-w-[500px] max-h-[80vh] relative flex flex-col items-center"
                        onClick={(e) => e.stopPropagation()}
                    >
                        {/* Nội dung ảnh */}
                        <div className="w-full max-h-[60vh] flex justify-center items-center">
                            <ImageGallery
                                items={galleryImages.map((img) => ({ original: img, thumbnail: img }))}
                                showThumbnails={true}
                                showFullscreenButton={false}
                                showPlayButton={false}
                                slideDuration={400}
                                showBullets={true}
                                additionalClass="w-full max-h-[60vh] object-contain flex justify-center items-center"
                                showNav={true}
                            />
                        </div>
                    </div>
                </div>
            )}

            <Footer />
        </div>
    );
}