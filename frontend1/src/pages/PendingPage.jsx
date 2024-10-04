import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Section2Table from '../components/Section2Table';

const PendingPage = () => {
    const [data, setData] = useState([]);
    const API_URL = "http://localhost:5000"; // Your backend API URL

    useEffect(() => {
        // Fetch pending data from the server when the component mounts
        const fetchData = async () => {
            try {
                const response = await axios.get(`${API_URL}/pending`);
                setData(response.data);  // Update the data state
                // console.log(response.data);
            } catch (error) {
                console.error("Error fetching pending data:", error);
            }
        };

        fetchData();
    }, []); // Empty dependency array ensures this runs only once when the component mounts

    return (
        <div className="flex-1 bg-gray-100 p-4 overflow-auto">
            <div className="w-full h-full">
                <Section2Table data={data} setData={setData} isPendingPage={true} />
            </div>
        </div>
    );
};

export default PendingPage;