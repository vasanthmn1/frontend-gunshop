import React from 'react'
import RouterPage from '../router/RouterPage'
import Header from '../components/header/Header'
import Footser from '../components/footer/Footer'
import Footer from '../components/footer/Footer'

const Layout = () => {
    return (
        <div>
            <Header />
            <main className='main-container'>
                <RouterPage />

            </main>

        </div>
    )
}

export default Layout