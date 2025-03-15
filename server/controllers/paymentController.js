const PayOS = require('../utils/payos'); // Assuming PayOS is your payment gateway utility
const Appointment = require("../models/Appointment");
const Service = require("../models/Service");
const BookingRequest = require("../models/BookingRequest");
const User = require("../models/User");
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

        // Generate a unique appointment code
        let appointmentCode;
        while (1 > 0) {
            appointmentCode = Number(Date.now().toString().slice(-8) + Math.floor(Math.random() * 100).toString().padStart(2, '0'));
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
            description: "Service Payment",
            buyerName: user.firstName + " " + user.lastName,
            buyerEmail: user.email,
            buyerPhone: user.phoneNumber,
            transactionDateTime: transactionDateTime
        });
        await newAppointment.save();

        // Payment link parameters
        const amount = service.price;
        const description = "Service Payment";
        const items = [{ name: service.name, quantity: 1, price: service.price }];
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

module.exports = { createEmbeddedPaymentLink, receivePayment };
