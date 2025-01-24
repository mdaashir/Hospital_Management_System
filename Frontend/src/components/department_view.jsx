import React, { useState, useEffect } from 'react';
import axios from 'axios';
const PROD_BACKEND_URL = import.meta.env.VITE_PROD_BACKEND_URL

const DepartmentDoctorsView = ({ department }) => {
    const [doctorsData, setDoctorData] = useState(null);
    const [error, setError] = useState(null);

    useEffect(() => {
        console.log("Fetching data for department:", department);
        const fetchDeptDoctors = async () => {
            try {
                console.log(department);
                const response = await axios.get(`${process.env.NODE_ENV == "production" ? PROD_BACKEND_URL +`/api/department_doc_view/${department}` :`http://localhost:9021/api/department_doc_view/${department}`}`);
                setDoctorData(response.data);
                console.log(response.data);
                //alert('Fetched successfully');
            } catch (error) {
                console.log(error);
                //alert('Error adding doctor. Please try again.');
            }
        };
        fetchDeptDoctors();
        return () => {
            
        };
    }, [department]);


  return (
    <div>
        <div>
            <h2 className="mb-6 text-xl font-semibold text-center">Doctors in {department}</h2>
        </div>

        {error && <p>{error}</p>}
        {doctorsData && doctorsData.length > 0 ? (
            <table style={{ borderCollapse: 'collapse', width: '100%' }}>
                <thead>
                    <tr>
                    <th style={{ width: '10%', border: '1px solid #CCCCCC', fontSize: '0.95em', textAlign: 'center', padding: '8px' }}>Doctor ID</th>
                    <th style={{ width: '20%', border: '1px solid #CCCCCC', fontSize: '0.95em', textAlign: 'center', padding: '8px' }}>Name</th>
                    </tr>
                </thead>
                <tbody>
                    {doctorsData.map(doctor => (
                        <tr key={doctor.doc_id}>
                            <td style={{ border: '1px solid #CCCCCC', textAlign: 'center', padding: '8px' }}>{doctor.doc_id}</td>
                            <td style={{ border: '1px solid #CCCCCC', textAlign: 'center', padding: '8px' }}>{doctor.dname}</td>
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

export default DepartmentDoctorsView;
