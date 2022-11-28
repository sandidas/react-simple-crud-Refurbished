import { Button } from '@mantine/core';
import { useQuery } from '@tanstack/react-query';
import React, { useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import ProductSingleCard from '../../Components/ProductSingleCard/ProductSingleCard';
import SmallSpinner from '../../Components/Spinner/SmallSpinner';

const categoriesItems = [
    {
        title: "MacBook Pro",
        slug: "macBook-pro"
    }, {
        title: "MacBook Air",
        slug: "macbook-air"
    }, {
        title: "iMac",
        slug: "imac"
    }, {
        title: "Mac Mini",
        slug: "mac-mini"
    }, {
        title: "Mac Studio",
        slug: "mac-studio"
    }

];


const Categories = () => {
    const { id } = useParams();
    const [productId, setProductId] = useState(id);
    // fetch by categories 
    const uri = `${import.meta.env.VITE_serverUrl}/productByCategory/${productId}`;
    const { data: products = [], refetch, isLoading, isError, error } = useQuery({
        queryKey: ['products', productId], // when user change the date it will re-fetch 

        queryFn: async () => {
            const res = await fetch(uri);
            const data = await res.json();
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
            <div className='text-center py-10 font-bold'><h1>Products By Categories</h1></div>

            <div className='grid md:grid-cols-8 gap-5'>
                <div className='col-span-2 flex flex-col space-y-5'>
                    {
                        categoriesItems && categoriesItems.map((category, i) =>
                            <button key={i}
                                onClick={(event) => setProductId(category.slug)}
                                className="text-left py-5 px-2 bg-gray-100 dark:bg-gray-600 hover:bg-red-800 hover:text-white"
                            >
                                {category?.title}

                            </button>
                        )
                    }

                </div>
                <div className='col-span-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5'>
                    {
                        products && products.map(product =>
                            <ProductSingleCard key={product?._id} product={product} />
                        )
                    }
                </div>
            </div>

        </section>
    );
};

export default Categories;