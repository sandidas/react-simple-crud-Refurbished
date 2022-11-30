
import React, { useContext } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import SmallSpinner from '../Components/Spinner/SmallSpinner';
import { AuthContext } from '../Context/UserContext';

//=====================================
//
// THIS ROUTE ONLY FOR CLIENTs TYPE OF USER
// WE HAVE 3 KINDS OF USER TYPE
// guest (visitors), client, & Admin
//
//=====================================
const PrivateRoute = ({ children }) => {
    const { user, loading, userRole, isRoleLoading } = useContext(AuthContext);
    const location = useLocation();

    if (loading) {
        return <SmallSpinner />
    }
    if (user && user?.uid) {
        return children
    }
    return <Navigate to='/login' state={{ from: location }} replace />

};

export default PrivateRoute;