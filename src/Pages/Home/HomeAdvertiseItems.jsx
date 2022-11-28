import React from 'react';
import ProductSingleCard from '../../Components/ProductSingleCard/ProductSingleCard';


const HomeAdvertiseItems = ({ advertisedProducts }) => {
    return (
        <section className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5'>
            {
                advertisedProducts &&
                advertisedProducts.map(product =>
                    <ProductSingleCard key={product?._id} product={product} />
                )
            }
        </section>
    );
};

export default HomeAdvertiseItems;