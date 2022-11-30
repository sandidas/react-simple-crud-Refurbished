import { Button, Image, Modal } from '@mantine/core';
import React, { useState } from 'react';
import toast from 'react-hot-toast';

const AdminProductsCell = ({ user, product, i, refetch }) => {
    const [opened, setOpened] = useState(false);

    const handleProductDelete = async (productId) => {


        const uri = `${import.meta.env.VITE_serverUrl}/product?uid=${user?.uid}&productId=${productId}`;
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
                refetch();
                toast.success(data.message);
            } else if (data.success === false) {
                toast.error(data.message)
            } else {
                toast.error(data.message)
            }
        } catch (error) {
            // console.log(error);
            toast.error(data.message)
        }
    }


    return (
        <>
            <tr className="text-left">
                <td className="p-3">
                    <p>{product?.title} <br />
                        <small className='text-gray-500'>{product?._id}</small></p>
                </td>
                <td className="p-3">
                    <Image
                        width={30}
                        height={30}
                        fit="contain"
                        src={product?.photoUrl}
                    />
                </td>
                <td className="p-3"> ${product?.originalPrice}  </td>
                <td className="p-3"> ${product?.resalePrice}  </td>
                <td className="p-3"> {product?.status}  </td>

                <td className="p-3"><Button onClick={() => setOpened(true)} color='red' compact>
                    Delete
                </Button></td>
            </tr>
            <Modal
                opened={opened} centered
                onClose={() => setOpened(false)}
                title={`Are you sure you want to delete ${product?.title}`}
            >
                {/* Modal content */}
                <div className='space-x-4 flex justify-end'>
                    <Button color="red" className='bg-red-600'
                        onClick={() => { handleProductDelete(product?._id); setOpened(false) }}
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

export default AdminProductsCell;