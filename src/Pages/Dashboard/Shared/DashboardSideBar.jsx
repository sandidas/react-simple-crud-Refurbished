import React from 'react';
import { NavLink } from 'react-router-dom';

const DashboardSideBar = () => {
    return (
        <div>
            <ul>
                <li className="flex group font-bold">
                    <NavLink to="/login" className={({ isActive }) => (isActive ?
                        "dark:text-white text-purple-800 hover:text-white"
                        :
                        "hover:underline")} >
                        Dashboard
                    </NavLink>
                </li>
            </ul>
        </div>
    );
};

export default DashboardSideBar;