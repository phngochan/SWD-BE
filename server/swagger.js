const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./swagger.json');

module.exports = (app) => {
  const isGlobal = process.env.ENVIRONMENT === 'global';
  const serverUrl = isGlobal ? `${process.env.URL_BE_GLOBAL}/api` : `http://localhost:${process.env.PORT}/api`;

  // Update the servers array in the swaggerDocument
  swaggerDocument.servers = [
    {
      url: serverUrl,
      description: isGlobal ? 'Live Server' : 'Local Server',
    },
  ];

  app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
};