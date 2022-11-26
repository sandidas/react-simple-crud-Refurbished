import { AppShell, Burger, Header, MediaQuery, Navbar } from '@mantine/core';
import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import HeaderGuest from '../Components/Guest/HeaderGuest/HeaderGuest';
import SellerSideNav from '../Components/Seller/SellerSideNav/SellerSideNav'
import { useLocalStorage } from '@mantine/hooks';

const LayoutDashboardSeller = () => {
    const [sideBarOpened, setSideBarOpened] = useState(false);
    return (
        <>
            <AppShell
                header={<Header height={60} p="xs"> <HeaderGuest setSideBarOpened={setSideBarOpened} sideBarOpened={sideBarOpened} /> </Header>}
                navbar={<SellerSideNav setSideBarOpened={setSideBarOpened} sideBarOpened={sideBarOpened} />}
            >

                <Outlet></Outlet>
            </AppShell>

        </>
    );
};

export default LayoutDashboardSeller;