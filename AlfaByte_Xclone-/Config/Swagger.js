const swaggerJsdoc = require('swagger-jsdoc');

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'AlfaByte',
      version: '1.0.0',
    },
  },
  apis: ['./Auth/Router/*.js', './Follow/Router/*.js', './Tweet/Router/*.js'],
  
  
};

const swaggerSpec = swaggerJsdoc(options);
module.exports = swaggerSpec;