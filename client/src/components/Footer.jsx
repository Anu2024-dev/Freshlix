// import React from 'react'
// import { assets, footerLinks } from '../assets/assets'

// const Footer = () => {
//     return (
//         <div className="px-6 md:px-16 lg:px-24 xl:px-32 mt-24 bg-primary/10">
//             <div className="flex flex-col md:flex-row items-start justify-between gap-10 py-10 border-b border-gray-500/30 text-gray-500">
//                 <div>
//                     <img className="w-34 md:w-32" src={assets.logo} alt="logo" />
//                     <p className="max-w-[410px] mt-6">We deliver fresh groceries and snacks straight to your door.TRusted by thousands,we aim to make your shopping experience simple and affordable.</p>
//                 </div>
//                 <div className="flex flex-wrap justify-between w-full md:w-[45%] gap-5">
//                     {footerLinks.map((section, index) => (
//                         <div key={index}>
//                             <h3 className="font-semibold text-base text-gray-900 md:mb-5 mb-2">{section.title}</h3>
//                             <ul className="text-sm space-y-1">
//                                 {section.links.map((link, i) => (
//                                     <li key={i}>
//                                         <a href={link.url} className="hover:underline transition">{link.text}</a>
//                                     </li>
//                                 ))}
//                             </ul>
//                         </div>
//                     ))}
//                 </div>
//             </div>
//             <p className="py-4 text-center text-sm md:text-base">
//                 Copyright {new Date().getFullYear()} © <a href="https://Freshlix.com">Freshlix.com</a> All Right Reserved.
//             </p>
//         </div>
//     )
// }

// export default Footer
//** */
import React, { useEffect, useState } from 'react'
import { assets, footerLinks } from '../assets/assets'

const Footer = () => {

    // 🔥 Multiple texts (changeable)
    const texts = [
        "We deliver fresh groceries, organic products, and daily essentials straight to your doorstep with speed and care. Trusted by thousands of happy customers, our mission is to make your shopping experience simple, affordable, and stress-free.",
        " From farm-fresh fruits and vegetables to high-quality packaged foods, we ensure every product meets the highest standards of freshness and quality. Enjoy seamless ordering, fast delivery, and exciting offers — all designed to bring convenience to your everyday life.",
        "Fresh products, fast delivery, best prices guaranteed!"
    ]

    const [textIndex, setTextIndex] = useState(0)
    const [typedText, setTypedText] = useState("")
    const [charIndex, setCharIndex] = useState(0)

    // 🔥 Typing effect
    useEffect(() => {
        if (charIndex < texts[textIndex].length) {
            const timeout = setTimeout(() => {
                setTypedText(prev => prev + texts[textIndex][charIndex])
                setCharIndex(prev => prev + 1)
            }, 40)

            return () => clearTimeout(timeout)
        } else {
            // Wait then change text
            setTimeout(() => {
                setTypedText("")
                setCharIndex(0)
                setTextIndex((prev) => (prev + 1) % texts.length)
            }, 2000)
        }
    }, [charIndex, textIndex])

    return (
        <div className="px-6 md:px-16 lg:px-24 xl:px-32 mt-24 bg-primary/10">

            <div className="flex flex-col md:flex-row items-start justify-between gap-10 py-10 border-b border-gray-500/30 text-gray-500">

                {/* 🔥 Logo + Typing Text */}
                <div>
                    <img
                        className="w-34 md:w-32 transition duration-500 hover:scale-110"
                        src={assets.logo}
                        alt="logo"
                    />

                    {/* 🔥 Typing Text */}
                    <p className="max-w-[410px] mt-6 leading-relaxed 
                    hover:text-gray-700 transition duration-300">

                        {typedText}

                        {/* Cursor */}
                        <span className="animate-blink text-green-500 ml-1">|</span>

                    </p>
                </div>

                {/* Links */}
                <div className="flex flex-wrap justify-between w-full md:w-[45%] gap-5">
                    {footerLinks.map((section, index) => (
                        <div key={index}>
                            <h3 className="font-semibold text-base text-gray-900 md:mb-5 mb-2">
                                {section.title}
                            </h3>
                            <ul className="text-sm space-y-1">
                                {section.links.map((link, i) => (
                                    <li key={i}>
                                        <a
                                            href={link.url}
                                            className="relative hover:text-green-600 transition duration-300"
                                        >
                                            {link.text}

                                            {/* Hover underline animation */}
                                            <span className="absolute left-0 bottom-0 w-0 h-[1px] bg-green-500 
                                            transition-all duration-300 hover:w-full"></span>

                                        </a>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    ))}
                </div>

            </div>

            {/* Bottom */}
            <p className="py-4 text-center text-sm md:text-base ">
                <span className='text-green-500'>Copyright {new Date().getFullYear()} ©</span>
                <a href="https://Freshlix.com" className="hover:text-green-600 transition ml-1">
                    Freshlix.com
                </a>
                All Right Reserved.
            </p>

        </div>
    )
}

export default Footer