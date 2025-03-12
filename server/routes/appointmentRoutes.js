const express = require("express");
const router = express.Router();
const appointmentController = require("../controllers/appointmentController");
const { authenticate, authorize } = require('../middlewares/authMiddleware');

// Tạo đơn hàng (Chỉ người dùng đã đăng nhập mới có thể đặt hàng)
router.post("/", authenticate, appointmentController.createAppointment);

// Lấy danh sách đơn hàng của thành viên (Chỉ người dùng đã đăng nhập mới xem được đơn của mình)
router.get("/member", authenticate, appointmentController.getAppointmentsByMemberId);

// Lấy tất cả đơn hàng (Chỉ Admin mới có quyền truy cập)
router.get("/", authenticate, authorize(["Manager"]), appointmentController.getAllAppointments);

// Lấy đơn hàng theo ID (Tất cả người dùng có thể xem)
router.get("/:appointmentCode", authenticate, appointmentController.getAppointmentByAppointmentCode);

router.delete("/:id", appointmentController.deleteAppointment);
module.exports = router;