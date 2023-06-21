import React from 'react'
import { Link } from 'react-router-dom'

const Cancel = () => {
    return (
        <div>
            <Link to={'/'}>
                somting Worng contat  immediately without delay  .
            </Link>
            <a href='mailto:demo@gmail.com' className='email' style={{ color: "blue" }}>
                demo@gmail.com
            </a>
        </div>
    )
}

export default Cancel