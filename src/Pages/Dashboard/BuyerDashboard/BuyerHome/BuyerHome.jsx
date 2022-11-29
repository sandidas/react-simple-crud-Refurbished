import { loadStripe } from '@stripe/stripe-js';
import { useQuery } from '@tanstack/react-query';
import React, { useContext } from 'react';
import SmallSpinner from '../../../../Components/Spinner/SmallSpinner';
import { AuthContext } from '../../../../Context/UserContext';
import BuyerOrderTableCell from './BuyerOrderTableCell';

const BuyerHome = () => {

    const stripePromise = loadStripe(import.meta.env.VITE_stripe_pk);


    const { user, userRole, loading, isRoleLoading } = useContext(AuthContext);

    // Orders loading
    const uri = `${import.meta.env.VITE_serverUrl}/orders?uid=${user?.uid}&role=${userRole}`;
    const settings = {
        method: 'GET',
        headers: {
            'content-type': 'application/json',
            authorization: `Bearer ${localStorage.getItem('refurbished')}`
        }
    };
    const { data, refetch, isLoading, isError, error } = useQuery({
        queryKey: ['orders'], // when user change the date it will re-fetch 
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
            <section>
                <div className='text-center pt-10 font-bold'><h1>My Orders</h1></div>
                <div className="container p-2 mx-auto sm:p-4 dark:text-gray-100">
                    <div className="overflow-x-auto">
                        <table className="min-w-full text-xs">
                            <thead className="dark:bg-gray-700">
                                <tr className="text-left">
                                    <th className="p-3">#</th>
                                    <th className="p-3">Title</th>
                                    <th className="p-3">Price</th>
                                    <th className="p-3">Order Date</th>
                                    <th className="p-3 text-right">Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    data &&
                                    data.map((order, i) => <BuyerOrderTableCell
                                        key={i}
                                        order={order}
                                        stripePromise={stripePromise}

                                    />)
                                }

                            </tbody>
                        </table>
                    </div>
                </div>

            </section>
        </div>
    );
};

export default BuyerHome;