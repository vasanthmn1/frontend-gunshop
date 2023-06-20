import React from 'react'
import { Link } from 'react-router-dom'
import { AiOutlineShopping } from 'react-icons/ai'
import { useDispatch, useSelector } from 'react-redux'
import { showcarttoggle } from '../../redux/feature/ProductSclice'
import Cart from '../cart/Cart'
const Header = () => {
    const dispatch = useDispatch()
    const { showcart, totalQuantity } = useSelector((state) => state.product)

    return (
        <header className="navbar-container">
            <p className="logo">
                <Link href="/">JSM Headphones</Link>
            </p>
            {/* onClick={() => setShowCart(true)} */}
            <button type="button" className="cart-icon" onClick={() => dispatch(showcarttoggle(true))}>
                <AiOutlineShopping />
                <span className="cart-item-qty">{totalQuantity}</span>
            </button>

            {showcart && <Cart />}
        </header>
    )
}

export default Header