import React, { useState, useEffect } from 'react';
import axios from 'axios';

const PatientAppointments = ({ patientId }) => {
  const [appointments, setAppointments] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchAppointments = async () => {
      try {
        console.log("patient ID:", patientId); // Log the doctorId prop
        
        const response = await axios.get(`http://localhost:9021/api/patient_all_appointments/${patientId}`);
        setAppointments(response.data);
      } catch (error) {
        setError(error.message);
      }
    };

    fetchAppointments();
  }, [patientId]);

  return (
    <div>
      <h2 className="text-xl font-bold mb-4">Patient Appointments</h2>
      {error && <p>{error}</p>}
      {Array.isArray(appointments) && appointments.length > 0 ? (
        <table style={{ borderCollapse: 'collapse', width: '100%' }}>
          <thead>
            <tr>
              <th style={{ width: '20%', border: '1px solid #CCCCCC', fontSize: '0.95em', textAlign: 'center', padding: '8px' }}>Doctor Name</th>
              <th style={{ width: '15%', border: '1px solid #CCCCCC', fontSize: '0.95em', textAlign: 'center', padding: '8px' }}>Appointment Date</th>
              <th style={{ width: '15%', border: '1px solid #CCCCCC', fontSize: '0.95em', textAlign: 'center', padding: '8px' }}>Appointment Time</th>
              <th style={{ width: '15%', border: '1px solid #CCCCCC', fontSize: '0.95em', textAlign: 'center', padding: '8px' }}>Appointment Type</th>
              <th style={{ width: '35%', border: '1px solid #CCCCCC', fontSize: '0.95em', textAlign: 'center', padding: '8px' }}>Appointment Reason</th>
            </tr>
          </thead>
          <tbody>
            {appointments.map(appointment => (
              <tr key={appointment.appointment_id}>
                <td style={{ border: '1px solid #CCCCCC', textAlign: 'center', padding: '8px' }}>{appointment.doctor_name}</td>
                <td style={{ border: '1px solid #CCCCCC', textAlign: 'center', padding: '8px' }}>{appointment.appointment_date}</td>
                <td style={{ border: '1px solid #CCCCCC', textAlign: 'center', padding: '8px' }}>{appointment.appointment_time}</td>
                <td style={{ border: '1px solid #CCCCCC', textAlign: 'center', padding: '8px' }}>{appointment.appointment_type}</td>
                <td style={{ border: '1px solid #CCCCCC', textAlign: 'center', padding: '8px' }}>{appointment.appointment_reason}</td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p>{error ? 'An error occurred while fetching appointments' : 'No appointments found for the specified doctor and date'}</p>
      )}
    </div>
  );
};

export default PatientAppointments;
