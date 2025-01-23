/*
const express = require('express');
const cors = require('cors');
const mysql = require('mysql');

const app = express();
app.use(cors());

const port = 8000;

// MySQL connection configuration
const connection = mysql.createConnection({
  host: 'localhost',
  port: 3306, // Change this port number if your MySQL server is running on a different port
  user: 'root',
  password: '',  //db password
  database: 'hospital'
});

// Connect to MySQL
connection.connect((err) => {
  if (err) {
    console.error('Error connecting to MySQL:', err);
    return;
  }
  console.log('Connected to MySQL database');
});


app.get('/', (req, res) => {
  res.send('Welcome to the SIGNIFYHEALTH backend!');
});

/*
// Endpoint to fetch patient details by ID
//console.log('going to start');
app.get('/api/patients/:id', (req, res) => {
  const patientId = req.params.id;
  //const query = `SELECT * FROM patients WHERE id = ${patientId}`;
  console.log('started to go..');
  connection.query('CALL GetPatient(?)', [patientId], (err, results) => {
    if (err) {
      console.error('Error fetching patient details:', err);
      return res.status(500).json({ error: 'Internal server error' });
    }
    if (results.length === 0) {
      console.log('Patient not found!');
      return res.status(404).json({ error: 'Patient not found' });
    }
    console.log('got it');
    console.log('Fetched data:', results[0]);
    res.json(results[0]);
  });
});
*/
/*
app.get('/api/patients/:id', (req, res) => {
  const patientId = req.params.id;

  connection.query('CALL GetPatient(?)', [patientId], (err, results) => {
    try {
      if (err) {
        console.error('Error fetching patient details:', err);
        throw err; // Re-throw the error for handling by error-handling middleware
      }

      console.log('Fetched data:', results[0]);
      //console.log(results);
      //console.log('%d',results.length)
      //console.log('%d',results[0].length)

      if (results[0].length === 0) {
        console.log('Patient not found!');
        return res.status(404).json({ error: `Patient with ID ${patientId} not found` });
      }

      //console.log('Fetched data:', results[0]);
      res.json(results[0]);

    } catch (error) {
      // Handle any errors that occur within the callback
      console.error('Error in patient data retrieval:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  });
});  

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
*/


const express = require('express');
const cors = require('cors');
const mysql = require('mysql');

const app = express();
app.use(cors());
app.use(express.json()); 
const port = 9021;

// MySQL connection configuration
const connection = mysql.createConnection({
  host: 'localhost',
  port: 3306, // Change this port number if your MySQL server is running on a different port
  user: 'root',
  password: '',  //your DB password
  database: 'hospital'
});

// Connect to MySQL
connection.connect((err) => {
  if (err) {
    console.error('Error connecting to MySQL:', err);
    return;
  }
  console.log('Connected to MySQL database');
});



// app.get('/', (req, res) => {
//   res.send('Welcome to the SIGNIFYHEALTH backend!');
// });

app.post('/api/addPatient', (req, res) => {
  const { p_name, p_age, p_dob, p_gender, p_address, p_mobileNumber, p_BloodGroup, p_height, p_weight,p_maritalStatus, p_medications } = req.body;

  connection.query('CALL InsertPatient(?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)', 
  [p_name, p_age, p_dob, p_gender, p_address, p_mobileNumber, p_BloodGroup,p_height, p_weight,p_maritalStatus, p_medications], 
  (err, results) => {
    if (err) {
      console.error('Error inserting patient details:', err);
      res.status(500).json({ error: 'Internal server error' });
      return;
    }
    console.log('Inserted new patient:', results);
    res.status(201).json({ message: 'Patient inserted successfully' });
  });
});


app.post('/api/addDoctor', (req, res) => {
  const { doctorName, specialization, qualification, contact } = req.body; // Destructure properties from req.body
  
  // Call the stored procedure to insert doctor details
  const query = 'CALL InsertDoctor(?, ?, ?, ?)';
  connection.query(query, [doctorName, specialization, qualification, contact], (err, result) => {
    if (err) {
      console.error('Error adding doctor:', err);
      res.status(500).send('Error adding doctor');
      return;
    }
    console.log('Doctor added successfully');
    res.status(200).send('Doctor added successfully');
  });
});


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
        return res.status(404).json({ error: `Patient with ID ${patientId} not found` });
      }
      res.json(results[0]);
    } 
    catch (error) {
      console.error('Error in patient data retrieval:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  });
});  



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
      console.log('Fetched data: ',patients_data);
      //console.log(results);
      //console.log('%d',results.length)
      //console.log('%d',results[0].length)

      if (patients_data.length === 0) {
        console.log('Patients not found!');
        return res.status(404).json({ error: `Patients not found` });
      }
      res.send(patients_data);
      console.log('done');
    } 
    catch (error) {
      console.error('Error in patient data retrieval:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  });
});  



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
      console.log('Fetched data: ',doctors_data);
      //console.log(results);
      //console.log('%d',results.length)
      //console.log('%d',results[0].length)

      if (doctors_data.length === 0) {
        console.log('Doctors not found!');
        return res.status(404).json({ error: `Patients not found` });
      }
      res.send(doctors_data);
      console.log('done');
    } 
    catch (error) {
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
  connection.query('CALL Get_dept_Doctors(?)',  [dept_name], (err, results) => {
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



app.post('/api/modifyPatient', (req, res) => {
  const { patientId, detailColumn, newValue } = req.body;

  connection.query('CALL ModifyPatient(?, ?, ?)', [patientId, detailColumn, newValue], (err, result) => {
    if (err) {
      console.error('Error modifying patient:', err);
      res.status(500).send('Error modifying patient');
      return;
    }
    console.log('Patient modified successfully');
    res.status(200).send('Patient modified successfully');
  });
});


app.post('/api/modifyDoctor', (req, res) => {
  const { doctorId, detailColumn, newValue } = req.body;

  connection.query('CALL ModifyDoctor(?, ?, ?)', [doctorId, detailColumn, newValue], (err, result) => {
    if (err) {
      console.error('Error modifying doctor:', err);
      res.status(500).send('Error modifying doctor');
      return;
    }
    console.log('Doctor modified successfully');
    res.status(200).send('Doctor modified successfully');
  });
});


app.post('/api/bookAppointment', (req, res) => {
  const { patientId, doctorId, appointmentDate, appointmentTime, appointmentType, appointmentReason } = req.body;

  // Here you can perform any necessary validations on the input data

  // Assuming you have a database connection named 'connection'
  connection.query('CALL InsertAppointment(?, ?, ?, ?, ?, ?)', 
  [patientId, doctorId, appointmentDate, appointmentTime, appointmentType, appointmentReason], 
  (err, results) => {
    if (err) {
      console.error('Error booking appointment:', err);
      res.status(500).json({ error: 'Internal server error' });
      return;
    }
    console.log('Appointment booked successfully:', results);
    res.status(201).json({ message: 'Appointment booked successfully' });
  });
});



app.get('/api/doctorid/:doctorId', (req, res) => {
  //console.log(req);
  const doct_id = req.params.doctorId;
  console.log(doct_id);  
  console.log(typeof doct_id);
  connection.query('CALL Getdoctorsid(?)',  [doct_id], (err, results) => {
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
    } 
    catch (error) {
      console.error('Error in Doctor data retrieval');
      res.status(500).json({ error: 'Internal server error' });
    }
  });
});  



app.get('/api/appointments/:doctorId/:appointmentDate', (req, res) => {
  const doctorId = req.params.doctorId;
  const appointmentDate = req.params.appointmentDate;
  
  connection.query('CALL Get_AppointmentDetails_docId(?, ?)', [doctorId, appointmentDate], (err, results) => {
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
    } 
    catch (error) {
      console.error('Error in appointment data retrieval');
      res.status(500).json({ error: 'Internal server error' });
    }
  });
});



app.get('/api/patient_all_appointments/:patientId', (req, res) => {
  const patientId = req.params.patientId;
  
  connection.query('CALL Get_patient_all_AppointmentDetails(?)', [patientId], (err, results) => {
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
    } 
    catch (error) {
      console.error('Error in appointment data retrieval');
      res.status(500).json({ error: 'Internal server error' });
    }
  });
});


app.post('/api/removeDoctor', (req, res) => {
  const { doctorId, reason } = req.body;

  connection.query('CALL RemoveDoctor (?, ?)', [doctorId, reason], (err, result) => {
    if (err) {
      console.error('Error Removing doctor:', err);
      res.status(500).send('Error Removing doctor');
      return;
    }
    console.log('Doctor Removed successfully');
    res.status(200).send('Doctor Removed successfully');
  });
});




app.get('/api/Viewappointments/:appointmentDate', (req, res) => {
  const appointmentDate = req.params.appointmentDate;
  
  connection.query('CALL GetAll_Appointments_date(?)', [appointmentDate], (err, results) => {
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
    } 
    catch (error) {
      console.error('Error in appointment data retrieval');
      res.status(500).json({ error: 'Internal server error' });
    }
  });
});



app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
