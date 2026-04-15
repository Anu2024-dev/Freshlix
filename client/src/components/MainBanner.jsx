// import React from 'react'
// import { assets } from '../assets/assets'
// import { Link } from 'react-router-dom';

// const MainBanner = () => {
//     return (
//         <div className='relative'>
//             <img src={assets.main_banner_bg} alt='banner' className='w-full hidden md:block' />
//             <img src={assets.main_banner_bg_sm} alt='banner' className='w-full md:hidden' />
//             <div className='absolute inset-0 flex flex-col items-center md:items-start justify-end md:justify-center pb-24 md:pb-0 px-4 md:pl-18 lg:pl-24'>
//                 <h1 className='text-3xl md:text-4xl lg:text-5xl font-bold text-center md:text-left max-w-72 md:max-w-80 lg:max-w-105 leading-tight lg:leading-15'>Freshness you can Trust,Savings you will Love!</h1>

//                 <div className='flex items-center mt-6 font-medium'>
//                     <Link to={"/products"} className='group flex items-center gap-2 px-7 md:px-9 py-3 bg-primary hover:bg-primary-dull transition rounded text-white cursor-pointer'>
//                         Shop now
//                         <img className='md:hidden transition group-focus:translate-x-1' src={assets.white_arrow_icon} alt='' />
//                     </Link>

//                     <Link to={"/products"} className='group hidden md:flex items-center gap-2 px-9 py-3 cursor-pointer'>
//                         Explore deals
//                         <img className='transition group-hover:translate-x-1' src={assets.black_arrow_icon} alt='' />
//                     </Link>
//                 </div>
//             </div>
//         </div>
//     )
// }

// export default MainBanner;
import React, { useEffect, useState } from 'react'
import { assets } from '../assets/assets'
import { Link } from 'react-router-dom';

const banners = [
    {
        bg: assets.main_banner_bg,
        bgSm: assets.main_banner_bg_sm,
        title: "  Freshness you can Trust, Savings you will Love!",
    },
    {
        bg: assets.banner2,
        bgSm: assets.banner2,
        title: " Organic Products Delivered to Your Doorstep!",
    },
    {
        bg: assets.banner3,
        bgSm: assets.banner3,
        title: " Best Deals on Fresh Groceries Everyday!",
    },
    {
        bg: assets.banner4,
        bgSm: assets.banner4,
        title: " Farm to Home, Faster Than Ever!",
    },
    {
        bg: assets.banner5,
        bgSm: assets.banner5,
        title: " Eat Fresh, Live Better!",
    },
]

const MainBanner = () => {

    const [current, setCurrent] = useState(0)
    const [displayedText, setDisplayedText] = useState("")
    const [clicked, setClicked] = useState(false)

    // Typing + auto slide sync
    useEffect(() => {
        let i = 0
        setDisplayedText("")

        const text = banners[current].title

        const typingSpeed = 30
        const pauseAfterTyping = 1500

        const typing = setInterval(() => {
            if (i < text.length) {
                setDisplayedText((prev) => prev + text.charAt(i))
                i++
            } else {
                clearInterval(typing)

                // Wait after typing → then change slide
                setTimeout(() => {
                    setCurrent((prev) => (prev + 1) % banners.length)
                }, pauseAfterTyping)
            }
        }, typingSpeed)

        return () => clearInterval(typing)
    }, [current])

    return (
        <div
            className='relative overflow-hidden h-[400px] md:h-[500px]'
            onClick={() => {
                setClicked(true)
                setTimeout(() => setClicked(false), 400)
            }}
        >

            {banners.map((banner, index) => (
                <div
                    key={index}
                    className={`absolute inset-0 transition-all duration-700 ${index === current ? "opacity-100 z-10" : "opacity-0 z-0"
                        }`}
                >

                    {/* Image */}
                    <img
                        src={banner.bg}
                        alt='banner'
                        className={`w-full h-full object-cover hidden md:block animate-slowZoom ${index === current ? "scale-110" : "scale-100"
                            }`}
                    />

                    <img
                        src={banner.bgSm}
                        alt='banner'
                        className={`w-full h-full object-cover md:hidden animate-slowZoom ${index === current ? "scale-110" : "scale-100"
                            }`}
                    />

                    {/* Overlay */}
                    <div className='absolute inset-0 bg-gradient-to-r from-black/70 via-green-800/40 to-transparent animate-gradientMove'></div>

                    {/* Click ripple */}
                    {clicked && (
                        <span className="absolute inset-0 flex justify-center items-center pointer-events-none">
                            <span className="w-10 h-10 rounded-full bg-white/40 animate-ping"></span>
                        </span>
                    )}

                    {/* Content */}
                    <div className='absolute inset-0 flex flex-col items-center md:items-start justify-end md:justify-center pb-20 md:pb-0 px-4 md:pl-16 lg:pl-24'>

                        {/* TEXT FIXED */}
                        <h1 className='text-2xl md:text-4xl lg:text-5xl font-bold text-white 
                        text-center md:text-left max-w-xs md:max-w-md lg:max-w-xl 
                        leading-tight drop-shadow-lg'>

                            {index === current && displayedText}

                            <span className="animate-blink">|</span>
                        </h1>

                        {/* Buttons */}
                        <div className='flex items-center mt-6 font-medium gap-4'>

                            <Link
                                to={"/products"}
                                className='group relative flex items-center gap-2 px-6 md:px-8 py-3 
                                bg-gradient-to-r from-green-500 to-teal-500 
                                hover:scale-110 active:scale-95 
                                transition rounded text-white overflow-hidden'
                            >
                                <span className="absolute inset-0 bg-white/20 
                                translate-x-[-100%] group-hover:translate-x-[100%] 
                                transition duration-700"></span>

                                <span className="relative z-10">Shop Now</span>
                            </Link>

                            <Link
                                to={"/products"}
                                className='hidden md:flex items-center gap-2 px-6 py-3 
                                bg-white/80 backdrop-blur rounded hover:scale-110 transition'
                            >
                                Explore
                            </Link>
                        </div>
                    </div>
                </div>
            ))}

        </div>
    )
}

export default MainBanner;