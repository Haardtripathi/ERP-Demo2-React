import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';

const Navbar = () => {
    const [isMobileMenuOpen, setMobileMenuOpen] = useState(false);
    const [isDropdownOpen, setDropdownOpen] = useState(false);
    const location = useLocation();

    // Toggle mobile menu
    const toggleMobileMenu = () => setMobileMenuOpen(prev => !prev);

    // Toggle dropdown menu
    const toggleDropdown = () => setDropdownOpen(prev => !prev);

    return (
        <nav className="bg-gray-900 border-b border-gray-700 p-4 shadow-md">
            <div className="container mx-auto flex justify-between items-center">
                {/* Navbar Brand */}
                <Link className="text-white text-2xl font-semibold hover:text-gray-300 transition-colors" to="/">Brand</Link>

                {/* Mobile Menu Button */}
                <button
                    className="text-white lg:hidden flex items-center focus:outline-none"
                    onClick={toggleMobileMenu}
                    aria-label="Toggle navigation"
                >
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16"></path>
                    </svg>
                </button>

                {/* Navbar Links */}
                <div className={`lg:flex items-center space-x-6 ${isMobileMenuOpen ? 'block' : 'hidden'}`}>
                    <Link className="text-white hover:text-gray-400 transition-colors" to="/">Home</Link>
                    <Link className="text-white hover:text-gray-400 transition-colors" to="#">Link</Link>

                    {/* Dropdown Menu */}
                    <div className="relative">
                        <button
                            className="text-white hover:text-gray-400 transition-colors flex items-center"
                            onClick={toggleDropdown}
                            aria-haspopup="true"
                            aria-expanded={isDropdownOpen}
                        >
                            Dropdown
                            <svg className={`w-4 h-4 ml-2 transition-transform ${isDropdownOpen ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
                            </svg>
                        </button>
                        {isDropdownOpen && (
                            <ul className="absolute mt-2 right-0 space-y-2 bg-gray-800 text-gray-200 rounded-md shadow-lg border border-gray-700 z-10">
                                <li><Link className="block px-4 py-2 hover:bg-gray-700 transition-colors" to="#">Action</Link></li>
                                <li><Link className="block px-4 py-2 hover:bg-gray-700 transition-colors" to="#">Another action</Link></li>
                                <li><hr className="border-t border-gray-600" /></li>
                                <li><Link className="block px-4 py-2 hover:bg-gray-700 transition-colors" to="#">Something else here</Link></li>
                            </ul>
                        )}
                    </div>

                    {/* Dynamic Form Buttons */}
                    <div className="flex space-x-4">
                        {location.pathname === '/workbook' && (
                            <>
                                <Link className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors" to="/addIncomingData">Add Incoming</Link>
                                <Link className="bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700 transition-colors" to="/addLeadData">Add Lead</Link>
                            </>
                        )}
                        {location.pathname === '/incoming' && (
                            <Link className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors" to="/addIncomingData">Add Incoming</Link>
                        )}
                        {location.pathname === '/lead' && (
                            <Link className="bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700 transition-colors" to="/addLeadData">Add Lead</Link>
                        )}
                    </div>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
