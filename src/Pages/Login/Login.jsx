import React, { useContext, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import useTitle from '../../Hooks/useTitle';
import PrimaryButton from '../../Components/Buttons/PrimaryButton';
import OutlineButton from '../../Components/Buttons/OutlineButton';
import { getJwtToken, storeSingleUserWithJwt } from '../../Helpers/StoreSingleUserWithJwt';
import toast from 'react-hot-toast';
import UserContext from '../../Context/UserContext';

const Login = () => {

    useTitle('Login');
    const { loading, setLoading, loginByEmailAndPassword, loginBySocialAccounts, user } = useContext(UserContext);

    const [showPassword, setShowPassword] = useState(false);
    const [password, setPassword] = useState(false);
    const [email, setEmail] = useState(false);
    // navigation with location
    const navigate = useNavigate();
    const location = useLocation();
    const from = location.state?.from?.pathname || '/'; // if old history location not found then default get home route



    //
    // form login
    const handleLogin = (event) => {
        event.preventDefault();
        if (!email || !password) {
            toast.error("ERROR: You left empty field.");
            return
        }
        loginByEmailAndPassword(email, password)
            .then(async result => {
                // console.log(result);
                const user = result.user;
                // get/generate jwt token
                const currentUser = {
                    email: email
                }
                await getJwtToken(currentUser);
                // token completed
                toast.success("Logged in successfully.");
                navigate(from, { replace: true });

            })
            .catch(error => {
                setLoading(false);
                const errors = error.message;
                toast.error(errors);
            })
    }

    const socialLogin = event => {
        loginBySocialAccounts(event)
            .then(async (result) => {
                const user = result.user;
                // get/generate jwt token
                const currentUser = {
                    email: user.email
                }
                // if this user is not in the list of users
                await storeSingleUserWithJwt(user) // store login with generate jwt token

                toast.success("Logged in successfully.");
                navigate(from, { replace: true });
            })
            .catch((error) => {
                setLoading(false);
                const errors = error.message + ' | ' + error.code;
                toast.error(errors);
            });
    }

    return (
        <div className='grid grid-cols-1 xl:grid-cols-2 gap-5 place-content-center  xl:min-h-[90vh] mx-auto'>
            <div className="flex justify-center md:hidden lg:block">
                <img src='' alt="" className='w-3/5' />
            </div>
            <div className="p-6 rounded-md sm:p-10 dark:bg-gray-900 dark:text-gray-100 bg-gray-100 md:min-w-[500px] mx-auto shadow-xl shadow-slate-300 dark:shadow-slate-700">
                <div className="mb-8 text-center">
                    <h1 className="my-3 text-4xl font-bold">Login Now</h1>
                    <p className="text-sm dark:text-gray-400">Login to access your account</p>
                </div>
                <form onSubmit={(e) => handleLogin(e)}
                    className="space-y-12 ng-untouched ng-pristine ng-valid">
                    <div className="space-y-4">
                        <div>
                            <label htmlFor="email" className="block mb-2 text-sm text-slate-400">Email address</label>
                            <input onBlur={(e) => setEmail(e.target.value)} required type="email" name="email" id="email" placeholder="Login Email" className="w-full text-xl px-3 py-3 border rounded-md dark:border-gray-700 dark:bg-gray-900 dark:text-gray-100" />
                        </div>
                        <div className="mt-4">
                            <div className="flex items-center justify-between">
                                <label htmlFor="password" className=" text-gray-800 dark:text-gray-200 flex items-center justify-between">Password

                                </label>
                                <Link to="/forget-password" className="text-xs text-gray-600 dark:text-gray-400 hover:underline">Forget Password?</Link>
                            </div>
                            <div className='relative'>
                                <input required type={!showPassword ? "password" : "text"} name='password' className="block w-full px-4 py-3 mt-2  bg-white border rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 dark:focus:border-blue-300 focus:ring-blue-300 focus:outline-none focus:ring focus:ring-opacity-40" onBlur={(e) => { setPassword(e.target.value) }} placeholder="* * * * * * * *" />

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
                            </div>
                        </div>
                    </div>
                    <div className="space-y-2">
                        <PrimaryButton>
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15m3 0l3-3m0 0l-3-3m3 3H9" />
                            </svg> &nbsp;  Login
                        </PrimaryButton>



                        <p className="px-6 text-sm text-center dark:text-gray-400">Don't Have an account yet?
                            <Link rel="noopener noreferrer" to="/register" className="hover:underline dark:text-violet-400"> Register Now</Link>.
                        </p>
                    </div>
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

export default Login;