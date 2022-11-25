import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';

const MenuLinks = () => {
    const navigate = useNavigate();
    return (
        <>
            <li className="flex group font-bold">
                <NavLink to="/login" className={({ isActive }) => (isActive ?
                    "dark:text-white text-purple-800 hover:text-white"
                    :
                    "hover:underline")} >
                    Login
                </NavLink>
            </li>
            <li className="flex group font-bold">
                <NavLink to="/login" className={({ isActive }) => (isActive ?
                    "dark:text-white text-purple-800 hover:text-white"
                    :
                    "hover:underline")} >
                    Login
                </NavLink>
            </li>
            <li className="flex group font-bold">
                <NavLink to="/login" className={({ isActive }) => (isActive ?
                    "dark:text-white text-purple-800 hover:text-white"
                    :
                    "hover:underline")} >
                    Login
                </NavLink>
            </li>
        </>
    );
};

export default MenuLinks;