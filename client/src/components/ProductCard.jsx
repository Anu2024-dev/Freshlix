import React from 'react'
import { assets } from "../assets/assets";
import { useAppContext } from '../context/AppContext';

const ProductCard = ({ product }) => {

    const { currency, addToCart, removeFromCart, cartItems, navigate } = useAppContext();

    return product && (
        <div onClick={() => { navigate(`/products/${product.category.toLowerCase()}/${product._id}`); scrollTo(0, 0) }} className="group border border-gray-200 rounded-xl md:px-4 px-3 py-3 bg-white 
        min-w-56 max-w-56 w-full 
        transition-all duration-300 ease-in-out
        hover:shadow-xl hover:-translate-y-2 hover:border-green-300">

            {/* Image */}
            <div className="relative cursor-pointer flex items-center justify-center px-2 overflow-hidden">

                <img
                    className="transition duration-500 group-hover:scale-110 max-w-24 md:max-w-36 object-contain"
                    src={product?.image?.[0] || product?.image}
                    alt={product.name}
                />

                {/* Glow effect */}
                <div className="absolute inset-0 bg-gradient-to-t from-green-200/20 to-transparent opacity-0 group-hover:opacity-100 transition"></div>

            </div>

            {/* Content */}
            <div className="text-gray-500/70 text-sm mt-2">

                <p className="text-xs uppercase tracking-wide">{product.category}</p>

                <p className="text-gray-800 font-semibold text-base truncate">
                    {product.name}
                </p>

                {/* Rating */}
                <div className="flex items-center gap-1 mt-1">
                    {Array(5).fill('').map((_, i) => (
                        <img
                            key={i}
                            className="w-3.5"
                            src={i < 4 ? assets.star_icon : assets.star_dull_icon}
                            alt=""
                        />
                    ))}
                    <p className="text-xs">(4)</p>
                </div>

                {/* Price + Cart */}
                <div className="flex items-end justify-between mt-3">

                    <p className="text-lg font-semibold text-green-600">
                        {currency}{product.offerPrice}{" "}
                        <span className="text-gray-400 text-xs line-through">
                            {currency}{product.price}
                        </span>
                    </p>

                    <div onClick={(e) => e.stopPropagation()}>

                        {!cartItems[product._id] ? (

                            <button
                                onClick={() => addToCart(product._id)}
                                className="relative flex items-center justify-center gap-1 
                                bg-gradient-to-r from-green-500 to-emerald-500 
                                text-white px-3 py-1.5 rounded-full text-sm
                                hover:scale-105 active:scale-95 transition-all duration-300 overflow-hidden"
                            >

                                {/* Shine animation */}
                                <span className="absolute inset-0 bg-white/20 
                                translate-x-[-100%] group-hover:translate-x-[100%] 
                                transition duration-700"></span>

                                <img src={assets.cart_icon} alt="" className="w-4" />
                                Add
                            </button>

                        ) : (

                            <div className="flex items-center gap-2 bg-green-100 px-2 py-1 rounded-full">

                                <button
                                    onClick={() => removeFromCart(product._id)}
                                    className="px-2 text-lg hover:text-red-500 transition"
                                >
                                    -
                                </button>

                                <span className="text-sm font-medium">
                                    {cartItems[product._id]}
                                </span>

                                <button
                                    onClick={() => addToCart(product._id)}
                                    className="px-2 text-lg hover:text-green-600 transition"
                                >
                                    +
                                </button>

                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ProductCard
