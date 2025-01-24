import React, { useState } from 'react';
import axios from 'axios';
const PROD_BACKEND_URL = import.meta.env.VITE_PROD_BACKEND_URL

const DoctorRegistrationForm = () => {
  const [doctorName, setDoctorName] = useState('');
  const [specialization, setSpecialization] = useState('');
  const [qualification, setQualification] = useState('');
  const [contact, setContact] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post(`${process.env.NODE_ENV == "production" ? PROD_BACKEND_URL+"/api/addDoctor":"http://localhost:9021/api/addDoctor"}`, {
        doctorName: doctorName,
        specialization: specialization,
        qualification: qualification,
        contact: contact
      });
      setDoctorName('');
      setSpecialization('');
      setQualification('');
      setContact('');
      alert('Doctor added successfully');
    } catch (error) {
      console.error('Error adding doctor:', error);
      alert('Error adding doctor. Please try again.');
    }
  };
  

  return (
    <div>
      <div>
        <div className="mb-6 text-2xl font-bold text-center" style={{ color: 'blue', fontFamily: 'Cambria, sans-serif' }}>
          <h2>Register Doctor</h2>
        </div>
        <form onSubmit={handleSubmit}>
          <div className="mb-3 font flex items-center">
            <label htmlFor="doctorName" className="block text-gray-700 font-bold mr-4 w-1/3">Doctor Name:</label>
            <input 
              type="text" 
              id="doctorName" 
              value={doctorName} 
              onChange={(e) => setDoctorName(e.target.value)} 
              required 
              className="appearance-none border rounded w-2/3 py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
          </div>

          <div className="mb-3 font flex items-center">
            <label htmlFor="specialization" className="block text-gray-700 font-bold mr-4 w-1/3">Specialization:</label>
            <input 
              type="text" 
              id="specialization" 
              value={specialization} 
              onChange={(e) => setSpecialization(e.target.value)} 
              required 
              className="appearance-none border rounded w-2/3 py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
          </div>

          <div className="mb-3 font flex items-center">
            <label htmlFor="qualification" className="block text-gray-700 font-bold mr-4 w-1/3">Qualification:</label>
            <input 
              type="text" 
              id="qualification" 
              value={qualification} 
              onChange={(e) => setQualification(e.target.value)} 
              required 
              className="appearance-none border rounded w-2/3 py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
          </div>

          <div className="mb-3 font flex items-center">
            <label htmlFor="contact" className="block text-gray-700 font-bold mr-4 w-1/3">Contact:</label>
            <input 
              type="text" 
              id="contact" 
              value={contact} 
              onChange={(e) => setContact(e.target.value)} 
              required 
              className="appearance-none border rounded w-2/3 py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
          </div>

          <div className="mb-6">
            <button
              type="submit"
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            >
              Register
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default DoctorRegistrationForm;