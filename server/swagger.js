// filepath: e:\MAIN\FPTU\sem7\SWD\SWD\server\swagger.js
const swaggerJsdoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Spa system',
      version: '1.0.0',
      description: 'Skincare service system',
    },
    servers: [
      {
        url: `http://localhost:${process.env.PORT || 5000}/api`,
        description: 'API Server',
      },
    ],
    tags: [
      {
        name: 'Calendars',
        description: 'Calendar management',
      },
    ],
  },
  apis: [`./routes/index.js`],
};

const specs = swaggerJsdoc(options);

module.exports = (app) => {
  app.use('/docs', swaggerUi.serve, swaggerUi.setup(specs));
};