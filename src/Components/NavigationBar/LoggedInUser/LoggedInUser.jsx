import React from 'react';
import { NavLink } from 'react-router-dom';

import SmallSpinner from '../../Spinner/SmallSpinner';


const LoggedInUser = ({ userRole }) => {



    const dashboardLink = userRole === "Seller" && "/dashboard/seller/" || userRole === "Buyer" && "/dashboard/buyer/" || userRole === "Admin" && "/dashboard/admin/";


    return (
        <>
            <li className="flex group font-bold">
                <NavLink to={dashboardLink} className={({ isActive }) => (isActive ?
                    "dark:text-white text-purple-800 hover:text-white"
                    :
                    "hover:underline")} >
                    Dashboard
                </NavLink>
            </li>

        </>
    );
};

export default LoggedInUser;