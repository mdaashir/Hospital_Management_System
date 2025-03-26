const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const swaggerDocs = require('./swagger');
const swaggerUi = require('swagger-ui-express');
const patientRoutes = require('./routes/patientRoutes');
const doctorRoutes = require('./routes/doctorRoutes');
const appointmentRoutes = require('./routes/appointmentRoutes');

// Load environment variables
dotenv.config();

const app = express();
const port = Number(process.env.PORT) || 3000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Swagger Documentation
app.get('/api', (_, res) => res.redirect('/api/docs'));
app.use('/api/docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));

// Endpoint to health check the server
app.get('/', (_, res) => {
	res.status(200).send('Welcome to the SIGNIFYHEALTH backend!');
});

// Routes
app.use('/api/patients', patientRoutes);
app.use('/api/doctors', doctorRoutes);
app.use('/api/appointments', appointmentRoutes);

// Start Server
app.listen(port, () => {
	console.log(`Server running on port ${port}`);
});
