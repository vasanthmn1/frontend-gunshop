

import React, { useEffect, useState } from 'react';
import { client } from '../../../lib/client';
import Banner from '../../components/home/banner/Banner';
import Product from '../../components/home/product/Product';

const Home = () => {
    const [products, Setproducts] = useState([])
    const [banner, SetBanners] = useState([])

    useEffect(() => {
        const getServerSideProps = async () => {
            const query = '*[_type == "product"]';
            const products = await client.fetch(query);
            Setproducts(products)
        };
        getServerSideProps()
    }, [])

    console.log(products[2]);
    return (
        <div>
            <Banner products={products[1]} />
            <div className='products-heading'>
                <h2>Best Seller Guns</h2>
                <p>Choose any Variations</p>
            </div>
            <div className="products-container">
                {products?.map((product) => <Product key={product._id} product={product} />)}
            </div>
        </div>
    );
};

// export const getServerSideProps = async () => {
//     const query = '*[_type == "product"]';
//     const products = await client.fetch(query);

//     const bannerQuery = '*[_type == "banner"]';
//     const bannerData = await client.fetch(bannerQuery);

//     return {
//         props: { products }
//     };
// };

export default Home;
