import React, { useState, useEffect } from 'react';
import axios from 'axios';

const PROD_BACKEND_URL = import.meta.env.VITE_PROD_BACKEND_URL

const DoctorView = () => {
    // State variables to store form data
    const [doctorsData, setDoctorData] = useState(null);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchDoctorDetails = async () => {
            try {
                const response = await axios.get(
                            process.env.NODE_ENV === "production" 
                                ? `${PROD_BACKEND_URL}/api/doctors` 
                                : `https://hospital-management-system-uksf.onrender.com/api/doctors`
                );

                setDoctorData(response.data);
                console.log(response.data);
            } catch (error) {
                console.log(error);
                setError('Error fetching doctor data');
                console.error('Error fetching doctor data:', error);
            }
        };
        fetchDoctorDetails();
        return () => {
            // Any cleanup code goes here (if needed)
        };
    }, []);

    return (
        <div>
            <div className="mb-6 text-2xl font-bold text-center" style={{ color: 'blue', fontFamily: 'Cambria, sans-serif' }}>
                <h2>View All Doctors</h2>
            </div>
            {error && <p>{error}</p>}
            {doctorsData && doctorsData.length > 0 ? (
                <table style={{ borderCollapse: 'collapse', width: '100%' }}>
                    <thead>
                        <tr>
                            <th style={{ width: '5%', border: '1px solid #CCCCCC', fontSize: '0.95em', textAlign: 'center', padding: '8px' }}>Doctor ID</th>
                            <th style={{ width: '10%', border: '1px solid #CCCCCC', fontSize: '0.95em', textAlign: 'center', padding: '8px' }}>Name</th>
                            <th style={{ width: '5%', border: '1px solid #CCCCCC', fontSize: '0.95em', textAlign: 'center', padding: '8px' }}>Specialization</th>
                            <th style={{ width: '12%', border: '1px solid #CCCCCC', fontSize: '0.95em', textAlign: 'center', padding: '8px' }}>Qualifications</th>
                            <th style={{ width: '8%', border: '1px solid #CCCCCC', fontSize: '0.95em', textAlign: 'center', padding: '8px' }}>Contact</th>
                        </tr>
                    </thead>
                    <tbody>
                        {doctorsData.map(doctor => (
                            <tr key={doctor.doc_id}>
                                <td style={{ border: '1px solid #CCCCCC', textAlign: 'center', padding: '8px' }}>{doctor.doc_id}</td>
                                <td style={{ border: '1px solid #CCCCCC', textAlign: 'center', padding: '8px' }}>{doctor.dname}</td>
                                <td style={{ border: '1px solid #CCCCCC', textAlign: 'center', padding: '8px' }}>{doctor.specialization}</td>
                                <td style={{ border: '1px solid #CCCCCC', textAlign: 'center', padding: '8px' }}>{doctor.qualification}</td>
                                <td style={{ border: '1px solid #CCCCCC', textAlign: 'center', padding: '8px' }}>{doctor.contact}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            ) : (
                <p>No Doctor data available</p>
            )}
        </div>
    );
};


export default DoctorView;