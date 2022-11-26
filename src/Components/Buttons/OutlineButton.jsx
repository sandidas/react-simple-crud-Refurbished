import React, { useContext } from 'react';
import { AuthContext } from '../../Context/UserContext';
import SmallSpinner from '../Spinner/SmallSpinner';



const OutlineButton = ({ children, handler }) => {
    const { loading } = useContext(AuthContext)
    return (
        <button onClick={handler}
            className="flex items-center justify-center w-full p-4 my-2 space-x-4 border rounded-md focus:ring-2 focus:ring-offset-1 dark:border-gray-400 focus:ring-violet-400 hover:bg-purple-500 hover:text-white"
        >
            {loading ? <SmallSpinner /> : children}

        </button>
    );
};

export default OutlineButton;