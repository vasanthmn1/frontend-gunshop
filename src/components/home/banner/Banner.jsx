import React, { useEffect, useState } from 'react'
import { client, urlFor } from '../../../../lib/client';
import { Link } from 'react-router-dom';
import classes from './banner.module.css'
// import { client } from '../../../lib/client';

const Banner = () => {
    const [banner, SetBanners] = useState([])
    useEffect(() => {
        const getServerSideProps = async () => {
            const bannerQuery = '*[_type == "banner"]';
            const bannerData = await client.fetch(bannerQuery);
            SetBanners(bannerData)
        };
        getServerSideProps()
    }, [])

    return (
        <>
            {
                banner.length && banner[0] ?
                    <div className={classes.banner_container} style={{
                        backgroundImage: `linear-gradient(to bottom, rgba(255, 255, 255, 0.2),RGB(0, 0, 0)),url(${urlFor(banner[0]?.image).url()})`

                    }}>
                        <p className={classes.beats_solo}>{banner[0].smallText}</p>
                        <h3>{banner[0].midText}sss</h3>
                        <h1>{banner[0].largeText1}</h1>
                        {/* <img src={urlFor(banner[0]?.image).url()} alt="banner" className={classes.banner_image} /> */}
                        <div>
                            <Link href={`/product/${banner[0].product}`}>
                                <button type="button">{banner[0].buttonText}</button>
                            </Link>
                            <div className={classes.desc}>
                                <h5>Description</h5>
                                <p>{banner[0].desc}</p>
                            </div>
                        </div>
                    </div>


                    : <h1>NO Data</h1>

            }

        </>
        // </div>
    )
}

export default Banner


{/* <h1>{banner.Product}</h1> */ }
{/* <img src={urlFor(banner.image)} alt="headphones" className="hero-banner-image" /> */ }

{/* <div>
                    <Link href={`/product/${banner.product}`}>
                        <button type="button">{banner.buttonText}</button>
                    </Link>
                    <div className="desc">
                        <h5>Description</h5>
                        <p>{banner.desc}</p>
                    </div>
                </div> */}