import React from 'react';
import { Link } from 'react-router-dom';

const SideNav = () => {
    return (
        <nav className="bg-gray-800 text-gray-100 w-64 min-h-screen p-4 shadow-md">
            <ul className="space-y-4">
                <li>
                    <Link className="block px-4 py-2 rounded-lg hover:bg-gray-700 transition-colors" to="/workbook">Workbook</Link>
                </li>
                <li>
                    <Link className="block px-4 py-2 rounded-lg hover:bg-gray-700 transition-colors" to="/incoming">Incoming</Link>
                </li>
                <li>
                    <Link className="block px-4 py-2 rounded-lg hover:bg-gray-700 transition-colors" to="/lead">Lead</Link>
                </li>
                <li>
                    <hr className="border-t border-gray-600 my-4" />
                </li>
                <li>
                    <Link className="block px-4 py-2 rounded-lg hover:bg-gray-700 transition-colors" to="/pending">Pending</Link>
                </li>
            </ul>
        </nav>
    );
};

export default SideNav;
