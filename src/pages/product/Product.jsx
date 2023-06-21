import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { client, urlFor } from '../../../lib/client'
import { AiOutlineMinus, AiOutlinePlus, AiFillStar, AiOutlineStar } from 'react-icons/ai';
import { useDispatch, useSelector } from 'react-redux';
import { addpro, decQut, incQut, showcarttoggle } from '../../redux/features/productSclice';
import { Toaster, toast } from 'react-hot-toast';
import classes from './prodult.module.css'
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
            <div className={classes.product_detail_container}>
                <div>
                    <div className={classes.image_container}>
                        <img src={urlFor(image && image[0]).url()} className={classes.product_detail_image} />
                    </div>
                </div>

                <div className={classes.product_detail_desc}>
                    <h1>{name}</h1>

                    <h4>Details: </h4>
                    <p>{details}</p>
                    <p className={classes.price}>${price}</p>
                    <div className={classes.quantity}>
                        <h3>Quantity:</h3>
                        <p className={classes.quantity_desc}>
                            <span className={classes.minus} onClick={() => dispatch(decQut())}><AiOutlineMinus /></span>
                            {/* onClick={decQty} */}
                            <span className={classes.num}>{qun}</span>
                            {/* {qty} */}
                            <span className={classes.plus} onClick={() => dispatch(incQut())}   ><AiOutlinePlus /></span>
                            {/* onClick={incQty} */}
                        </p>
                    </div>
                    <div className={classes.buttons}>

                        <button type="button" className={classes.add_to_cart} onClick={() => dispatch(addpro({ product: product, quantity: qun }))} >Add to Cart</button>
                        <button type="button" className={classes.buy_now} onClick={handleBuy}  >Buy Now</button>
                    </div>
                </div>
            </div>


        </div>
    )
}

export default Product
