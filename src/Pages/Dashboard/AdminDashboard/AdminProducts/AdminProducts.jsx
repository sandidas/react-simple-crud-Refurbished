import { useQuery } from '@tanstack/react-query';
import React, { useContext } from 'react';
import DashboardUsersCell from '../../../../Components/DashboardUsersCell/DashboardUsersCell';
import SmallSpinner from '../../../../Components/Spinner/SmallSpinner';
import { AuthContext } from '../../../../Context/UserContext';
import AdminProductsCell from './AdminProductsCell';

const AdminProducts = () => {
    const { user } = useContext(AuthContext);
    // Products loading
    const uri = `${import.meta.env.VITE_serverUrl}/products?uid=${user?.uid}&role=Admin`;
    const settings = {
        method: 'GET',
        headers: {
            'content-type': 'application/json',
            authorization: `Bearer ${localStorage.getItem('refurbished')}`
        }
    };
    const { data, refetch, isLoading, isError, error } = useQuery({
        queryKey: ['users'], // when user change the date it will re-fetch 
        queryFn: async () => {
            const res = await fetch(uri, settings);
            const data = await res.json();
            if (data.status === 401) {
                toast.error(data.message)

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
        <section>
            <div className="container p-2 mx-auto sm:p-4 dark:text-gray-100">
                <h2 className="mb-4 text-2xl font-semibold leading-tight">All Products</h2>
                <div className="overflow-x-auto">
                    <table className="min-w-full text-xs">

                        <thead className="dark:bg-gray-700">
                            <tr className="text-left">
                                <th className="p-3">id</th>
                                <th className="p-3">Photo</th>
                                <th className="p-3">Original Price</th>
                                <th className="p-3">Resale Price</th>
                                <th className="p-3">Status</th>
                                <th className="p-3">Reported</th>
                                <th className="p-3">Action</th>
                            </tr>
                        </thead>
                        <tbody>

                            {
                                data && data?.map((product, i) => <AdminProductsCell
                                    product={product}
                                    key={i}
                                    refetch={refetch}
                                    user={user}

                                />)
                            }

                        </tbody>
                    </table>
                </div>
            </div>

        </section>
    );
};

export default AdminProducts;