const swaggerJsdoc = require('swagger-jsdoc');

// Swagger setup
const swaggerOptions = {
	swaggerDefinition: {
		openapi: '3.0.0',
		info: {
			title: 'Hospital Management API',
			description:
				'API documentation for managing patients, doctors, appointments, and more.',
			version: '1.0.0',
		},
	},
	apis: ['./routes/*.js'],
};

const swaggerDocs = swaggerJsdoc(swaggerOptions);
module.exports = swaggerDocs;
