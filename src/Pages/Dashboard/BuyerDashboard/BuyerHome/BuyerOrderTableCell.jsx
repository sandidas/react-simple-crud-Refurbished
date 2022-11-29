import { async } from '@firebase/util';
import { Avatar, Button, Modal } from '@mantine/core';
import { Elements } from '@stripe/react-stripe-js';
import React, { useState } from 'react';
import CheckOutForm from './CheckOutForm';


const BuyerOrderTableCell = ({ order, stripePromise }) => {
    const orderDate = new Date(order?.orderTime);
    const [opened, setOpened] = useState(false);
    return (
        <>
            <tr className="border-b border-opacity-20 dark:border-gray-700 dark:bg-gray-900">
                <td className="p-3">
                    <Avatar src={order?.photoUrl} alt="it's me" />
                </td>
                <td className="p-3">
                    <p> {order?.productTitle} </p>
                </td>
                <td className="p-3">
                    <p> ${order?.productPrice} </p>
                </td>
                <td className="p-3">
                    <p>{orderDate.toDateString()}</p>
                </td>
                <td className="p-3 text-right">
                    <Button onClick={() => setOpened(true)} color="grape" className='bg-red-700'>
                        Pay Now
                    </Button>
                </td>
            </tr>
            <Modal centered
                opened={opened}
                onClose={() => setOpened(false)}
                title="Introduce yourself!"
            >
                {/* Modal content */}
                <Elements stripe={stripePromise}>
                    <CheckOutForm order={order} />
                </Elements>

            </Modal>
        </>
    );
};

export default BuyerOrderTableCell;