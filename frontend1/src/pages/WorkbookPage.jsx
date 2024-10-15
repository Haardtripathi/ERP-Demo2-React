import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Table from '../components/Table';

const WorkbookPage = () => {
    const [data, setData] = useState([]);
    const [errorMessage, setErrorMessage] = useState(""); // State for error message
    const [filter, setFilter] = useState("all"); // State for filtering: "all", "isSent", "isNotSent"
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

    // console.log(data);

    // Function to handle filtering based on the isSentToPending field
    const getFilteredData = () => {
        if (filter === "isSent") {
            return data.filter(item => item.populatedData?.isSentToPending === true);
        } else if (filter === "isNotSent") {
            return data.filter(item => item.populatedData?.isSentToPending === false);
        }
        return data; // If filter is "all", return all data
    };

    return (
        <div className="flex-1 bg-gray-100 p-4 overflow-auto min-h-screen">
            {errorMessage && (
                <div className="bg-red-200 text-red-800 p-2 mb-4">{errorMessage}</div>
            )}

            {/* Filter Buttons */}
            <div className="flex mb-4">
                <button
                    onClick={() => setFilter("all")}
                    className={`px-4 py-2 mr-2 rounded ${filter === 'all' ? 'bg-blue-500 text-white' : 'bg-gray-300'}`}
                >
                    All
                </button>
                <button
                    onClick={() => setFilter("isSent")}
                    className={`px-4 py-2 mr-2 rounded ${filter === 'isSent' ? 'bg-blue-500 text-white' : 'bg-gray-300'}`}
                >
                    IsSent
                </button>
                <button
                    onClick={() => setFilter("isNotSent")}
                    className={`px-4 py-2 rounded ${filter === 'isNotSent' ? 'bg-blue-500 text-white' : 'bg-gray-300'}`}
                >
                    IsNotSent
                </button>
            </div>

            {/* Render Table with Filtered Data */}
            <div className="w-full h-full">
                <Table
                    data={getFilteredData()}
                    setData={setData}
                    setErrorMessage={setErrorMessage}
                />
            </div>
        </div>
    );
};

export default WorkbookPage;
