import { async } from '@firebase/util';
import { Avatar, Button, Modal } from '@mantine/core';
import React, { useContext, useState } from 'react';
import toast from 'react-hot-toast';
import { AuthContext } from '../../Context/UserContext';

const DashboardUsersCell = ({ oneUser, refetch }) => {
    const [opened, setOpened] = useState(false);
    const { user, userRole } = useContext(AuthContext)


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



    return (
        <>
            <tr className="border-b border-opacity-20 dark:border-gray-700 dark:bg-gray-900">
                <td className="p-3">
                    <p> {oneUser?.email} </p>
                    <p className='text-gray-500'> <small> <i>{oneUser?.uid}</i> </small> </p>
                </td>
                <td className="p-3">
                    <Avatar src={oneUser?.photoUrl} alt="it's me" />
                </td>
                <td className="p-3">
                    <p> {oneUser?.name} </p>
                </td>
                <td className="p-3">
                    <p> {oneUser?.role} </p>
                </td>
                <td className="p-3">
                    <Button onClick={() => setOpened(true)} className="bg-red-800">
                        Delete
                    </Button>
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