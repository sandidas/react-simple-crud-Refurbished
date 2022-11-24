import React from 'react';
import { Outlet } from 'react-router-dom';
import HeaderGuest from '../Components/Guest/HeaderGuest/HeaderGuest';

const Main = () => {
    return (
        <>
            <HeaderGuest />
            <Outlet></Outlet>
        </>
    );
};

export default Main;