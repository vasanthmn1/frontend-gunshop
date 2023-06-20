import React from 'react'
import { Link } from 'react-router-dom'
import { urlFor } from '../../../../lib/client'
import classes from './product.module.css'
// import { urlFor } from '../li';
const Product = ({ product: { image, name, slug, price } }) => {
    return (
        <div>
            <Link to={`product/${slug.current}`}>
                <div className={classes.product_card}>
                    <img
                        src={urlFor(image && image[0])}
                        width={250}
                        height={250}
                        className={classes.product_image}
                    />
                    <p className={classes.product_name}>{name}</p>
                    <p className={classes.product_price}>₹{price}</p>
                </div>
            </Link>
        </div>
    )
}

export default Product