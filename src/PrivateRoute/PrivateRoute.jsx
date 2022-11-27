import { Loader } from '@mantine/core';
import React, { useContext } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { AuthContext } from '../Context/UserContext';

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
    const { user, loading } = useContext(AuthContext);
    const location = useLocation();



    if (loading) {
        return <Loader variant='bars' color="white" className='mx-auto min-h-[-calc(100vh_-_681)] sm:min-h-[calc(100vh_-_659px)] md:min-h-[calc(100vh_-_601px)]' />
    }
    if (user && user?.uid) {
        return children
    }
    return <Navigate to='/login' state={{ from: location }} replace />

};

export default PrivateRoute;