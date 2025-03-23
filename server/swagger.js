const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./swagger.json');

module.exports = (app) => {
  const serverUrl = `${process.env.API_BASE_URL}/api`;

  // Update the servers array in the swaggerDocument
  swaggerDocument.servers = [
    {
      url: serverUrl,
      description: "API Server",
    },
  ];

  app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
};