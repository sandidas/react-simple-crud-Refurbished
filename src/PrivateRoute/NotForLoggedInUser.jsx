import React, { useContext } from 'react';
import { Navigate, useLocation, useNavigate } from 'react-router-dom';
import Loader from '../Components/Loader/Loader';
import { AuthContext } from '../Context/UserContext';

const NotForLoggedInUser = ({ children }) => {
    const { user, loading } = useContext(AuthContext);
    const location = useLocation();
    const navigate = useNavigate();
    if (loading) {
        return <Loader />
    }
    if (!user || !user.uid) {
        return children
    }
    return <Navigate to='/' state={{ from: location }} replace  ></Navigate>

};

export default NotForLoggedInUser;