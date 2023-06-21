import React, { useState, useEffect } from 'react';
// import Link from 'next/link';
import { BsBagCheckFill } from 'react-icons/bs';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { addpro, empetycartItem } from '../../redux/features/productSclice';
import FireWorks from '../../../lib/FireWorks';

// import { useStateContext } from '../context/StateContext';
// import { runFireworks } from '../lib/utils';

const Success = () => {
    const dispatch = useDispatch()
    const { } = useSelector((state) => state.product)
    useEffect(() => {
        // localStorage.clear();
        dispatch(empetycartItem())
        FireWorks()
    }, []);
    return (
        <div className='success=warpper'>
            <div className="success">
                <p className='icon'>
                    <BsBagCheckFill />
                </p>

                <p className="email-msg">Check your email inbox</p>
                <p className='description'>
                    If you have any questions, please email
                    <a href='mailto:demo@gmail.com' className='email'>
                        demo@gmail.com
                    </a>
                </p>
                <Link to="/">
                    <button type="button" width="300px" className="btn">
                        Continue Shopping
                    </button>
                </Link>
            </div>
        </div>
    )
}

export default Success