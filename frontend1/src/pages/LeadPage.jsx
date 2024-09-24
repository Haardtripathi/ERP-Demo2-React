import React, { useState, useEffect } from 'react';
import axios from 'axios';
import CommonTable from '../components/CommonTable';

const LeadPage = () => {
    const [data, setData] = useState([]);
    const API_URL = "http://localhost:5000"; // Your backend API URL

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

    return (
        <div className="flex-1 bg-gray-100 p-4 overflow-auto">
            <div className="w-full h-full">
                <CommonTable data={data} setData={setData} /> {/* Pass setData to allow child components to trigger refetch */}
            </div>
        </div>
    );
};

export default LeadPage;
