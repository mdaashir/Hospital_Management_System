const express = require('express');
const cors = require('cors');
const dotenv = require("dotenv");
const mysql = require('mysql');

dotenv.config();

const app = express();
app.use(cors({
  origin: '*',
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true
}));
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

// Endpoint to add a new patient
app.post('/api/addPatient', (req, res) => {
  const { p_name, p_age, p_dob, p_gender, p_address, p_mobileNumber, p_BloodGroup, p_height, p_weight, p_maritalStatus, p_medications } = req.body;

  connection.query('CALL InsertPatient(?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)',
    [p_name, p_age, p_dob, p_gender, p_address, p_mobileNumber, p_BloodGroup, p_height, p_weight, p_maritalStatus, p_medications],
    (err, results) => {
      if (err) {
        console.error('Error inserting patient details:', err);
        return res.status(500).json({ error: 'Internal server error' });
      }
      res.status(201).json({ message: 'Patient inserted successfully', data: results });
    });
});

// Endpoint to add a new doctor
app.post('/api/addDoctor', (req, res) => {
  const { doctorName, specialization, qualification, contact } = req.body;

  connection.query('CALL InsertDoctor(?, ?, ?, ?)', [doctorName, specialization, qualification, contact], (err, result) => {
    if (err) {
      console.error('Error adding doctor:', err);
      return res.status(500).json({ error: 'Internal server error' });
    }
    res.status(200).json({ message: 'Doctor added successfully', data: result });
  });
});

// Fetch patient details by ID
app.get('/api/patient/:patientId', (req, res) => {
  const patientId = req.params.patientId;

  connection.query('CALL GetPatient(?)', [patientId], (err, results) => {
    if (err) {
      console.error('Error fetching patient details:', err);
      return res.status(500).json({ error: 'Internal server error' });
    }
    if (results[0].length === 0) {
      return res.status(404).json({ error: "Patient with ID ${patientId} not found" });
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
      res.json(patientsData);  // Return as proper JSON
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
      res.json(doctorsData);  // Return as proper JSON
    } catch (parseError) {
        console.error('Error parsing JSON:', parseError);
        res.status(500).send('Error parsing JSON');
    }
  });
});




// Modify patient details
app.put('/api/patient', (req, res) => {
  const { patientId, detailColumn, newValue } = req.body;

  connection.query('CALL ModifyPatient(?, ?, ?)', [patientId, detailColumn, newValue], (err, result) => {
    if (err) {
      console.error('Error modifying patient:', err);
      return res.status(500).json({ error: 'Internal server error' });
    }
    res.status(200).json({ message: 'Patient modified successfully', data: result });
  });
});

// Modify doctor details
app.put('/api/doctor', (req, res) => {
  const { doctorId, detailColumn, newValue } = req.body;

  connection.query('CALL ModifyDoctor(?, ?, ?)', [doctorId, detailColumn, newValue], (err, result) => {
    if (err) {
      console.error('Error modifying doctor:', err);
      return res.status(500).json({ error: 'Internal server error' });
    }
    res.status(200).json({ message: 'Doctor modified successfully', data: result });
  });
});

// Book an appointment
app.post('/api/appointment', (req, res) => {
  const { patientId, doctorId, appointmentDate, appointmentTime, appointmentType, appointmentReason } = req.body;

  connection.query('CALL InsertAppointment(?, ?, ?, ?, ?, ?)',
    [patientId, doctorId, appointmentDate, appointmentTime, appointmentType, appointmentReason],
    (err, results) => {
      if (err) {
        console.error('Error booking appointment:', err);
        return res.status(500).json({ error: 'Internal server error' });
      }
      res.status(201).json({ message: 'Appointment booked successfully', data: results });
    });
});

// Fetch appointments by doctor and date
app.get('/api/appointments/:doctorId/:appointmentDate', (req, res) => {
  const { doctorId, appointmentDate } = req.params;

  connection.query('CALL Get_AppointmentDetails_docId(?, ?)', [doctorId, appointmentDate], (err, results) => {
    if (err) {
      console.error('Error fetching appointment details:', err);
      return res.status(500).json({ error: 'Internal server error' });
    }
    res.json(results[0]);
  });
});

// Remove a doctor
app.delete('/api/doctor', (req, res) => {
  const { doctorId, reason } = req.body;

  connection.query('CALL RemoveDoctor(?, ?)', [doctorId, reason], (err, result) => {
    if (err) {
      console.error('Error removing doctor:', err);
      return res.status(500).json({ error: 'Internal server error' });
    }
    res.status(200).json({ message: 'Doctor removed successfully', data: result });
  });
});

app.listen(port, () => {
  console.log(`Server is running on ${port}`);
});
