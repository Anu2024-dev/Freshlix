import React, { useEffect, useState } from 'react'
import { useAppContext } from '../context/AppContext';

const MyOrders = () => {
    const [myOrders, setMyOrders] = useState([]);
    const { currency, axios, user } = useAppContext();

    useEffect(() => {
        const fetchMyOrders = async () => {
            try {
                const { data } = await axios.get('/api/order/user')
                if (data.success) {
                    setMyOrders(data.orders)
                }
            } catch (error) {
                console.log(error);
            }
        }

        if (user) {
            fetchMyOrders()
        }


    }, [axios, user])

    // 🎨 Status color logic
    const getStatusColor = (status) => {
        if (status === "Delivered") return "bg-green-100 text-green-600";
        if (status === "Pending") return "bg-yellow-100 text-yellow-600";
        if (status === "Cancelled") return "bg-red-100 text-red-600";
        return "bg-gray-100 text-gray-600";
    }

    return (
        <div className='mt-12 sm:mt-16 pb-16 px-1 sm:px-4'>

            {/* 🔥 Heading */}
            <div className='flex flex-col items-end w-max mb-8 animate-fadeIn'>
                <p className='text-2xl md:text-3xl font-semibold uppercase tracking-wide'>
                    My Orders
                </p>
                <div className='w-20 h-1 bg-gradient-to-r from-green-400 to-emerald-600 rounded-full animate-pulse'></div>
            </div>

            {myOrders.length === 0 && (
                <p className='text-gray-500'>No orders found.</p>
            )}

            {myOrders.map((order, index) => (
                <div
                    key={index}
                    className='border border-gray-200 rounded-xl mb-8 sm:mb-10 p-3 sm:p-5 max-w-4xl bg-white shadow-md hover:shadow-2xl transition duration-500 animate-slideUp'
                >

                    {/* 🧾 Order Header */}
                    <p className='flex justify-between md:items-center text-gray-500 md:font-medium max-md:flex-col gap-2'>
                        <span className='font-semibold text-gray-700 break-all'>OrderId: {order._id}</span>
                        <span className='px-3 py-1 rounded-full bg-blue-100 text-blue-600 text-xs'>
                            {order.paymentType}
                        </span>
                        <span className='text-green-600 font-semibold'>
                            {currency}{order.amount}
                        </span>
                    </p>

                    {/* 📦 Items */}
                    {order.items.map((item, index) => (
                        <div
                            key={index}
                            className={`relative group bg-white text-gray-500/70 
                            ${order.items.length !== index + 1 && "border-b"} 
                            border-gray-200 flex flex-col md:flex-row md:items-center 
                            justify-between p-3 sm:p-4 py-5 md:gap-16 w-full max-w-4xl 
                            hover:bg-green-50/40 transition duration-300`}
                        >

                            {/* 🖼️ Product */}
                            <div className='flex items-center mb-4 md:mb-0'>
                                <div className='bg-green-100 p-4 rounded-lg overflow-hidden'>
                                    <img
                                        src={item.product.image[0]}
                                        alt=""
                                        className='w-16 h-16 object-cover transition duration-500 group-hover:scale-110 group-hover:rotate-2'
                                    />
                                </div>

                                <div className='ml-3 sm:ml-4 min-w-0'>
                                    <h2 className='text-base sm:text-lg md:text-xl font-semibold text-gray-800 group-hover:text-green-600 transition break-words'>
                                        {item.product.name}
                                    </h2>
                                    <p className='text-sm text-gray-400'>
                                        Category: {item.product.category}
                                    </p>
                                </div>
                            </div>

                            {/* 📊 Info */}
                            <div className='flex flex-col justify-center md:ml-8 mb-4 md:mb-0 text-sm gap-1'>
                                <p>Quantity: <span className='font-medium'>{item.quantity || "1"}</span></p>

                                {/* 🟢 Status Badge */}
                                <p>
                                    Status:
                                    <span className={`ml-2 px-2 py-0.5 rounded-full text-xs ${getStatusColor(order.status)}`}>
                                        {order.status}
                                    </span>
                                </p>

                                <p className='text-gray-400'>
                                    {new Date(order.createdAt).toLocaleDateString()}
                                </p>
                            </div>

                            {/* 💰 Price */}
                            <p className='text-green-600 text-lg font-semibold group-hover:scale-110 transition'>
                                {currency}{item.product.offerPrice * item.quantity}
                            </p>

                        </div>
                    ))}

                </div>
            ))}

        </div>
    )
}

export default MyOrders
