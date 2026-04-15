// import React from 'react'

// const NewsLetter = () => {
//     return (
//         <div className="flex flex-col items-center justify-center text-center space-y-2 mt-24 pb-14">
//             <h1 className="md:text-4xl text-2xl font-semibold">Never Miss a Deal!</h1>
//             <p className="md:text-lg text-gray-500/70 pb-8">
//                 Subscribe to get the latest offers, new arrivals, and exclusive discounts
//             </p>
//             <form className="flex items-center justify-between max-w-2xl w-full md:h-13 h-12">
//                 <input
//                     className="border border-gray-300 rounded-md h-full border-r-0 outline-none w-full rounded-r-none px-3 text-gray-500"
//                     type="text"
//                     placeholder="Enter your email id"
//                     required
//                 />
//                 <button type="submit" className="md:px-12 px-8 h-full text-white bg-primary hover:bg-primary-dull transition-all cursor-pointer rounded-md rounded-l-none">
//                     Subscribe
//                 </button>
//             </form>
//         </div>
//     )
// }

// export default NewsLetter
//** */
import React, { useState, useEffect } from 'react'

const NewsLetter = () => {

    const [email, setEmail] = useState("")
    const [subscribed, setSubscribed] = useState(false)

    // 🔥 Typing animation state
    const fullText = "Never Miss a Deal!"
    const [typedText, setTypedText] = useState("")

    useEffect(() => {
        let i = 0

        const typing = setInterval(() => {
            setTypedText(fullText.slice(0, i + 1))
            i++

            if (i === fullText.length) clearInterval(typing)
        }, 80)

        return () => clearInterval(typing)
    }, [])

    const handleSubmit = (e) => {
        e.preventDefault()

        if (!email) return

        setSubscribed(true)
        setEmail("")

        setTimeout(() => setSubscribed(false), 3000)
    }

    return (
        <div className="relative flex flex-col items-center justify-center text-center 
        space-y-3 mt-24 pb-14 px-4 overflow-hidden">

            {/* Background Glow */}
            <div className="absolute w-72 h-72 bg-green-300/20 blur-3xl rounded-full -top-10 animate-pulse"></div>

            {/* 🔥 TYPING HEADING */}
            <h1 className="md:text-4xl text-2xl font-semibold 
            bg-gradient-to-r from-green-500 via-emerald-400 to-teal-500 
            bg-clip-text text-transparent">

                {typedText}

                {/* Cursor */}
                <span className="ml-1 animate-blink text-green-500">|</span>

            </h1>

            {/* Subtext */}
            <p className="md:text-lg text-gray-500/70 pb-6 max-w-xl animate-fade-in-up delay-100">
                Subscribe to get the latest offers, new arrivals, and exclusive discounts
            </p>

            {/* Form */}
            <form
                onSubmit={handleSubmit}
                className="flex items-center justify-between max-w-2xl w-full md:h-14 h-12 
                animate-fade-in-up delay-200"
            >

                <input
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="border border-gray-300 h-full outline-none w-full 
                    px-4 text-gray-600 rounded-l-full 
                    focus:ring-2 focus:ring-green-400 
                    focus:border-green-400 transition-all duration-300"
                    type="email"
                    placeholder="Enter your email id"
                    required
                />

                <button
                    type="submit"
                    className="relative md:px-10 px-6 h-full text-white 
                    bg-gradient-to-r from-green-500 via-emerald-500 to-teal-500 
                    rounded-r-full overflow-hidden 
                    transition-all duration-300 
                    hover:scale-110 active:scale-95 
                    shadow-lg group"
                >

                    <span className="absolute inset-0 bg-white/20 opacity-0 group-hover:opacity-100 transition"></span>

                    <span className="relative z-10 flex items-center gap-2">
                        Subscribe →
                    </span>
                </button>

            </form>

            {/* Success Message */}
            {subscribed && (
                <p className="text-green-600 font-medium animate-bounce mt-2">
                    ✅ Subscribed successfully!
                </p>
            )}

        </div>
    )
}

export default NewsLetter