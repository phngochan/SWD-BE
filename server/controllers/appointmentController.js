const Appointment = require("../models/Appointment");
const User = require("../models/User");
const Service = require("../models/Service");

// Hàm tạo mã đơn hàng tự động
const generateAppointmentCode = () => {
    return `ORD-${Date.now()}-${Math.floor(1000 + Math.random() * 9000)}`;
};

const createAppointment = async (req, res) => {
    try {
        const { serviceId, amount, description, buyerName, buyerEmail, buyerPhone, buyerAddress, items, currency, paymentMethod, paymentStatus, transactionDateTime } = req.body;
        const memberID = req.user.id;
        const service = await Service.findById(serviceId);

        if (!service) {
            return res.status(404).json({ message: "Service not found" });
        }

        const newAppointment = new Appointment({
            memberId: memberID,
            serviceId,
            appointmentCode: generateAppointmentCode(),  // Thêm appointmentCode
            amount,
            description,
            buyerName,
            buyerEmail,
            buyerPhone,
            buyerAddress,
            items,
            currency,
            paymentMethod,
            paymentStatus,
            transactionDateTime: transactionDateTime ? new Date(transactionDateTime) : Date.now(), // Định dạng lại thời gian
        });

        await newAppointment.save();
        res.status(201).json({ message: "Appointment created successfully", appointment: newAppointment });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const getAppointmentsByMemberId = async (req, res) => {
    try {
        const memberId = req.user.id;
        const appointments = await Appointment.find({ memberId, status: "Paid" }); // Chỉ lấy đơn hàng đã thanh toán

        res.status(200).json(appointments); // Trả về [] nếu không có đơn hàng nào
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const getAllAppointments = async (req, res) => {
    try {
        const appointments = await Appointment.find();
        res.status(200).json(appointments); // Không cần kiểm tra `if (!appointments)`, vì MongoDB sẽ trả về []
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const deleteAppointment = async (req, res) => {
    try {
        const { appointmentId } = req.params;
        const memberId = req.user.id;

        // Kiểm tra quyền sở hữu trước khi xóa
        const deletedAppointment = await Appointment.findOneAndDelete({ _id: appointmentId, memberId });
        if (!deletedAppointment) {
            return res.status(404).json({ message: "Appointment not found or unauthorized" });
        }

        res.status(200).json({ message: "Appointment deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const getAppointmentByAppointmentCode = async (req, res) => {
    try {
        const { appointmentCode } = req.params;
        const appointment = await Appointment.findOne({ appointmentCode: appointmentCode.toLowerCase() }); // Không phân biệt hoa thường

        if (!appointment) {
            return res.status(404).json({ message: "Appointment not found" });
        }

        res.status(200).json(appointment);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = {
    createAppointment,
    getAppointmentsByMemberId,
    getAllAppointments,
    getAppointmentByAppointmentCode,
    deleteAppointment,
};
