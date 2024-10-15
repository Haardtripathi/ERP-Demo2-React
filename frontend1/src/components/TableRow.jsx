import React from 'react';
import axios from 'axios';
import { useLocation, useNavigate } from 'react-router-dom';

const TableRow = ({ rowData, setData, setErrorMessage }) => {
    const API_URL = "http://localhost:5000";
    const location = useLocation();
    const navigate = useNavigate();

    // Access the populated data
    const populatedData = rowData.populatedData || {};

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
        const requiredFields = [
            rowData.data?.value,
            populatedData.date,
            populatedData.source?.value,
            populatedData.CM_First_Name,
            populatedData.CM_Last_Name,
            populatedData.CM_Phone,
            populatedData.agent_name?.value,
            populatedData.language?.value,
            populatedData.disease?.value,
            populatedData.age,
            populatedData.height,
            populatedData.weight,
            populatedData.state?.value,
            populatedData.city,
        ];

        return requiredFields.every(field => {
            if (typeof field === 'string') {
                return field.trim() !== "";
            }
            if (typeof field === 'number') {
                return !isNaN(field) && field > 0;
            }
            return !!field;
        });
    };

    const sendToPending = async (event) => {
        event.preventDefault();
        const isValid = validateRowData();
        console.log(isValid);
        if (!isValid) {
            alert(`Please fill in all required fields before sending`)
            return;
        }
        try {
            console.log(rowData)
            const response = await axios.post(`${API_URL}/sendToPending`, {
                itemId: rowData._id,
                dataId: rowData.dataId,
                dataValue: rowData.data.value
            });
            alert("SENT TO PENDING");
            navigate("/pending");
        } catch (error) {
            console.error("Error sending to pending:", error);
        }
    };

    return (
        <tr className="hover:bg-gray-100 text-sm">
            <td className="py-2 px-4 border-b border-gray-300">
                <form onSubmit={sendToPending}>
                    <button
                        className={`py-1 px-2 rounded ${populatedData.isSentToPending ? 'bg-gray-300 cursor-not-allowed' : 'bg-blue-500 text-white'}`}
                        type="submit"
                        disabled={populatedData.isSentToPending}
                    >
                        {populatedData.isSentToPending ? "Sent" : "Send"}
                    </button>
                </form>
            </td>

            <td className="py-2 px-4 border-b border-gray-300">
                <form onSubmit={getEdit}>
                    <button
                        className={`py-1 px-2 rounded ${populatedData.isSentToPending ? 'bg-gray-300 cursor-not-allowed' : 'bg-blue-500 text-white'}`}
                        type="submit"
                        disabled={populatedData.isSentToPending}
                    >
                        Edit
                    </button>
                </form>
            </td>

            {/* Other table cells */}
            <td className="py-2 px-4 border-b border-gray-300">{rowData.data.value}</td>
            <td className="py-2 px-4 border-b border-gray-300">{populatedData.date}</td>
            <td className="py-2 px-4 border-b border-gray-300">{populatedData.source?.value}</td>
            <td className="py-2 px-4 border-b border-gray-300">{populatedData.CM_First_Name}</td>
            <td className="py-2 px-4 border-b border-gray-300">{populatedData.CM_Last_Name}</td>
            <td className="py-2 px-4 border-b border-gray-300">{populatedData.CM_Phone}</td>
            <td className="py-2 px-4 border-b border-gray-300">{populatedData.alternate_Phone}</td>
            <td className="py-2 px-4 border-b border-gray-300">{populatedData.agent_name?.value}</td>
            <td className="py-2 px-4 border-b border-gray-300">{populatedData.language?.value}</td>
            <td className="py-2 px-4 border-b border-gray-300">{populatedData.disease?.value}</td>
            <td className="py-2 px-4 border-b border-gray-300">{populatedData.age}</td>
            <td className="py-2 px-4 border-b border-gray-300">{populatedData.height}</td>
            <td className="py-2 px-4 border-b border-gray-300">{populatedData.weight}</td>
            <td className="py-2 px-4 border-b border-gray-300">{populatedData.state?.value}</td>
            <td className="py-2 px-4 border-b border-gray-300">{populatedData.city}</td>
            <td className="py-2 px-4 border-b border-gray-300">{populatedData.remark?.value}</td>
            <td className="py-2 px-4 border-b border-gray-300">{populatedData.comment}</td>
            <td className="py-2 px-4 border-b border-gray-300">
                <form onSubmit={handleDelete}>
                    <button className="bg-red-500 text-white py-1 px-2 rounded" type="submit">Delete</button>
                </form>
            </td>
        </tr>
    );
};

export default TableRow;