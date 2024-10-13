import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Table from '../components/Table';
import { CustomButton } from '../components/CustomButton';

const WorkbookPage = () => {
    const [data, setData] = useState([]);
    const [filteredData, setFilteredData] = useState([]);
    const [filterState, setFilterState] = useState('all'); // 'all', 'sent', or 'notSent'
    const [errorMessage, setErrorMessage] = useState("");
    const API_URL = "http://localhost:5000"; // Your backend API URL

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(`${API_URL}/workbook`);
                setData(response.data);
                setFilteredData(response.data);
            } catch (error) {
                console.error("Error fetching workbook data:", error);
                setErrorMessage("Failed to load data");
            }
        };

        fetchData();
    }, []);

    useEffect(() => {
        filterData();
    }, [filterState, data]);

    const filterData = () => {
        switch (filterState) {
            case 'sent':
                setFilteredData(data.filter(item => item.isSentToPending === 1));
                break;
            case 'notSent':
                setFilteredData(data.filter(item => item.isSentToPending === 0));
                break;
            default:
                setFilteredData(data);
        }
    };

    return (
        <div className="flex-1 bg-gray-100 p-4 overflow-auto min-h-screen">
            {errorMessage && (
                <div className="bg-red-200 text-red-800 p-2 mb-4">{errorMessage}</div>
            )}
            <div className="mb-4 space-x-2">
                <CustomButton
                    onClick={() => setFilterState('all')}
                    active={filterState === 'all'}
                >
                    All
                </CustomButton>
                <CustomButton
                    onClick={() => setFilterState('sent')}
                    active={filterState === 'sent'}
                >
                    Sent to Pending
                </CustomButton>
                <CustomButton
                    onClick={() => setFilterState('notSent')}
                    active={filterState === 'notSent'}
                >
                    Not Sent to Pending
                </CustomButton>
            </div>
            <div className="w-full h-full">
                <Table
                    data={filteredData}
                    setData={setData}
                    setErrorMessage={setErrorMessage}
                    hideSendButton={item => item.isSentToPending === 1}
                />
            </div>
        </div>
    );
};

export default WorkbookPage;