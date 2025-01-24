import React, { useState, useEffect } from 'react';
import axios from 'axios';
const PROD_BACKEND_URL = import.meta.env.VITE_PROD_BACKEND_URL

const DoctorId = () => {
    const [doctorData, setDoctorData] = useState(null);
    const [error, setError] = useState(null);
    const [doctorId, setDoctorId] = useState('');
    const [submitted, setSubmitted] = useState(false); // Track if form is submitted

    useEffect(() => {
        if (submitted && doctorId) {
            const fetchDoctorDetails = async () => {
                try {
                    const response = await axios.get(`${process.env.NODE_ENV == "production" ? PROD_BACKEND_URL+`/api/doctorid/${doctorId}`:`http://localhost:9021/api/doctorid/${doctorId}`}`);
                    setDoctorData(response.data[0]); // Accessing the first object in the array
                } catch (error) {
                    setError(error);
                }
            };
            fetchDoctorDetails();
        }
    }, [doctorId, submitted]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setSubmitted(true); // Set submitted to true when form is submitted
        setError(null); // Reset error state
    };

    return (
        <div className="container mx-auto mt-10">
            <h2 className="text-3xl font-bold mb-8 text-center">Doctor Details Lookup</h2>
            <form onSubmit={handleSubmit} className="max-w-md mx-auto bg-gray-200 p-6 rounded-lg shadow-md">
                <div className="mb-6">
                    <label htmlFor="doctorId" className="block text-gray-700 font-bold mb-2">Enter Doctor ID:</label>
                    <input
                        type="text"
                        id="doctorId"
                        value={doctorId}
                        onChange={(e) => setDoctorId(e.target.value)}
                        className="form-input mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                        required
                    />
                </div>
                <button
                    type="submit"
                    className="bg-indigo-500 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded-full focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 transition duration-300 ease-in-out transform hover:scale-105 w-full"
                >
                    Search
                </button>
            </form>
            {error && <p className="text-red-500 text-center mt-4">Error: {error.message}</p>}
            {submitted && doctorData && (
                <div className="mt-8 max-w-md mx-auto bg-gray-200 p-6 rounded-lg shadow-md">
                    <h3 className="text-xl font-semibold mb-2">Doctor Details</h3>
                    <p><span className="font-semibold">Doctor ID:</span> {doctorData.doc_id}</p>
                    <p><span className="font-semibold">Name:</span> {doctorData.dname}</p>
                    <p><span className="font-semibold">Qualification:</span> {doctorData.qualification}</p>
                    <p><span className="font-semibold">Contact:</span> {doctorData.contact}</p>
                </div>
            )}
        </div>
    );
};

export default DoctorId;