import React, { useState } from 'react';
import axios from 'axios';
const PROD_BACKEND_URL = import.meta.env.VITE_PROD_BACKEND_URL

const PatientRegistrationForm = () => {
  const [p_name, setName] = useState('');
  const [p_age, setAge] = useState('');
  const [p_dob, setDob] = useState('');
  const [p_gender, setGender] = useState('');
  const [p_address, setAddress] = useState('');
  const [p_mobileNumber, setMobileNumber] = useState('');
  const [p_BloodGroup, setBloodGroup] = useState('');
  const [p_height, setHeight] = useState('');
  const [p_weight, setWeight] = useState('');
  const [p_maritalStatus, setMaritalStatus] = useState('');
  const [p_medications, setMedications] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post(
        process.env.NODE_ENV === "production"
          ? `${PROD_BACKEND_URL}/api/addPatient`
          : 'http://localhost:9021/api/addPatient',
        {
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
          p_medications
        }
      );

      // Reset form fields
      setName('');
      setAge('');
      setDob('');
      setGender('');
      setAddress('');
      setMobileNumber('');
      setBloodGroup('');
      setHeight('');
      setWeight('');
      setMaritalStatus('');
      setMedications('');
      alert('Patient added successfully');
    } catch (error) {
      console.error('Error adding patient:', error);
      alert('Error adding patient. Please try again.');
    }
  };

  return (
    <div>
      <div>
        <div className="mb-8 text-2xl font-bold text-center" style={{ color: 'blue', fontFamily: 'Cambria, sans-serif' }}>
          <h2>Register Patient</h2>
        </div>
        <form onSubmit={handleSubmit}>
          <div className="mb-3 font flex items-center">
            <label htmlFor="patientName" className="block text-gray-700 font-bold mr-4 w-1/3">Patient Name:</label>
            <input
              type="text"
              id="name"
              value={p_name}
              onChange={(e) => setName(e.target.value)}
              required
              className="appearance-none border rounded w-2/3 py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
          </div>

          <div className="mb-3 font flex items-center">
            <label htmlFor="age" className="block text-gray-700 font-bold mr-4 w-1/3">Age:</label>
            <input
              type="number"
              id="age"
              value={p_age}
              onChange={(e) => setAge(e.target.value)}
              className="appearance-none border rounded w-2/3 py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              required
            />
          </div>

          <div className="mb-3 font flex items-center">
            <label htmlFor="dob" className="block text-gray-700 font-bold mr-4 w-1/3"> Date of Birth:     </label>
            <input
              type="date"
              id="dob"
              value={p_dob}
              onChange={(e) => setDob(e.target.value)}
              className="appearance-none border rounded w-2/3 py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              required
            />
          </div>

          <div className="mb-3 font flex items-center">
            <label htmlFor="gender" className="block text-gray-700 font-bold mr-4 w-1/3"> Gender:     </label>
            <select id="gender" value={p_gender} onChange={(e) => setGender(e.target.value)} required className="px-3 py-2 border rounded-md">
              <option value="">select</option>
              <option value="male">Male</option>
              <option value="female">Female</option>
              <option value="other">Other</option>
            </select>
          </div>

          <div className="mb-3 font flex items-center">
            <label htmlFor="address" className="block text-gray-700 font-bold mr-4 w-1/3"> Address:  </label>
            <textarea
              id="address"
              value={p_address}
              onChange={(e) => setAddress(e.target.value)}
              className="appearance-none border rounded w-2/3 py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              required
            />
          </div>

          <div className="mb-3 font flex items-center">
            <label htmlFor="mobileNumber" className="block text-gray-700 font-bold mr-4 w-1/3">Mobile Number: </label>
            <input
              type="text"
              id="mobileNumber"
              value={p_mobileNumber}
              onChange={(e) => setMobileNumber(e.target.value)}
              pattern="[0-9]{10}"
              title="Please enter a 10-digit number"
              className="appearance-none border rounded w-2/3 py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              required
            />
          </div>

          <div className="mb-3 font-bold flex items-center">
            <label htmlFor="bloodGroup" className="block text-gray-700 font-bold mr-4 w-1/3"> Blood Group: </label>
            <select id="bloodGroup" value={p_BloodGroup} onChange={(e) => setBloodGroup(e.target.value)} required className="px-3 py-2 border rounded-md">
              <option value="">select</option>
              <option value="A+">A+</option>
              <option value="A-">A-</option>
              <option value="B+">B+</option>
              <option value="B-">B-</option>
              <option value="AB+">AB+</option>
              <option value="AB-">AB-</option>
              <option value="O+">O+</option>
              <option value="O-">O-</option>
            </select>
          </div>

          <div className="mb-3 font flex items-center">
            <label htmlFor="height" className="block text-gray-700 font-bold mr-4 w-1/3"> Height(in cm):   </label>
            <input
              type="number"
              id="height"
              value={p_height}
              onChange={(e) => setHeight(e.target.value)}
              className="appearance-none border rounded w-2/3 py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              required
            />
          </div>

          <div className="mb-3 font flex items-center">
            <label htmlFor="weight" className="block text-gray-700 font-bold mr-4 w-1/3"> Weight(in Kg):   </label>
            <input
              type="number"
              id="weight"
              value={p_weight}
              onChange={(e) => setWeight(e.target.value)}
              className="appearance-none border rounded w-2/3 py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              required
            />
          </div>

          <div className="mb-6 font flex items-center">
            <label htmlFor="maritalStatus" className="block text-gray-700 font-bold mr-4 w-1/3">Marital Status:</label>
            <select id="maritalStatus" value={p_maritalStatus} onChange={(e) => setMaritalStatus(e.target.value)} required className="px-3 py-2 border rounded-md" >
              <option value="">select</option>
              <option value="single">Single</option>
              <option value="married">Married</option>
              <option value="divorced">Divorced</option>
              <option value="widowed">Widowed</option>
            </select>
          </div>

          <div className="mb-3 font flex items-center">
            <label htmlFor="medications" className="block text-gray-700 font-bold mr-4 w-1/3">Are you taking any medications?</label>
            <select id="medications" value={p_medications} onChange={(e) => setMedications(e.target.value)} required className="px-3 py-2 border rounded-md">
              <option value="">Select</option>
              <option value="yes">Yes</option>
              <option value="no">No</option>
            </select>
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

export default PatientRegistrationForm;