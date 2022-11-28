import { Button, Modal } from '@mantine/core';
import React, { useContext, useState } from 'react';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { AuthContext } from '../../Context/UserContext';

const ProductCardReportButton = ({ product, labelClasses, inputClasses }) => {
    const { user } = useContext(AuthContext);
    const [openedReport, setOpenedReport] = useState(false);
    const [visible, setVisible] = useState(false);

    const { register, handleSubmit, setValue, reset: reset, formState: { errors: errors } } = useForm();
    const storeReport = async (data) => {
        const reportDetails = data;
        reportDetails['productId'] = product._id;
        reportDetails['productTitle'] = product.title;
        reportDetails['photoUrl'] = product.photoUrl;
        reportDetails['uid'] = user.uid;
        reportDetails['reportTime'] = Date.now();


        const uri = `${import.meta.env.VITE_serverUrl}/reportCreate/`;
        const settings = {
            method: 'POST',
            headers: {
                'content-type': 'application/json',
                authorization: `Bearer ${localStorage.getItem('refurbished')}` // JWToken
            },
            body: JSON.stringify(reportDetails)
        };
        try {
            const fetchResponse = await fetch(uri, settings);
            const data = await fetchResponse.json();
            if (data.success) {
                toast.success(data.message)
                // now redirect to editing service page
                setVisible(!visible);
                setOpenedReport(false)
                // navigate(from, { replace: true });

            } else if (data.status === 401) {
                toast.error(data.message)
                setVisible(!visible);
                setOpenedReport(false)
                handleUserSignOut(); // un auth access, logout
            }
            else {
                setVisible(!visible)
                setOpenedReport(false)
                toast.error(data.message)
            }
            setVisible(!visible)
            setOpenedReport(false)
        } catch (error) {
            setVisible(!visible)
            console.log(error);
        }
    }
    return (
        <>
            <div>
                {user && user?.uid &&
                    <Button variant="light" color="blue" fullWidth radius="md"
                        onClick={() => setOpenedReport(true)}
                    > Report
                    </Button>
                }
            </div>

            {/* Modal for report  */}
            {
                user && user?.uid &&
                <Modal
                    opened={openedReport}
                    onClose={() => { setOpenedReport(false); reset() }}
                    title="Report Product"
                    centered
                >
                    {/* Modal content */}
                    <form onSubmit={handleSubmit(storeReport)} className="space-y-4 ng-untouched ng-pristine ng-valid">
                        <div>
                            <label htmlFor="name">
                                {product?.title}
                            </label>
                            <label htmlFor="name"
                                className={labelClasses}>
                                Report Description *
                            </label>
                            <textarea rows="10" cols="50"
                                {...register("description",
                                    { required: "Description is required" })} className={inputClasses} />
                            {errors.description &&
                                <p className='text-red-400 text-right w-full'> <small>{errors.description.message}</small> </p>}
                        </div>
                        <button type='submit' className='w-full py-4 bg-slate-700 hover:bg-red-800 text-white'>Report Now</button>
                    </form>
                </Modal>
            }
        </>
    );
};

export default ProductCardReportButton;