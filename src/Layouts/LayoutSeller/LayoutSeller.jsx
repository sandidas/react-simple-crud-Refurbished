import { AppShell, Footer, Header, Navbar } from '@mantine/core';
import React, { useContext, useState } from 'react';
import { Navigate, Outlet, useLocation } from 'react-router-dom';
import NavigationBar from '../../Components/NavigationBar/NavigationBar';
import SmallSpinner from '../../Components/Spinner/SmallSpinner';
import { AuthContext } from '../../Context/UserContext';
import DashboardSidebar from '../../Pages/Shared/DashboardSidebar';


const LayoutSeller = () => {
    const { userRole, loading, isRoleLoading } = useContext(AuthContext);
    const location = useLocation();
    const [sideBarOpened, setSideBarOpened] = useState(false);

    if (loading || isRoleLoading) {
        return <SmallSpinner />;
    }

    if (userRole !== "Seller") {
        return <Navigate to='/dashboard' state={{ from: location }} replace />;
    }

    return (
        <>
            <AppShell
                header={<Header height={60} p="md">
                    <NavigationBar sideBarOpened={sideBarOpened} setSideBarOpened={setSideBarOpened} />
                </Header>}
                // footer={<Footer p="md"> <MyFooter />  </Footer>}
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

export default LayoutSeller;