import { Avatar, UnstyledButton, Indicator, Menu, Text, Button } from '@mantine/core';
import React from 'react';
import { IconLogout } from '@tabler/icons';
import { Link } from 'react-router-dom';

const HeaderPrivateItems = ({ user, userRole, handleUserSignout }) => {

    const dashboardLink = userRole === "Seller" && "/dashboard/seller/" || userRole === "Buyer" && "/dashboard/buyer/" || userRole === "Admin" && "/dashboard/admin/";
    return (
        <div className='flex items-center gap-2'>
            <Button variant="default" component={Link} to={dashboardLink}  > Dashboard </Button>

            <Button variant="default" onClick={handleUserSignout} > <IconLogout size={14} /> </Button>

            <Menu shadow="md" width={200} position="top-end" >
                <Menu.Target>
                    <Indicator dot inline size={10} offset={5} position="top-end" color="green" withBorder>
                        <UnstyledButton className='flex items-center'>
                            <Avatar
                                size="md"
                                radius="xl"
                                src={user?.photoURL && user?.photoURL}
                            />
                        </UnstyledButton>
                    </Indicator>
                </Menu.Target>
                <Menu.Dropdown>
                    <Menu.Item onClick={handleUserSignout} color="red" icon={<IconLogout size={14} />}>SignOut</Menu.Item>
                </Menu.Dropdown>
            </Menu>
        </div>
    );
};

export default HeaderPrivateItems;