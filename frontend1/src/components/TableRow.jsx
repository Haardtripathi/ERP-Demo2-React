import React from 'react';
import axios from 'axios';
import { useLocation, useNavigate } from 'react-router-dom';

const TableRow = ({ rowData, setData, setErrorMessage, hideSendButton }) => {
    const API_URL = "http://localhost:5000";
    const location = useLocation();
    const navigate = useNavigate();

    const handleDelete = async (event) => {
        event.preventDefault();
        try {
            const response = await axios.post(`${API_URL}/deleteWorkbookItem`, {
                itemId: rowData._id,
                dataId: rowData.dataId,
                dataValue: rowData.data.value
            });

            if (response.data.success) {
                console.log('Item deleted successfully');
                setData(prevData => prevData.filter(item => item._id !== rowData._id));
            }
        } catch (error) {
            console.error("Error deleting item:", error);
        }
    };

    const getEdit = (event) => {
        event.preventDefault();
        let endpoint = rowData.data.value === "Incoming"
            ? `/editIncomingItem/${rowData.dataId}`
            : `/editLeadItem/${rowData.dataId}`;

        navigate(endpoint);
    };

    const validateRowData = () => {
        // Define the fields to check
        const requiredFields = [
            rowData.data?.value,
            rowData.date,
            rowData.source?.value,
            rowData.CM_First_Name,
            rowData.CM_Last_Name,
            rowData.CM_Phone,
            rowData.agent_name?.value,
            rowData.language?.value,
            rowData.disease?.value,
            rowData.age,
            rowData.height,
            rowData.weight,
            rowData.state?.value,
            rowData.city,
        ];

        // Loop over each field and check for validity
        return requiredFields.every(field => {
            // Handle string fields
            if (typeof field === 'string') {
                return field.trim() !== "";
            }
            // Handle numbers (age, height, weight)
            if (typeof field === 'number') {
                return !isNaN(field) && field > 0;
            }
            // If field is undefined, null, or empty
            return !!field; // This checks for any falsy values like undefined, null, 0
        });
    };

    const sendToPending = async (event) => {
        event.preventDefault();
        const isValid = validateRowData();
        if (!isValid) {
            setErrorMessage("Please fill in all required fields before sending.");
            return;
        }
        try {
            const response = await axios.post(`${API_URL}/sendToPending`, {
                itemId: rowData._id,
                dataId: rowData.dataId,
                dataValue: rowData.data.value
            });
            alert("SENT TO PENDING");
            console.log(response);
            navigate("/pending");
        } catch (error) {
            console.error("Error sending to pending:", error);
        }
    };

    const renderSendButton = () => {
        if (hideSendButton && hideSendButton(rowData)) {
            return null;
        }
        return (
            <form onSubmit={sendToPending}>
                <button className="bg-blue-500 text-white py-1 px-2 rounded" type="submit">Send</button>
            </form>
        );
    };

    return (
        <tr className="hover:bg-gray-100 text-sm">
            <td className="py-2 px-4 border-b border-gray-300">
                {renderSendButton()}
            </td>
            <td className="py-2 px-4 border-b border-gray-300">
                <form onSubmit={getEdit}>
                    <button className="bg-blue-500 text-white py-1 px-2 rounded" type="submit">Edit</button>
                </form>
            </td>
            {/* Other table cells */}
            <td className="py-2 px-4 border-b border-gray-300">{rowData.data.value}</td>
            <td className="py-2 px-4 border-b border-gray-300">{rowData.date}</td>
            <td className="py-2 px-4 border-b border-gray-300">{rowData.source.value}</td>
            <td className="py-2 px-4 border-b border-gray-300">{rowData.CM_First_Name}</td>
            <td className="py-2 px-4 border-b border-gray-300">{rowData.CM_Last_Name}</td>
            <td className="py-2 px-4 border-b border-gray-300">{rowData.CM_Phone}</td>
            <td className="py-2 px-4 border-b border-gray-300">{rowData.alternate_Phone}</td>
            <td className="py-2 px-4 border-b border-gray-300">{rowData.agent_name.value}</td>
            <td className="py-2 px-4 border-b border-gray-300">{rowData.language.value}</td>
            <td className="py-2 px-4 border-b border-gray-300">{rowData.disease.value}</td>
            <td className="py-2 px-4 border-b border-gray-300">{rowData.age}</td>
            <td className="py-2 px-4 border-b border-gray-300">{rowData.height}</td>
            <td className="py-2 px-4 border-b border-gray-300">{rowData.weight}</td>
            <td className="py-2 px-4 border-b border-gray-300">{rowData.state.value}</td>
            <td className="py-2 px-4 border-b border-gray-300">{rowData.city}</td>
            <td className="py-2 px-4 border-b border-gray-300">{rowData.remark.value}</td>
            <td className="py-2 px-4 border-b border-gray-300">{rowData.comment}</td>
            <td className="py-2 px-4 border-b border-gray-300">
                <form onSubmit={handleDelete}>
                    <button className="bg-red-500 text-white py-1 px-2 rounded" type="submit">Delete</button>
                </form>
            </td>
        </tr>
    );
};

export default TableRow;
