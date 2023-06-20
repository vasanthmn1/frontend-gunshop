import { createSlice } from '@reduxjs/toolkit'
import { toast } from 'react-hot-toast';
const initialState = {
    showcart: false,
    cartItems: [],
    totalPrice: 0,
    totalQuantity: 0,
    qun: 1
}
const ProductSlice = createSlice({
    name: 'product',
    initialState,
    reducers: {
        addpro: (state, action) => {
            // const product = action.payload;
            const { quantity, product } = action.payload;
            console.log(product, "s");
            console.log(state.totalPrice);


            const checkProductIncart = state.cartItems.find((item) => item._id === product._id);

            // state.totalPrice = state.totalPrice + product.price;

            // state.totalQuantity = state.totalQuantity + quantity;
            const priceToAdd = product.price * quantity;

            state.totalPrice += priceToAdd;
            state.totalQuantity += quantity;

            if (checkProductIncart) {
                const updatedCartItems = state.cartItems.map((cartitem) => {
                    if (cartitem._id === product._id)
                        return {
                            ...cartitem,
                            quantity: cartitem.quantity + quantity,
                        };
                    return cartitem;
                });
                state.cartItems = updatedCartItems;
            } else {
                product.quantity = quantity;
                state.cartItems = [...state.cartItems, { ...product }];
            }

            toast.success(`${quantity} ${product.name} added to the cart.`);
        },
        removecart: (state, action) => {
            const productId = action.payload;
            console.log(action.payload)
            const foundProductIndex = state.cartItems.findIndex((item) => item._id === productId._id);

            if (foundProductIndex !== -1) {
                const foundProduct = state.cartItems[foundProductIndex];
                state.cartItems.splice(foundProductIndex, 1);
                state.totalPrice -= foundProduct.price * foundProduct.quantity;
                state.totalQuantity -= foundProduct.quantity;
                toast.success(`${foundProduct.name} removed from the cart.`);
            }


        },
        toggleCartItemQuanitity: (state, action) => {

            // const id = action.payload
            // const value = action.payload
            // foundProduct = state.cartItems.find((item) => item._id === id)
            // index = state.cartItems.findIndex((product) => product._id === id);
            // const newCartItems = state.cartItems.filter((item) => item._id !== id)

            // if (value === 'inc') {
            //     state.cartItems([...newCartItems, { ...foundProduct, quantity: foundProduct.quantity + 1 }]);
            //     state.totalPrice((prevTotalPrice) => prevTotalPrice + foundProduct.price)
            //     state.totalQuantity(prevTotalQuantities => prevTotalQuantities + 1)
            // } else if (value === 'dec') {
            //     if (foundProduct.quantity > 1) {
            //         setCartItems([...newCartItems, { ...foundProduct, quantity: foundProduct.quantity - 1 }]);
            //         setTotalPrice((prevTotalPrice) => prevTotalPrice - foundProduct.price)
            //         setTotalQuantities(prevTotalQuantities => prevTotalQuantities - 1)
            //     }
            // }

            const { id, value } = action.payload;
            const foundProduct = state.cartItems.find((item) => item._id === id);
            const index = state.cartItems.findIndex((product) => product._id === id);
            const newCartItems = state.cartItems.filter((item) => item._id !== id);

            if (value === 'inc') {
                state.cartItems = [...newCartItems, { ...foundProduct, quantity: foundProduct.quantity + 1 }];
                state.totalPrice += foundProduct.price;
                state.totalQuantity += 1;
            } else if (value === 'dec') {
                if (foundProduct.quantity > 1) {
                    state.cartItems = [...newCartItems, { ...foundProduct, quantity: foundProduct.quantity - 1 }];
                    state.totalPrice -= foundProduct.price;
                    state.totalQuantity -= 1;
                }
            }
        },
        incQut: (state, action) => {
            // state.qun = (((prevQty) => prevQty + 1))
            // console.log(state.qun);
            state.qun = state.qun + 1
            // state.totalPrice += price
        },
        decQut: (state, action) => {
            // state.qun((prevQty) => {
            //     if (prevQty - 1 < 1) return 1;

            //     return prevQty - 1;
            // });
            state.qun = state.qun - 1 < 1 ? 1 : state.qun - 1;
        },
        showcarttoggle: (state, action) => {
            state.showcart = action.payload
            console.log(state.showcart);
        }
    }
})
export const { addpro, removecart, toggleCartItemQuanitity, incQut, decQut, showcarttoggle } = ProductSlice.actions

export default ProductSlice.reducer