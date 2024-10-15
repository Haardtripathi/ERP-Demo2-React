import React from 'react';
import Section2Row from './Section2Row';

const Section2Table = ({ data, setData, isPendingPage }) => {
    return (
        <div className="overflow-x-auto w-full">
            <div className="overflow-y-auto max-h-[650px]">
                <table className="min-w-full bg-white border border-gray-300 text-lg">
                    <thead className="sticky top-0 bg-gray-800 text-white">
                        <tr className="text-l">
                            <th scope="col" className="py-4 px-6 border-b border-gray-300">Edit</th>
                            <th scope="col" className="py-4 px-6 border-b border-gray-300">Ref</th>
                            <th scope="col" className="py-4 px-6 border-b border-gray-300">Date</th>
                            <th scope="col" className="py-4 px-6 border-b border-gray-300">Time</th>
                            <th scope="col" className="py-4 px-6 border-b border-gray-300">Payment Type</th>
                            <th scope="col" className="py-4 px-6 border-b border-gray-300">Sale Type</th>
                            <th scope="col" className="py-4 px-6 border-b border-gray-300">Agent Name</th>
                            <th scope="col" className="py-4 px-6 border-b border-gray-300">CM First Name</th>
                            <th scope="col" className="py-4 px-6 border-b border-gray-300">CM Last Name</th>
                            <th scope="col" className="py-4 px-6 border-b border-gray-300">CM Phone</th>
                            <th scope="col" className="py-4 px-6 border-b border-gray-300">Alternative Number</th>
                            <th scope="col" className="py-4 px-6 border-b border-gray-300">Email</th>
                            <th scope="col" className="py-4 px-6 border-b border-gray-300">Status</th>
                            <th scope="col" className="py-4 px-6 border-b border-gray-300">Comment</th>
                            <th scope="col" className="py-4 px-6 border-b border-gray-300">Shipment Type</th>
                            <th scope="col" className="py-4 px-6 border-b border-gray-300">Address</th>
                            <th scope="col" className="py-4 px-6 border-b border-gray-300">Post Type</th>
                            <th scope="col" className="py-4 px-6 border-b border-gray-300">Post</th>
                            <th scope="col" className="py-4 px-6 border-b border-gray-300">Sub District / Taluka</th>
                            <th scope="col" className="py-4 px-6 border-b border-gray-300">City / District</th>
                            <th scope="col" className="py-4 px-6 border-b border-gray-300">Pincode</th>
                            <th scope="col" className="py-4 px-6 border-b border-gray-300">State</th>
                            <th scope="col" className="py-4 px-6 border-b border-gray-300">Disease</th>
                            <th scope="col" className="py-4 px-6 border-b border-gray-300">Amount</th>
                            <th scope="col" className="py-4 px-6 border-b border-gray-300">Products</th>
                            <th scope="col" className="py-4 px-6 border-b border-gray-300">Quantity</th>
                        </tr>
                    </thead>
                    <tbody>
                        {data.map((rowData) => (
                            <Section2Row key={rowData._id} rowData={rowData} setData={setData} />
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default Section2Table;