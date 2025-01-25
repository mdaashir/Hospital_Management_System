import React, { useState, useEffect } from 'react';
import axios from 'axios';

const PROD_BACKEND_URL = import.meta.env.VITE_PROD_BACKEND_URL


const PatientView = () => {
    // State variables to store form data
    const [patientsData, setPatientData] = useState(null);
    const [error, setError] = useState(null);


    useEffect(() => {
        const fetchPatientDetails = async () => {
            try {
                const response = await axios.get(
                    process.env.NODE_ENV === "production"
                        ? `${PROD_BACKEND_URL}/api/patients`
                        : `https://hospital-management-system-uksf.onrender.com/api/patients`
                );
                setPatientData(response.data);
                console.log(response);
                console.log(PROD_BACKEND_URL); 

                // Assuming patientsData is the array received from the backend
                { /*if (patientsData && patientsData.length > 0) {
                    patientsData.forEach(patient => {
                        console.log('Patient ID:', patient.pid);
                        console.log('Name:', patient.pname);
                        console.log('Age:', patient.age);
                        console.log('Date of Birth:', patient.dob);
                        console.log('Gender:', patient.gender);
                        console.log('Address:', patient.address);
                        console.log('Mobile Number:', patient.mobile_number);
                        console.log('Blood Group:', patient.blood_group);
                        console.log('Height:', patient.height);
                        console.log('Weight:', patient.weight);
                        console.log('Marital Status:', patient.marital_status);
                        console.log('Medications:', patient.medications);
                        console.log('-----------------------------------');
                    });
                } else {
                    console.log('No patient data available');
                }  */}

            } catch (error) {
                console.log(error);
                setError('Error fetching patient data');
                console.error('Error fetching patient data:', error);
            }
        };

        fetchPatientDetails();

        return () => {
            // Any cleanup code goes here (if needed)
        };
    }, []);

    return (
        <div>
            <div className="mb-6 text-2xl font-bold text-center" style={{ color: 'blue', fontFamily: 'Cambria, sans-serif' }}>
                <h2>View All Patients</h2>
            </div>
            {error && <p>{error}</p>}
            {patientsData && patientsData.length > 0 ? (
                <table style={{ borderCollapse: 'collapse', width: '100%' }}>
                    <thead>
                        <tr>
                            <th style={{ width: '5%', border: '1px solid #CCCCCC', fontSize: '0.9em', textAlign: 'center', padding: '8px' }}>Patient ID</th>
                            <th style={{ width: '10%', border: '1px solid #CCCCCC', fontSize: '0.9em', textAlign: 'center', padding: '8px' }}>Name</th>
                            <th style={{ width: '5%', border: '1px solid #CCCCCC', fontSize: '0.9em', textAlign: 'center', padding: '8px' }}>Age</th>
                            <th style={{ width: '12%', border: '1px solid #CCCCCC', fontSize: '0.9em', textAlign: 'center', padding: '8px' }}>DOB</th>
                            <th style={{ width: '8%', border: '1px solid #CCCCCC', fontSize: '0.9em', textAlign: 'center', padding: '8px' }}>Gender</th>
                            <th style={{ width: '20%', border: '1px solid #CCCCCC', fontSize: '0.9em', textAlign: 'center', padding: '8px' }}>Address</th>
                            <th style={{ width: '12%', border: '1px solid #CCCCCC', fontSize: '0.9em', textAlign: 'center', padding: '8px' }}>Contact</th>
                            <th style={{ width: '8%', border: '1px solid #CCCCCC', fontSize: '0.9em', textAlign: 'center', padding: '8px' }}>Blood Group</th>
                            <th style={{ width: '6%', border: '1px solid #CCCCCC', fontSize: '0.9em', textAlign: 'center', padding: '8px' }}>Height (cm)</th>
                            <th style={{ width: '6%', border: '1px solid #CCCCCC', fontSize: '0.9em', textAlign: 'center', padding: '8px' }}>Weight (kg)</th>
                            <th style={{ width: '10%', border: '1px solid #CCCCCC', fontSize: '0.9em', textAlign: 'center', padding: '8px' }}>Marital Status</th>
                            <th style={{ width: '10%', border: '1px solid #CCCCCC', fontSize: '0.89em', textAlign: 'center', padding: '8px' }}>Any prior Medications?</th>
                        </tr>
                    </thead>
                    <tbody>
                        {patientsData.map(patient => (
                            <tr key={patient.pid}>
                                <td style={{ border: '1px solid #CCCCCC', textAlign: 'center', padding: '8px' }}>{patient.pid}</td>
                                <td style={{ border: '1px solid #CCCCCC', textAlign: 'center', padding: '8px' }}>{patient.pname}</td>
                                <td style={{ border: '1px solid #CCCCCC', textAlign: 'center', padding: '8px' }}>{patient.age}</td>
                                <td style={{ border: '1px solid #CCCCCC', textAlign: 'center', padding: '8px' }}>{patient.dob}</td>
                                <td style={{ border: '1px solid #CCCCCC', textAlign: 'center', padding: '8px' }}>{patient.gender}</td>
                                <td style={{ border: '1px solid #CCCCCC', textAlign: 'center', padding: '8px' }}>{patient.address}</td>
                                <td style={{ border: '1px solid #CCCCCC', textAlign: 'center', padding: '8px' }}>{patient.mobile_number}</td>
                                <td style={{ border: '1px solid #CCCCCC', textAlign: 'center', padding: '8px' }}>{patient.blood_group}</td>
                                <td style={{ border: '1px solid #CCCCCC', textAlign: 'center', padding: '8px' }}>{patient.height}</td>
                                <td style={{ border: '1px solid #CCCCCC', textAlign: 'center', padding: '8px' }}>{patient.weight}</td>
                                <td style={{ border: '1px solid #CCCCCC', textAlign: 'center', padding: '8px' }}>{patient.marital_status}</td>
                                <td style={{ border: '1px solid #CCCCCC', textAlign: 'center', padding: '8px' }}>{patient.medications}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            ) : (
                <p>No patient data available</p>
            )}
        </div>
    );
};


export default PatientView;
