const connection = require('../db');
const router = require('express').Router();

// Endpoint to add a new patient
router.post('/', (req, res) => {
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

// Fetch patient details by ID
router.get('/:patientId', (req, res) => {
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

// Fetch all patients
router.get('/', (_, res) => {
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

// Modify patient details
router.put('/', (req, res) => {
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
