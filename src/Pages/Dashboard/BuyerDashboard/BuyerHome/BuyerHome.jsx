import { useQuery } from '@tanstack/react-query';
import React, { useContext } from 'react';
import SmallSpinner from '../../../../Components/Spinner/SmallSpinner';
import { AuthContext } from '../../../../Context/UserContext';

const BuyerHome = () => {

    const { user, userRole, loading, isRoleLoading } = useContext(AuthContext);
    console.log(user);
    // Products loading
    const uri = `${import.meta.env.VITE_serverUrl}/orders?uid=${user?.uid}?role=${userRole}`;
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
        <div>
            This is Buyer Dashboard
        </div>
    );
};

export default BuyerHome;