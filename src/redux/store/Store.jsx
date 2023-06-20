import { configureStore } from "@reduxjs/toolkit";
import ProductSclice from "../../redux/features/productSclice";

export const Store = configureStore({
    reducer: {
        product: ProductSclice,
    }
})