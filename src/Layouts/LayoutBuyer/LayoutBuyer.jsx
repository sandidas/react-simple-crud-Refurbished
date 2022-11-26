import { AppShell, Header, Navbar } from '@mantine/core';
import React, { useContext, useState } from 'react';
import { Navigate, Outlet, useLocation } from 'react-router-dom';
import Loader from '../../Components/Loader/Loader';
import NavigationBar from '../../Components/NavigationBar/NavigationBar'; 
import UserContext from '../../Context/UserContext';
import DashboardSidebar from '../../Pages/Shared/DashboardSidebar';

const LayoutBuyer = () => {
    const { userRole, loading, isRoleLoading } = useContext(UserContext);
    const location = useLocation();
    const [sideBarOpened, setSideBarOpened] = useState(false);

    if (loading || isRoleLoading) {
        return <Loader />;
    }
    if (userRole !== "Buyer") {
        return <Navigate to='/' state={{ from: location }} replace />;
    }
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

export default LayoutBuyer;