import React from 'react';
import axios from 'axios';
import { useLocation, useNavigate } from 'react-router-dom';

const Section2Row = ({ rowData, setData, isPendingPage }) => {
    const API_URL = "http://localhost:5000";
    const location = useLocation();
    const navigate = useNavigate();
    // console.log(rowData);
    const getEdit = (event) => {
        event.preventDefault();
        let endpoint = `/editPendingData/${rowData._id}`;

        navigate(endpoint);
    };

    return (
        <tr className="hover:bg-gray-100 text-sm">
            <td className="py-2 px-4 border-b border-gray-300">
                <form onSubmit={getEdit}>
                    <button
                        className={`py-1 px-2 rounded 'bg-blue-500 text-white'}`}
                        type="submit"
                    >
                        Edit
                    </button>
                </form>
            </td>

            <td className="py-2 px-4 border-b border-gray-300">{rowData.ref}</td>
            <td className="py-2 px-4 border-b border-gray-300">{rowData.date}</td>
            <td className="py-2 px-4 border-b border-gray-300">{rowData.time}</td>
            <td className="py-2 px-4 border-b border-gray-300">{rowData.payment_type.value}</td>
            <td className="py-2 px-4 border-b border-gray-300">{rowData.sale_type.value}</td>
            <td className="py-2 px-4 border-b border-gray-300">{rowData.agent_name.value}</td>
            <td className="py-2 px-4 border-b border-gray-300">{rowData.CM_First_Name}</td>
            <td className="py-2 px-4 border-b border-gray-300">{rowData.CM_Last_Name}</td>
            <td className="py-2 px-4 border-b border-gray-300">{rowData.CM_Phone}</td>
            <td className="py-2 px-4 border-b border-gray-300">{rowData.Alternate_Number}</td>
            <td className="py-2 px-4 border-b border-gray-300">{rowData.email}</td>
            <td className="py-2 px-4 border-b border-gray-300">{rowData.status.value}</td>
            <td className="py-2 px-4 border-b border-gray-300">{rowData.comment}</td>
            <td className="py-2 px-4 border-b border-gray-300">{rowData.shipment_type.value}</td>
            <td className="py-2 px-4 border-b border-gray-300">{rowData.address}</td>
            <td className="py-2 px-4 border-b border-gray-300">{rowData.post_type.value}</td>
            <td className="py-2 px-4 border-b border-gray-300">{rowData.post}</td>
            <td className="py-2 px-4 border-b border-gray-300">{rowData.subDistrict_Taluka}</td>
            <td className="py-2 px-4 border-b border-gray-300">{rowData.City_District}</td>
            <td className="py-2 px-4 border-b border-gray-300">{rowData.pincode}</td>
            <td className="py-2 px-4 border-b border-gray-300">{rowData.state.value}</td>
            <td className="py-2 px-4 border-b border-gray-300">{rowData.disease.value}</td>
            <td className="py-2 px-4 border-b border-gray-300">{rowData.amount.value}</td>
            <td className="py-2 px-4 border-b border-gray-300">{rowData.products.value}</td>
            <td className="py-2 px-4 border-b border-gray-300">{rowData.quantity}</td>
        </tr>
    );
};

export default Section2Row;