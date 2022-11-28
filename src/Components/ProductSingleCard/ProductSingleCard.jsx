import { Badge, Button, Card, Group, Image, Modal, Text } from '@mantine/core';
import { IconCheckbox } from '@tabler/icons';
import React, { useState } from 'react';
import { useContext } from 'react';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { useLocation } from 'react-router-dom';
import { AuthContext } from '../../Context/UserContext';
import ProductCardReportButton from './ProductCardReportButton';

const ProductSingleCard = ({ product, refetch }) => {
    const [opened, setOpened] = useState(false);
    const productCreate = new Date(product?.createdAt);
    const { user } = useContext(AuthContext);
    const [visible, setVisible] = useState(false);
    const location = useLocation();
    // console.log(user);
    // React hook form
    const { register, handleSubmit, reset, setValue, formState: { errors } } = useForm();
    const handleCreateOrder = async (data) => {
        const orderDetails = data;
        orderDetails['photoUrl'] = product.photoUrl;
        orderDetails['productId'] = product._id;
        orderDetails['uid'] = user.uid;
        orderDetails['orderTime'] = Date.now();
        orderDetails['transactionId'] = false;
        console.log(orderDetails);
        // setLoading(true);
        await storeItem(orderDetails)
    }

    const storeItem = async (itemData) => {

        const uri = `${import.meta.env.VITE_serverUrl}/orderCreate/`;
        const settings = {
            method: 'POST',
            headers: {
                'content-type': 'application/json',
                authorization: `Bearer ${localStorage.getItem('refurbished')}` // JWToken
            },
            body: JSON.stringify(itemData)
        };
        try {
            const fetchResponse = await fetch(uri, settings);
            const data = await fetchResponse.json();
            if (data.success) {
                toast.success(data.message)
                // now redirect to editing service page
                setVisible(!visible);
                setOpened(false)
                refetch();
                // navigate(from, { replace: true });

            } else if (data.status === 401) {
                toast.error(data.message)
                setVisible(!visible);
                setOpened(false)
                handleUserSignOut(); // un auth access, logout
            }
            else {
                setVisible(!visible)
                setOpened(false)
                toast.error(data.message)
            }
            setVisible(!visible)
            setOpened(false)
        } catch (error) {
            setVisible(!visible)
            console.log(error);
        }
    }


    const inputClasses = "w-full text-xl px-3 py-3 border rounded-md dark:border-gray-700 dark:bg-gray-900 dark:text-gray-100";
    const labelClasses = "block mb-2 pt-1 text-sm text-slate-400";

    return (
        <>
            <Card shadow="sm" p="lg" radius="md" withBorder>
                <Card.Section component="a" link="/">
                    <Image
                        src={product?.photoUrl}
                        height={160}
                        alt="Norway"
                    />
                </Card.Section>

                <Group position="apart" mt="md" mb="xs">
                    <Text weight={500}>
                        {product?.title}
                    </Text>
                    {product?.isAdvertise
                        &&
                        <Badge color="pink" variant="light">
                            Ad
                        </Badge>
                    }

                </Group>

                <div className='flex justify-between items-center border-b'>
                    <div className='text-sm'>
                        Location: {product?.location}
                    </div>
                    <div>
                        <span className='line-through text-xs pr-1'>${product?.originalPrice}</span>
                        <span>${product?.resalePrice}</span>
                    </div>
                </div>

                <div className='text-sm flex justify-end py-2 items-center border-b'>
                    <span className='pr-1'> Sold by:  {product?.sellerName}  </span>
                    <div className='bg-white p-1 rounded-md'>
                        {product?.userVerified &&
                            <IconCheckbox size={15} color="blue" />}
                    </div>
                </div>

                <div className='text-sm flex justify-between py-2 items-center border-b'>
                    <div>
                        <span className='pr-1'> <strong> {2022 - product?.yearOfPurchase} </strong> Years of Use </span>
                    </div>

                    <div>
                        Posted:   {productCreate.toDateString()}
                    </div>
                </div>

                <div className='text-sm flex justify-between py-2 items-center border-b'>
                    <div>
                        Report to admin
                    </div>
                    <ProductCardReportButton
                        product={product}
                        inputClasses={inputClasses}
                        labelClasses={labelClasses}
                    />

                </div>

                {user && user?.uid && !product?.isBooked ?
                    <Button variant="light" color="blue" fullWidth mt="md" radius="md"
                        onClick={() => setOpened(true)}
                    > Book now
                    </Button>
                    :
                    (product?.isBooked ? <div className='text-center py-2 px-3'>Already Booked</div> : <div className='text-center py-2 px-3'>Please Login to Book</div>)
                }
            </Card>


            {/* Modal for order      */}

            {
                user && user?.uid && <Modal
                    opened={opened}
                    centered
                    onClose={() => { setOpened(false); reset() }}
                    title="Order Details"
                >
                    {/* Modal content */}
                    <form className="space-y-4 ng-untouched ng-pristine ng-valid" onSubmit={handleSubmit(handleCreateOrder)}>
                        <div>
                            <>
                                <label htmlFor="name" className={labelClasses}>
                                    Name
                                </label>
                                <input type="text" {...register("name")} className={inputClasses}
                                    defaultValue={user?.displayName}
                                    readOnly
                                />
                            </>

                            <>
                                <label htmlFor="email" className={labelClasses}>
                                    Email
                                </label>
                                <input type="email" {...register("email")} className={inputClasses}
                                    defaultValue={user?.email}
                                    readOnly
                                />
                            </>
                            <>
                                <label htmlFor="name" className={labelClasses}>
                                    Product Title
                                </label>
                                <input type="text" {...register("productTitle")} className={inputClasses}
                                    defaultValue={product?.title}
                                    readOnly
                                />
                            </>
                            <>
                                <label htmlFor="name" className={labelClasses}>
                                    Product Price
                                </label>
                                <input type="text" {...register("productPrice")} className={inputClasses}
                                    defaultValue={product?.resalePrice}
                                    readOnly
                                />
                            </>

                            <>
                                <label htmlFor="name" className={labelClasses}>
                                    Phone Number *
                                </label>

                                <input type="text" {...register("buyerPhoneNumber", { required: "Your Phone Number is required" })} className={inputClasses} />
                                {errors.title && <p className='text-red-400 text-right w-full'> <small>{errors.title.message}</small> </p>}
                            </>
                            <>
                                <label htmlFor="name" className={labelClasses}>
                                    Meeting Location *
                                </label>

                                <input type="text" {...register("meetingLocation", { required: "Meeting Location is required" })} className={inputClasses} />
                                {errors.title && <p className='text-red-400 text-right w-full'> <small>{errors.title.message}</small> </p>}
                            </>
                            <button type='submit' className='w-full py-4 mt-2 bg-slate-700 hover:bg-red-800 text-white'>Book Now</button>

                            {/*  price(item name, price, and user information will not be editable) by default. You will give your phone number and meeting location */}
                        </div>
                    </form>
                </Modal>
            }

        </>
    );
};

export default ProductSingleCard;