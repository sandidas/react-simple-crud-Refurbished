import { Avatar, LoadingOverlay, Modal } from '@mantine/core';
import { useQuery } from '@tanstack/react-query';
import React, { useState } from 'react';
import { useContext } from 'react';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import SmallSpinner from '../../../../Components/Spinner/SmallSpinner';
import { AuthContext } from '../../../../Context/UserContext';
import { extensionAndSizeValidations } from '../../../../Helpers/FileSizeTypeValidation';
import { sendImgToImgBB } from '../../../../Helpers/ImgBBStoreSingleImage';
import ProductsRow from './ProductsRow';

const SellerHome = () => {

    const { user, handleUserSignOut } = useContext(AuthContext);
    const [modalOpened, setModalOpened] = useState(false);
    const [modalData, setModalData] = useState(null);

    const [formPhotoUrl, setFormPhotoUrl] = useState(null);
    // this token will verify user logged in or not including JWT token
    const [thumbnail, setThumbnail] = useState(false);
    const [visible, setVisible] = useState(false);



    const checkImageSizeAndType = (e) => {
        const photoURL = e.target.files[0];
        // check image size and extension
        const imagesSize = photoURL.size;
        const imagesType = photoURL.type;
        // console.log(imagesSize, imagesType);
        // console.log(photoURL);

        const validation = extensionAndSizeValidations(imagesType, imagesSize);
        if (!validation) {

            e.target.value = null; // set image filed is empty
            toast.error('Allowed file types png, jpeg, jpg, and size up to 500kb');
            return;
        }
        // if found image then set image into thumbnail state to render in view 
        const reader = new FileReader();
        reader.readAsDataURL(photoURL);
        reader.onloadend = () => {
            setThumbnail(reader.result.toString());
        };
        setFormPhotoUrl(photoURL);

    }

    // product edit and update modal 
    // React hook form
    const { register, handleSubmit, reset, setValue, formState: { errors } } = useForm();


    const handleUpdateProduct = async (data) => {
        const id = modalData?._id;
        const productDetails = data;
        const photo = formPhotoUrl;

        // setVisible(!visible)
        if (photo) {
            const photoURL = await sendImgToImgBB(photo);
            productDetails['photoUrl'] = photoURL || "NoPhotoUrl";
        }
        productDetails['isReported'] = false;
        productDetails['isPaid'] = false;
        const cateSlug = data.categoryName;
        productDetails['categorySlug'] = cateSlug.toLowerCase().replace(/ /g, '-').replace(/[^\w-]+/g, '');
        // console.log(productDetails, id);

        setVisible(true)
        await updateItem(productDetails, id);
    }
    const handleAdvertise = async (id, advertise = false) => {
        const productDetails = {}
        // setVisible(!visible)
        productDetails['isAdvertise'] = advertise;
        setVisible(true)
        await updateItem(productDetails, id);
    }
    const updateItem = async (itemData, id) => {

        const uri = `${import.meta.env.VITE_serverUrl}/product/${id}`;
        const settings = {
            method: 'PATCH',
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
                setModalData(null);
                setModalOpened(false);
                setVisible(false);
                refetch();
                reset()
                // navigate(from, { replace: true });

            } else if (data.status === 401) {
                toast.error(data.message)
                setVisible(false);
                handleUserSignOut(); // un auth access, logout

            }
            else {
                setVisible(false);
                toast.error(data.message)
                setModalData(null);
                setModalOpened(false);
                refetch();
                reset()
            }
        } catch (error) {
            setModalData(null);
            setModalOpened(false);
            setVisible(false);
            refetch();
            reset()
            console.log(error);
        }
    }


    const inputClasses = "w-full text-xl px-3 py-3 border rounded-md dark:border-gray-700 dark:bg-gray-900 dark:text-gray-100";
    const labelClasses = "block mb-2 pt-1 text-sm text-slate-400";

    // Products loading
    const uri = `${import.meta.env.VITE_serverUrl}/products?uid=${user?.uid}`;
    const settings = {
        method: 'GET',
        headers: {
            'content-type': 'application/json',
            authorization: `Bearer ${localStorage.getItem('refurbished')}`
        }
    };
    const { data, refetch, isLoading, isError, error } = useQuery({
        queryKey: ['products'], // when user change the date it will re-fetch 
        queryFn: async () => {
            const res = await fetch(uri, settings);
            const data = await res.json();
            if (data.status === 401) {
                toast.error(data.message)
                handleUserSignOut(); // un auth access, logout
            }
            return data.data;
        }
    })

    if (isLoading) {
        return <SmallSpinner />
    }

    if (isError) {
        return <span className='text-center'>Error: {error.message}</span>
    }
    return (
        <>
            <div className="container p-2 mx-auto sm:p-4 dark:text-gray-100">
                <h2 className="mb-4 text-2xl font-semibold leading-tight">Products</h2>
                <div className="overflow-x-auto">
                    <table className="min-w-full text-xs">
                        <thead className="dark:bg-gray-700">
                            <tr className="text-left">
                                <th className="p-3">#</th>
                                <th className="p-3">Photo</th>
                                <th className="p-3">Title</th>
                                <th className="p-3">Status</th>
                                <th className="p-3">Edit</th>
                                <th className="p-3 text-right">Advertise</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                data &&
                                data.map((product, i) =>
                                    <ProductsRow
                                        i={i}
                                        product={product} key={product?._id}
                                        setModalOpened={setModalOpened}
                                        modalData={modalData}
                                        setModalData={setModalData}
                                        handleAdvertise={handleAdvertise}

                                    />
                                )
                            }



                        </tbody>
                    </table>
                </div>
            </div>
            <Modal centered size="auto"
                opened={modalOpened}
                onClose={() => { setModalOpened(false); setModalData(null); reset() }}
                title="Edit Product"
            >

                {
                    modalData &&
                    <form className="space-y-4 ng-untouched ng-pristine ng-valid" onSubmit={handleSubmit(handleUpdateProduct)}>

                        <LoadingOverlay visible={visible} overlayBlur={2} radius="md" />
                        <div className='grid grid-cols-8 gap-5'>
                            <div className='col-span-6 space-y-2'>
                                <div>
                                    <label htmlFor="name" className={labelClasses}>
                                        Title *
                                    </label>

                                    <input type="text" {...register("title", { required: "Product Title is required" })} className={inputClasses}
                                        defaultValue={modalData?.title}
                                    />
                                    {errors.title && <p className='text-red-400 text-right w-full'> <small>{errors.title.message}</small> </p>}
                                </div>

                                <div>
                                    <label htmlFor="name"
                                        className={labelClasses}>
                                        Description *
                                    </label>
                                    <textarea rows="10" cols="50"
                                        {...register("description",
                                            { required: "Description is required" })} className={inputClasses}
                                        defaultValue={modalData?.description}
                                    />
                                    {errors.description &&
                                        <p className='text-red-400 text-right w-full'> <small>{errors.description.message}</small> </p>}
                                </div>


                                <div>
                                    <label htmlFor="name" className={labelClasses}>
                                        Relevant Information *
                                    </label>
                                    <input type="text" {...register("relevantInformation", { required: "Relevant Information  is required" })} className={inputClasses}
                                        defaultValue={modalData?.relevantInformation}
                                    />
                                    {errors.relevantInformation && <p className='text-red-400 text-right w-full'> <small>{errors.relevantInformation.message}</small> </p>}
                                </div>

                                <div>
                                    <label htmlFor="name" className="block mb-2 text-sm text-slate-400">Photo</label>
                                    <div className='grid grid-cols-8 gap-5 max-h-14 justify-center items-center'>



                                        <input onChange={(e) => { checkImageSizeAndType(e) }} type="file" name="photourl" id="photourl" accept='image/*' className="text-xl col-span-7 px-3 py-3 border rounded-md dark:border-gray-700 dark:bg-gray-900 dark:text-gray-100 overflow-hidden" />
                                        <div className='bg-slate-200 dark:bg-slate-600 w-12 h-12 rounded-full flex justify-center items-center overflow-hidden'>
                                            {
                                                thumbnail ? <img src={thumbnail} alt="" className='p-2' /> : <img src={modalData?.photoUrl} alt="" className='p-2' />
                                            }
                                        </div>
                                    </div>
                                </div>


                                <button type='submit' className='w-full py-4 bg-slate-700 hover:bg-red-800 text-white'>Update Now</button>



                            </div>
                            {/* right column  */}
                            <div className='col-span-2 space-y-2'>
                                <div>
                                    <label htmlFor="name" className={labelClasses}>
                                        Original Price *
                                    </label>
                                    <input type="number" {...register("originalPrice", { required: "Original Price is required" })} className={inputClasses}
                                        defaultValue={modalData?.originalPrice} />
                                    {errors.originalPrice && <p className='text-red-400 text-right w-full'> <small> {errors.originalPrice.message}</small> </p>}
                                </div>

                                <div>
                                    <label htmlFor="name" className={labelClasses}>
                                        Resale Price *
                                    </label>
                                    <input type="text" {...register("resalePrice", { required: "Resale Price is required" })} className={inputClasses}
                                        defaultValue={modalData?.resalePrice}
                                    />
                                    {errors.resalePrice && <p className='text-red-400 text-right w-full'> <small>{errors.resalePrice.message}</small> </p>}
                                </div>

                                <div>
                                    <label htmlFor="name" className={labelClasses}>
                                        Year Of Purchase *
                                    </label>
                                    <select {...register("yearOfPurchase")} className={inputClasses}>
                                        <option value={modalData?.yearOfPurchase}> {modalData?.yearOfPurchase} </option>
                                        <option value="2010">2010</option>
                                        <option value="2011">2011</option>
                                        <option value="2012">2012</option>
                                        <option value="2013">2013</option>
                                        <option value="2014">2014</option>
                                        <option value="2015">2015</option>
                                        <option value="2016">2016</option>
                                        <option value="2017">2017</option>
                                        <option value="2018">2018</option>
                                        <option value="2019">2019</option>
                                        <option value="2020">2020</option>
                                        <option value="2021">2021</option>
                                        <option value="2022">2022</option>
                                    </select>
                                </div>

                                <div>
                                    <label htmlFor="name" className={labelClasses}>
                                        Condition *
                                    </label>

                                    <select {...register("condition")} className={inputClasses}>
                                        <option value={modalData?.condition}>{modalData?.condition}</option>
                                        <option value="Excellent">Excellent</option>
                                        <option value="Good">Good</option>
                                        <option value="Fair">Fair</option>
                                    </select>
                                </div>

                                <div>
                                    <label htmlFor="name" className={labelClasses}>
                                        Mobile Number *
                                    </label>
                                    <input type="text" {...register("mobileNumber", { required: "Mobile Number is Required" })} className={inputClasses}
                                        defaultValue={modalData?.mobileNumber}
                                    />
                                    {errors.mobileNumber && <p className='text-red-400 text-right w-full'> <small>{errors.mobileNumber.message}</small> </p>}
                                </div>

                                <div>
                                    <label htmlFor="name" className={labelClasses}>
                                        Location *
                                    </label>
                                    <input type="text" {...register("location", { required: "Location is Required" })} className={inputClasses}
                                        defaultValue={modalData?.location}
                                    />
                                    {errors.location && <p className='text-red-400 text-right w-full'> <small>{errors.location.message}</small> </p>}
                                </div>

                                <div>
                                    <label htmlFor="name" className={labelClasses}>
                                        Category *
                                    </label>

                                    <select {...register("categoryName")} className={inputClasses}>
                                        <option value={modalData?.categoryName}>{modalData?.categoryName}</option>
                                        <option value="MacBook Pro">MacBook Pro</option>
                                        <option value="MacBook Air">MacBook Air</option>
                                        <option value="iMac">iMac</option>
                                        <option value="Mac Mini">Mac Mini</option>
                                        <option value="Mac Studio">Mac Studio</option>
                                    </select>
                                </div>
                                <div>
                                    <label htmlFor="name" className={labelClasses}>
                                        Status *
                                    </label>

                                    <select {...register("status")} className={inputClasses}>
                                        <option value={modalData?.status}>{modalData?.status}</option>
                                        <option value="Available">Available</option>
                                        <option value="Sold Out">Sold Out</option>
                                    </select>
                                </div>
                            </div>
                        </div>
                    </form>
                }

            </Modal>
        </>
    );
};

export default SellerHome;