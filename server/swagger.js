const swaggerJsdoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');

const tags = [
  {
    name: 'Calendars',
    description: 'Calendar management',
  },
  {
    name: 'Auth',
    description: 'Authentication and Authorization',
  },
];

const options = (port) => ({
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Spa system',
      version: '1.0.0',
      description: 'Skincare service system',
    },
    servers: [
      {
        url: `http://localhost:${port}/api`,
        description: 'API Server',
      },
    ],
    tags: tags,
    components: {
      securitySchemes: {
        bearerAuth: {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT',
        },
      },
    },
    security: [
      {
        bearerAuth: [],
      },
    ],
  },
  apis: ['./routes/*.js'],
});

const specs = (port) => swaggerJsdoc(options(port));

module.exports = (app, port) => {
  app.use('/docs', swaggerUi.serve, swaggerUi.setup(specs(port)));
};