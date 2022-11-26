import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { extensionAndSizeValidations } from '../../../../Helpers/FileSizeTypeValidation';

const ProductAdd = () => {
    const [formPhotoUrl, setFormPhotoUrl] = useState(null);
    // this token will verify user logged in or not including JWT token
    const [thumbnail, setThumbnail] = useState(false);


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
            setLoading(false);
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
        console.log(data);
        console.log(formPhotoUrl);
        return

    }

    const inputClasses = "w-full text-xl px-3 py-3 border rounded-md dark:border-gray-700 dark:bg-gray-900 dark:text-gray-100";
    const labelClasses = "block mb-2 text-sm text-slate-400";
    return (
        <div>
            <form className="space-y-4 ng-untouched ng-pristine ng-valid" onSubmit={handleSubmit(handleCreateProduct)}>
                <div className='grid grid-cols-8 gap-5'>
                    <div className='col-span-8'>
                        <label htmlFor="name" className={labelClasses}>
                            Account Type *
                        </label>

                        <select {...register("role")} className={inputClasses}>
                            <option value="Buyer">Buyer</option>
                            <option value="Seller">Seller</option>
                        </select>
                    </div>



                    <div className='col-span-8'>
                        <label htmlFor="name" className={labelClasses}>
                            Name *
                        </label>

                        <input type="text" {...register("name", { required: "Name is required" })} placeholder="Name" className={inputClasses} />
                        {errors.name && <p className='text-red-400 text-right w-full'> {errors.name.message} </p>}
                    </div>


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
                <button>Create product</button>


            </form>
        </div>
    );
};

export default ProductAdd;