import { useQuery } from '@tanstack/react-query';
import React from 'react';
import { useContext } from 'react';
import toast from 'react-hot-toast';
import DashboardUsersCell from '../../../../Components/DashboardUsersCell/DashboardUsersCell';
import SmallSpinner from '../../../../Components/Spinner/SmallSpinner';
import { AuthContext } from '../../../../Context/UserContext';


const AllBuyers = () => {
    const { user } = useContext(AuthContext);
    // Products loading
    const uri = `${import.meta.env.VITE_serverUrl}/userByType?uid=${user?.uid}&role=Buyer`;
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
                <h2 className="mb-4 text-2xl font-semibold leading-tight">All Buyers</h2>
                <div className="overflow-x-auto">
                    <table className="min-w-full text-xs">

                        <thead className="dark:bg-gray-700">
                            <tr className="text-left">
                                <th className="p-3">uid</th>
                                <th className="p-3">Photo</th>
                                <th className="p-3">Name</th>
                                <th className="p-3">Role</th>
                                <th className="p-3">Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                data && data.map((oneUser, i) => <DashboardUsersCell
                                    oneUser={oneUser}
                                    key={i}
                                    refetch={refetch}
                                />)
                            }
                        </tbody>
                    </table>
                </div>
            </div>

        </section>
    );
};

export default AllBuyers;