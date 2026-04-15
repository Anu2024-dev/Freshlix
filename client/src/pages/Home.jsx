// import React from 'react'
// import MainBanner from '../components/MainBanner'
// import Categories from '../components/Categories'
// import BestSeller from '../components/BestSEller'
// import BottomBanner from '../components/BottomBanner'
// import NewsLetter from '../components/NewsLetter'
// import Footer from '../components/Footer'

// const Home = () => {
//     return (
//         <div className='mt-10'>
//             <MainBanner />
//             <Categories />
//             <BestSeller />
//             <BottomBanner />
//             <NewsLetter />
//         </div>
//     )
// }

// export default Home
//** */
import React, { useEffect, useState } from 'react'
import MainBanner from '../components/MainBanner'
import Categories from '../components/Categories'
import BestSeller from '../components/BestSEller'
import BottomBanner from '../components/BottomBanner'
import NewsLetter from '../components/NewsLetter'
import Footer from '../components/Footer'

const Home = () => {

    const [offsetY, setOffsetY] = useState(0)
    const [mouse, setMouse] = useState({ x: 0, y: 0 })

    // 🔥 Scroll parallax
    useEffect(() => {
        const handleScroll = () => setOffsetY(window.scrollY)
        const handleMouse = (e) => {
            setMouse({
                x: (e.clientX / window.innerWidth - 0.5) * 20,
                y: (e.clientY / window.innerHeight - 0.5) * 20
            })
        }

        window.addEventListener('scroll', handleScroll)
        window.addEventListener('mousemove', handleMouse)

        return () => {
            window.removeEventListener('scroll', handleScroll)
            window.removeEventListener('mousemove', handleMouse)
        }
    }, [])

    return (
        <div className='mt-10 space-y-20 overflow-hidden'>

            {/* 🔥 Floating Glow Background */}
            <div className="fixed top-0 left-0 w-full h-full pointer-events-none z-0">
                <div
                    className="absolute w-[400px] h-[400px] bg-green-300/20 blur-3xl rounded-full"
                    style={{
                        transform: `translate(${mouse.x}px, ${mouse.y}px)`
                    }}
                />
                <div
                    className="absolute right-0 bottom-0 w-[300px] h-[300px] bg-emerald-300/20 blur-3xl rounded-full"
                    style={{
                        transform: `translate(${-mouse.x}px, ${-mouse.y}px)`
                    }}
                />
            </div>

            {/* 🔥 Banner (Parallax) */}
            <div
                className="relative z-10 transition-transform duration-300"
                style={{ transform: `translateY(${offsetY * 0.1}px)` }}
            >
                <MainBanner />
            </div>

            {/* 🔥 Categories (Float up) */}
            <div className="relative z-10 animate-float">
                <Categories />
            </div>

            {/* 🔥 Best Seller (Parallax opposite) */}
            <div
                className="relative z-10 transition-transform duration-300"
                style={{ transform: `translateY(${offsetY * -0.05}px)` }}
            >
                <BestSeller />
            </div>

            {/* 🔥 Bottom Banner (Hover depth) */}
            <div className="relative z-10 hover:scale-[1.01] transition duration-500">
                <BottomBanner />
            </div>

            {/* 🔥 Newsletter (Glow + float) */}
            <div className="relative z-10 animate-float-slow">
                <NewsLetter />
            </div>

        </div>
    )
}

export default Home
