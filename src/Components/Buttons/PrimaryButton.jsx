import React, { useContext } from 'react';  
import { AuthContext } from '../../Context/UserContext';

import SmallSpinner from '../Spinner/SmallSpinner';

const PrimaryButton = ({ children, handler, disable, classes }) => {
    const { loading } = useContext(AuthContext)


    return (
        <button onClick={handler} disabled={disable && disable}
            className={`flex items-center justify-center w-full p-4 my-2 space-x-4  rounded-md focus:ring-2 focus:ring-offset-1 dark:border-gray-400 focus:ring-violet-400 hover:bg-purple-800 hover:text-white bg-purple-600 text-white ${classes && classes}`}>
            {loading ? <SmallSpinner /> : children}
        </button>
    );
};

export default PrimaryButton;