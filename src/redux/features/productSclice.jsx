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

            const { quantity, product } = action.payload;

            const checkProductIncart = state.cartItems.find((item) => item._id === product._id);


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

            const { id, value } = action.payload;
            const foundProductIndex = state.cartItems.findIndex((item) => item._id === id);

            if (foundProductIndex !== -1) {
                const foundProduct = state.cartItems[foundProductIndex];

                if (value === 'inc') {
                    state.cartItems[foundProductIndex] = { ...foundProduct, quantity: foundProduct.quantity + 1 };
                    state.totalPrice += foundProduct.price;
                    state.totalQuantity += 1;
                } else if (value === 'dec') {
                    if (foundProduct.quantity > 1) {
                        state.cartItems[foundProductIndex] = { ...foundProduct, quantity: foundProduct.quantity - 1 };
                        state.totalPrice -= foundProduct.price;
                        state.totalQuantity -= 1;
                    }
                }
            }
        },
        incQut: (state, action) => {

            state.qun = state.qun + 1

        },
        decQut: (state, action) => {

            state.qun = state.qun - 1 < 1 ? 1 : state.qun - 1;
        },
        showcarttoggle: (state, action) => {
            state.showcart = action.payload

        },
        empetycartItem: (state, action) => {
            state.cartItems = [],
                state.totalPrice = 0,
                state.totalQuantity = 0
        }
    }
})
export const { addpro, removecart, toggleCartItemQuanitity, incQut, decQut, showcarttoggle, empetycartItem } = ProductSlice.actions

export default ProductSlice.reducer