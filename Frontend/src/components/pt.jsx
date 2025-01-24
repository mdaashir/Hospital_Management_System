import React, { useState } from 'react';
import bgImg from '../assets/bg_patient.jpeg';

const Pt = () => {
    // State variables to store form data
    const [name, setName] = useState('');
    const [height, setHeight] = useState('');


    // Function to handle form submission
    const handleSubmit = (e) => {
        e.preventDefault();
        // Perform form submission logic here (e.g., send data to server)
        console.log("Form submitted:", { name, age, dob, gender, address, BloodGroup, maritalStatus, height, weight, medications, mobileNumber });
    };

    return (
        <div className="min-h-screen flex flex-col items-center" style={{ backgroundImage: `url(${bgImg})`, backgroundSize: 'cover', backgroundPosition: 'center' }}>
            <div className="mb-10 text-4xl font-bold text-center" style={{ color: 'blue', fontFamily: 'Cambria, sans-serif', marginTop: '3rem' }}>Welcome to SIGNIFYHEALTH</div>

            <div className="container mx-auto px-8">
            <div className="flex justify-between" style={{ maxWidth: '1200px', margin: '0 auto' }}>
                {/* Patient Details Column */}
                <div className="w-1/2 pr-4">
                    <div className="mb-6 text-lg font-semibold text-center text-red-900"><h2>Patient Details</h2></div>
                    <form onSubmit={handleSubmit}>
                        {/* Your Patient Details Form Fields Here */}
                        <div className="mb-3 font">
                            <label htmlFor="patientName" className="block text-gray-700 font-bold mb-2">Patient Name:</label>
                            <input
                                type="text"
                                id="name"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                required
                                className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            />
                        </div>

                        {/* Add more Patient Details Form Fields here */}

                    </form>
                </div>

                {/* Medical History Column */}
                <div className="w-1/2 pl-4">
                    <div className="mb-6 text-lg font-semibold text-center text-red-900"><h2>Medical History</h2></div>
                    <form onSubmit={handleSubmit}>
                        {/* Your Medical History Form Fields Here */}
                        <div className="mb-3 font">
                            <label htmlFor="height" className="block text-gray-700 font-bold mb-2">Height(in cm): </label>
                            <input
                                type="number"
                                id="height"
                                value={height}
                                onChange={(e) => setHeight(e.target.value)}
                                className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                required
                            />
                        </div>

                        {/* Add more Medical History Form Fields here */}

                    </form>
                </div>
            </div>
        </div>
        </div>
        );
    };
    

export default Pt;
