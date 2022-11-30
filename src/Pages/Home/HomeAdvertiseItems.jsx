import { useQuery } from '@tanstack/react-query';
import React from 'react';
import toast from 'react-hot-toast';
import ProductSingleCard from '../../Components/ProductSingleCard/ProductSingleCard';
import SmallSpinner from '../../Components/Spinner/SmallSpinner';


const HomeAdvertiseItems = () => {

    // Featch advertise items 
    // Products loading
    const uri = `${import.meta.env.VITE_serverUrl}/productsAdvertised/`;
    const { data: advertisedProducts = [], refetch, isLoading, isError, error } = useQuery({
        queryKey: ['advertisedProducts'], // when user change the date it will re-fetch 

        queryFn: async () => {
            const res = await fetch(uri);
            const data = await res.json();
            return data.data;
        }
    })
    // if (isLoading) {
    //     return <SmallSpinner />
    // }

    // if (isError) {
    //     toast.error(error.message);
    // }
    return (
        <section className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5'>
            {
                isLoading || isError ? <SmallSpinner /> :
                advertisedProducts &&
                advertisedProducts.map(product =>
                    <ProductSingleCard key={product?._id} product={product} refetch={refetch} />
                )
            }
        </section>
    );
};

export default HomeAdvertiseItems;