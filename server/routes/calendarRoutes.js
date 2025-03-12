const express = require('express');
const router = express.Router();
const calendarController = require('../controllers/calendarController');

/**
 * @swagger
 * tags:
 *   name: Calendars
 *   description: Calendar management
 */

/**
 * @swagger
 * /calendars/create:
 *   post:
 *     summary: Create a new calendar event
 *     tags: [Calendars]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               startTime:
 *                 type: string
 *                 format: date-time
 *               endTime:
 *                 type: string
 *                 format: date-time
 *     responses:
 *       201:
 *         description: Calendar event created
 *       400:
 *         description: Schedule is already booked
 */
router.post('/create', calendarController.createEvent);

/**
 * @swagger
 * /calendars/events:
 *   get:
 *     summary: Retrieve a list of calendar events
 *     tags: [Calendars]
 *     responses:
 *       200:
 *         description: A list of calendar events
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   _id:
 *                     type: string
 *                   startTime:
 *                     type: string
 *                     format: date-time
 *                   endTime:
 *                     type: string
 *                     format: date-time
 */
router.get('/events', calendarController.getEvents);

module.exports = router;