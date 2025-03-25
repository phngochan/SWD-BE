const PayOS = require('../utils/payos'); // Assuming PayOS is your payment gateway utility
const Appointment = require("../models/Appointment");
const Service = require("../models/Service");
const BookingRequest = require("../models/BookingRequest");
const User = require("../models/User");
const OrderProduct = require("../models/OrderProduct");
const OrderItem = require("../models/OrderItem");
const dotenv = require('dotenv');
dotenv.config();

// Function to create an embedded payment link
const createEmbeddedPaymentLink = async (req, res) => {
    try {
        const { bookingId } = req.params; // Get service ID from the request parameters

        const bookingRequest = await BookingRequest.findById(bookingId);

        if (!bookingRequest) {
            return res.status(404).json({ error: 1, message: 'Booking request not found' });
        }

        if (bookingRequest.status !== "Completed") {
            return res.status(400).json({ error: 1, message: 'Booking request is not completed yet' });
        }

        const userId = bookingRequest.customerID;
        const serviceId = bookingRequest.serviceID;

        // Fetch user and service data
        const user = await User.findById(userId);
        const service = await Service.findById(serviceId);

        // Check if user and service exist
        if (!user) {
            return res.status(404).json({ error: 1, message: 'User not found' });
        }

        if (!service) {
            return res.status(404).json({ error: 1, message: 'Service not found' });
        }

        const transactionDateTime = new Date();

        // Generate a unique appointment code within a safe range
        let appointmentCode;
        while (true) {
            appointmentCode = Math.floor(Math.random() * 9000000000) + 1000000000; // 10-digit number
            const existingAppointment = await Appointment.findOne({ appointmentCode });
            if (!existingAppointment) break; // Ensure unique appointment code
        }

        // Create a new appointment in the database
        const newAppointment = new Appointment({
            memberId: userId,
            serviceId: serviceId,
            status: "Pending",
            amount: service.price,
            appointmentCode,
            description: "Service Payment".substring(0, 25), // Ensure description is within 25 characters
            buyerName: user.firstName + " " + user.lastName,
            buyerEmail: user.email,
            buyerPhone: user.phoneNumber,
            transactionDateTime: transactionDateTime
        });
        await newAppointment.save();

        // Payment link parameters
        const amount = service.price;
        const description = "Thanh toán dịch vụ".substring(0, 25); // Ensure description is within 25 characters
        const items = [{ name: String(service.name), quantity: 1, price: service.price }]; // Ensure item name is a string
        const returnUrl = process.env.RETURN_URL || "http://localhost:5173/pay-success"; // URL for success page
        const cancelUrl = process.env.CANCEL_URL || "http://localhost:5173/pay-failed"; // URL for failure page

        // Create the payment link using PayOS
        try {
            const paymentLinkRes = await PayOS.createPaymentLink({
                orderCode: appointmentCode,
                amount,
                description,
                items,
                returnUrl,
                cancelUrl,
            });
            console.log("PayOS Response:", paymentLinkRes);

            return res.json({
                error: 0,
                message: "Success",
                data: {
                    bin: paymentLinkRes.bin,
                    checkoutUrl: paymentLinkRes.checkoutUrl,
                    accountNumber: paymentLinkRes.accountNumber,
                    accountName: paymentLinkRes.accountName,
                    amount: paymentLinkRes.amount,
                    description: paymentLinkRes.description,
                    orderCode: paymentLinkRes.orderCode,
                    qrCode: paymentLinkRes.qrCode,
                },
            });

        } catch (error) {
            console.log(error);
            return res.json({
                error: -1,
                message: "Failed to create payment link",
                data: null,
            });
        }

    } catch (error) {
        console.log(error);
        return res.status(500).json({
            error: 1,
            message: "Internal server error",
            data: null,
        });
    }
};

// Function to handle payment status (webhook)
const receivePayment = async (req, res) => {
    try {
        let data = req.body; // Get data from the webhook

        if (data.data.orderCode == 123) {
            return res.status(200).json({ error: 0, message: "Success" });
        }

        console.log('Webhook received:', data);

        if (data.data && data.data.orderCode) {
            const appointmentCode = data.data.orderCode;
            console.log(appointmentCode);

            const appointment = await Appointment.findOne({ appointmentCode });

            if (!appointment) {
                console.log(`Appointment with appointmentCode ${appointmentCode} not found.`);
                return res.status(404).json({ error: 1, message: "Appointment not found" });
            }

            // Update appointment status based on payment success/failure
            if (data.success) {
                appointment.status = "Paid";
                appointment.currency = data.data.currency;
                appointment.paymentMethod = "PayOS"; // You can change this to match your actual payment gateway
                appointment.paymentStatus = data.data.desc || "Payment Successful";
                console.log(`Appointment ${appointmentCode} updated to Paid.`);
            } else {
                appointment.status = "Canceled";
                appointment.paymentStatus = data.data.desc || "Payment Failed";
                console.log(`Appointment ${appointmentCode} updated to Canceled.`);
            }

            await appointment.save(); // Save the updated appointment status

            return res.status(200).json({ error: 0, message: "Appointment updated successfully", appointment });
        }
        return res.status(400).json({ error: 1, message: "Invalid payment data" });
    } catch (error) {
        console.error("Error processing webhook:", error);
        return res.status(500).json({ error: 1, message: "Internal server error" });
    }
};

// Function to create a payment link for an order
const createOrderPaymentLink = async (req, res) => {
    try {
        const { orderId } = req.params;

        const order = await OrderProduct.findById(orderId).populate("customerID");
        if (!order) {
            return res.status(404).json({ error: 1, message: "Order not found" });
        }

        const orderItems = await OrderItem.find({ orderID: orderId }).populate("productID");
        if (!orderItems.length) {
            return res.status(400).json({ error: 1, message: "No items in the order" });
        }

        let totalAmount = 0;
        let items = [];

        // Populate orderItems to get product information before calculating
        await order.populate({
            path: 'orderItems',
            populate: {
                path: 'productID',
                model: 'Product'
            }
        });

        order.orderItems.forEach(item => {
            if (item.productID && item.productID.price) { // Check if productID has data
                totalAmount += item.productID.price * item.quantity;
                items.push({
                    name: String(item.productID.productName),
                    quantity: item.quantity,
                    price: item.productID.price
                });
            }
        });

        // Update the total price in the OrderProduct document
        order.totalPrice = totalAmount;
        await order.save();

        // Generate a unique order code within a safe range
        const orderCode = Math.floor(Math.random() * 9000000000) + 1000000000; // 10-digit number

        const description = "Thanh toán sản phẩm".substring(0, 25); // Ensure description is within 25 characters
        const returnUrl = process.env.RETURN_URL || "http://localhost:5173/pay-success-order";
        const cancelUrl = process.env.CANCEL_URL || "http://localhost:5173/pay-failed-order";

        try {
            const paymentLinkRes = await PayOS.createPaymentLink({
                orderCode: orderCode,
                amount: totalAmount,
                description,
                items,
                returnUrl,
                cancelUrl,
            });

            return res.json({
                error: 0,
                message: "Success",
                data: {
                    checkoutUrl: paymentLinkRes.checkoutUrl,
                    qrCode: paymentLinkRes.qrCode,
                    amount: paymentLinkRes.amount,
                    description: paymentLinkRes.description,
                    orderCode: paymentLinkRes.orderCode,
                },
            });

        } catch (error) {
            console.log(error);
            return res.json({
                error: -1,
                message: "Failed to create payment link",
                data: null,
            });
        }

    } catch (error) {
        console.log(error);
        return res.status(500).json({
            error: 1,
            message: "Internal server error",
            data: null,
        });
    }
};

// Function to handle payment status webhook for order payments
const receiveOrderPayment = async (req, res) => {
    try {
        let data = req.body;

        if (data.data && data.data.orderCode) {
            const orderCode = data.data.orderCode;

            const order = await OrderProduct.findOne({ tempOrderCode: orderCode });

            if (!order) {
                return res.status(404).json({ message: "Order not found" });
            }

            if (data.success) {
                order.status = "Completed";
                // Clear the cart after successful payment
                order.orderItems = [];
                await order.save();
                // Send a success response
                return res.status(200).json({ error: 0, message: "Order payment updated successfully", order });
            } else {
                // Keep the order status as "Pending" if payment is cancelled
                return res.status(200).json({ error: 0, message: "Payment cancelled, order status remains pending", order });
            }
        }

        return res.status(400).json({ error: 1, message: "Invalid payment data" });

    } catch (error) {
        console.error("Error processing webhook:", error);
        return res.status(500).json({ error: 1, message: "Internal server error" });
    }
};

module.exports = {
    createEmbeddedPaymentLink,
    receivePayment,
    createOrderPaymentLink,
    receiveOrderPayment
};


