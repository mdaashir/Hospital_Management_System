import React, { useState } from 'react';
import axios from 'axios';

const PROD_BACKEND_URL = import.meta.env.VITE_PROD_BACKEND_URL

const ViewAllAppointments = () => {
  const [appointment_date, setAppointmentDate] = useState('');
  const [errormsg, setError] = useState('');
  const [appointments, setAppointments] = useState([]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.get(
        process.env.NODE_ENV === "production"
          ? `${PROD_BACKEND_URL}/api/Viewappointments/${appointment_date}`
          : `http://localhost:9021/api/Viewappointments/${appointment_date}`
      );
      setAppointments(response.data);
      console.log(appointments);
      setError('');
    } catch (error) {
      if (error.response && error.response.status === 404) {
        setError('Appointments not found!');
        console.log('Appointments not found!');
      } else {
        setError(error.message);
        console.log(error.message);
      }
      setAppointments([]);
    }
  };


  return (
    <div>
      <div className="container mx-auto max-w-md py-8 mb-10">
        <h2 className="text-2xl font-bold mb-4 text-gray-700 text-center">To View all apointments</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="appointmentDate" className="block text-gray-700 font-bold mb-2">Appointment Date (YYYY-MM-DD):</label>
            <input
              type="date"
              id="appointmentDate"
              value={appointment_date}
              onChange={(e) => setAppointmentDate(e.target.value)}
              className="form-input mt-1 block w-full rounded-md border-gray-400 border-2"
              required
            />
          </div>
          <div className="text-center">
            <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
              View
            </button>
          </div>
        </form>
      </div>

      <div className="container mx-auto">
        <h2 className="text-xl font-bold mb-4 text-gray-600 text-center">Appointments List</h2>
        {Array.isArray(appointments) && appointments.length > 0 ? (
          <table style={{ borderCollapse: 'collapse', width: '100%' }}>
            <thead>
              <tr>
                <th style={{ width: '15%', border: '1px solid #CCCCCC', fontSize: '0.95em', textAlign: 'center', padding: '8px' }}>Doctor Name</th>
                <th style={{ width: '15%', border: '1px solid #CCCCCC', fontSize: '0.95em', textAlign: 'center', padding: '8px' }}>Patient Name</th>
                <th style={{ width: '18%', border: '1px solid #CCCCCC', fontSize: '0.95em', textAlign: 'center', padding: '8px' }}>Appointment Time</th>
                <th style={{ width: '17%', border: '1px solid #CCCCCC', fontSize: '0.95em', textAlign: 'center', padding: '8px' }}>Appointment Type</th>
                <th style={{ width: '35%', border: '1px solid #CCCCCC', fontSize: '0.95em', textAlign: 'center', padding: '8px' }}>Appointment Reason</th>
              </tr>
            </thead>
            <tbody>
              {appointments.map(appointment => (
                <tr key={appointment.appointment_id}>
                  <td style={{ border: '1px solid #CCCCCC', textAlign: 'center', padding: '8px' }}>{appointment.doctor_name}</td>
                  <td style={{ border: '1px solid #CCCCCC', textAlign: 'center', padding: '8px' }}>{appointment.patient_name}</td>
                  <td style={{ border: '1px solid #CCCCCC', textAlign: 'center', padding: '8px' }}>{appointment.appointment_time}</td>
                  <td style={{ border: '1px solid #CCCCCC', textAlign: 'center', padding: '8px' }}>{appointment.appointment_type}</td>
                  <td style={{ border: '1px solid #CCCCCC', textAlign: 'center', padding: '8px' }}>{appointment.appointment_reason}</td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p>{errormsg && <p className="mt-4 text-red-600 text-center">{errormsg}</p>}</p>
        )}
      </div>

    </div>
  );
};

export default ViewAllAppointments;
