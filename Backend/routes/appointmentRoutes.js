const connection = require('../db');
const router = require( "express" ).Router();

// Book an appointment
router.post('/', (req, res) => {
	const {
		patientId,
		doctorId,
		appointmentDate,
		appointmentTime,
		appointmentType,
		appointmentReason,
	} = req.body;

	// Here you can perform any necessary validations on the input data

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

// Fetch appointments by doctor and date
router.get('/:doctorId/:appointmentDate', (req, res) => {
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


router.get('/:patientId', (req, res) => {
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

router.get('/:appointmentDate', (req, res) => {
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
