import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "../../utils/axiosInstance";
import CustomerSidebar from "../../components/CustomerSideBar";
import { MdVerified, MdClose } from "react-icons/md";
import {
    Fab,
    CircularProgress,
    Table,
    TableHead,
    TableRow,
    TableCell,
    TableBody,
    Paper,
    TableContainer,
    Tooltip,
    Typography,
    Modal,
    Button,
    TextField,
    Select,
    MenuItem,
    InputLabel,
    FormControl,
    Rating,
    TablePagination,
} from "@mui/material";
import HomeIcon from "@mui/icons-material/Home";
import { motion } from "framer-motion";
import { FaTrash, FaComment } from "react-icons/fa";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";


const ViewBookingHistory = () => {
    const [bookings, setBookings] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [refresh, setRefresh] = useState(false); // 🔄 Trigger refresh
    const [selectedConsultant, setSelectedConsultant] = useState(null);
    const [searchQuery, setSearchQuery] = useState("");
    const [statusFilter, setStatusFilter] = useState("");
    const [consultantsCache, setConsultantsCache] = useState(new Map());
    const [showModal, setShowModal] = useState(false);
    const [selectedBookingId, setSelectedBookingId] = useState(null);
    const [showFeedbackModal, setShowFeedbackModal] = useState(false);

    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(5);

    const navigate = useNavigate();

    const handleReviewClick = (bookingId) => {
        setReviewData({ bookingId, comment: "", rating: 0 });
        setShowReviewModal(true);
    };

    const handleSubmitReview = async () => {
        if (!reviewData.comment || !reviewData.rating) {
            alert("Please enter your comment and rating.");
            return;
        }

        const reviewPayload = {
            bookingId: booking._id,  // ID của lịch đặt cần đánh giá
            comment: reviewData.comment,
            rating: reviewData.rating,
            createdAt: new Date().toISOString(),
        };

        try {
            // Gửi request lưu review vào lịch sử đặt lịch
            const response = await fetch("/api/historyBooking", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(reviewPayload),
            });

            if (!response.ok) throw new Error("Failed to submit review");

            alert("Review submitted successfully!");
            setShowReviewModal(false); // Đóng modal sau khi gửi
        } catch (error) {
            console.error("Error submitting review:", error);
            alert("Failed to submit review");
        }
    };

    const [feedbackData, setFeedbackData] = useState({
        consultantRating: 0,
        consultantComment: "",
        serviceRating: 0,
        serviceComment: "",
        bookingId: null,
    });

    const fetchBookingsByCustomer = async () => {
        try {
            const response = await axios.get(
                "/api/booking-requests/history-bookings"
            );
            setBookings(response.data.bookings || []);
        } catch (err) {
            console.error(
                "Error fetching bookings:",
                err.response?.data || err.message
            );
            setError(err.response?.data?.message || err.message);
        } finally {
            setLoading(false);
        }
    };

    // 🔄 Re-run fetch when `refresh` changes
    useEffect(() => {
        fetchBookingsByCustomer();
    }, [refresh]); // 👈 Add `refresh` as a dependency

    const handleCancelBooking = async (bookingId) => {
        try {
            await axios.put(`/api/booking-requests/${bookingId}/cancel`);
            // ✅ Success Toast
            toast.success("✅ Booking successfully canceled!", {
                position: "top-right",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "colored",
            });
        } catch (err) {
            console.error(
                "Error canceling booking:",
                err.response?.data || err.message
            );
            // ❌ Error Toast
            toast.error("❌ Failed to cancel booking", {
                position: "top-right",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "colored",
            });
        } finally {
            setShowModal(false);
            setRefresh((prev) => !prev); // 🔄 Toggle `refresh` state
        }
    };

    const handleConsultantClick = async (consultantID) => {
        if (!consultantID) return;
        if (consultantsCache.has(consultantID)) {
            setSelectedConsultant(consultantsCache.get(consultantID));
            return;
        }
        try {
            const response = await axios.get(`/api/consultants/${consultantID}`);
            setConsultantsCache(
                new Map(consultantsCache.set(consultantID, response.data))
            );
            setSelectedConsultant(response.data);
        } catch (error) {
            console.error("Error fetching consultant details:", error);
            setError("Failed to fetch consultant details.");
        }
    };

    const closeConsultantModal = () => {
        setSelectedConsultant(null);
    };

    const handleFeedbackClick = (bookingId) => {
        setFeedbackData((prev) => ({
            ...prev,
            bookingId: bookingId,
        }));
        setShowFeedbackModal(true);
    };

    const handleSubmitFeedback = async () => {
        try {
            const response = await axios.post("/api/feedbacks", feedbackData);
            if (response.status === 201) {
                toast.success("Feedback submitted successfully!");
                setShowFeedbackModal(false);
                setRefresh((prev) => !prev);
            }
        } catch (error) {
            toast.error("Failed to submit feedback");
        }
    };

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    const filteredBookings = bookings.filter(
        (booking) =>
            (booking.serviceID?.name
                .toLowerCase()
                .includes(searchQuery.toLowerCase()) ||
                booking.consultantID?.firstName
                    ?.toLowerCase()
                    .includes(searchQuery.toLowerCase())) &&
            (statusFilter ? booking.status === statusFilter : true)
    );

    const paginatedBookings = filteredBookings.slice(
        page * rowsPerPage,
        page * rowsPerPage + rowsPerPage
    );

    return (
        <div className="flex main-container w-full h-full bg-gray-100 relative mx-auto my-0 p-6">
            <CustomerSidebar />
            <div className="w-full">
                <Typography
                    variant="h4"
                    className="mb-4 text-[#2B6A7C] text-center"
                >
                    Lịch sử đặt lịch
                </Typography>
                <div className="flex justify-between mb-4">
                    <TextField
                        label="Tìm kiếm theo dịch vụ hoặc chuyên viên"
                        variant="outlined"
                        size="small"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="w-1/2"
                        sx={{
                            "& .MuiOutlinedInput-root": {
                                "& fieldset": {
                                    borderColor: "gray", // Default border color
                                },
                                "&:hover fieldset": {
                                    borderColor: "#2B6A7C", // Border color on hover
                                },
                                "&.Mui-focused fieldset": {
                                    borderColor: "#2B6A7C", // Border color when focused
                                },
                            },
                            "& .MuiInputBase-input": {
                                color: "#000000", // Changes the text color inside the field
                            },
                            "& .MuiInputLabel-root": {
                                color: "gray", // Default label color
                            },
                            "& .MuiInputLabel-root.Mui-focused": {
                                color: "#2B6A7C", // Label color when focused
                            },
                        }}
                    />
                    <FormControl
                        size="small"
                        className="w-1/4"
                        sx={{
                            "& .MuiOutlinedInput-root": {
                                "& fieldset": {
                                    borderColor: "gray", // Default border color
                                },
                                "&:hover fieldset": {
                                    borderColor: "#2B6A7C", // Border color on hover
                                },
                                "&.Mui-focused fieldset": {
                                    borderColor: "#2B6A7C", // Border color when focused
                                },
                            },
                            "& .MuiInputBase-input": {
                                color: "#000000", // Changes the text color inside the field
                            },
                            "& .MuiInputLabel-root": {
                                color: "gray", // Default label color
                            },
                            "& .MuiInputLabel-root.Mui-focused": {
                                color: "#2B6A7C", // Label color when focused
                            },
                        }}
                    >
                        <InputLabel>Trạng thái</InputLabel>
                        <Select
                            value={statusFilter}
                            onChange={(e) => setStatusFilter(e.target.value)}
                        >
                            <MenuItem value="">Tất cả</MenuItem>
                            <MenuItem value="Pending" sx={{ color: "#e0f131" }}>
                                Chờ xác nhận
                            </MenuItem>
                            <MenuItem value="Confirmed" sx={{ color: "#3139f1" }}>
                                Đã xác nhận
                            </MenuItem>
                            <MenuItem value="Completed" sx={{ color: "#31f131" }}>
                                Đã hoàn thành
                            </MenuItem>
                            <MenuItem value="Cancelled" sx={{ color: "#E27585" }}>
                                Đã hủy
                            </MenuItem>
                        </Select>
                    </FormControl>
                </div>
                {loading ? (
                    <div className="flex justify-center items-center h-40">
                        <CircularProgress />
                    </div>
                ) : error ? (
                    <Typography color="error" className="text-center">
                        {error}
                    </Typography>
                ) : filteredBookings.length === 0 ? (
                    <Typography className="text-center">
                        Không tìm thấy kết quả phù hợp.
                    </Typography>
                ) : (
                    <>
                        <TableContainer component={Paper} elevation={3} className="shadow-md">
                            <Table>
                                <TableHead className="bg-[#A7DFEC] text-white">
                                    <TableRow>
                                        <TableCell align="center" style={{ fontWeight: 'bold', fontSize: '1.1rem', color:'#444444' }}>Dịch vụ</TableCell>
                                        <TableCell align="center" style={{ fontWeight: 'bold', fontSize: '1.1rem', color:'#444444' }}>Ngày</TableCell>
                                        <TableCell align="center" style={{ fontWeight: 'bold', fontSize: '1.1rem', color:'#444444' }}>Giờ</TableCell>
                                        <TableCell align="center" style={{ fontWeight: 'bold', fontSize: '1.1rem', color:'#444444' }}>Chuyên viên</TableCell>
                                        <TableCell align="center" style={{ fontWeight: 'bold', fontSize: '1.1rem', color:'#444444' }}>Trạng thái</TableCell>
                                        <TableCell align="center" style={{ fontWeight: 'bold', fontSize: '1.1rem', color:'#444444' }}>Hủy đặt</TableCell>
                                        <TableCell align="center" style={{ fontWeight: 'bold', fontSize: '1.1rem', color:'#444444' }}>Đánh giá</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {paginatedBookings.map((booking) => (
                                        <TableRow
                                            key={booking._id}
                                            className="transition duration-300 hover:bg-gray-100"
                                        >
                                            <TableCell align="center">
                                                {booking.serviceID?.name || "N/A"}
                                            </TableCell>
                                            <TableCell align="center">
                                                {new Date(booking.date).toLocaleDateString()}
                                            </TableCell>
                                            <TableCell align="center">{booking.time}</TableCell>
                                            <TableCell align="center">
                                                <Tooltip title="View Consultant Details">
                                                    <span
                                                        className="cursor-pointer text-[#2B6A7C] hover:underline"
                                                        onClick={() =>
                                                            handleConsultantClick(booking.consultantID?._id)
                                                        }
                                                    >
                                                        {booking.consultantID?.firstName
                                                            ? `${booking.consultantID.firstName} ${booking.consultantID.lastName || ""
                                                            }`
                                                            : "Chưa chọn chuyên viên"}
                                                    </span>
                                                </Tooltip>
                                            </TableCell>
                                            <TableCell align="center">
                                                <span
                                                    className={`p-1 rounded ${booking.status === "Pending"
                                                        ? "bg-yellow-200 text-yellow-800"
                                                        : booking.status === "Confirmed"
                                                            ? "bg-blue-200 text-blue-800"
                                                            : booking.status === "Completed"
                                                                ? "bg-green-200 text-green-800"
                                                                : "bg-red-200 text-red-800"
                                                        }`}
                                                >
                                                    {booking.status}
                                                </span>
                                            </TableCell>
                                            <TableCell align="center">
                                                <Button
                                                    variant="contained"
                                                    color="error"
                                                    size="small"
                                                    onClick={() => {
                                                        setSelectedBookingId(booking._id);
                                                        setShowModal(true);
                                                    }}
                                                    sx={{
                                                        backgroundColor: '#f44336',
                                                        '&:hover': {
                                                            backgroundColor: '#d32f2f',
                                                        },
                                                    }}
                                                >
                                                    <FaTrash />
                                                </Button>
                                            </TableCell>
                                            <TableCell align="center">
                                                <Button
                                                    variant="contained"
                                                    color="primary"
                                                    size="small"
                                                    onClick={() => handleFeedbackClick(booking._id)}
                                                    sx={{
                                                        backgroundColor: '#1976d2',
                                                        '&:hover': {
                                                            backgroundColor: '#1565c0',
                                                        },
                                                    }}
                                                >
                                                    <FaComment />
                                                </Button>
                                            </TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </TableContainer>
                        <TablePagination
                            rowsPerPageOptions={[5, 10, 25]}
                            component="div"
                            count={filteredBookings.length}
                            rowsPerPage={rowsPerPage}
                            page={page}
                            onPageChange={handleChangePage}
                            onRowsPerPageChange={handleChangeRowsPerPage}
                        />
                    </>
                )}
                <Modal open={!!selectedConsultant} onClose={closeConsultantModal}>
                    <motion.div
                        initial={{ opacity: 0, y: -30 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -30 }}
                        transition={{ duration: 0.3, ease: "easeOut" }}
                        className="bg-white/80 backdrop-blur-lg p-8 rounded-xl shadow-xl max-w-lg mx-auto mt-24 relative"
                    >
                        {/* Close Button */}
                        <button
                            className="absolute top-4 right-4 text-gray-600 hover:text-gray-900 transition"
                            onClick={closeConsultantModal}
                        >
                            <MdClose size={24} />
                        </button>

                        {/* Modal Title */}
                        <Typography variant="h5" className="text-gray-800 font-bold mb-4">
                            Consultant Details
                        </Typography>

                        {selectedConsultant && (
                            <div className="space-y-3 text-gray-700">
                                <Typography>
                                    <strong>First Name:</strong> {selectedConsultant.firstName}
                                </Typography>
                                <Typography>
                                    <strong>Last Name:</strong> {selectedConsultant.lastName}
                                </Typography>
                                <Typography>
                                    <strong>Email:</strong> {selectedConsultant.email}
                                </Typography>
                                <Typography>
                                    <strong>Phone:</strong>{" "}
                                    {selectedConsultant.phoneNumber || "Not Available"}
                                </Typography>
                                <Typography className="flex items-center">
                                    <strong>Verified:</strong>
                                    <span
                                        className={`ml-2 flex items-center ${selectedConsultant.verified
                                            ? "text-green-600"
                                            : "text-red-600"
                                            }`}
                                    >
                                        {selectedConsultant.verified ? (
                                            <MdVerified size={18} className="ml-1" />
                                        ) : (
                                            "No"
                                        )}
                                    </span>
                                </Typography>
                            </div>
                        )}

                        {/* Close Button */}
                        <div className="mt-6 flex justify-end">
                            <Button
                                variant="contained"
                                color="primary"
                                className="rounded-full px-6 shadow-md"
                                onClick={closeConsultantModal}
                                sx={{
                                    backgroundColor: '#1976d2',
                                    '&:hover': {
                                        backgroundColor: '#1565c0',
                                    },
                                }}
                            >
                                Close
                            </Button>
                        </div>
                    </motion.div>
                </Modal>

                <Fab
                    color="primary"
                    onClick={() => navigate("/")}
                    sx={{
                        position: "fixed",
                        bottom: 20,
                        right: 20,
                        backgroundColor: "#2B6A7C",
                        "&:hover": { backgroundColor: "#A7DFEC" },
                        boxShadow: '0px 4px 20px rgba(0, 0, 0, 0.1)',
                    }}
                >
                    <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#a2B6A7C92a4e] opacity-75"></span>
                    <HomeIcon />
                </Fab>
            </div>
            {/* Cancel Confirmation Modal */}
            {showModal && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
                    <div className="bg-white p-6 rounded-xl shadow-lg max-w-sm w-full text-center">
                        <h3 className="text-xl font-bold text-gray-800 mb-4">
                            Hủy Đặt Lịch
                        </h3>
                        <p className="text-gray-600">
                            Bạn có chắc chắn muốn hủy đặt lịch này không? Hành động này không thể hoàn tác.
                        </p>
                        <div className="flex justify-center gap-4 mt-4">
                            <button
                                className="py-2 px-6 bg-gray-300 text-gray-800 rounded-lg hover:bg-gray-400 transition"
                                onClick={() => setShowModal(false)}
                            >
                                Không hủy.
                            </button>
                            <button
                                className="py-2 px-6 bg-[#f1baba] text-white rounded-lg hover:bg-[#e78999] transition"
                                onClick={() => handleCancelBooking(selectedBookingId)}
                            >
                                Có hủy.
                            </button>
                        </div>
                    </div>
                </div>
            )}
            {/* Feedback Modal */}
            {showFeedbackModal && (
                <Modal
                    open={showFeedbackModal}
                    onClose={() => setShowFeedbackModal(false)}
                >
                    <div className="fixed inset-0 flex items-center justify-center">
                        <div className="bg-white p-6 rounded-xl shadow-lg max-w-md w-full">
                            <h3 className="text-xl font-bold mb-4">Hãy để lại ý kiến cho chúng tôi</h3>

                            <div className="mb-4">
                                <Typography component="legend">Đánh giá chuyên gia</Typography>
                                <Rating
                                    value={feedbackData.consultantRating}
                                    onChange={(_, value) =>
                                        setFeedbackData((prev) => ({
                                            ...prev,
                                            consultantRating: value,
                                        }))
                                    }
                                />
                                <TextField
                                    fullWidth
                                    multiline
                                    rows={2}
                                    label="Đánh giá chuyên gia"
                                    value={feedbackData.consultantComment}
                                    onChange={(e) =>
                                        setFeedbackData((prev) => ({
                                            ...prev,
                                            consultantComment: e.target.value,
                                        }))
                                    }
                                    className="mt-2"
                                    sx={{
                                        '& .MuiOutlinedInput-root': {
                                            '& fieldset': {
                                                borderColor: 'gray',
                                            },
                                            '&:hover fieldset': {
                                                borderColor: '#2B6A7C',
                                            },
                                            '&.Mui-focused fieldset': {
                                                borderColor: '#2B6A7C',
                                            },
                                        },
                                        '& .MuiInputBase-input': {
                                            color: '#000000',
                                        },
                                        '& .MuiInputLabel-root': {
                                            color: 'gray',
                                        },
                                        '& .MuiInputLabel-root.Mui-focused': {
                                            color: '#2B6A7C',
                                        },
                                    }}
                                />
                            </div>

                            <div className="mb-4">
                                <Typography component="legend">Đánh giá dịch vụ</Typography>
                                <Rating
                                    value={feedbackData.serviceRating}
                                    onChange={(_, value) =>
                                        setFeedbackData((prev) => ({
                                            ...prev,
                                            serviceRating: value,
                                        }))
                                    }
                                />
                                <TextField
                                    fullWidth
                                    multiline
                                    rows={2}
                                    label="Đánh giá dịch vụ"
                                    value={feedbackData.serviceComment}
                                    onChange={(e) =>
                                        setFeedbackData((prev) => ({
                                            ...prev,
                                            serviceComment: e.target.value,
                                        }))
                                    }
                                    className="mt-2"
                                    sx={{
                                        '& .MuiOutlinedInput-root': {
                                            '& fieldset': {
                                                borderColor: 'gray',
                                            },
                                            '&:hover fieldset': {
                                                borderColor: '#2B6A7C',
                                            },
                                            '&.Mui-focused fieldset': {
                                                borderColor: '#2B6A7C',
                                            },
                                        },
                                        '& .MuiInputBase-input': {
                                            color: '#000000',
                                        },
                                        '& .MuiInputLabel-root': {
                                            color: 'gray',
                                        },
                                        '& .MuiInputLabel-root.Mui-focused': {
                                            color: '#2B6A7C',
                                        },
                                    }}
                                />
                            </div>

                            <div className="flex justify-end gap-2">
                                <Button onClick={() => setShowFeedbackModal(false)}>
                                    Hủy
                                </Button>
                                <Button variant="contained" onClick={handleSubmitFeedback} sx={{
                                    backgroundColor: '#1976d2',
                                    '&:hover': {
                                        backgroundColor: '#1565c0',
                                    },
                                }}>
                                    Gửi đánh giá
                                </Button>
                            </div>
                        </div>
                    </div>
                </Modal>
            )}
        </div>
    );
};

export default ViewBookingHistory;