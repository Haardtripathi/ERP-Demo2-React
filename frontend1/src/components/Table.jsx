import React from 'react';
import TableRow from './TableRow';

const Table = ({ data, setData }) => {
    return (
        <div className="overflow-x-auto w-full">
            <div className="overflow-y-auto max-h-[650px]">
                <table className="min-w-full bg-white border border-gray-300 text-lg">
                    <thead className="sticky top-0 bg-gray-800 text-white">
                        <tr className="bg-gray-800 text-white text-l">
                            <th className="py-4 px-6 border-b border-gray-300">Action</th>
                            <th className="py-4 px-6 border-b border-gray-300">Data</th>
                            <th className="py-4 px-6 border-b border-gray-300">Date</th>
                            <th className="py-4 px-6 border-b border-gray-300">Source</th>
                            <th className="py-4 px-6 border-b border-gray-300">CM First Name</th>
                            <th className="py-4 px-6 border-b border-gray-300">CM Last Name</th>
                            <th className="py-4 px-6 border-b border-gray-300">CM Phone</th>
                            <th className="py-4 px-6 border-b border-gray-300">Alternate Number</th>
                            <th className="py-4 px-6 border-b border-gray-300">Agent Name</th>
                            <th className="py-4 px-6 border-b border-gray-300">Language</th>
                            <th className="py-4 px-6 border-b border-gray-300">Disease</th>
                            <th className="py-4 px-6 border-b border-gray-300">Age</th>
                            <th className="py-4 px-6 border-b border-gray-300">Height</th>
                            <th className="py-4 px-6 border-b border-gray-300">Weight</th>
                            <th className="py-4 px-6 border-b border-gray-300">State</th>
                            <th className="py-4 px-6 border-b border-gray-300">City/District</th>
                            <th className="py-4 px-6 border-b border-gray-300">Remark</th>
                            <th className="py-4 px-6 border-b border-gray-300">Comment</th>
                            <th className="py-4 px-6 border-b border-gray-300">Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {data.map((rowData) => (
                            <TableRow key={rowData._id} rowData={rowData} setData={setData} />
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default Table;
