import { Box, NavLink } from '@mantine/core';
import { IconBasket, IconBuildingStore, IconDeviceWatchStats, IconMessageReport } from '@tabler/icons';
import React from 'react';
import { Link, useLocation } from 'react-router-dom';

const DashboardSidebar = () => {
    const location = useLocation();

    

    const items = [
        {
            link: '',
            label: 'Products',
            icon: IconDeviceWatchStats,
            open: true,
            subItems: [
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
                            item?.subItems?.map(subItem => (
                                <NavLink
                                    key={subItem.label}
                                    component={Link}
                                    to={subItem.link}
                                    label={subItem.label}
                                    active={location.pathname === subItem.link}
                                />
                            ))
                        }
                    </NavLink>
                ))
            }
        </Box>
    );
};

export default DashboardSidebar;