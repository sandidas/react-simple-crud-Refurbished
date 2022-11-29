import { AppShell, Header, Navbar } from '@mantine/core';
import React, { useContext, useState } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import NavigationBar from '../../Components/NavigationBar/NavigationBar';
import DashboardSidebar from '../../Pages/Shared/DashboardSidebar';

const LayoutCommonDashboard = () => {

    const location = useLocation();
    const [sideBarOpened, setSideBarOpened] = useState(false);

  
    return (
        <>
            <AppShell
                header={<Header height={60} p="md">
                    <NavigationBar sideBarOpened={sideBarOpened} setSideBarOpened={setSideBarOpened} />
                </Header>}
                navbarOffsetBreakpoint="md"
                navbar={
                    <Navbar p='md' width={{ sm: 200, lg: 300 }} hidden={!sideBarOpened} hiddenBreakpoint="md"   >
                        <DashboardSidebar />
                    </Navbar>
                }
            >
                <Outlet></Outlet>
            </AppShell>
        </>
    );
};

export default LayoutCommonDashboard;