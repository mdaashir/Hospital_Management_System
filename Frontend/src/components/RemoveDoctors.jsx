import React, { useState } from 'react';
import axios from 'axios';
const PROD_BACKEND_URL = import.meta.env.VITE_PROD_BACKEND_URL

const RemoveDoctor = () => {
    const [doctorId, setDoctorId] = useState('');
    const [reason, setReason] = useState('');
    const [message, setMessage] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.post(
                process.env.NODE_ENV === "production"
                    ? `${PROD_BACKEND_URL}/api/removeDoctor`
                    : 'http://localhost:9021/api/removeDoctor',
                {
                    doctorId,
                    reason
                }
            );

            // Reset form fields
            setDoctorId('');
            setReason('');
            setMessage('Doctor details Removed successfully');
        } catch (error) {
            console.error('Error removing doctor details:', error);
            setMessage('Error modifying doctor details. Please try again.');
        }
    };

    return (
        <div className="container mx-auto max-w-md py-8">
            <h2 className="text-2xl font-bold mb-4">Remove Doctor from Hospital</h2>
            <form onSubmit={handleSubmit}>
                <div className="mb-4">
                    <label htmlFor="doctorId" className="block text-gray-700">Doctor ID :</label>
                    <input
                        type="text"
                        id="doctorId"
                        value={doctorId}
                        onChange={(e) => setDoctorId(e.target.value)}
                        required
                        className="appearance-none border py-2 px-3 text-gray-700 leading-tight focus:outline-none"
                    />
                </div>
                <div className="mb-6">
                    <label htmlFor="reason" className="block text-gray-700">Reason :</label>
                    <textarea
                        id="reason"
                        value={reason}
                        onChange={(e) => setReason(e.target.value)}
                        required
                        className="appearance-none border form-input mt-1 block w-full text-gray-700 leading-tight focus:outline-none"
                    />
                </div>
                <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
                    Remove Doctor
                </button>
            </form>
            {message && <p className="mt-4 text-green-600">{message}</p>}
        </div>
    );
};

export default RemoveDoctor;
