import React, { useState, useEffect } from 'react';
import axios from 'axios';
import CommonTable from '../components/CommonTable';

const LeadPage = () => {
    const [data, setData] = useState([]);
    const API_URL = "http://localhost:5000"; // Your backend API URL
    const [filter, setFilter] = useState("all"); // State for filtering: "all", "isSent", "isNotSent"


    useEffect(() => {
        // Fetch workbook data from the server when the component mounts
        const fetchData = async () => {
            try {
                const response = await axios.get(`${API_URL}/lead`);
                // console.log(response)
                setData(response.data);  // Update the data state
            } catch (error) {
                console.error("Error fetching workbook data:", error);
            }
        };

        fetchData();
    }, []); // Empty dependency array ensures this runs only once when the component mounts


    const getFilteredData = () => {
        if (filter === "isSent") {
            return data.filter(item => item.isSentToPending === true);
        } else if (filter === "isNotSent") {
            return data.filter(item => item.isSentToPending === false);
        }
        // console.log(data)
        return data; // If filter is "all", return all data
    };

    return (
        <div className="flex-1 bg-gray-100 p-4 overflow-auto">
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
            <div className="w-full h-full">
                <CommonTable data={getFilteredData()} setData={setData} /> {/* Pass setData to allow child components to trigger refetch */}
            </div>
        </div>
    );
};

export default LeadPage;
