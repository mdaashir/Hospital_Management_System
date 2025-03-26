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

const port = process.env.PORT;

// MySQL connection configuration
const connection = mysql.createConnection({
	host: process.env.DB_HOST,
	port: Number(process.env.DB_PORT),
	user: process.env.DB_USER,
	password: process.env.DB_PASSWORD,
	database: process.env.DB_NAME,
});

// Connect to MySQL
connection.connect((err) => {
	if (err) {
		console.error('Error connecting to MySQL:', err);
		return;
	}
	console.log('Connected to MySQL database');
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

// Endpoint to health check the server
app.get('/', (req, res) => {
	res.status(200).send('Welcome to the SIGNIFYHEALTH backend!');
});

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
				res.status(500).json({ error: 'Internal server error' });
				return;
			}
			console.log('Inserted new patient:', results);
			res.status(201).json({ message: 'Patient inserted successfully' });
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
 *       '500':
 *         description: Internal server error
 */

// Endpoint to add a new doctor
app.post('/api/addDoctor', (req, res) => {
	const { doctorName, specialization, qualification, contact } = req.body; // Destructure properties from req.body

	// Call the stored procedure to insert doctor details
	const query = 'CALL InsertDoctor(?, ?, ?, ?)';
	connection.query(
		query,
		[doctorName, specialization, qualification, contact],
		(err, result) => {
			if (err) {
				console.error('Error adding doctor:', err);
				res.status(500).send('Error adding doctor');
				return;
			}
			console.log('Doctor added successfully');
			res.status(200).send('Doctor added successfully');
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
app.get('/api/patient_id/:patientId', (req, res) => {
	const patientId = req.params.patientId;
	console.log(patientId);

	connection.query('CALL GetPatient(?)', [patientId], (err, results) => {
		try {
			if (err) {
				console.error('Error fetching patient details:', err);
				throw err;
			}
			console.log('Fetched data:', results[0]);
			//console.log(results);
			//console.log('%d',results.length)
			//console.log('%d',results[0].length)

			if (results[0].length === 0) {
				console.log('Patient not found!');
				return res
					.status(404)
					.json({ error: `Patient with ID ${patientId} not found` });
			}
			res.json(results[0]);
		} catch (error) {
			console.error('Error in patient data retrieval:', error);
			res.status(500).json({ error: 'Internal server error' });
		}
	});
});

/**
 * @swagger
 * /api/patients_view:
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

// Fetch all patients
app.get('/api/patients_view', (req, res) => {
	connection.query('CALL GetAllPatients()', (err, results) => {
		try {
			if (err) {
				console.error('Error fetching patient details:', err);
				throw err; // Re-throw the error for handling by error-handling middleware
			}

			const rowDataPacket = results[0][0].patients;
			//console.log('patient_details: ', rowDataPacket);
			const patients_data = JSON.parse(rowDataPacket);
			console.log('Fetched data: ', patients_data);
			//console.log(results);
			//console.log('%d',results.length)
			//console.log('%d',results[0].length)

			if (patients_data.length === 0) {
				console.log('Patients not found!');
				return res.status(404).json({ error: `Patients not found` });
			}
			res.send(patients_data);
			console.log('done');
		} catch (error) {
			console.error('Error in patient data retrieval:', error);
			res.status(500).json({ error: 'Internal server error' });
		}
	});
});

/**
 * @swagger
 * /api/doctors_view:
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

// Fetch all doctors
app.get('/api/doctors_view', (req, res) => {
	connection.query('CALL GetAllDoctors()', (err, results) => {
		try {
			if (err) {
				console.error('Error fetching doctors details:', err);
				throw err; // Re-throw the error for handling by error-handling middleware
			}

			const rowDataPacket = results[0][0].doctors;
			//console.log('patient_details: ', rowDataPacket);
			const doctors_data = JSON.parse(rowDataPacket);
			console.log('Fetched data: ', doctors_data);
			//console.log(results);
			//console.log('%d',results.length)
			//console.log('%d',results[0].length)

			if (doctors_data.length === 0) {
				console.log('Doctors not found!');
				return res.status(404).json({ error: `Patients not found` });
			}
			res.send(doctors_data);
			console.log('done');
		} catch (error) {
			console.error('Error in Doctor data retrieval:', error);
			res.status(500).json({ error: 'Internal server error' });
		}
	});
});

app.get('/api/department_doc_view/:department', (req, res) => {
	//console.log(req);
	const dept_name = req.params.department;
	console.log(dept_name);
	console.log(typeof dept_name);
	connection.query('CALL Get_dept_Doctors(?)', [dept_name], (err, results) => {
		if (err) {
			console.error('Error fetching doctors details:', err);
			throw err; // Re-throw the error for handling by error-handling middleware
		}

		const rowDataPacket = results[0][0].doctors_spec;
		const doctors_data = JSON.parse(rowDataPacket);
		console.log('Fetched data: ', doctors_data);
		//console.log(results);
		//console.log('%d',results.length)
		//console.log('%d',results[0].length)

		if (doctors_data.length === 0) {
			console.log('Doctors not found!');
			return res.status(404).json({ error: `Doctors not found` });
		}
		res.send(doctors_data);
		console.log('done');
	});
});

/**
 * @swagger
 * /api/modifyPatient:
 *   post:
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
app.post('/api/modifyPatient', (req, res) => {
	const { patientId, detailColumn, newValue } = req.body;

	connection.query(
		'CALL ModifyPatient(?, ?, ?)',
		[patientId, detailColumn, newValue],
		(err, result) => {
			if (err) {
				console.error('Error modifying patient:', err);
				res.status(500).send('Error modifying patient');
				return;
			}
			console.log('Patient modified successfully');
			res.status(200).send('Patient modified successfully');
		}
	);
});

/**
 * @swagger
 * /api/modifyDoctor:
 *   post:
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
app.post('/api/modifyDoctor', (req, res) => {
	const { doctorId, detailColumn, newValue } = req.body;

	connection.query(
		'CALL ModifyDoctor(?, ?, ?)',
		[doctorId, detailColumn, newValue],
		(err, result) => {
			if (err) {
				console.error('Error modifying doctor:', err);
				res.status(500).send('Error modifying doctor');
				return;
			}
			console.log('Doctor modified successfully');
			res.status(200).send('Doctor modified successfully');
		}
	);
});

/**
 * @swagger
 * /api/bookAppointment:
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
app.post('/api/bookAppointment', (req, res) => {
	const {
		patientId,
		doctorId,
		appointmentDate,
		appointmentTime,
		appointmentType,
		appointmentReason,
	} = req.body;

	// Here you can perform any necessary validations on the input data

	// Assuming you have a database connection named 'connection'
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
				res.status(500).json({ error: 'Internal server error' });
				return;
			}
			console.log('Appointment booked successfully:', results);
			res.status(201).json({ message: 'Appointment booked successfully' });
		}
	);
});

app.get('/api/doctorid/:doctorId', (req, res) => {
	//console.log(req);
	const doct_id = req.params.doctorId;
	console.log(doct_id);
	console.log(typeof doct_id);
	connection.query('CALL Getdoctorsid(?)', [doct_id], (err, results) => {
		try {
			if (err) {
				console.error('Error fetching doctors details:', err);
				throw err; // Re-throw the error for handling by error-handling middleware
			}

			const rowDataPacket = results[0][0].doctor_details;
			const doctors_data = JSON.parse(rowDataPacket);
			console.log('Fetched data: ', doctors_data);
			//console.log(results);
			//console.log('%d',results.length)
			//console.log('%d',results[0].length)

			if (doctors_data.length === 0) {
				console.log('Doctors not found!');
				return res.status(404).json({ error: `Doctors not found` });
			}
			res.send(doctors_data);
			console.log('done');
		} catch (error) {
			console.error('Error in Doctor data retrieval');
			res.status(500).json({ error: 'Internal server error' });
		}
	});
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
	const doctorId = req.params.doctorId;
	const appointmentDate = req.params.appointmentDate;

	connection.query(
		'CALL Get_AppointmentDetails_docId(?, ?)',
		[doctorId, appointmentDate],
		(err, results) => {
			try {
				if (err) {
					console.error('Error fetching appointment details:', err);
					throw err; // Re-throw the error for handling by error-handling middleware
				}

				const rowDataPacket = results[0][0].appointment_details;
				const appointments = JSON.parse(rowDataPacket);
				console.log('Fetched data: ', appointments);

				if (appointments.length === 0) {
					console.log('Appointments not found!');
					return res.status(404).json({ error: `Appointments not found` });
				}

				res.send(appointments);
				console.log('done');
			} catch (error) {
				console.error('Error in appointment data retrieval');
				res.status(500).json({ error: 'Internal server error' });
			}
		}
	);
});

app.get('/api/patient_all_appointments/:patientId', (req, res) => {
	const patientId = req.params.patientId;

	connection.query(
		'CALL Get_patient_all_AppointmentDetails(?)',
		[patientId],
		(err, results) => {
			try {
				if (err) {
					console.error('Error fetching appointment details:', err);
					throw err; // Re-throw the error for handling by error-handling middleware
				}

				const rowDataPacket = results[0][0].appointment_details;
				const appointments = JSON.parse(rowDataPacket);
				console.log('Fetched data: ', appointments);

				if (appointments.length === 0) {
					console.log('Appointments not found!');
					return res.status(404).json({ error: `Appointments not found` });
				}

				res.send(appointments);
				console.log('done');
			} catch (error) {
				console.error('Error in appointment data retrieval');
				res.status(500).json({ error: 'Internal server error' });
			}
		}
	);
});

/**
 * @swagger
 * /api/removeDoctor:
 *   post:
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
app.post('/api/removeDoctor', (req, res) => {
	const { doctorId, reason } = req.body;

	connection.query(
		'CALL RemoveDoctor (?, ?)',
		[doctorId, reason],
		(err, result) => {
			if (err) {
				console.error('Error Removing doctor:', err);
				res.status(500).send('Error Removing doctor');
				return;
			}
			console.log('Doctor Removed successfully');
			res.status(200).send('Doctor Removed successfully');
		}
	);
});

app.get('/api/Viewappointments/:appointmentDate', (req, res) => {
	const appointmentDate = req.params.appointmentDate;

	connection.query(
		'CALL GetAll_Appointments_date(?)',
		[appointmentDate],
		(err, results) => {
			try {
				if (err) {
					console.error('Error fetching appointment details:', err);
					throw err; // Re-throw the error for handling by error-handling middleware
				}

				const rowDataPacket = results[0][0].appointment_details;
				const appointments = JSON.parse(rowDataPacket);
				console.log('Fetched data: ', appointments);

				if (appointments.length === 0) {
					console.log('Appointments not found!');
					return res.status(404).json({ error: `Appointments not found` });
				}
				res.send(appointments);
				console.log('done');
			} catch (error) {
				console.error('Error in appointment data retrieval');
				res.status(500).json({ error: 'Internal server error' });
			}
		}
	);
});

app.listen(port, () => {
	console.log(`Server is running on ${port}`);
});
