import React, { useContext } from 'react';
import { Navigate, useLocation, useNavigate } from 'react-router-dom';
import SmallSpinner from '../../Components/Spinner/SmallSpinner';
import { AuthContext } from '../../Context/UserContext';

const NotForLoggedInUser = ({ children }) => {
    const { user, loading } = useContext(AuthContext);
    const location = useLocation();
    const navigate = useNavigate();

    if (loading) {
        return <SmallSpinner />
    } else {
        if (!user || !user.uid) {
            return children
        } else {
            return <Navigate to='/' state={{ from: location }} replace  ></Navigate>
        }
    }


};

export default NotForLoggedInUser;