import React, { useContext, useState } from 'react';
import { Navigate, Outlet, useLocation } from 'react-router-dom';
import Header from '../../Components/Header/Header';
import Loader from '../../Components/Loader/Loader';
import { AuthContext } from '../../Context/UserContext';
import useUserRole from '../../Hooks/useUserRole';
import DashboardSideBar from '../../Pages/Dashboard/Shared/DashboardSideBar';

const LayoutBuyer = () => {
    const { user, loading, setLoading } = useContext(AuthContext);
    const uid = user?.uid || null;
    const [userRole, isRoleLoading] = useUserRole(uid);
    const location = useLocation();


    if (isRoleLoading || loading) {
        return <Loader />
    }
    // check user type 
    if (userRole !== "Buyer") {
        return <Navigate to='/' state={{ from: location }} replace />;
    }
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

export default LayoutBuyer;