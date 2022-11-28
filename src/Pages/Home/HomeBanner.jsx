import React from 'react';
import { Player } from '@lottiefiles/react-lottie-player';



const HomeBanner = () => {
    return (
        <section className='grid grid-cols-12'>
            <div className='col-span-12 md:col-span-7'>
                <Player
                    src='https://assets5.lottiefiles.com/packages/lf20_g1YJeb.json'
                    className="player"
                    loop
                    autoplay
                />
            </div>
            <div className='col-span-12 md:col-span-5 flex items-center'>
                <div className='py-10 px-5'>
                    <h2 className='text-4xl lg:text-6xl font-bold'>Refurbished <br /> Mac</h2>
                    <p>Discover what goes into each refurbished Mac.</p>
                </div>
            </div>

        </section>
    );
};

export default HomeBanner;