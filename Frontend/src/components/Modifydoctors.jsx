import React, { useState } from 'react';
import axios from 'axios';
const PROD_BACKEND_URL = import.meta.env.VITE_PROD_BACKEND_URL

const ModifyDoctors = () => {
    const [doctorId, setDoctorId] = useState('');
    const [detailColumn, setDetailColumn] = useState('');
    const [newValue, setNewValue] = useState('');
    const [message, setMessage] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.post(`${process.env.NODE_ENV === "production" ? PROD_BACKEND_URL + "/api/modifyDoctor" : ("http://localhost:9021/api/modifyDoctor")}`,
                ({
                    doctorId,
                    detailColumn,
                    newValue
                }), {
                doctorId,
                detailColumn,
                newValue
            });
            // Reset form fields
            setDoctorId('');
            setDetailColumn('');
            setNewValue('');
            setMessage('Doctor details modified successfully');
        } catch (error) {
            console.error('Error modifying doctor details:', error);
            setMessage('Error modifying doctor details. Please try again.');
        }
    };

    return (
        <div className="container mx-auto max-w-md py-8">
            <h2 className="text-2xl font-bold mb-4">Modify Doctor Details</h2>
            <form onSubmit={handleSubmit}>
                <div className="mb-4">
                    <label htmlFor="doctorId" className="block text-gray-700">Doctor ID:</label>
                    <input
                        type="text"
                        id="doctorId"
                        value={doctorId}
                        onChange={(e) => setDoctorId(e.target.value)}
                        required
                        className="form-input mt-1 block w-full rounded-md border-gray-300"
                    />
                </div>
                <div className="mb-4">
                   <label htmlFor="detailColumn" className="block text-gray-700">Detail Column:</label>
                    <select
                        type="text"
                        id="detailColumn"
                        value={detailColumn}
                        onChange={(e) => setDetailColumn(e.target.value)}
                        required
                        className="form-input mt-1 block w-full rounded-md border-gray-300"
                    >
                        <option value="">Select</option>
                        <option value="doctorName">Doctor Name</option>
                        <option value="specialization">Specialization</option>
                        <option value="qualificatiion">Qualificatiion</option>
                        <option value="contact">Contact</option>
                    </select>
                </div>
                <div className="mb-6">
                    <label htmlFor="newValue" className="block text-gray-700">New Value:</label>
                    <input
                        type="text"
                        id="newValue"
                        value={newValue}
                        onChange={(e) => setNewValue(e.target.value)}
                        required
                        className="form-input mt-1 block w-full rounded-md border-gray-300"
                    />
                </div>
                <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
                    Modify
                </button>
            </form>
            {message && <p className="mt-4 text-green-600">{message}</p>}
        </div>
    );
};

export default ModifyDoctors;
