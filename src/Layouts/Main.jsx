import { AppShell, Header, Footer } from '@mantine/core';
import React from 'react';
import { Outlet } from 'react-router-dom';
import MyFooter from '../Components/Footer/MyFooter';
import NavigationBar from '../Components/NavigationBar/NavigationBar';




const Main = () => {
    return (
        <>
            <AppShell
                header={<Header height={60} p="md"> <NavigationBar /> </Header>}
                footer={<Footer p="md"> <MyFooter /> </Footer>}
            >
                <Outlet></Outlet>
            </AppShell>

        </>
    );
};

export default Main;
