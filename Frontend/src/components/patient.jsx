import React, { useState } from 'react';
import { FaUserAlt, FaCalendarAlt } from 'react-icons/fa';
import PatientId from './patient_id';
import PatientAppointments from './patient_appointment';

const PatientPage = () => {
  const [selectedOption, setSelectedOption] = useState(null);
  const [patientId, setPatientId] = useState('');
  const [dataSent, setDataSent] = useState(false);

  const handleOptionClick = (option) => {
    setSelectedOption(option);
  };

  const handleSendData = () => {
    setDataSent(true);
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-blue-200 to-blue-400 flex flex-col lg:flex-row">
      <div className="bg-white p-8 w-full lg:w-1/5">
        <div className="mb-8 text-2xl font-bold text-center lg:text-left">Patient Page</div>
        <div className="mb-6">
          <p className="text-lg font-semibold mb-2">Options</p>
          <ul>
            <li className="cursor-pointer flex items-center mb-4 px-2 py-2 rounded-md transition duration-300 ease-in-out transform hover:bg-gray-100" onClick={() => handleOptionClick('viewDetails')}>
              <FaUserAlt className="mr-2 text-blue-500" />
              <span className="text-blue-500">View My Details</span>
            </li>
            <li className="cursor-pointer flex items-center mb-4 px-2 py-2 rounded-md transition duration-300 ease-in-out transform hover:bg-gray-100" onClick={() => handleOptionClick('viewAppointments')}>
              <FaCalendarAlt className="mr-2 text-blue-500" />
              <span className="text-blue-500">View My Appointments History</span>
            </li>
          </ul>
        </div>
      </div>
      <div className="w-full lg:w-4/5 p-8">
        <div className="mb-8 text-4xl font-bold text-center text-white">
          <span style={{ textShadow: '2px 2px 4px rgba(0, 0, 0, 0.2)' }}>Welcome to SignifyHealth</span>
        </div>
        {selectedOption && (
          <div className="bg-white p-8 rounded-lg shadow-md">
            {selectedOption === 'viewDetails' && (
              <div>
                <PatientId />
              </div>
            )}
            {selectedOption === 'viewAppointments' && (
              <div>
                <h2 className="text-xl font-bold mb-4">View Appointments History</h2>
                <div className="mb-4">
                  <label htmlFor="patientId" className="block text-gray-700 font-bold mb-2">Enter patient ID:</label>
                  <input
                    type="text"
                    id="patientId"
                    value={patientId}
                    onChange={(e) => setPatientId(e.target.value)}
                    className="appearance-none border py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    required
                  />
                </div>

                {/*<div className="mb-4">
                  <label htmlFor="appointmentDate" className="block text-gray-700 font-bold mb-2">Appointment Date (YYYY-MM-DD):</label>
                  <input
                    type="text"
                    id="appointmentDate"
                    value={patient_appointments}
                    onChange={(e) => setAppointmentDate(e.target.value)}
                    className="form-input mt-1 block w-full rounded-md border-gray-300"
                    required
                  />
                </div> */}
                <button onClick={handleSendData} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded transition duration-300 ease-in-out transform hover:scale-105">
                  submit
                </button>
                {dataSent && <PatientAppointments patientId={patientId}/>}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default PatientPage;




