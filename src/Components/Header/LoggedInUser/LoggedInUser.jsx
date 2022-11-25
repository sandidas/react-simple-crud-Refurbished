import React from 'react';
import { NavLink } from 'react-router-dom';


const LoggedInUser = () => {

    return (
        <>
            <li className="flex group font-bold">
                <NavLink to="/dashboard/seller/" className={({ isActive }) => (isActive ?
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