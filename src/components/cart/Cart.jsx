import React, { useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { AiOutlineMinus, AiOutlinePlus, AiOutlineLeft, AiOutlineShopping } from 'react-icons/ai';
import { TiDeleteOutline } from 'react-icons/ti';
import toast from 'react-hot-toast';
import { removecart, showcarttoggle, toggleCartItemQuanitity } from '../../redux/feature/ProductSclice';
import { Link } from 'react-router-dom';
import { urlFor } from '../../../lib/client';
import getStripe from '../../../lib/getStripe';
import axios from 'axios'
const Cart = () => {
    const cartRef = useRef();
    const { cartItems, showcart, totalPrice, totalQuantity } = useSelector((state) => state.product)
    const dispatch = useDispatch()


    const handlePay = async () => {
        const stripe = await getStripe()

        const response = await axios.post(`http://localhost:8000/create-checkout-session`, {
            cartItems: cartItems
        })
        if (response.status === 500) return;
        console.log(response.data.cartItems);
        const data = response.data.id
        toast.loading("Loading...")
        console.log(data);
        stripe.redirectToCheckout({ sessionId: data })

    }
    return (
        <div className="cart-wrapper" ref={cartRef}>
            <div className="cart-container">
                <button
                    type="button"
                    className="cart-heading"
                    onClick={() => dispatch(showcarttoggle(false))}>
                    <AiOutlineLeft />
                    <span className="heading">Your Cart</span>
                    <span className="cart-num-items">({totalQuantity} items)</span>
                </button>

                {cartItems.length < 1 && (
                    <div className="empty-cart">
                        <AiOutlineShopping size={150} />
                        <h3>Your shopping bag is empty</h3>
                        <Link href="/">
                            <button
                                type="button"
                                onClick={() => dispatch(showcarttoggle(false))}
                                className="btn"
                            >
                                Continue Shopping
                            </button>
                        </Link>
                    </div>
                )}

                <div className="product-container">
                    {cartItems.length >= 1 && cartItems.map((item) => (
                        <div className="product" key={item._id}>
                            <img src={urlFor(item?.image[0])} className="cart-product-image" />
                            <div className="item-desc">
                                <div className="flex top">
                                    <h5>{item.name}</h5>
                                    <h4>₹{item.price}</h4>
                                </div>
                                <div className="flex bottom">
                                    <div>
                                        <p className="quantity-desc">
                                            <span className="minus" onClick={() => dispatch(toggleCartItemQuanitity({ id: item._id, value: 'dec' }))}>

                                                {/* <span className="minus" onClick={() => toggleCartItemQuanitity(item._id, 'dec')}> */}
                                                <AiOutlineMinus />
                                            </span>
                                            <span className="num" onClick="">{item.quantity}</span>
                                            <span className="plus" onClick={() => dispatch(toggleCartItemQuanitity({ id: item._id, value: 'inc' }))}><AiOutlinePlus /></span>

                                            {/* <span className="plus" onClick={() => toggleCartItemQuanitity(item._id, 'inc')}><AiOutlinePlus /></span> */}
                                        </p>
                                    </div>
                                    <button
                                        type="button"
                                        className="remove-item"
                                        onClick={() => dispatch(removecart(item))}
                                    // onClick={() => onRemove(item)}
                                    >
                                        <TiDeleteOutline />
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>


                {cartItems.length >= 1 && (
                    <div className="cart-bottom">
                        <div className="total">
                            <h3>Subtotal:</h3>
                            <h3>${totalPrice}</h3>
                        </div>
                        <div className="btn-container">
                            {/* <button type="button" className="btn" onClick={handleCheckout}> */}
                            <button type="button" className="btn" onClick={handlePay}>

                                Pay with Stripe
                            </button>
                        </div>
                    </div>
                )}
            </div>
        </div>
    )
}

export default Cart