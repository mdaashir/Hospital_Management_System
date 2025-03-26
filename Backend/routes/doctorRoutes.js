const connection = require('../db');
const router = require( 'express' ).Router();

// Endpoint to add a new doctor
router.post('/', (req, res) => {
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

// Fetch all doctors
router.get('/', (_, res) => {
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

// Modify doctor details
router.put('/', (req, res) => {
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

router.get('/:doctorId', (req, res) => {
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

router.get('/:department', (req, res) => {
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

// Remove a doctor
router.delete('/', (req, res) => {
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
