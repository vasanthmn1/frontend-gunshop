import { configureStore } from "@reduxjs/toolkit";
import ProductSclice from "../feature/ProductSclice";




export const Store = configureStore({
    reducer: {
        product: ProductSclice,
    }
})