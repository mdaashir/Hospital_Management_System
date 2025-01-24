import React, { useState } from 'react';
import axios from 'axios';
const PROD_BACKEND_URL = import.meta.env.VITE_PROD_BACKEND_URL

const BookAppointment = () => {
  const [patientId, setPatientId] = useState('');
  const [doctorId, setDoctorId] = useState('');
  const [appointmentDate, setAppointmentDate] = useState('');
  const [appointmentTime, setAppointmentTime] = useState('');
  const [appointmentType, setAppointmentType] = useState('');
  const [appointmentReason, setAppointmentReason] = useState('');
  const [message, setMessage] = useState('');
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Send appointment details to the server
      await axios.post(`${process.env.NODE_ENV == "production" ? PROD_BACKEND_URL + "/api/bookAppointment" : "http://localhost:9021/api/bookAppointment"}`, {
        patientId,
        doctorId,
        appointmentDate,
        appointmentTime,
        appointmentType,
        appointmentReason
      });
      // Reset form fields
      setPatientId('');
      setDoctorId('');
      setAppointmentDate('');
      setAppointmentTime('');
      setAppointmentType('');
      setAppointmentReason('');
      setMessage('Appointment booked successfully');
    } catch (error) {
      console.error('Error booking appointment:', error);
      setMessage('Error! Doctor is already booked at the specified date and time!');
    }
  };

  return (
    <div className="container mx-auto max-w-md py-8">
      <h2 className="text-2xl font-bold mb-4">Book Appointment</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-6">
          <label htmlFor="patientId" className="block text-gray-700 font-bold mb-2">Patient ID:</label>
          <input
            type="text"
            id="patientId"
            value={patientId}
            onChange={(e) => setPatientId(e.target.value)}
            className="appearance-none border mt-1 block w-full rounded-md text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            required
          />
        </div>
        <div className="mb-6">
          <label htmlFor="doctorId" className="block text-gray-700 font-bold mb-2">Doctor ID:</label>
          <input
            type="text"
            id="doctorId"
            value={doctorId}
            onChange={(e) => setDoctorId(e.target.value)}
            className="appearance-none border mt-1 block w-full rounded-md text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            required
          />
        </div>
        <div className="mb-6">
          <label htmlFor="appointmentDate" className="block text-gray-700 font-bold mb-2">Appointment Date:</label>
          <input
            type="date"
            id="appointmentDate"
            value={appointmentDate}
            onChange={(e) => setAppointmentDate(e.target.value)}
            className="appearance-none border mt-1 block w-full rounded-md text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            required
          />
        </div>
        <div className="mb-6">
          <label htmlFor="appointmentTime" className="block text-gray-700 font-bold mb-2">Appointment Time:</label>
          <input
            type="time"
            id="appointmentTime"
            value={appointmentTime}
            onChange={(e) => setAppointmentTime(e.target.value)}
            className="appearance-none border mt-1 block w-full rounded-md text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            required
          />
        </div>
        <div className="mb-6">
          <label htmlFor="appointmentType" className="block text-gray-700 font-bold mb-2">Appointment Type:</label>
          <select
            id="appointmentType"
            value={appointmentType}
            onChange={(e) => setAppointmentType(e.target.value)}
            className="appearance-none border mt-1 block w-full rounded-md text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            required
          >
            <option value="">Select</option>
            <option value="Checkup">Checkup</option>
            <option value="Follow-up">Follow-up</option>
            <option value="Treatment">Treatment</option>
            <option value="Consultation">Consultation</option>
            <option value="Surgery">Surgery</option>
          </select>
        </div>
        <div className="mb-6">
          <label htmlFor="appointmentReason" className="block text-gray-700 font-bold mb-2">Appointment Reason:</label>
          <textarea
            id="appointmentReason"
            value={appointmentReason}
            onChange={(e) => setAppointmentReason(e.target.value)}
            className="appearance-none border mt-1 block w-full rounded-md text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            required
          ></textarea>
        </div>
        <div className="mb-6">
          <button
            type="submit"
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          >
            Book Appointment
          </button>
        </div>
      </form>
      {message && <p className="mt-4 text-green-600">{message}</p>}
    </div>
  );
};

export default BookAppointment;