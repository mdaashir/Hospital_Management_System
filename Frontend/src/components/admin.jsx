import React, { useState } from 'react';
import { FaUsers, FaUserMd, FaPlus, FaEdit, FaBrain, FaChild, FaFemale, FaHeartbeat, FaStethoscope,  FaTooth } from 'react-icons/fa';
import { FaPersonWalking } from "react-icons/fa6";
import { LiaBandAidSolid } from "react-icons/lia";
import { GiStomach } from "react-icons/gi";
import { SlCalender } from "react-icons/sl";
import { TiDelete } from "react-icons/ti";
import PatientRegistrationForm from './patient_register';
import DoctorRegistrationForm from './doctor_register';
import PatientView from './patient_view';
import DoctorView from './doctor_view';
import DepartmentDoctorsView from './department_view'; // Import the DepartmentDoctorsView component
import ModifyPatients from './Modifypatients';
import ModifyDoctors from './Modifydoctors';
import PatientAppointment from './Book_patient_Appointments.jsx';
import RemoveDoctor from './RemoveDoctors.jsx';
import ViewAllAppointments from './ViewAppointments'

const AdminDashboard = () => {
  const [selectedOption, setSelectedOption] = useState(null);

  const handleOptionClick = (option) => {
    setSelectedOption(option);
  };

  const departments = {
    neurology: { name: 'Neurology', icon: <FaBrain className="mr-2 text-blue-500" /> },
    pediatrician: { name: 'Pediatrician', icon: <FaChild className="mr-2 text-blue-500" /> },
    gynecology: { name: 'Gynecology', icon: <FaFemale className="mr-2 text-blue-500" /> },
    cardiology: { name: 'Cardiology', icon: <FaHeartbeat className="mr-2 text-blue-500" /> },
    physiotherapy: { name: 'Physiotherapy', icon: <FaPersonWalking className="mr-2 text-blue-500" /> },
    general_physician: { name: 'General Physician', icon: <FaStethoscope className="mr-2 text-blue-500" /> },
    dentist: { name: 'Dentist', icon: <FaTooth className="mr-2 text-blue-500" /> },
    dermatology: { name: 'Dermatology', icon: <LiaBandAidSolid className="mr-2 text-blue-500" /> },
    gastrology: { name: 'Gastrology', icon: <GiStomach className="mr-2 text-blue-500" /> },
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-blue-200 to-blue-400 flex flex-col lg:flex-row">
      <div className="bg-white p-8 w-full lg:w-1/5">
        <div className="mb-8 text-2xl font-bold text-center lg:text-left">Admin Dashboard</div>
        <div className="mb-6">
          <p className="text-lg font-semibold mb-2">Patients</p>
          <ul>
            <li className="cursor-pointer flex items-center mb-2" onClick={() => handleOptionClick('viewPatients')}>
              <FaUsers className="mr-2 text-blue-500" />
              View All Patients
            </li>
            <li className="cursor-pointer flex items-center mb-2" onClick={() => handleOptionClick('addPatient')}>
              <FaPlus className="mr-2 text-blue-500" />
              Add Patient
            </li>
            <li className="cursor-pointer flex items-center mb-2" onClick={() => handleOptionClick('modifyPatient')}>
              <FaEdit className="mr-2 text-blue-500" />
              Modify Patient
            </li>
            <li className="cursor-pointer flex items-center mb-2" onClick={() => handleOptionClick('bookAppointment')}>
              <SlCalender className="mr-2 text-blue-500" />
              Book Appointment
            </li>
          </ul>
        </div>
        <div className="mb-6">
          <p className="text-lg font-semibold mb-2">Doctors</p>
          <ul>
            <li className="cursor-pointer flex items-center mb-2" onClick={() => handleOptionClick('viewDoctors')}>
              <FaUserMd className="mr-2 text-blue-500" />
              View All Doctors
            </li>
            <li className="cursor-pointer flex items-center mb-2" onClick={() => handleOptionClick('addDoctor')}>
              <FaPlus className="mr-2 text-blue-500" />
              Add Doctor
            </li>
            <li className="cursor-pointer flex items-center mb-2" onClick={() => handleOptionClick('modifyDoctor')}>
              <FaEdit className="mr-2 text-blue-500" />
              Modify Doctor
            </li>
            <li className="cursor-pointer flex items-center mb-2" onClick={() => handleOptionClick('removeDoctor')}>
              <TiDelete className="mr-2 text-blue-500" />
              Remove Doctor
            </li>
            <li className="cursor-pointer flex items-center mb-2" onClick={() => handleOptionClick('ViewAppointments')}>
              <SlCalender className="mr-2 text-blue-500" />
              View Appointments
            </li>
          </ul>
        </div>
        <div>
          <hr className="my-6 border-gray-300" />
          <p className="text-lg font-semibold mb-2">Departments</p>
          <ul>
            {Object.keys(departments).map((departmentKey) => (
              <li
                key={departmentKey}
                className="cursor-pointer flex items-center mb-2"
                onClick={() => handleOptionClick(departmentKey)}
              >
                {/* Use the department name from the 'departments' object */}
                {departments[departmentKey].icon}
                {departments[departmentKey].name}
              </li>
            ))}
          </ul>
        </div>
      </div>
      <div className="w-full lg:w-4/5 p-8">
        <div className="mb-8 text-4xl font-bold text-center text-white">
          <span style={{ textShadow: '2px 2px 4px rgba(0, 0, 0, 0.2)' }}>Welcome to SignifyHealth</span>
        </div>
        {selectedOption && (
          <div className="bg-white p-8 rounded-lg shadow-md">
            {selectedOption === 'viewPatients' && <PatientView />}
            {selectedOption === 'addPatient' && <PatientRegistrationForm />}
            {selectedOption === 'modifyPatient' && <ModifyPatients/>}
            {selectedOption === 'bookAppointment' && <PatientAppointment/>}
            {selectedOption === 'viewDoctors' && <DoctorView />}
            {selectedOption === 'addDoctor' && <DoctorRegistrationForm />}
            {selectedOption === 'modifyDoctor' && <ModifyDoctors/>}
            {selectedOption === 'removeDoctor' && <RemoveDoctor/>}
            {selectedOption === 'ViewAppointments' && <ViewAllAppointments/>}
            {/* Pass the department name to DepartmentDoctorsView */}
            {departments[selectedOption] && <DepartmentDoctorsView department={departments[selectedOption].name}/>}
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminDashboard;
