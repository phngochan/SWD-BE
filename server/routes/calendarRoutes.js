const express = require('express');
const router = express.Router();
const calendarController = require('../controllers/calendarController');
const { authenticate } = require('../middlewares/authMiddleware');

router.post('/create', authenticate, calendarController.createEvent);
router.get('/events', authenticate, calendarController.getEvents);

module.exports = router;