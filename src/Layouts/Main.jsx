import { AppShell, Header } from '@mantine/core';
import React from 'react';
import { Outlet } from 'react-router-dom';
import NavigationBar from '../Components/NavigationBar/NavigationBar';




const Main = () => {
    return (
        <>
            <AppShell
                header={<Header height={60} p="md"> <NavigationBar /> </Header>}
            >
                <Outlet></Outlet>
            </AppShell>

        </>
    );
};

export default Main;
