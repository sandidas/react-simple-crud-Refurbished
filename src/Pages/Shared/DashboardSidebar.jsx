import { Box, Button, NavLink } from '@mantine/core';
import { IconBasket, IconBuildingStore, IconDeviceWatchStats, IconListDetails, IconLogout, IconMessageReport } from '@tabler/icons';
import React from 'react';
import { useContext } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { AuthContext } from '../../Context/UserContext';

const DashboardSidebar = () => {
    const location = useLocation();
    const { userRole, userSignOut } = useContext(AuthContext);

    const items = [
        // =========================== 
        // Seller type users Items
        // ===========================
        {
            link: '',
            label: 'Products',
            icon: IconDeviceWatchStats,
            open: true,
            typeof: 'Seller',
            subItems: [
                {
                    link: '/dashboard/seller/product/add',
                    label: 'Add product',
                },
                {
                    link: '/dashboard/seller/',
                    label: 'Products',
                },
            ],
        },
        // =========================== 
        // Buyer type users Items
        // =========================== 
        {
            link: '/dashboard/buyer/',
            label: 'My Orders',
            icon: IconListDetails,
            typeof: 'Buyer',
        },
        // =========================== 
        // admin type users Items
        // =========================== 
        {
            link: '/dashboard/admin/sellers',
            label: 'All Sellers',
            icon: IconBuildingStore,
            typeof: 'Admin',
        },
        {
            link: '/dashboard/admin/buyers',
            label: 'All Buyers',
            icon: IconBasket,
            typeof: 'Admin',
        },
        {
            link: '/dashboard/admin/reports',
            label: 'Reported Items',
            icon: IconMessageReport,
            typeof: 'Admin',
        }
    ]

    const itemsRoleWise = items.filter(item => {
        return item.typeof === userRole;
    })
    // console.log(newItems);

    return (
        <Box>
            <div className='p-2 dark:bg-gray-700 dark:text-white font-bold'>{userRole} Dasboard </div>
            {
                itemsRoleWise.map(item => (
                    <NavLink
                        className='my-3'
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
            <Button className='w-full mt-5 space-x-2' variant="default" onClick={userSignOut} > <IconLogout size={14} /> Sign Out </Button>
        </Box>
    );
};

export default DashboardSidebar;