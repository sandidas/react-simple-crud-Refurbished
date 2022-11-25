import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import PrimaryButton from '../../Components/Buttons/PrimaryButton';
import { AuthContext } from '../../Context/UserContext';



const ForgetPassword = () => {
    const { requestForgetPassword, showAlert } = useContext(AuthContext);

    const handleForgetpassword = event => {
        event.preventDefault();
        const form = event.target;
        const email = form.email.value;
        if (!email) {
            showAlert('error', "Please do not leave any empty fields.");
            return
        }
        requestForgetPassword(email)
            .then(result => {
                showAlert('success', 'Please check your email, We send an password reset link.');
                form.reset();
            })
            .catch(error => {
                const errors = error.message + ' | ' + error.code;
                showAlert('error', errors);
            });
    }

    return (
        <div className='grid grid-cols-1 xl:grid-cols-2 gap-5 place-content-center  xl:min-h-[90vh] mx-auto p-5'>

            <div className="flex justify-center md:hidden lg:block">
                <img src='' alt="" className='w-3/5' />
            </div>
            <div className="p-6 rounded-md sm:p-10 dark:bg-gray-900 dark:text-gray-100 bg-gray-100 max-w-2xl min-w-[60%] mx-auto shadow-xl shadow-slate-300">
                <div className="mb-8 text-center">
                    <h1 className="my-3 text-4xl font-bold">Forget Password</h1>
                    <p className="text-sm dark:text-gray-400">Submit your email to reset your password</p>
                </div>
                <form onSubmit={(e) => handleForgetpassword(e)}
                    className="space-y-12 ng-untouched ng-pristine ng-valid">
                    <div className="space-y-4">
                        <div>
                            <label htmlFor="email" className="block mb-2 text-sm text-slate-400">Email address</label>
                            <input required type="email" name="email" id="email" placeholder="hello@sandipandas.net" className="w-full text-xl px-3 py-3 border rounded-md dark:border-gray-700 dark:bg-gray-900 dark:text-gray-100" />
                        </div>
                    </div>
                    <div className="space-y-2">
                        <PrimaryButton>
                            Request Reset Password
                        </PrimaryButton>




                        <p className="px-6 text-sm text-center dark:text-gray-400">Don't Have an account yet?
                            <Link rel="noopener noreferrer" to="/register" className="hover:underline dark:text-violet-400"> Register Now</Link>.
                        </p>
                    </div>
                </form>
            </div>

        </div>
    );
};

export default ForgetPassword;