/*
import React, { useState } from 'react';
//import './pregister.css'; // Import CSS for additional styling
//import React from 'react';

import bgImg from 'C:/Users/Kaaviya/Desktop/React/Hospital/src/assets/bg_patient.jpeg'

const Patient = () => {
    
    // State variables to store form data
    const [name, setName] = useState('');
    const [age, setAge] = useState('');
    const [dob, setDob] = useState('');
    const [gender, setGender] = useState('');
    const [address, setAddress] = useState('');
    const [BloodGroup, setBloodGroup] = useState('');
    const [medications, setmedications] = useState('false');
    const [height, setHeight] = useState('');
    const [weight, setWeight] = useState('');
    const [maritalStatus, setMaritalStatus] = useState('');
    const [mobileNumber, setMobileNumber] = useState('');



    // Function to handle form submission
    const handleSubmit = (e) => {
        e.preventDefault();
        // Perform form submission logic here (e.g., send data to server)
        console.log("Form submitted:", { name, age, dob, gender, address, mobileNumber, BloodGroup, maritalStatus, height, weight });

    };

    return (
        <div className="min-h-screen flex flex-col items-center" 
        style={{backgroundImage: `url(${bgImg})`, backgroundSize: 'cover', backgroundPosition: 'center'}}>
        
        <div className="mb-10 text-4xl font-bold text-center" 
        style={{ color: 'blue', fontFamily: 'Cambria, sans-serif' , marginTop: '3rem' }}>Welcome to SIGNIFYHEALTH</div>

        <div>
            <div className="mb-8 text-4xl font-bold text-center" 
            style={{ color: 'red', fontFamily: 'Cambria, sans-serif'}}><h2>Patient Registration Form</h2>
            </div>
            <form onSubmit={handleSubmit}>
                <div className="mb-3 font flex items-center">
                    <label htmlFor="patientName" className="block text-gray-700 font-bold mr-4 w-1/3">Patient Name:</label>
                    <input 
                        type="text" 
                        id="name" 
                        value={name} 
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
                        value={age} 
                        onChange={(e) => setAge(e.target.value)} 
                        className="appearance-none border rounded w-2/3 py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        required
                    />
                </div>


                <div className="mb-3 font flex items-center">
                <label htmlFor="dob"  className="block text-gray-700 font-bold mr-4 w-1/3"> Date of Birth:     </label>
                <input 
                    type="date" 
                    id="dob" 
                    value={dob} 
                    onChange={(e) => setDob(e.target.value)} 
                    className="appearance-none border rounded w-2/3 py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    required />
                </div>

                <div className="mb-3 font flex items-center">
                <label htmlFor="gender"  className="block text-gray-700 font-bold mr-4 w-1/3"> Gender:     </label>
                <select id="gender" value={gender} onChange={(e) => setGender(e.target.value)} required className="px-3 py-2 border rounded-md">
                    <option value="">select</option>
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                    <option value="other">Other</option>
                </select>
                </div>

                <div className="mb-3 font flex items-center">
                <label htmlFor="address"  className="block text-gray-700 font-bold mr-4 w-1/3"> Address:   </label>
                <textarea 
                    id="address" 
                    value={address} 
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
                        value={mobileNumber} 
                        onChange={(e) => setMobileNumber(e.target.value)} 
                        pattern="[0-9]{10}"
                        title="Please enter a 10-digit number"
                        className="appearance-none border rounded w-2/3 py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        required />
                </div>

                <div className="mb-3 font-bold flex items-center">
                    <label htmlFor="bloodGroup" className="block text-gray-700 font-bold mr-4 w-1/3"> Blood Group: </label>
                    <select id="bloodGroup" value={BloodGroup} onChange={(e) => setBloodGroup(e.target.value)} required className="px-3 py-2 border rounded-md">
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
                <label htmlFor="height"  className="block text-gray-700 font-bold mr-4 w-1/3"> Height(in cm):   </label>
                <input 
                    type="number" 
                    id="height" 
                    value={height} 
                    onChange={(e) => setHeight(e.target.value)} 
                    className="appearance-none border rounded w-2/3 py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    required />
                </div>

                <div className="mb-3 font flex items-center">
                <label htmlFor="weight"  className="block text-gray-700 font-bold mr-4 w-1/3"> Weight(in Kg):   </label>
                <input 
                    type="number" 
                    id="weight" 
                    value={weight} 
                    onChange={(e) => setWeight(e.target.value)} 
                    className="appearance-none border rounded w-2/3 py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    required />
                </div>

                <div className="mb-6 font flex items-center">
                    <label htmlFor="maritalStatus" className="block text-gray-700 font-bold mr-4 w-1/3">Marital Status:</label>
                    <select id="maritalStatus" value={maritalStatus} onChange={(e) => setMaritalStatus(e.target.value)} required className="px-3 py-2 border rounded-md" >
                        <option value="">select</option>
                        <option value="single">Single</option>
                        <option value="married">Married</option>
                        <option value="divorced">Divorced</option>
                        <option value="widowed">Widowed</option>
                    </select>
                </div>

                <div className="mb-3 font flex items-center">
                    <label htmlFor="medications" className="block text-gray-700 font-bold mr-4 w-1/3">Are you taking any medications?</label>
                    <div>
                        <input type="radio" id="medications-yes" name="medications" value="yes" checked={medications === 'yes'} onChange={(e) => setmedications(e.target.value)} />
                        <label htmlFor="medications-yes" className="mr-5">Yes</label>
                    </div>
                    <div>
                        <input type="radio" id="medications-no" name="medications" value="no" checked={medications === 'no'} onChange={(e) => setmedications(e.target.value)} />
                        <label htmlFor="medications-no" className="mr-5">No</label>
                    </div>
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

export default Patient;


// PatientPage.jsx

import React, { useState, useEffect } from 'react';
import axios from 'axios';
//import './pregister.css'; // Import CSS for additional styling
//import React from 'react';

import bgImg from 'C:/Users/Kaaviya/Desktop/React/Hospital/Frontend/src/assets/bg_patient.jpeg'

const Patient = () => {
    
    // State variables to store form data
    const [showAlreadyRegisteredBox, setShowAlreadyRegisteredBox] = useState(false);
    const [patientId, setPatientId] = useState('');
    const [patientData, setPatientData] = useState(null);
    const [error, setError] = useState(null);

    useEffect(() => {
        // Handle error state updates (if applicable)
        if (error) {
          // Extract relevant information from error object (optional)
          // You can modify this based on your specific error object structure
          const errorMessage = error;
    
          // Display the error message
          console.log('Error:', errorMessage); // Optional: Log the error message
        }
    
        // Reset error state after a delay (optional)
        return () => {
          setTimeout(() => setError(null), 4000); // Cleanup function for delayed reset
        };
      }, [error]); // Re-run useEffect only when error changes
    

    const handleAlreadyRegisteredClick = () => {
      setShowAlreadyRegisteredBox(true);
    };
    
    const handleAlreadyRegisteredSubmit = async (e) => {
        e.preventDefault();
      
        console.log("Already Registered Patient ID submitted:", patientId);
        
        try {
          // Check if patientId is defined and not null
          if (typeof patientId !== 'undefined' && patientId !== null) {
            // Make the request to the server
            const response = await axios.get(`http://localhost:9021/api/patients/${patientId}`);
            // Set the fetched data to the state
            setPatientData(response.data);
            // Log the fetched data
            console.log(response.data);
          } else {
            // Handle the case where patientId is undefined or null
            console.error('patientId is undefined or null');
          }
        } catch (error) {
            if (error.response && error.response.status === 404) {
                setError('Patient data not found');
            } else {
                console.error('Error fetching patient data:', error);
                setError('Error fetching patient data');
            }
            setPatientData(null); // Clear patient data if there's an error
        }   

        setShowAlreadyRegisteredBox(false);
        setPatientId(''); // Clear the patient ID when closing the box
    };   

    const handleAlreadyRegisteredClose = () => {
    setShowAlreadyRegisteredBox(false);
    setPatientId(''); // Clear the patient ID when closing the box
    };



    return (
      <div className="min-h-screen flex flex-col items-center" style={{backgroundImage: `url(${bgImg})`, backgroundSize: 'cover', backgroundPosition: 'center'}}>
        
        <div className="mb-10 text-4xl font-bold text-center" 
            style={{ color: 'blue', fontFamily: 'Cambria, sans-serif', marginTop: '3rem' }}>Welcome to SIGNIFYHEALTH</div>

        <button
                onClick={handleAlreadyRegisteredClick}
                className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            >
                Already Registered ?
        </button>

        {/* Already Registered Box 
        {showAlreadyRegisteredBox && (
            <div className="fixed inset-0 bg-gray-500 bg-opacity-75 flex items-center justify-center">
                <div className="bg-white p-8 rounded-md">
                    <h2 className="text-2xl font-bold mb-4">Already Registered</h2>
                    <form onSubmit={handleAlreadyRegisteredSubmit}>
                        <div className="mb-4">
                            <label htmlFor="patientId" className="block text-gray-700 font-bold">Patient ID:</label>
                            <input 
                                type="text" 
                                id="patientId" 
                                value={patientId} 
                                onChange={(e) => setPatientId(e.target.value)} 
                                className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                required 
                            />
                        </div>
                            <div className="flex justify-between">
                                <button
                                    type="submit"
                                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                                >
                                Submit
                                </button>

                                <button
                                    type="button"
                                    onClick={handleAlreadyRegisteredClose}
                                    className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                                >
                                Close
                                </button>
                                </div>
                            </form>
                        </div>
                    </div>
                )}

                {/* Display patient data 
                {patientData && patientData.length > 0 && (
                    <div>
                        <h2>Patient Details</h2>
                        <p>Patient ID: {patientData[0].patient_id}</p>
                        <p>Name: {patientData[0].name}</p>
                        <p>Age: {patientData[0].age}</p>
                        {/*<p>DOB: {patientData[0].dob}</p>
                        <p>Gender: {patientData[0].gender}</p>
                        <p>Mobile number: {patientData[0].mobile_number}</p>
                        <p>Blood Group: {patientData[0].blood_group}</p>
                        {/* Add more fields as needed 
                    </div>
                )}
                {/* Display error message if any 
                {error && (
                <p>
                    Error: {error}
                </p>
                )}
        </div>
    )
};

export default PatientId;

*/




// PatientPage.jsx

import React, { useState, useEffect } from 'react';
import axios from 'axios';
//import './pregister.css'; // Import CSS for additional styling
//import React from 'react';
const PROD_BACKEND_URL = import.meta.env.VITE_PROD_BACKEND_URL


const PatientId = () => {
    // State variables to store form data

    const [patientId, setPatientId] = useState('');
    const [patientData, setPatientData] = useState(null);
    const [error, setError] = useState(null);
    const [submitted, setSubmitted] = useState(false); // Track if form is submitted

    useEffect(() => {
        if (submitted && patientId) {
            const fetchPatientDetails = async () => {
                try {
                    console.log(patientId);
                    const apiUrl = process.env.NODE_ENV === "production"
                        ? PROD_BACKEND_URL + `/api/patient_id/${patientId}`
                        : `http://localhost:9021/api/patient_id/${patientId}`;

                    const response = await axios.get(apiUrl);
                    setPatientData(response.data[0]); // Accessing the first object in the array
                } catch (error) {
                    setError(error);
                }
            };
            fetchPatientDetails();
        }
    }, [patientId, submitted]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setSubmitted(true); // Set submitted to true when form is submitted
        setError(null); // Reset error state
    };

    return (
        <div className="container mx-auto mt-10">
            <h2 className="text-3xl font-bold mb-8 text-center  text-gray-800">
                <span style={{ textShadow: '1px 1px 2px rgba(0, 0, 0, 0.1)' }}>Patient Details Lookup</span>
            </h2>
            <form onSubmit={handleSubmit} className="max-w-2xl mx-auto bg-gray-200 p-6 rounded-lg shadow-md">
                <div className="mb-6 flex items-center justify-center">
                    <label htmlFor="patientId" className="block text-gray-900 font-bold mb-2 mr-2 w-1/3 text-3l">Enter Patient ID:</label>
                    <input
                        type="text"
                        id="patientId"
                        value={patientId}
                        onChange={(e) => setPatientId(e.target.value)}
                        className="form-input mt-1 block w-1/3 rounded-md border-gray-300 shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                        required
                    />
                </div>
                <div className="flex justify-center">
                    <button
                        type="submit"
                        className="bg-indigo-500 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded-full focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 transition duration-300 ease-in-out transform hover:scale-105 w-2/3"
                    >
                        Submit
                    </button>
                </div>
            </form>

            {error && <p className="text-red-500 text-center mt-4">Error: {error.message}</p>}
            {submitted && patientData && (
                <div className="mt-8 max-w-2xl mx-auto bg-gray-200 p-6 rounded-lg shadow-md">
                    <h3 className="text-xl font-semibold mb-2">Patient Details</h3>
                    <p className="flex flex-wrap">
                        <span className="w-1/3 font-semibold">Patient ID:</span>
                        <span className="w-2/3">{patientData.patient_id}</span>
                    </p>

                    <p className="flex flex-wrap">
                        <span className="w-1/3 font-semibold">Name:</span>
                        <span className="w-2/3">{patientData.name}</span>
                    </p>

                    <p className="flex flex-wrap">
                        <span className="w-1/3 font-semibold">Age:</span>
                        <span className="w-2/3">{patientData.age}</span>
                    </p>

                    <p className="flex flex-wrap">
                        <span className="w-1/3 font-semibold">DOB:</span>
                        <span className="w-2/3">{patientData.dob}</span>
                    </p>

                    <p className="flex flex-wrap">
                        <span className="w-1/3 font-semibold">Gender: </span>
                        <span className="w-2/3">{patientData.gender}</span>
                    </p>

                    <p className="flex flex-wrap">
                        <span className="w-1/3 font-semibold">Blood Group: </span>
                        <span className="w-2/3">{patientData.blood_group}</span>
                    </p>

                    <p className="flex flex-wrap">
                        <span className="w-1/3 font-semibold">Height: </span>
                        <span className="w-2/3">{patientData.height}</span>
                    </p>

                    <p className="flex flex-wrap">
                        <span className="w-1/3 font-semibold">Weight: </span>
                        <span className="w-2/3">{patientData.weight}</span>
                    </p>

                    <p className="flex flex-wrap">
                        <span className="w-1/3 font-semibold">Already taking any prior medications ? </span>
                        <span className="w-2/3">{patientData.medications}</span>
                    </p>

                    <p className="flex flex-wrap">
                        <span className="w-1/3 font-semibold">Mobile Number:</span>
                        <span className="w-2/3">{patientData.mobile_number}</span>
                    </p>
                </div>
            )}
        </div>
    );
};

export default PatientId;

