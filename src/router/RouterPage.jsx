import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Home from '../pages/home/Home'
import Product from '../pages/product/Product'
import Success from '../components/success/Success'
import Cancel from '../components/cancel/Cancel'

const RouterPage = () => {
    return (
        <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/product/:slug' element={<Product />} />
            <Route path='/success' element={<Success />} />
            <Route path='/cancel' element={<Cancel />} />


        </Routes>
    )
}

export default RouterPage