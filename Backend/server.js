const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const mysql = require('mysql');
const swaggerJsdoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');

dotenv.config();

const app = express();
app.use(
	cors({
		origin: '*',
		methods: ['GET', 'POST', 'PUT', 'DELETE'],
		allowedHeaders: ['Content-Type', 'Authorization'],
		credentials: true,
	})
);
app.use(express.json());

const port = process.env.PORT || 9021;

// MySQL connection configuration
const connection = mysql.createConnection({
	host: process.env.DB_HOST || 'sql12.freesqldatabase.com',
	port: 3306,
	user: process.env.DB_USER || 'sql12759310',
	password: process.env.DB_PASSWORD || '7KwYc56577',
	database: process.env.DB_NAME || 'sql12759310',
});

connection.connect((err) => {
	if (err) {
		console.error('Error connecting to MySQL:', err.message);
	} else {
		console.log('Connected to the database!');
	}
});

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
	apis: ['./server.js'],
};

const swaggerDocs = swaggerJsdoc(swaggerOptions);
app.get('/api', (req, res) => {
	res.redirect('/api/docs');
});
app.use('/api/docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));

/**
 * @swagger
 * /api/addPatient:
 *   post:
 *     summary: Add a new patient
 *     description: Add a new patient to the database
 *     requestBody:
 *       description: Patient information to add
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               p_name:
 *                 type: string
 *               p_age:
 *                 type: integer
 *               p_dob:
 *                 type: string
 *                 format: date
 *               p_gender:
 *                 type: string
 *               p_address:
 *                 type: string
 *               p_mobileNumber:
 *                 type: string
 *               p_BloodGroup:
 *                 type: string
 *               p_height:
 *                 type: integer
 *               p_weight:
 *                 type: integer
 *               p_maritalStatus:
 *                 type: string
 *               p_medications:
 *                 type: string
 *     responses:
 *       '201':
 *         description: Patient added successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                 data:
 *                   type: object
 *       '500':
 *         description: Internal server error
 */

// Endpoint to add a new patient
app.post('/api/addPatient', (req, res) => {
	const {
		p_name,
		p_age,
		p_dob,
		p_gender,
		p_address,
		p_mobileNumber,
		p_BloodGroup,
		p_height,
		p_weight,
		p_maritalStatus,
		p_medications,
	} = req.body;

	connection.query(
		'CALL InsertPatient(?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)',
		[
			p_name,
			p_age,
			p_dob,
			p_gender,
			p_address,
			p_mobileNumber,
			p_BloodGroup,
			p_height,
			p_weight,
			p_maritalStatus,
			p_medications,
		],
		(err, results) => {
			if (err) {
				console.error('Error inserting patient details:', err);
				return res.status(500).json({ error: 'Internal server error' });
			}
			res
				.status(201)
				.json({ message: 'Patient inserted successfully', data: results });
		}
	);
});

/**
 * @swagger
 * /api/addDoctor:
 *   post:
 *     summary: Add a new doctor
 *     description: Add a new doctor to the database
 *     requestBody:
 *       description: Doctor details to add
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               doctorName:
 *                 type: string
 *               specialization:
 *                 type: string
 *               qualification:
 *                 type: string
 *               contact:
 *                 type: string
 *     responses:
 *       '200':
 *         description: Doctor added successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                 data:
 *                   type: object
 *       '500':
 *         description: Internal server error
 */

// Endpoint to add a new doctor
app.post('/api/addDoctor', (req, res) => {
	const { doctorName, specialization, qualification, contact } = req.body;

	connection.query(
		'CALL InsertDoctor(?, ?, ?, ?)',
		[doctorName, specialization, qualification, contact],
		(err, result) => {
			if (err) {
				console.error('Error adding doctor:', err);
				return res.status(500).json({ error: 'Internal server error' });
			}
			res
				.status(200)
				.json({ message: 'Doctor added successfully', data: result });
		}
	);
});

/**
 * @swagger
 * /api/patient/{patientId}:
 *   get:
 *     summary: Fetch patient details by ID
 *     description: Get patient details by their unique ID
 *     parameters:
 *       - name: patientId
 *         in: path
 *         required: true
 *         description: ID of the patient
 *         schema:
 *           type: integer
 *     responses:
 *       '200':
 *         description: Patient details fetched successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *       '404':
 *         description: Patient not found
 *       '500':
 *         description: Internal server error
 */

// Fetch patient details by ID
app.get('/api/patient/:patientId', (req, res) => {
	const patientId = req.params.patientId;

	connection.query('CALL GetPatient(?)', [patientId], (err, results) => {
		if (err) {
			console.error('Error fetching patient details:', err);
			return res.status(500).json({ error: 'Internal server error' });
		}
		if (results[0].length === 0) {
			return res
				.status(404)
				.json({ error: `Patient with ID ${patientId} not found` });
		}
		res.json(results[0]);
	});
});

// Fetch all patients
/*app.get('/api/patients', (req, res) => {
  connection.query('CALL GetAllPatients()', (err, results) => {
    if (err) {
      console.error('Error fetching patient details:', err);
      return res.status(500).json({ error: 'Internal server error' });
    }
    res.json(results[0]);
  });
});*/

/**
 * @swagger
 * /api/patients:
 *   get:
 *     summary: Fetch all patients
 *     description: Get the list of all patients
 *     responses:
 *       '200':
 *         description: Patients fetched successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *       '500':
 *         description: Internal server error
 */

app.get('/api/patients', (req, res) => {
	connection.query('CALL GetAllPatients()', (err, results) => {
		if (err) {
			console.error('Error fetching patient details:', err);
			return res.status(500).json({ error: 'Internal server error' });
		}
		// MySQL procedure output is usually in results[0] and each column is a key-value pair
		console.log(results);
		const patientsJsonString = results[0][0].patients; // Extract the JSON string
		console.log(patientsJsonString);
		try {
			// Parse the string as JSON and send the data
			const patientsData = JSON.parse(patientsJsonString);
			res.json(patientsData); // Return as proper JSON
		} catch (parseError) {
			console.error('Error parsing JSON:', parseError);
			res.status(500).send('Error parsing JSON');
		}
	});
});

// Fetch all doctors
/*app.get('/api/doctors', (req, res) => {
  connection.query('CALL GetAllDoctors()', (err, results) => {
    if (err) {
      console.error('Error fetching doctor details:', err);
      return res.status(500).json({ error: 'Internal server error' });
    }
    res.json(results[0]);
  });
});*/

/**
 * @swagger
 * /api/doctors:
 *   get:
 *     summary: Fetch all doctors
 *     description: Get the list of all doctors
 *     responses:
 *       '200':
 *         description: Doctors fetched successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *       '500':
 *         description: Internal server error
 */

app.get('/api/doctors', (req, res) => {
	connection.query('CALL GetAllDoctors()', (err, results) => {
		if (err) {
			console.error('Error fetching doctor details:', err);
			return res.status(500).json({ error: 'Internal server error' });
		}
		console.log(results);
		const doctorsJsonString = results[0][0].doctors; // Extract the JSON string
		console.log(doctorsJsonString);
		try {
			const doctorsData = JSON.parse(doctorsJsonString);
			console.log(doctorsData);
			res.json(doctorsData); // Return as proper JSON
		} catch (parseError) {
			console.error('Error parsing JSON:', parseError);
			res.status(500).send('Error parsing JSON');
		}
	});
});

/**
 * @swagger
 * /api/patient:
 *   put:
 *     summary: Modify patient details
 *     description: Modify the details of an existing patient
 *     requestBody:
 *       description: The updated details for the patient
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               patientId:
 *                 type: integer
 *               detailColumn:
 *                 type: string
 *               newValue:
 *                 type: string
 *     responses:
 *       '200':
 *         description: Patient modified successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                 data:
 *                   type: object
 *       '500':
 *         description: Internal server error
 */

// Modify patient details
app.put('/api/patient', (req, res) => {
	const { patientId, detailColumn, newValue } = req.body;

	connection.query(
		'CALL ModifyPatient(?, ?, ?)',
		[patientId, detailColumn, newValue],
		(err, result) => {
			if (err) {
				console.error('Error modifying patient:', err);
				return res.status(500).json({ error: 'Internal server error' });
			}
			res
				.status(200)
				.json({ message: 'Patient modified successfully', data: result });
		}
	);
});

/**
 * @swagger
 * /api/doctor:
 *   put:
 *     summary: Modify doctor details
 *     description: Modify the details of an existing doctor
 *     requestBody:
 *       description: The updated details for the doctor
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               doctorId:
 *                 type: integer
 *               detailColumn:
 *                 type: string
 *               newValue:
 *                 type: string
 *     responses:
 *       '200':
 *         description: Doctor modified successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                 data:
 *                   type: object
 *       '500':
 *         description: Internal server error
 */

// Modify doctor details
app.put('/api/doctor', (req, res) => {
	const { doctorId, detailColumn, newValue } = req.body;

	connection.query(
		'CALL ModifyDoctor(?, ?, ?)',
		[doctorId, detailColumn, newValue],
		(err, result) => {
			if (err) {
				console.error('Error modifying doctor:', err);
				return res.status(500).json({ error: 'Internal server error' });
			}
			res
				.status(200)
				.json({ message: 'Doctor modified successfully', data: result });
		}
	);
});

/**
 * @swagger
 * /api/appointment:
 *   post:
 *     summary: Book an appointment
 *     description: Book an appointment for a patient with a doctor
 *     requestBody:
 *       description: The details of the appointment
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               patientId:
 *                 type: integer
 *               doctorId:
 *                 type: integer
 *               appointmentDate:
 *                 type: string
 *                 format: date
 *               appointmentTime:
 *                 type: string
 *               appointmentType:
 *                 type: string
 *               appointmentReason:
 *                 type: string
 *     responses:
 *       '201':
 *         description: Appointment booked successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                 data:
 *                   type: object
 *       '500':
 *         description: Internal server error
 */

// Book an appointment
app.post('/api/appointment', (req, res) => {
	const {
		patientId,
		doctorId,
		appointmentDate,
		appointmentTime,
		appointmentType,
		appointmentReason,
	} = req.body;

	connection.query(
		'CALL InsertAppointment(?, ?, ?, ?, ?, ?)',
		[
			patientId,
			doctorId,
			appointmentDate,
			appointmentTime,
			appointmentType,
			appointmentReason,
		],
		(err, results) => {
			if (err) {
				console.error('Error booking appointment:', err);
				return res.status(500).json({ error: 'Internal server error' });
			}
			res
				.status(201)
				.json({ message: 'Appointment booked successfully', data: results });
		}
	);
});

/**
 * @swagger
 * /api/appointments/{doctorId}/{appointmentDate}:
 *   get:
 *     summary: Fetch appointments by doctor and date
 *     description: Get the list of appointments for a specific doctor on a specific date
 *     parameters:
 *       - name: doctorId
 *         in: path
 *         required: true
 *         description: ID of the doctor
 *         schema:
 *           type: integer
 *       - name: appointmentDate
 *         in: path
 *         required: true
 *         description: Date of the appointment
 *         schema:
 *           type: string
 *           format: date
 *     responses:
 *       '200':
 *         description: Appointment details fetched successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *       '500':
 *         description: Internal server error
 */

// Fetch appointments by doctor and date
app.get('/api/appointments/:doctorId/:appointmentDate', (req, res) => {
	const { doctorId, appointmentDate } = req.params;

	connection.query(
		'CALL Get_AppointmentDetails_docId(?, ?)',
		[doctorId, appointmentDate],
		(err, results) => {
			if (err) {
				console.error('Error fetching appointment details:', err);
				return res.status(500).json({ error: 'Internal server error' });
			}
			res.json(results[0]);
		}
	);
});

/**
 * @swagger
 * /api/doctor:
 *   delete:
 *     summary: Remove a doctor
 *     description: Remove a doctor from the system
 *     requestBody:
 *       description: The doctor ID and reason for removal
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               doctorId:
 *                 type: integer
 *               reason:
 *                 type: string
 *     responses:
 *       '200':
 *         description: Doctor removed successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                 data:
 *                   type: object
 *       '500':
 *         description: Internal server error
 */

// Remove a doctor
app.delete('/api/doctor', (req, res) => {
	const { doctorId, reason } = req.body;

	connection.query(
		'CALL RemoveDoctor(?, ?)',
		[doctorId, reason],
		(err, result) => {
			if (err) {
				console.error('Error removing doctor:', err);
				return res.status(500).json({ error: 'Internal server error' });
			}
			res
				.status(200)
				.json({ message: 'Doctor removed successfully', data: result });
		}
	);
});

app.listen(port, () => {
	console.log(`Server is running on ${port}`);
});
