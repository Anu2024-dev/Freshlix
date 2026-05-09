import React from 'react';
import { categories } from '../assets/assets';
import { useAppContext } from '../context/AppContext';

const Categories = () => {
    const { navigate } = useAppContext();

    return (
        <div className='mt-10'>

            {/* Animated Gradient Title */}
            <p className='text-2xl md:text-3xl font-medium 
            bg-gradient-to-r from-green-500 via-emerald-400 to-teal-500 
            bg-clip-text text-transparent 
            animate-gradient-x'>
                Categories
            </p>

            <div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 lg:grid-cols-6 xl:grid-cols-7 mt-6 gap-6'>

                {categories.map((category, index) => (

                    <div
                        key={index}
                        className='group relative cursor-pointer py-5 px-3 gap-2 rounded-xl flex flex-col justify-center items-center
                        
                        transition-all duration-500 ease-in-out
                        hover:scale-110 hover:-translate-y-3
                        
                        before:absolute before:inset-0 before:rounded-xl 
                        before:bg-gradient-to-r before:from-green-300 before:via-emerald-200 before:to-teal-300
                        before:opacity-0 group-hover:before:opacity-40
                        before:blur-xl before:transition-all before:duration-500'

                        style={{ backgroundColor: category.bgColor }}

                        onClick={() => {
                            navigate(`/products/${category.path.toLowerCase()}`);
                            scrollTo(0, 0);
                        }}
                    >

                        {/* Glow Ring */}
                        <div className='absolute inset-0 rounded-xl border-2 border-transparent 
                        group-hover:border-green-400 transition-all duration-500'></div>

                        {/* Image Wrapper */}
                        <div className='relative overflow-hidden rounded-full p-2
                        bg-gradient-to-r from-green-200 via-emerald-100 to-teal-200
                        group-hover:rotate-6 transition duration-500'>

                            <img
                                src={category.image}
                                alt=""
                                className='group-hover:scale-125 transition duration-500 ease-in-out max-w-20'
                            />

                            {/* Shine Effect */}
                            <div className='absolute inset-0 bg-white opacity-0 group-hover:opacity-20 blur-md transition'></div>
                        </div>

                        {/* Text */}
                        <p className='text-sm font-medium text-center 
                        group-hover:text-green-700 transition-colors duration-300'>
                            {category.text}
                        </p>

                    </div>
                ))}

            </div>
        </div>
    )
}

export default Categories;
