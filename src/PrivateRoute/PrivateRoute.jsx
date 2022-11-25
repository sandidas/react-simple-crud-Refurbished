import React, { useContext, useState } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import Loader from '../Components/Loader/Loader';
import { AuthContext } from '../Context/UserContext';
import LeftSideBar from '../Components/LeftSideBar/LeftSideBar';
//=====================================
//
//
//
// THIS ROUTE ONLY FOR CLIENTs TYPE OF USER
// WE HAVE 3 KINDS OF USER TYPE
// guest (visitors), client, & Admin
//
//
//
//
//=====================================
const PrivateRoute = ({ children }) => {
    const location = useLocation();
    const { user, loading } = useContext(AuthContext);


    if (loading) {
        return ''
    }
    if (user && user?.uid) {
        return (
            <>
                <div className='grid grid-cols-1 lg:grid-cols-12 mx-auto min-h-[90vh]'>
                    <div className='lg:col-span-9 px-5  dark:bg-gray-800 dark:text-gray-100'>
                        <div className='dark:bg-gray-900 px-5 py-10 rounded-md border border-slate-100 dark:border-none shadow-md'>
                            {children}
                        </div>
                    </div>
                </div>
            </>
        )
    }
    return <Navigate to='/login' state={{ from: location }} replace />

};

export default PrivateRoute;