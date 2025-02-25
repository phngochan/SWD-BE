const express = require('express');
const userRoutes = require('./userRoutes');
const bookingRequestRoutes = require('./bookingRequestRoutes');
const feedbackRoutes = require('./feedbackRoutes');
const serviceRoutes = require('./serviceRoutes');
const quizResultRoutes = require('./quizResultRoutes');
const paymentRoutes = require('./paymentRoutes');
const blogRoutes = require('./blogRoutes');
const questionRoutes = require('./questionRoutes');
const managerRoutes = require("./managerRoutes");
const calendarRoutes = require("./calendarRoutes");
const consultantRoutes = require("./consultantRoutes");
const router = express.Router();

router.use('/users', userRoutes);
router.use('/managers', managerRoutes);


module.exports = router;

