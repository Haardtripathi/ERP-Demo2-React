import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { FaArrowLeft } from 'react-icons/fa';

const LeadUploadPage = () => {
    const API_URL = "http://localhost:5000"
    const [file, setFile] = useState(null);
    const navigate = useNavigate();

    const handleFileChange = (e) => {
        setFile(e.target.files[0]);
    };

    const handleBackClick = () => {
        navigate('/lead');
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!file) {
            alert("Please select a file before uploading.");
            return;
        }

        const formData = new FormData();
        formData.append("csvFile", file);

        try {
            const response = await axios.post(`${API_URL}/addLeadItem`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
            console.log(formData);

            if (response.status === 200) {
                alert('File uploaded successfully!');
                navigate('/lead');  // Navigate back after success
            } else {
                alert('Failed to upload file. Please try again.');
            }
        } catch (error) {
            console.error('Error uploading file:', error);
            alert('An error occurred while uploading the file.');
        }
    };

    return (
        <div className="min-h-screen bg-gray-100 flex items-center justify-center">
            <div className="w-full max-w-md p-6 bg-white rounded-lg shadow-md">
                <h1 className="text-2xl font-bold text-center mb-6 text-gray-800">Upload Lead CSV</h1>
                <button onClick={handleBackClick} className="flex items-center text-blue-500 hover:text-blue-700 mb-4">
                    <FaArrowLeft className="mr-2" /> Back
                </button>
                <form onSubmit={handleSubmit} className="space-y-4" encType="multipart/form-data">
                    <div>
                        <input
                            type="file"
                            name="csvFile"
                            accept=".csv"
                            onChange={handleFileChange}
                            className="block w-full text-sm text-gray-600 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
                        />
                    </div>
                    <div>
                        <button
                            type="submit"
                            className="w-full py-2 px-4 bg-blue-600 text-white font-bold rounded-md hover:bg-blue-700 transition duration-200"
                        >
                            Upload Leads
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default LeadUploadPage;
