import { async } from '@firebase/util';
import React, { useContext, useEffect, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import generatePassword from '../../Helpers/GeneratePassword';
import useTitle from '../../Hooks/useTitle';
import PrimaryButton from '../../Components/Buttons/PrimaryButton';
import OutlineButton from '../../Components/Buttons/OutlineButton';
import { sendImgToImgBB } from '../../Helpers/ImgBBStoreSingleImage';
import { extensionAndSizeValidations } from '../../Helpers/FileSizeTypeValidation';
import { storeSingleUserWithJwt } from '../../Helpers/StoreSingleUserWithJwt';
import toast from 'react-hot-toast';

// react hook form 
import { useForm } from "react-hook-form";  
import { AuthContext } from '../../Context/UserContext';

const Registration = () => {
    useTitle('Registration')
    const { user, createNewUser, updateUserProfile, verifyEmail, setLoading, loading, loginBySocialAccounts } = useContext(AuthContext);
    const [showPassword, setShowPassword] = useState(false);
    const [genPassword, setGenPassword] = useState('');
    const [password, setPassword] = useState('');
    const [count, setCount] = useState(5);
    const navigate = useNavigate();
    const location = useLocation();
    const [formPhotoUrl, setFormPhotoUrl] = useState(null);
    // this token will verify user logged in or not including JWT token
    const [thumbnail, setThumbnail] = useState(false);

    // console.log('loading ', loading);
    const from = location.state?.from?.pathname || '/'; // if old history location not found then default get home route

    const handleGeneratePassword = (event) => {
        const newGeneratePassword = generatePassword();
        setGenPassword(newGeneratePassword);
        setPassword(newGeneratePassword);
    }


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

    const handleAdduser = async (data) => {
        // console.log(data);

        // console.log(errors);
        const name = data.name;
        const email = data.email;
        const photo = formPhotoUrl;
        if (!photo) {
            toast.error("Please select photo.");
            return;
        }
        // call g.firebase by context to store in firebase
        createNewUser(email, password)
            .then(async result => {
                setLoading(true);
                // post image to image bb
                const photoURL = await sendImgToImgBB(photo);
                console.log(photoURL);
                // console.log(result);
                await handleUpdateUserProfile(name, photoURL);// update user name and photo
                // handleEmailVerification(); // send mail verification
                // after data added to firebase will add into mongo
                // store log to mongo db
                const user = result.user;
                // return
                // 
                user['name'] = name;
                user['password'] = password;
                user['createdAt'] = Date.now();
                user['role'] = data.role;
                await storeSingleUserWithJwt(user); // store user to mongo db
                // get/generate jwt token
                setLoading(false);
                toast.success("Successfully Registered!");
                // navigate("/");
            })
            .catch(error => {
                // console.log(error);
                setLoading(false);
                const errors = error.message + ' | ' + error.code;
                toast.error(errors);
            })
    }

    // fire with firebase
    const handleUpdateUserProfile = async (name, photoURL) => {
        const profile = {
            displayName: name,
            photoURL: photoURL
        }
        await updateUserProfile(profile)
            .then(() => {
            })
            .catch(error => {
                const errors = error.message + ' | ' + error.code;
            }
            );
    }


    const handleEmailVerification = async () => {
        await verifyEmail()
            .then(() => {
            })
            .catch(error => {
                const errors = error.message + ' | ' + error.code;
            });
    }
    // # end fire with firebase


    const socialLogin = async event => {
        // console.log(event);
        await loginBySocialAccounts(event)
            .then(async (result) => {
                const user = result.user;
                await storeSingleUserWithJwt(user); // store user to mongo db
                toast.success("Logged in successfully.");
                // make sure system stored JWToken in browser memory
                // setTimeout(() => {
                //    
                // }, 2000)
                // navigate(from, { replace: true });
                navigate("/");

            })
            .catch((error) => {
                setLoading(false);
                const errors = error.message + ' | ' + error.code;
                toast.error(errors);
            });
    }
    useEffect(() => {
        register("password", { required: true });
    }, []);

    const copyToClipBoard = () => {
        navigator.clipboard.writeText(password);
        toast.success(`Copied to clipboard ${password}`)
    }

    const inputClasses = "w-full text-xl px-3 py-3 border rounded-md dark:border-gray-700 dark:bg-gray-900 dark:text-gray-100";
    const labelClasses = "block mb-2 text-sm text-slate-400";
    // check user logged in or not. if logged in then redirect to dashboard

    if (user && user?.uid) {
        return (
            <div className='flex flex-col space-y-4 items-center justify-center h-[60vh]'>
                <div className='text-2xl text-pink-400'>
                    {/* Logged-in users are not needed to register again. */}
                    Redirecting....
                </div>
            </div>
        )
    }

    return (
        <div className='grid grid-cols-1 xl:grid-cols-2 gap-5 place-content-center  xl:min-h-[90vh] mx-auto p-5'>
            <div className="flex justify-center md:hidden lg:block">
                <img src='' alt="" className='w-3/5' />
            </div>
            <div className="p-6 rounded-md sm:p-10 dark:bg-gray-900 dark:text-gray-100 bg-gray-100 max-w-2xl min-w-[60%] mx-auto shadow-xl shadow-slate-300">
                <h1 className='text-center text-3xl pt-5 mb-20 font-bold'>Register Now</h1>
                <form onSubmit={handleSubmit(handleAdduser)} className="space-y-4 ng-untouched ng-pristine ng-valid">
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


                        <div className='col-span-8'>
                            <label htmlFor="email" className={labelClasses}>
                                Email Address *
                            </label>

                            <input type="email" {...register("email", {
                                required: "Email is required",
                                pattern: {
                                    value: /\S+@\S+\.\S+/, message: "Entered value does not match email format"
                                }
                            })}

                                placeholder="hello@sandipandas.net" className={inputClasses} />
                            {errors.email && <p className='text-red-400 text-right w-full'> {errors.email.message} </p>}
                        </div>
                    </div>
                    <div className="mt-4">
                        <div className="flex items-center justify-between">
                            <label htmlFor="password" className=" text-gray-800 dark:text-gray-200 flex items-center justify-between">Password
                            </label>

                            {/* user can copy the password by this button when field has password  */}
                            {password &&
                                <div onClick={copyToClipBoard} className="hover:cursor-pointer">
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 text-purple-500">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h3.75M9 15h3.75M9 18h3.75m3 .75H18a2.25 2.25 0 002.25-2.25V6.108c0-1.135-.845-2.098-1.976-2.192a48.424 48.424 0 00-1.123-.08m-5.801 0c-.065.21-.1.433-.1.664 0 .414.336.75.75.75h4.5a.75.75 0 00.75-.75 2.25 2.25 0 00-.1-.664m-5.8 0A2.251 2.251 0 0113.5 2.25H15c1.012 0 1.867.668 2.15 1.586m-5.8 0c-.376.023-.75.05-1.124.08C9.095 4.01 8.25 4.973 8.25 6.108V8.25m0 0H4.875c-.621 0-1.125.504-1.125 1.125v11.25c0 .621.504 1.125 1.125 1.125h9.75c.621 0 1.125-.504 1.125-1.125V9.375c0-.621-.504-1.125-1.125-1.125H8.25zM6.75 12h.008v.008H6.75V12zm0 3h.008v.008H6.75V15zm0 3h.008v.008H6.75V18z" />
                                    </svg>

                                </div>
                            }


                        </div>
                        <div className='relative'>

                            <input type={!showPassword ? "password" : "text"}
                                {...register("password", {
                                    required: "Password is required",
                                    minLength: { value: 8, message: "Password must be at least 8 characters" },
                                    pattern: { value: /^(?=.*[A-Z])(?=.*[!@#$&*])(?=.*[0-9])(?=.*[a-z])/, message: "Uppercase, lowercase, number and special character needed" }
                                })}
                                className="block w-full px-4 py-3 mt-2  bg-white border rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 dark:focus:border-blue-300 focus:ring-blue-300 focus:outline-none focus:ring focus:ring-opacity-40" value={genPassword && genPassword} onChange={(e) => {
                                    setGenPassword(e.target.value); setPassword(e.target.value); setValue('password', e.target.value)
                                }} placeholder="* * * * * * * *" />


                            <div className='pl-2 pr-2 hover:cursor-pointer absolute right-0 top-0' onClick={() => setShowPassword(!showPassword)}>
                                {/* Password seen or not  */}
                                {
                                    showPassword ?

                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-7 h-12">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z" />
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                        </svg>
                                        :


                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-7 h-12 text-purple-500">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M3.98 8.223A10.477 10.477 0 001.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.45 10.45 0 0112 4.5c4.756 0 8.773 3.162 10.065 7.498a10.523 10.523 0 01-4.293 5.774M6.228 6.228L3 3m3.228 3.228l3.65 3.65m7.894 7.894L21 21m-3.228-3.228l-3.65-3.65m0 0a3 3 0 10-4.243-4.243m4.242 4.242L9.88 9.88" />
                                        </svg>

                                }
                            </div>
                            {errors.password && <p className='text-red-400 text-right w-full'> {errors.password.message} </p>}
                        </div>


                        <div className="text-xs text-gray-600 dark:text-gray-400 hover:underline flex justify-end">
                            <div className='hover:cursor-pointer' onClick={(e) => { handleGeneratePassword() }}> Generate password </div>
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
                    <PrimaryButton>
                        {/* // if loading status is active showing spinner */}
                        Register
                    </PrimaryButton>

                    <p className="px-6 text-sm text-center dark:text-gray-400">Already have Have an account?
                        <Link rel="noopener noreferrer" to="/login" className="hover:underline dark:text-violet-400"> Login Now</Link>.
                    </p>
                </form>

                {/* Social Login */}

                <div className='my-5 grid grid-cols-1 lg:grid-cols-2 gap-5'>
                    <OutlineButton handler={() => socialLogin('google')} >
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" className="w-5 h-5 fill-current">
                            <path d="M16.318 13.714v5.484h9.078c-0.37 2.354-2.745 6.901-9.078 6.901-5.458 0-9.917-4.521-9.917-10.099s4.458-10.099 9.917-10.099c3.109 0 5.193 1.318 6.38 2.464l4.339-4.182c-2.786-2.599-6.396-4.182-10.719-4.182-8.844 0-16 7.151-16 16s7.156 16 16 16c9.234 0 15.365-6.49 15.365-15.635 0-1.052-0.115-1.854-0.255-2.651z"></path>
                        </svg>
                        <p>Login with Google</p>
                    </OutlineButton>


                    <OutlineButton handler={() => socialLogin('github')} >
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" className="w-5 h-5 fill-current">
                            <path d="M16 0.396c-8.839 0-16 7.167-16 16 0 7.073 4.584 13.068 10.937 15.183 0.803 0.151 1.093-0.344 1.093-0.772 0-0.38-0.009-1.385-0.015-2.719-4.453 0.964-5.391-2.151-5.391-2.151-0.729-1.844-1.781-2.339-1.781-2.339-1.448-0.989 0.115-0.968 0.115-0.968 1.604 0.109 2.448 1.645 2.448 1.645 1.427 2.448 3.744 1.74 4.661 1.328 0.14-1.031 0.557-1.74 1.011-2.135-3.552-0.401-7.287-1.776-7.287-7.907 0-1.751 0.62-3.177 1.645-4.297-0.177-0.401-0.719-2.031 0.141-4.235 0 0 1.339-0.427 4.4 1.641 1.281-0.355 2.641-0.532 4-0.541 1.36 0.009 2.719 0.187 4 0.541 3.043-2.068 4.381-1.641 4.381-1.641 0.859 2.204 0.317 3.833 0.161 4.235 1.015 1.12 1.635 2.547 1.635 4.297 0 6.145-3.74 7.5-7.296 7.891 0.556 0.479 1.077 1.464 1.077 2.959 0 2.14-0.020 3.864-0.020 4.385 0 0.416 0.28 0.916 1.104 0.755 6.4-2.093 10.979-8.093 10.979-15.156 0-8.833-7.161-16-16-16z"></path>
                        </svg>
                        <p>Login with GitHub</p>
                    </OutlineButton>
                </div>
                {/* # Social Login */}


            </div>
        </div>
    );

};

export default Registration;