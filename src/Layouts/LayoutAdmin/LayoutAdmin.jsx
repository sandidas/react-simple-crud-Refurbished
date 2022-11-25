import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import Header from '../../Components/Header/Header';
import DashboardSideBar from '../../Pages/Dashboard/Shared/DashboardSideBar';

const LayoutAdmin = () => {
    return (
        <>
            <Header />
            <div className='dark:bg-gray-800 dark:text-gray-100 backdrop-blur-2xl transition-colors duration-500 px-5 min-h-[calc(100vh-64px)] py-5'>
                <div className='max-w-[95%] mx-auto grid grid-cols-12 gap-5'>
                    <div className='col-span-4 xl:col-span-3'><DashboardSideBar /></div>
                    <div className='col-span-8 xl:col-span-9'><Outlet></Outlet></div>
                </div>
            </div>
        </>
    );
};

export default LayoutAdmin;