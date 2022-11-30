import { LoadingOverlay } from '@mantine/core';
import React, { useContext } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { AuthContext } from '../Context/UserContext';

//=====================================
//
// THIS ROUTE ONLY FOR CLIENTs TYPE OF USER
// WE HAVE 3 KINDS OF USER TYPE
// guest (visitors), client, & Admin
//
//=====================================
const PrivateRoute = ({ children }) => {
    const { user, loading, userRole, isRoleLoading  } = useContext(AuthContext);
    const location = useLocation();

    if (loading) {
        return <LoadingOverlay
        loaderProps={{ size: 'md', color: 'pink', variant: 'bars' }}
        overlayOpacity={0}
        overlayBlur={2}
        overlayColor="#c5c5c5"
        visible
    />
    }
    if (user && user?.uid) {
        return children
    }
    return <Navigate to='/login' state={{ from: location }} replace />

};

export default PrivateRoute;