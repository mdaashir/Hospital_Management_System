import React, { useState } from 'react';
import { FaUserAlt, FaCalendarAlt } from 'react-icons/fa';
import DoctorId from './doctor_id';
import DoctorAppointments from './doctor_appointment';

const DoctorPage = () => {
  const [selectedOption, setSelectedOption] = useState(null);
  const [doctorId, setDoctorId] = useState('');
  const [appointmentDate, setAppointmentDate] = useState('');
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
        <div className="mb-8 text-2xl font-bold text-center lg:text-left">Doctor Page</div>
        <div className="mb-6">
          <p className="text-lg font-semibold mb-2">Options</p>
          <ul>
            <li className="cursor-pointer flex items-center mb-4 px-2 py-2 rounded-md transition duration-300 ease-in-out transform hover:bg-gray-100" onClick={() => handleOptionClick('viewDetails')}>
              <FaUserAlt className="mr-2 text-blue-500" />
              <span className="text-blue-500">View My Details</span>
            </li>
            <li className="cursor-pointer flex items-center mb-4 px-2 py-2 rounded-md transition duration-300 ease-in-out transform hover:bg-gray-100" onClick={() => handleOptionClick('viewAppointments')}>
              <FaCalendarAlt className="mr-2 text-blue-500" />
              <span className="text-blue-500">View Appointments</span>
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
                <DoctorId />
              </div>
            )}
            {selectedOption === 'viewAppointments' && (
              <div>
                <h2 className="text-xl font-bold mb-4">View Appointments</h2>
                <div className="mb-4">
                  <label htmlFor="doctorId" className="block text-gray-700 font-bold mb-2">Enter Doctor ID:</label>
                  <input
                    type="text"
                    id="doctorId"
                    value={doctorId}
                    onChange={(e) => setDoctorId(e.target.value)}
                    className="form-input mt-1 block w-1/3 rounded-md border-gray-200 border-2"
                    required
                  />
                </div>
                <div className="mb-4">
                  <label htmlFor="appointmentDate" className="block text-gray-700 font-bold mb-2">Appointment Date (YYYY-MM-DD):</label>
                  <input
                    type="date"
                    id="appointmentDate"
                    value={appointmentDate}
                    onChange={(e) => setAppointmentDate(e.target.value)}
                    className="form-input mt-1 block w-1/3 rounded-md border-gray-200 border-2"
                    required
                  />
                </div>
                <button onClick={handleSendData} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded transition duration-300 ease-in-out transform hover:scale-105">
                  View
                </button>
                {dataSent && <DoctorAppointments doctorId={doctorId} appointmentDate={appointmentDate} />}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default DoctorPage;