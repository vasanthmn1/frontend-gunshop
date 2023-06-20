import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { client, urlFor } from '../../../lib/client'
import { AiOutlineMinus, AiOutlinePlus, AiFillStar, AiOutlineStar } from 'react-icons/ai';
import { useDispatch, useSelector } from 'react-redux';
import { addpro, decQut, incQut, showcarttoggle } from '../../redux/feature/ProductSclice';
import { Toaster, toast } from 'react-hot-toast';
const Product = () => {

    const [product, Setproduct] = useState({})
    const [products, Setproducts] = useState()

    const { image, name, details, price } = product;
    const { slug } = useParams()

    // const { qun } = useSelector((state) => state.product)

    const { cartItems, showcart, totalPrice, totalQuantity, qun } = useSelector((state) => state.product)
    const dispatch = useDispatch()
    useEffect(() => {

        getStaticProps()
    }, [])

    const getStaticProps = async () => {
        const query = `*[_type == "product" && slug.current == '${slug}'][0]`;
        const productsQuery = '*[_type == "product"]'

        const product = await client.fetch(query);
        const products = await client.fetch(productsQuery);

        Setproduct(product)
        Setproducts(products)

    }

    const handleBuy = () => {
        dispatch(addpro({ product: product, quantity: qun }))
        dispatch(showcarttoggle(true))

    }

    if (!image) {
        return <div>Loading...</div>;
    }
    return (
        <div>
            <Toaster />
            <div className="product-detail-container">
                <div>
                    <div className="image-container">
                        <img src={urlFor(image && image[0]).url()} className="product-detail-image" />
                    </div>
                </div>

                <div className="product-detail-desc">
                    <h1>{name}</h1>
                    {/* <div className="reviews">
                        <div>
                            <AiFillStar />
                            <AiFillStar />
                            <AiFillStar />
                            <AiFillStar />
                            <AiOutlineStar />
                        </div>
                        <p>
                            (20)
                        </p>
                    </div> */}
                    <h4>Details: </h4>
                    <p>{details}</p>
                    <p className="price">${price}</p>
                    <div className="quantity">
                        <h3>Quantity:</h3>
                        <p className="quantity-desc">
                            <span className="minus" onClick={() => dispatch(decQut())}><AiOutlineMinus /></span>
                            {/* onClick={decQty} */}
                            <span className="num">{qun}</span>
                            {/* {qty} */}
                            <span className="plus" onClick={() => dispatch(incQut())}   ><AiOutlinePlus /></span>
                            {/* onClick={incQty} */}
                        </p>
                    </div>
                    <div className="buttons">
                        {/* onClick={() => onAdd(product, qty)} */}
                        <button type="button" className="add-to-cart" onClick={() => dispatch(addpro({ product: product, quantity: qun }))} >Add to Cart</button>
                        {/* onClick={handleBuyNow} */}
                        <button type="button" className="buy-now" onClick={handleBuy}  >Buy Now</button>
                    </div>
                </div>
            </div>

            {/* <div className="maylike-products-wrapper">
                <h2>You may also like</h2>
                <div className="marquee">
                    <div className="maylike-products-container track">
                        {products.map((item) => (
                            <Product key={item._id} product={item} />
                        ))}
                    </div>
                </div>
            </div> */}
        </div>
    )
}

export default Product

// const getStaticPaths = async () => {
//     const query = `*[_type == "product"] {
// slug {
// current
// }
// }
// `;
//     const products = await client.fetch(query);

//     const paths = products.map((product) => ({
//         params: {
//             slug: product.slug.current
//         }
//     }));

//     return {
//         paths,
//         fallback: 'blocking'
//     }
// }