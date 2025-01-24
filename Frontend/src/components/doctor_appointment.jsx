import React, { useState, useEffect } from 'react';
import axios from 'axios';
const PROD_BACKEND_URL = import.meta.env.VITE_PROD_BACKEND_URL

const DoctorAppointments = ({ doctorId, appointmentDate }) => {
  const [appointments, setAppointments] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchAppointments = async () => {
      try {
        console.log("Doctor ID:", doctorId); // Log the doctorId prop
        console.log("Appointment Date:", appointmentDate); // Log the appointmentDate prop
        
        const response = await axios.get(`${process.env.NODE_ENV == "production" ? PROD_BACKEND_URL +`api/appointments/${doctorId}/${appointmentDate}`:`http://localhost:9021/api/appointments/${doctorId}/${appointmentDate}` }`);
        setAppointments(response.data);
      } catch (error) {
        setError(error.message);
      }
    };

    fetchAppointments();
  }, [doctorId, appointmentDate]);

  return (
    <div>
      <h2 className="text-xl font-bold mb-4 mt-10 text-center">Doctor Appointments</h2>
      {error && <p>{error}</p>}
      {Array.isArray(appointments) && appointments.length > 0 ? (
        <table style={{ borderCollapse: 'collapse', width: '100%' }}>
          <thead>
            <tr>
              <th style={{ width: '10%', border: '1px solid #CCCCCC', fontSize: '0.95em', textAlign: 'center', padding: '8px' }}>Patient ID</th>
              <th style={{ width: '20%', border: '1px solid #CCCCCC', fontSize: '0.95em', textAlign: 'center', padding: '8px' }}>Patient Name</th>
              <th style={{ width: '20%', border: '1px solid #CCCCCC', fontSize: '0.95em', textAlign: 'center', padding: '8px' }}>Appointment Time</th>
              <th style={{ width: '20%', border: '1px solid #CCCCCC', fontSize: '0.95em', textAlign: 'center', padding: '8px' }}>Appointment Type</th>
              <th style={{ width: '30%', border: '1px solid #CCCCCC', fontSize: '0.95em', textAlign: 'center', padding: '8px' }}>Appointment Reason</th>
            </tr>
          </thead>
          <tbody>
            {appointments.map(appointment => (
              <tr key={appointment.appointment_id}>
                <td style={{ border: '1px solid #CCCCCC', textAlign: 'center', padding: '8px' }}>{appointment.patient_id}</td>
                <td style={{ border: '1px solid #CCCCCC', textAlign: 'center', padding: '8px' }}>{appointment.patient_name}</td>
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

export default DoctorAppointments;
