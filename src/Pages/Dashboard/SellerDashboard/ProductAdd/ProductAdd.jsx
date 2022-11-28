import React, { useContext, useState } from 'react';
import { useForm } from 'react-hook-form';
import { extensionAndSizeValidations } from '../../../../Helpers/FileSizeTypeValidation';
import toast from 'react-hot-toast';
import { AuthContext } from '../../../../Context/UserContext';
import { sendImgToImgBB } from '../../../../Helpers/ImgBBStoreSingleImage';
import Loader from '../../../../Components/Loader/Loader';
import { LoadingOverlay } from '@mantine/core';
import { useNavigate } from 'react-router-dom';

const ProductAdd = () => {
    const [formPhotoUrl, setFormPhotoUrl] = useState(null);
    // this token will verify user logged in or not including JWT token
    const [thumbnail, setThumbnail] = useState(false);
    const { user, loading, setLoading, handleUserSignOut } = useContext(AuthContext);
    const [visible, setVisible] = useState(false);
    const navigate = useNavigate();

    // Image validation 
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


    // React hook form
    const { register, handleSubmit, setValue, formState: { errors } } = useForm();


    const handleCreateProduct = async (data) => {

        const photo = formPhotoUrl;
        if (!photo) {
            toast.error("Please select photo.");
            return;
        }
        setVisible(!visible)
        const photoURL = await sendImgToImgBB(photo);
        const productDetails = data;
        productDetails['photoUrl'] = photoURL || "NoPhotoUrl";
        productDetails['uid'] = user?.uid;
        productDetails['sellerName'] = user?.sellerName || "Unknown";
        productDetails['createdAt'] = Date.now();
        productDetails['status'] = "Available";
        productDetails['isAdvertise'] = false;
        productDetails['isReported'] = false;
        productDetails['isPaid'] = false;
        // setLoading(true);
        await storeItem(productDetails)
    }

    const storeItem = async (itemData) => {

        const uri = `${import.meta.env.VITE_serverUrl}/product/`;
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
                const goTourl = `/dashboard/seller/`;
                setVisible(!visible)
                navigate(goTourl);
                // navigate(from, { replace: true });

            } else if (data.status === 401) {
                toast.error(data.message)
                setVisible(!visible)
                handleUserSignOut(); // un auth access, logout
            }
            else {
                setVisible(!visible)
                toast.error(data.message)
            }
            setVisible(!visible)
        } catch (error) {
            setVisible(!visible)
            console.log(error);
        }
    }

    const inputClasses = "w-full text-xl px-3 py-3 border rounded-md dark:border-gray-700 dark:bg-gray-900 dark:text-gray-100";
    const labelClasses = "block mb-2 pt-1 text-sm text-slate-400";

    if (loading) { return <Loader /> }
    return (
        <>
            <form className="space-y-4 ng-untouched ng-pristine ng-valid" onSubmit={handleSubmit(handleCreateProduct)}>

                <LoadingOverlay visible={visible} overlayBlur={2} radius="md" />
                <div className='grid grid-cols-8 gap-5'>
                    <div className='col-span-6 space-y-2'>
                        <div>
                            <label htmlFor="name" className={labelClasses}>
                                Title *
                            </label>

                            <input type="text" {...register("title", { required: "Product Title is required" })} className={inputClasses} />
                            {errors.title && <p className='text-red-400 text-right w-full'> <small>{errors.title.message}</small> </p>}
                        </div>

                        <div>
                            <label htmlFor="name"
                                className={labelClasses}>
                                Description *
                            </label>
                            <textarea rows="10" cols="50"
                                {...register("description",
                                    { required: "Description is required" })} className={inputClasses} />
                            {errors.description &&
                                <p className='text-red-400 text-right w-full'> <small>{errors.description.message}</small> </p>}
                        </div>


                        <div>
                            <label htmlFor="name" className={labelClasses}>
                                Relevant Information *
                            </label>
                            <input type="text" {...register("relevantInformation", { required: "Relevant Information  is required" })} className={inputClasses} />
                            {errors.relevantInformation && <p className='text-red-400 text-right w-full'> <small>{errors.relevantInformation.message}</small> </p>}
                        </div>

                        <div>
                            <label htmlFor="name" className="block mb-2 text-sm text-slate-400">Photo</label>

                            <div className='grid grid-cols-8 gap-5 max-h-14 justify-center items-center'>
                                <input onChange={(e) => { checkImageSizeAndType(e) }} type="file" name="photourl" id="photourl" accept='image/*' className="text-xl col-span-7 px-3 py-3 border rounded-md dark:border-gray-700 dark:bg-gray-900 dark:text-gray-100 overflow-hidden" />
                                <div className='bg-slate-200 dark:bg-slate-600 w-12 h-12 rounded-full flex justify-center items-center overflow-hidden'>
                                    {
                                        thumbnail && <img src={thumbnail} alt="" className='p-2' />
                                    }
                                </div>
                            </div>
                        </div>


                        <button type='submit' className='w-full py-4 bg-slate-700 hover:bg-red-800 text-white'>Create Now</button>



                    </div>
                    {/* right column  */}
                    <div className='col-span-2 space-y-2'>
                        <div>
                            <label htmlFor="name" className={labelClasses}>
                                Original Price *
                            </label>
                            <input type="number" {...register("originalPrice", { required: "Original Price is required" })} className={inputClasses} />
                            {errors.originalPrice && <p className='text-red-400 text-right w-full'> <small> {errors.originalPrice.message}</small> </p>}
                        </div>

                        <div>
                            <label htmlFor="name" className={labelClasses}>
                                Resale Price *
                            </label>
                            <input type="text" {...register("resalePrice", { required: "Resale Price is required" })} className={inputClasses} />
                            {errors.resalePrice && <p className='text-red-400 text-right w-full'> <small>{errors.resalePrice.message}</small> </p>}
                        </div>

                        <div>
                            <label htmlFor="name" className={labelClasses}>
                                Year Of Purchase *
                            </label>

                            <select {...register("yearOfPurchase")} className={inputClasses}>
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
                                <option value="Excellent">Excellent</option>
                                <option value="Good">Good</option>
                                <option value="Fair">Fair</option>
                            </select>
                        </div>

                        <div>
                            <label htmlFor="name" className={labelClasses}>
                                Mobile Number *
                            </label>
                            <input type="text" {...register("mobileNumber", { required: "Mobile Number is Required" })} className={inputClasses} />
                            {errors.mobileNumber && <p className='text-red-400 text-right w-full'> <small>{errors.mobileNumber.message}</small> </p>}
                        </div>

                        <div>
                            <label htmlFor="name" className={labelClasses}>
                                Location *
                            </label>
                            <input type="text" {...register("location", { required: "Location is Required" })} className={inputClasses} />
                            {errors.location && <p className='text-red-400 text-right w-full'> <small>{errors.location.message}</small> </p>}
                        </div>

                        <div>
                            <label htmlFor="name" className={labelClasses}>
                                Category *
                            </label>

                            <select {...register("categorySlug")} className={inputClasses}>
                                <option value="MacBook Pro">MacBook Pro</option>
                                <option value="MacBook Air">MacBook Air</option>
                                <option value="iMac">iMac</option>
                                <option value="Mac Mini">Mac Mini</option>
                                <option value="Mac Studio">Mac Studio</option>
                            </select>
                        </div>
                    </div>
                </div>
            </form>


        </>
    );
};

export default ProductAdd;