import React from 'react'
import ProductCard from './ProductCard'
import { useAppContext } from '../context/AppContext'

const BestSeller = () => {
    const { products } = useAppContext();

    return (
        <div className='mt-16 px-4'>

            {/* Gradient Animated Title */}
            <p className='text-2xl md:text-3xl font-medium 
            bg-gradient-to-r from-green-500 via-emerald-400 to-teal-500 
            bg-clip-text text-transparent 
            animate-gradient-x'>
                Best Sellers
            </p>

            {/* Grid */}
            <div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3 md:gap-6 mt-6'>

                {products
                    .filter((product) => product.inStock)
                    .slice(0, 5)
                    .map((product, index) => (

                        <div
                            key={index}
                            className='animate-fade-in-up'
                            style={{ animationDelay: `${index * 0.1}s` }}
                        >
                            <ProductCard product={product} />
                        </div>

                    ))}
            </div>
        </div>
    )
}

export default BestSeller