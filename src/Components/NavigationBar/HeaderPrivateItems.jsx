import { Avatar, UnstyledButton, Indicator, Menu, Text, Button } from '@mantine/core';
import React from 'react';
import { IconSettings, IconSearch, IconPhoto, IconMessageCircle, IconTrash, IconArrowsLeftRight } from '@tabler/icons';
import { Link } from 'react-router-dom';


const HeaderPrivateItems = ({ user, userRole, handleUserSignout }) => {

    const dashboardLink = userRole === "Seller" && "/dashboard/seller/" || userRole === "Buyer" && "/dashboard/buyer/" || userRole === "Admin" && "/dashboard/admin/";
    return (
        <div className='flex items-center gap-2'>
            <Button variant="default" component={Link} to={dashboardLink}  > Dashboard </Button>



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
                    <Menu.Label>Application</Menu.Label>
                    <Menu.Item icon={<IconSettings size={14} />}>Settings</Menu.Item>
                    <Menu.Item icon={<IconSettings size={14} />}>Settings</Menu.Item>
                    <Menu.Item icon={<IconMessageCircle size={14} />}>Messages</Menu.Item>
                    <Menu.Item icon={<IconPhoto size={14} />}>Gallery</Menu.Item>
                    <Menu.Item
                        icon={<IconSearch size={14} />}
                        rightSection={<Text size="xs" color="dimmed">⌘K</Text>}
                    >
                        Search
                    </Menu.Item>

                    <Menu.Divider />

                    <Menu.Label>Danger zone</Menu.Label>
                    <Menu.Item icon={<IconArrowsLeftRight size={14} />}>Transfer my data</Menu.Item>
                    <Menu.Item onClick={handleUserSignout} color="red" icon={<IconTrash size={14} />}>SignOut</Menu.Item>
                </Menu.Dropdown>
            </Menu>
        </div>
    );
};

export default HeaderPrivateItems;