import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Table from '../components/Table';

const WorkbookPage = () => {
    const [data, setData] = useState([]);
    const [errorMessage, setErrorMessage] = useState(""); // State for error message
    const API_URL = "http://localhost:5000"; // Your backend API URL

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(`${API_URL}/workbook`);
                setData(response.data);  // Update the data state
            } catch (error) {
                console.error("Error fetching workbook data:", error);
                setErrorMessage("Failed to load data"); // Set error message if request fails
            }
        };

        fetchData();
    }, []); // Empty dependency array ensures this runs only once when the component mounts

    return (
        <div className="flex-1 bg-gray-100 p-4 overflow-auto min-h-screen"> {/* Add min-h-screen for better mobile layout */}
            {errorMessage && (
                <div className="bg-red-200 text-red-800 p-2 mb-4">{errorMessage}</div>
            )}
            <div className="w-full h-full">
                <Table data={data} setData={setData} setErrorMessage={setErrorMessage} /> {/* Pass setErrorMessage */}
            </div>
        </div>
    );
};

export default WorkbookPage;
