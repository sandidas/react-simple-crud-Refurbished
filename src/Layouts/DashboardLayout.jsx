import React, { useState } from 'react';
import Header from '../Components/Header/Header';
import { Outlet } from "react-router-dom";
import DashboardLeftSidebard from '../Components/DashboardLeftSidebard/DashboardLeftSidebard';
const DashboardLayout = () => {
    const [showHideSideNav, setShowHideSideNav] = useState(true);
    return (
        <>

            <Header showHideSideNav={showHideSideNav} setShowHideSideNav={setShowHideSideNav} />
           
            <button className="p-2 fixed top-20 left-16 z-20" onClick={() => setShowHideSideNav(!showHideSideNav)}>
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" className="w-5 h-5 fill-current dark:text-gray-100">
                    <rect width="352" height="32" x="80" y="96"></rect>
                    <rect width="352" height="32" x="80" y="240"></rect>
                    <rect width="352" height="32" x="80" y="384"></rect>
                </svg>
            </button>


            <div className='grid grid-cols-1 lg:grid-cols-12 mx-auto min-h-[calc(100vh-64px)]'>
                <aside className={showHideSideNav ? 'lg:col-span-3 dark:bg-gray-900 dark:text-gray-100 bg-slate-100 backdrop-blur-2xl transition-colors duration-500 p-5' : 'hidden'}>

                    <DashboardLeftSidebard />



                </aside>
                <div className='lg:col-span-9 p-5  dark:bg-gray-800 dark:text-gray-100 backdrop-blur-2xl transition-colors duration-500'>
                    <div className='dark:bg-gray-900 px-5 py-10 rounded-md border border-slate-100 dark:border-none shadow-md'>
                        <Outlet></Outlet>
                    </div>
                </div>

            </div>


        </>
    );
};

export default DashboardLayout;