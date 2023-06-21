import React from 'react'
import { Link } from 'react-router-dom'
import { AiOutlineShopping } from 'react-icons/ai'
import { useDispatch, useSelector } from 'react-redux'
import { showcarttoggle } from '../../redux/features/productSclice'
import Cart from '../cart/Cart'
import classes from './heander.module.css'
const Header = () => {
    const dispatch = useDispatch()
    const { showcart, totalQuantity } = useSelector((state) => state.product)

    return (
        <header className={classes.navbar_container}>
            <p className={classes.logo}>
                <Link to="/">ON<span>GUNS</span>.</Link>
            </p>
            {/* onClick={() => setShowCart(true)} */}
            <button type="button" className={classes.cart_icon} onClick={() => dispatch(showcarttoggle(true))}>
                <AiOutlineShopping />
                <span className={classes.cart_item_qty}>{totalQuantity}</span>
            </button>

            {showcart && <Cart />}
        </header>
    )
}

export default Header