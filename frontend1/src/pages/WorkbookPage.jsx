import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Table from '../components/Table';

const WorkbookPage = () => {
    const [data, setData] = useState([]);

    useEffect(() => {
        const API_URL = "http://localhost:5000";
        const fetchData = async () => {
            try {
                const response = await axios.get(`${API_URL}/workbook`);
                setData(response.data);
            } catch (error) {
                console.error('Error fetching workbook data', error);
            }
        };

        fetchData();
    }, []);

    return (
        <div className="flex-1 bg-gray-100 p-4 overflow-auto">
            <div className="w-full h-full">
                <Table data={data} />
            </div>
        </div>
    );
};

export default WorkbookPage;
