import React from "react";
import { Link, useRouteError } from "react-router-dom"; 

import useTitle from '../../Hooks/useTitle';

const ErrorPage = () => {
    useTitle('ERROR!');
    // To check error
    const error = useRouteError();
    // console.log(error);

    return (
        <>
       
            {error &&

                <section className="flex flex-col items-center h-full p-16 dark:bg-gray-900 dark:text-gray-100 min-h-[calc(100vh_-_50px)]">
                    <div><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" className="w-60 h-60 dark:text-gray-600">
                        <path fill="currentColor" d="M256,16C123.452,16,16,123.452,16,256S123.452,496,256,496,496,388.548,496,256,388.548,16,256,16ZM403.078,403.078a207.253,207.253,0,1,1,44.589-66.125A207.332,207.332,0,0,1,403.078,403.078Z"></path>
                        <rect width="176" height="32" x="168" y="320" fill="currentColor"></rect>
                        <polygon fill="currentColor" points="210.63 228.042 186.588 206.671 207.958 182.63 184.042 161.37 162.671 185.412 138.63 164.042 117.37 187.958 141.412 209.329 120.042 233.37 143.958 254.63 165.329 230.588 189.37 251.958 210.63 228.042"></polygon>
                        <polygon fill="currentColor" points="383.958 182.63 360.042 161.37 338.671 185.412 314.63 164.042 293.37 187.958 317.412 209.329 296.042 233.37 319.958 254.63 341.329 230.588 365.37 251.958 386.63 228.042 362.588 206.671 383.958 182.63"></polygon>
                    </svg></div>
                    <div className="container flex flex-col items-center justify-center px-5 mx-auto my-8">
                        <div className="max-w-md text-center">
                            <h2 className="mb-8 font-extrabold text-9xl dark:text-gray-600">
                                <span className="sr-only">Error</span>{error?.status}
                            </h2>
                            <p className="text-2xl font-semibold md:text-3xl py-10">{error?.statusText || error?.status || error?.message}</p>
                            {/* <p className="mt-4 mb-8 dark:text-gray-400">{error?.status || error?.message}</p> */}
                            <Link to='/' className="px-8 py-3 font-semibold rounded dark:bg-yellow-400 dark:text-gray-900 hover:dark:bg-green-600 dark:hover:text-white bg-yellow-400 hover:bg-green-600 hover:text-white">Back to Homepage</Link>
                        </div>
                    </div>
                </section>
            }
        </>
    );
};

export default ErrorPage;
