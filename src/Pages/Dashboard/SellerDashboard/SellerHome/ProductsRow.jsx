import { Avatar, Button } from '@mantine/core';
import React from 'react';

const ProductsRow = ({ product, i, setModalOpened, setModalData }) => {

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
                <Button className='bg-red-900'>
                    Advertise
                </Button>
            </td>
        </tr>
    );
};

export default ProductsRow;