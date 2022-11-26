import { IconBasket, IconBuildingStore, IconDeviceWatchStats, IconMessageReport } from '@tabler/icons';
import React, { useState } from 'react';
import { NavLink, Navbar, Box } from '@mantine/core';
import { useLocation, Link } from 'react-router-dom';

const SellerSideNav = ({ sideBarOpened, setSideBarOpened }) => {
    console.log(sideBarOpened);


    const location = useLocation();
    const items = [
        {
            link: '',
            label: 'Products',
            icon: IconDeviceWatchStats,
            open: true,
            children: [
                {
                    link: '/dashboard/product/add',
                    label: 'Add product',
                },
                {
                    link: '/dashboard/products',
                    label: 'Products',
                },
            ],
        },
        {
            link: '/dashboard/sellers',
            label: 'All Sellers',
            icon: IconBuildingStore,
        },
        {
            link: '/dashboard/buyers',
            label: 'All Buyers',
            icon: IconBasket,
        },
        {
            link: '/dashboard/reports',
            label: 'Reported Items',
            icon: IconMessageReport,
        }
    ]

    return (
        <>
            <Navbar p="xs" width={{ sm: 200, lg: 400, }} hidden={!sideBarOpened}  >

                <Box>
                    {
                        items.map(item => (
                            <NavLink
                                key={item.label}
                                component={Link}
                                to={item.link}
                                label={item.label}
                                icon={<item.icon size={16} stroke={1.5} />}
                                active={location.pathname === item.link}
                                defaultOpened={item?.open}
                            >
                                {
                                    item?.children?.map(child => (
                                        <NavLink
                                            key={child.label}
                                            component={Link}
                                            to={child.link}
                                            label={child.label}
                                            active={location.pathname === child.link}
                                        />
                                    ))
                                }
                            </NavLink>
                        ))
                    }
                </Box>
            </Navbar>
        </>
    );
};

export default SellerSideNav;