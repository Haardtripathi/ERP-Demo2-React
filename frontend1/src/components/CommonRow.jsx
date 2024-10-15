import React from 'react';
import axios from 'axios';
import { useLocation, useNavigate } from 'react-router-dom';

const CommonRow = ({ rowData, setData }) => {
    const API_URL = "http://localhost:5000";
    const location = useLocation();
    const navigate = useNavigate();

    const handleDelete = async (event) => {
        event.preventDefault();
        try {
            let endpoint = location.pathname === "/incoming"
                ? `${API_URL}/deleteIncomingItem`
                : `${API_URL}/deleteLeadItem`;

            const response = await axios.post(endpoint, {
                itemId: rowData._id,
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
        let editEndpoint = location.pathname === "/incoming"
            ? `/editIncomingItem/${rowData._id}`
            : `/editLeadItem/${rowData._id}`;

        navigate(editEndpoint);
    };

    return (
        <tr className="hover:bg-gray-100 text-sm">
            <td className="py-2 px-4 border-b border-gray-300">
                <form onSubmit={getEdit}>
                    <button
                        className={`py-1 px-2 rounded ${rowData.isSentToPending ? 'bg-gray-300 cursor-not-allowed' : 'bg-blue-500 text-white'}`}
                        type="submit"
                        disabled={rowData.isSentToPending}
                    >
                        {rowData.isSentToPending ? "Edit" : "Edit"}
                    </button>
                </form>
            </td>
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

export default CommonRow;
