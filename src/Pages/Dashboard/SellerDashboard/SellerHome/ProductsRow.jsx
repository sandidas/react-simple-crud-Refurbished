import { Avatar, Button, Switch } from '@mantine/core';
import React, { useState } from 'react';
import { IconCheck, IconX } from '@tabler/icons';

const ProductsRow = ({ product, i, setModalOpened, setModalData, handleAdvertise }) => {
    const [checked, setChecked] = useState(false);


    return (
        <tr className="border-b border-opacity-20 dark:border-gray-700 dark:bg-gray-900">
            <td className="p-3">
                <p> {i + 1} </p>
            </td>
            <td className="p-3">
                {
                    product?.photoUrl &&
                    <Avatar src={product?.photoUrl} alt="it's me" />
                }

            </td>
            <td className="p-3">
                <p> {product?.title} </p>
            </td>
            <td className="p-3">
                <p> {product?.status} </p>
            </td>
            <td className="p-3">

                <Button className='bg-red-600'
                    onClick={() => { setModalOpened(true); setModalData(product) }}
                >
                    Edit
                </Button>

            </td>

            <td className="p-3 text-right">
                {
                    product?.status == 'Available' &&
                    (
                        product.isAdvertise ? <Button
                            onClick={() => { handleAdvertise(product?._id) }}
                            className='bg-red-700'>
                            Cancel Advertise
                        </Button> : <Button
                            onClick={() => { handleAdvertise(product?._id, true) }}
                            className='bg-red-900'>
                            Advertise
                        </Button>
                    )
                }



            </td>
        </tr>
    );
};

export default ProductsRow;