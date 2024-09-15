import React from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from '../components/Navbar';
import SideNav from '../components/SideNav';

const MainLayout = () => {
    return (
        <div className="flex flex-col min-h-screen">
            <Navbar />
            <div className="flex flex-1">
                <SideNav />
                <main className="flex-1 p-4 overflow-hidden">
                    <Outlet />
                </main>
            </div>
        </div>
    );
};


export default MainLayout;
