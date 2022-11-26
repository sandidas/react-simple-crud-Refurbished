import React, { useContext, useState } from 'react';
import { useForm } from 'react-hook-form';
import { extensionAndSizeValidations } from '../../../../Helpers/FileSizeTypeValidation';
import toast from 'react-hot-toast';
import { AuthContext } from '../../../../Context/UserContext';

const ProductAdd = () => {
    const [formPhotoUrl, setFormPhotoUrl] = useState(null);
    // this token will verify user logged in or not including JWT token
    const [thumbnail, setThumbnail] = useState(false);
    const { user } = useContext(AuthContext);

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
        const photoURL = await sendImgToImgBB(photo);

        console.log(data);
        const productDetails = data;
        productDetails['photoUrl'] = photoURL;
        productDetails['uid'] = user?.uid;
        productDetails['sellerName'] = user?.sellerName || "Unknown";
        productDetails['createdAt'] = Date.now();
        productDetails['status'] = "available";
        productDetails['isAdvertise'] = false;
        productDetails['isReported'] = false;
        productDetails['isPaid'] = false;



        console.log(productDetails);





        return

    }

    const inputClasses = "w-full text-xl px-3 py-3 border rounded-md dark:border-gray-700 dark:bg-gray-900 dark:text-gray-100";
    const labelClasses = "block mb-2 pt-2 text-sm text-slate-400";
    return (
        <div>
            <form className="space-y-4 ng-untouched ng-pristine ng-valid" onSubmit={handleSubmit(handleCreateProduct)}>
                <div className='grid grid-cols-8 gap-5'>
                    <div className='col-span-6 space-y-2'>
                        <>
                            <label htmlFor="name" className={labelClasses}>
                                Title *
                            </label>

                            <input type="text" {...register("title", { required: "Product Title is required" })} className={inputClasses} />
                            {errors.name && <p className='text-red-400 text-right w-full'> {errors.name.message} </p>}
                        </>

                        <>
                            <label htmlFor="name" className={labelClasses}>
                                Description *
                            </label>
                            <textarea rows="10" cols="50" {...register("description", { required: "Description is required" })} className={inputClasses} />
                            {errors.name && <p className='text-red-400 text-right w-full'> {errors.name.message} </p>}
                        </>


                        <>
                            <label htmlFor="name" className={labelClasses}>
                                Relevant Information *
                            </label>
                            <input type="text" {...register("relevantInformation", { required: "Relevant Information  is required" })} className={inputClasses} />
                            {errors.name && <p className='text-red-400 text-right w-full'> {errors.name.message} </p>}
                        </>

                        <>
                            <label htmlFor="name" className="block mb-2 text-sm text-slate-400">Photo</label>

                            <div className='grid grid-cols-8 gap-5 max-h-14 justify-center items-center'>
                                <input onChange={(e) => { checkImageSizeAndType(e) }} type="file" name="photourl" id="photourl" accept='image/*' className="text-xl col-span-7 px-3 py-3 border rounded-md dark:border-gray-700 dark:bg-gray-900 dark:text-gray-100 overflow-hidden" />
                                <div className='bg-slate-200 dark:bg-slate-600 w-12 h-12 rounded-full flex justify-center items-center overflow-hidden'>
                                    {
                                        thumbnail && <img src={thumbnail} alt="" className='p-2' />
                                    }
                                </div>
                            </div>
                        </>




                    </div>
                    {/* right column  */}
                    <div className='col-span-2 space-y-2'>
                        <>
                            <label htmlFor="name" className={labelClasses}>
                                Original Price *
                            </label>
                            <input type="number" {...register("originalPrice", { required: "Original Price is required" })} className={inputClasses} />
                            {errors.name && <p className='text-red-400 text-right w-full'> {errors.name.message} </p>}
                        </>

                        <>
                            <label htmlFor="name" className={labelClasses}>
                                Resale Price *
                            </label>
                            <input type="text" {...register("resalePrice", { required: "Resale Price is required" })} className={inputClasses} />
                            {errors.name && <p className='text-red-400 text-right w-full'> {errors.name.message} </p>}
                        </>

                        <>
                            <label htmlFor="name" className={labelClasses}>
                                Year Of Purchase *
                            </label>
                            <input type="text" {...register("yearOfPurchase", { required: "Year Of Purchase  is required" })} className={inputClasses} />
                            {errors.name && <p className='text-red-400 text-right w-full'> {errors.name.message} </p>}
                        </>

                        <>
                            <label htmlFor="name" className={labelClasses}>
                                Condition *
                            </label>

                            <select {...register("condition")} className={inputClasses}>
                                <option value="Excellent">Excellent</option>
                                <option value="Good">Good</option>
                                <option value="Fair">Fair</option>
                            </select>
                        </>

                        <>
                            <label htmlFor="name" className={labelClasses}>
                                Mobile Number *
                            </label>
                            <input type="text" {...register("mobileNumber", { required: "Mobile Number is Required" })} className={inputClasses} />
                            {errors.name && <p className='text-red-400 text-right w-full'> {errors.name.message} </p>}
                        </>

                        <>
                            <label htmlFor="name" className={labelClasses}>
                                Location *
                            </label>
                            <input type="text" {...register("location", { required: "Location is Required" })} className={inputClasses} />
                            {errors.name && <p className='text-red-400 text-right w-full'> {errors.name.message} </p>}
                        </>

                        <>
                            <label htmlFor="name" className={labelClasses}>
                                Category *
                            </label>

                            <select {...register("categorySlug")} className={inputClasses}>
                                <option value="Apple">Apple</option>
                                <option value="HP">HP</option>
                                <option value="Acer">Acer</option>
                            </select>
                        </>










                        <button>Create product</button>
                    </div>












                </div>




            </form>
        </div>
    );
};

export default ProductAdd;