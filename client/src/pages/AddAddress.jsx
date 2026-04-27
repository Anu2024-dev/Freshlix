// import React, { useState } from 'react'
// import { assets } from '../assets/assets'
// const InputField = ({ type, placeholder, name, handleChange, address }) => (
//     <input className='w-full px-2 py-2.5 border-green-500/30 rounded outline-none text-gray-500 focus:border-green-500 transition'
//         type={type}
//         placeholder={placeholder}
//         onChange={handleChange}
//         name={name}
//         value={address[name]}
//         required />
// )
// const AddAddress = () => {
//     const [address, setAddress] = useState({
//         firstName: '',
//         lastName: '',
//         email: '',
//         street: '',
//         city: '',
//         state: '',
//         zipcode: '',
//         country: '',
//         phone: '',
//     })
//     const handleChange = (e) => {
//         const { name, value } = e.target;
//         setAddress((prevAddress) => ({
//             ...prevAddress,
//             [name]: value,
//         }))
//     }
//     const onSubmitHandler = async (e) => {
//         e.preventDefault();
//     }
//     return (
//         <div className='mt-16 pb-16'>
//             <p className='text-2xl md:text-3xl text-gray-500'>Add Shipping
//                 <span className='font-semibold text-green-500'>Address</span></p>
//             <div className='flex flex-col-reverse md:flex-row justify-between mt-10'>
//                 <div className='flex-1 max-w-md'>
//                     <form onSubmit={onSubmitHandler} className='space-y-3 mt-6 text-sm'>
//                         <div className='grid grid-cols-2 gap-4'>
//                             <InputField handleChange={handleChange} address={address} name='firstname' type="text" placeholder="First Name" />
//                             <InputField handleChange={handleChange} address={address} name='lastname' type="text" placeholder="Last Name" />
//                         </div>
//                         <InputField handleChange={handleChange} address={address} name="email" type="email" placeholder="Email address" />
//                         <InputField handleChange={handleChange} address={address} name="street" type="text" placeholder="Street" />
//                         <div>
//                             <InputField handleChange={handleChange} address={address} name='city' type="text" placeholder="City" />
//                             <InputField handleChange={handleChange} address={address} name='state' type='text' placeholder="State" />
//                         </div>
//                         <div>
//                             <InputField handleChange={handleChange} address={address} name='zipcode' type="number" placeholder="Zip code" />
//                             <InputField handleChange={handleChange} address={address} name='country' type='text' placeholder="Country" />
//                         </div>
//                         <InputField handleChange={handleChange} address={address} name='phone' type='text' placeholder='Phone' />
//                         <button className='w-full mt-6 bg-primary text-white py-3 hover:bg-primary-dull transition cursor-pointer uppercase'>
//                             Save address
//                         </button>
//                     </form>
//                 </div>
//                 <img className='md:mr-16 mb-16 md:mt-0' src={assets.add_address_iamge} alt="Add Address" />
//             </div>
//         </div>
//     )
// }



// export default AddAddress
//**** */
import React, { useState } from 'react'
import { assets } from '../assets/assets'

// ✨ Animated Input Field
const InputField = ({ type, placeholder, name, handleChange, address }) => (
    <div className="relative group">
        <input
            className='w-full px-3 pt-5 pb-2 border border-green-500/30 rounded-md outline-none text-gray-700 bg-white focus:border-green-500 focus:ring-2 focus:ring-green-200 transition-all duration-300 peer'
            type={type}
            name={name}
            value={address[name]}
            onChange={handleChange}
            required
        />

        {/* Floating Label */}
        <label className="absolute left-3 top-2 text-gray-400 text-xs transition-all 
        peer-placeholder-shown:top-3 peer-placeholder-shown:text-sm 
        peer-placeholder-shown:text-gray-400 
        peer-focus:top-2 peer-focus:text-xs peer-focus:text-green-600">
            {placeholder}
        </label>
    </div>
)

const AddAddress = () => {

    const [address, setAddress] = useState({
        firstName: '',
        lastName: '',
        email: '',
        street: '',
        city: '',
        state: '',
        zipcode: '',
        country: '',
        phone: '',
    })

    const handleChange = (e) => {
        const { name, value } = e.target;
        setAddress((prevAddress) => ({
            ...prevAddress,
            [name]: value,
        }))
    }

    const onSubmitHandler = async (e) => {
        e.preventDefault();
        console.log(address);
    }

    return (
        <div className='mt-16 pb-16 px-4'>

            {/* ✨ Heading Animation */}
            <p className='text-2xl md:text-3xl text-gray-600 font-medium animate-fadeIn'>
                Add Shipping
                <span className='font-bold text-green-500 ml-2 animate-pulse'>Address</span>
            </p>

            <div className='flex flex-col-reverse md:flex-row justify-between mt-10 gap-10'>

                {/* FORM */}
                <div className='flex-1 max-w-md bg-white p-6 rounded-xl shadow-lg border border-green-100 hover:shadow-2xl transition-all duration-500 animate-slideUp'>

                    <form onSubmit={onSubmitHandler} className='space-y-4 mt-4 text-sm'>

                        <div className='grid grid-cols-2 gap-4'>
                            <InputField handleChange={handleChange} address={address} name='firstName' type="text" placeholder="First Name" />
                            <InputField handleChange={handleChange} address={address} name='lastName' type="text" placeholder="Last Name" />
                        </div>

                        <InputField handleChange={handleChange} address={address} name="email" type="email" placeholder="Email Address" />
                        <InputField handleChange={handleChange} address={address} name="street" type="text" placeholder="Street" />

                        <div className='grid grid-cols-2 gap-4'>
                            <InputField handleChange={handleChange} address={address} name='city' type="text" placeholder="City" />
                            <InputField handleChange={handleChange} address={address} name='state' type='text' placeholder="State" />
                        </div>

                        <div className='grid grid-cols-2 gap-4'>
                            <InputField handleChange={handleChange} address={address} name='zipcode' type="number" placeholder="Zip Code" />
                            <InputField handleChange={handleChange} address={address} name='country' type='text' placeholder="Country" />
                        </div>

                        <InputField handleChange={handleChange} address={address} name='phone' type='text' placeholder='Phone Number' />

                        {/* 🚀 Animated Button */}
                        <button className='relative w-full mt-6 py-3 rounded-md overflow-hidden text-white font-semibold group'>

                            {/* Gradient Background */}
                            <span className="absolute inset-0 bg-gradient-to-r from-green-500 to-emerald-600 transition-all duration-500 group-hover:scale-110"></span>

                            {/* Shine Effect */}
                            <span className="absolute inset-0 opacity-0 group-hover:opacity-100 bg-white/20 blur-md transition duration-500"></span>

                            {/* Text */}
                            <span className="relative z-10 tracking-wide">
                                Save Address
                            </span>
                        </button>

                    </form>
                </div>

                {/* IMAGE */}
                <div className="flex justify-center items-center">
                    <img
                        className='md:mr-16 mb-10 md:mt-0 w-[300px] md:w-[350px] transition duration-500 hover:scale-110 hover:rotate-1 drop-shadow-xl animate-float'
                        src={assets.add_address_iamge}
                        alt="Add Address"
                    />
                </div>

            </div>
        </div>
    )
}

export default AddAddress