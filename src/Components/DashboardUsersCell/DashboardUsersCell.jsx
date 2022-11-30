import { async } from '@firebase/util';
import { Avatar, Badge, Button, Indicator, Modal } from '@mantine/core';
import { IconCheck } from '@tabler/icons';
import React, { useContext, useState } from 'react';
import toast from 'react-hot-toast';
import { AuthContext } from '../../Context/UserContext';

const DashboardUsersCell = ({ oneUser, refetch }) => {
    const [opened, setOpened] = useState(false);
    const { user, userRole } = useContext(AuthContext);
    const [sellerVerified, serSellerVerified] = useState(oneUser.sellerIsVerified);



    const handleUserDelete = async (userData) => {
        const toDeleteUser = userData?.uid;

        const uri = `${import.meta.env.VITE_serverUrl}/deleteUser?uid=${user?.uid}&role=${userRole}&toDeleteUser=${toDeleteUser}`;
        const settings = {
            method: 'DELETE',
            headers: {
                'content-type': 'application/json',
                authorization: `Bearer ${localStorage.getItem('refurbished')}`
            }
        };
        try {
            const fetchResponse = await fetch(uri, settings);
            const data = await fetchResponse.json();
            if (data.success === true) {
                setOpened(false)
                refetch();
                toast.success("User Deleted Successfully");
            } else if (data.success === false) {
                setOpened(false)
                toast.error(data.message)
            } else {
                setOpened(false)
                toast.error(data.message)
            }
        } catch (error) {
            setOpened(false)
            // console.log(error);
            toast.error(data.message)
        }
    }

    const handleUserUpdate = async (status, userUid) => {
        console.log(status);
        console.log(userUid);
        const userInformation = {
            sellerIsVerified: status,
        }
        const uri = `${import.meta.env.VITE_serverUrl}/userEdit?uid=${user?.uid}&toUpdateUser=${userUid}`;
        const settings = {
            method: 'PATCH',
            headers: {
                'content-type': 'application/json',
                authorization: `Bearer ${localStorage.getItem('refurbished')}`
            }, body: JSON.stringify(userInformation)
        };
        try {
            const fetchResponse = await fetch(uri, settings);
            const data = await fetchResponse.json();
            if (data.success === true) {
                setOpened(false)
                refetch();
                toast.success("User Updated Successfully");
            } else if (data.success === false) {
                setOpened(false)
                toast.error(data.message)
            } else {
                setOpened(false)
                toast.error(data.message)
            }
        } catch (error) {
            setOpened(false)
            // console.log(error);
            toast.error(data.message)
        }
    }


    const handleUserMakeAdmin = async (userUid) => {
        const userInformation = {
            role: "Admin",
            is_admin: true,
        }
        const uri = `${import.meta.env.VITE_serverUrl}/userEdit?uid=${user?.uid}&toUpdateUser=${userUid}`;
        const settings = {
            method: 'PATCH',
            headers: {
                'content-type': 'application/json',
                authorization: `Bearer ${localStorage.getItem('refurbished')}`
            }, body: JSON.stringify(userInformation)
        };
        try {
            const fetchResponse = await fetch(uri, settings);
            const data = await fetchResponse.json();
            if (data.success === true) {
                setOpened(false)
                refetch();
                toast.success("User Updated Successfully");
            } else if (data.success === false) {
                setOpened(false)
                toast.error(data.message)
            } else {
                setOpened(false)
                toast.error(data.message)
            }
        } catch (error) {
            setOpened(false)
            // console.log(error);
            toast.error(data.message)
        }
    }



    return (
        <>
            <tr className="border-b border-opacity-20 dark:border-gray-700 dark:bg-gray-900">
                <td className="p-3">
                    <p> {oneUser?.email} </p>
                    <p className='text-gray-500'> <small> <i>{oneUser?.uid}</i> </small> </p>
                </td>
                <td className="p-3 flex">

                    <Indicator inline label={oneUser?.sellerIsVerified && <IconCheck size={10} />} size={12}>
                        <Avatar src={oneUser?.photoURL} alt="it's me" />

                    </Indicator>



                </td>
                <td className="p-3">
                    <p> {oneUser?.name} </p>
                </td>
                <td className="p-3">
                    <p> {oneUser?.role} </p>
                </td>
                <td className="p-3 space-x-2">
                    <Button.Group>
                        {
                            user?.uid !== oneUser?.uid &&
                            <Button color="pink" compact onClick={() => setOpened(true)}>
                                Delete
                            </Button>
                        }

                        {
                            oneUser?.role === "Seller" &&
                            <Button compact
                                onClick={() => handleUserUpdate(!oneUser?.sellerIsVerified, oneUser?.uid)} >
                                {oneUser?.sellerIsVerified ? "Cancel Verification" : "Verify Now"}
                            </Button>

                        }

                        {/* make admin  */}

                        {
                            userRole === "Admin" && oneUser?.role !== "Admin" &&
                            <Button color="orange" compact onClick={() => handleUserMakeAdmin(oneUser?.uid)} >
                                Make Admin
                            </Button>

                        }

                    </Button.Group>





                </td>
            </tr>

            <Modal
                opened={opened} centered
                onClose={() => setOpened(false)}
                title={`Are you sure you want to delete ${oneUser?.name}`}
            >
                {/* Modal content */}
                <div className='space-x-4 flex justify-end'>
                    <Button color="red" className='bg-red-600'
                        onClick={() => { handleUserDelete(oneUser); setOpened(false) }}
                    >
                        Delete
                    </Button>
                    <Button color="white" className='bg-gray-500' onClick={() => setOpened(false)}>
                        Cancel
                    </Button>
                </div>
            </Modal>






        </>



    );
};

export default DashboardUsersCell;