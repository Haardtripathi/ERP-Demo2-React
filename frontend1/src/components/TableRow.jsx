import React from 'react';

const TableRow = ({ rowData }) => {
    return (
        <tr className="hover:bg-gray-100 text-sm">
            <td className="py-2 px-4 border-b border-gray-300">
                <form action="/shiftToPending" method="post">
                    <input type="hidden" value={rowData._id} name="itemId" />
                    <input type="hidden" value={rowData.dataId} name="dataId" />
                    <input type="hidden" value={rowData.data.value} name="dataValue" />
                    <button className="bg-red-500 text-white py-1 px-2 rounded" type="submit">ADD</button>
                </form>
            </td>
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
                <form action="/deleteWorkbookItem" method="POST">
                    <input type="hidden" value={rowData._id} name="itemId" />
                    <input type="hidden" value={rowData.dataId} name="dataId" />
                    <input type="hidden" value={rowData.data.value} name="dataValue" />
                    <button className="bg-red-500 text-white py-1 px-2 rounded" type="submit">Delete</button>
                </form>
            </td>
        </tr>
    );
};

export default TableRow;
