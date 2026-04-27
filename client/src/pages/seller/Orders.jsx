// import React, { useEffect, useState } from 'react'
// import { useAppContext } from '../../context/AppContext'
// import { assets, dummyOrders } from '../../assets/assets';

// const Orders = () => {
//     const { currency } = useAppContext();
//     const [orders, setOrders] = useState([]);
//     const fetchOrders = async () => {
//         setOrders(dummyOrders)
//     };
//     useEffect(() => {
//         fetchOrders();
//     }, [])
//     return (
//         <div className='no-scrollbar flex-1 h-[95vh] overflow-y-scroll'>
//             <div className="md:p-10 p-4 space-y-4">
//                 <h2 className="text-lg font-medium">Orders List</h2>
//                 {orders.map((order, index) => (
//                     <div key={index} className="flex flex-col  md:items-center md:row gap-5 justify-between p-5 max-w-4xl rounded-md border border-gray-300 ">
//                         <div className="flex gap-5 max-w-80">
//                             <img className="w-12 h-12 object-cover " src={assets.box_icon} alt="boxIcon" />
//                             <>
//                                 {order.items.map((item, index) => (
//                                     <div key={index} className="flex flex-col ">
//                                         <p className="font-medium">
//                                             {item.product.name} <span className='text-green-500'>x {item.quantity}</span>
//                                         </p>
//                                     </div>
//                                 ))}
//                             </>
//                         </div>

//                         <div className="text-sm md:text-base text-black/60">
//                             <p className='text-black/80'>{order.address.firstName} {order.address.lastName}</p>
//                             <p>{order.address.street}, {order.address.city}</p>
//                             <p> {order.address.state},{order.address.zipcode}, {order.address.country}</p>
//                             <p></p>
//                             <p>{order.address.phone}</p>
//                         </div>

//                         <p className="font-medium text-lg my-auto">{currency}{order.amount}</p>

//                         <div className="flex flex-col text-sm">
//                             <p>Method: {order.paymentType}</p>
//                             <p>Date: {new Date(order.createdAt).toLocaleDateString()}</p>
//                             <p>Payment: {order.isPaid ? "Paid" : "Pending"}</p>
//                         </div>
//                     </div>
//                 ))}
//             </div>
//         </div>
//     )
// }

// export default Orders
//************* */
import React, { useEffect, useState } from 'react'
import { useAppContext } from '../../context/AppContext'
import { assets, dummyOrders } from '../../assets/assets';

const Orders = () => {
    const { currency } = useAppContext();
    const [orders, setOrders] = useState([]);

    const fetchOrders = async () => {
        setOrders(dummyOrders)
    };

    useEffect(() => {
        fetchOrders();
    }, [])

    return (
        <div className='no-scrollbar flex-1 h-[95vh] overflow-y-scroll bg-gradient-to-b from-white to-green-50/30'>

            <div className="md:p-10 p-4 space-y-6">

                {/* 🔥 Header */}
                <h2 className="text-xl md:text-2xl font-semibold text-gray-800 flex items-center gap-2">
                    <span className="w-2 h-6 bg-green-500 rounded-full animate-pulse"></span>
                    Orders List
                </h2>

                {orders.map((order, index) => (
                    <div
                        key={index}
                        className="group flex flex-col md:flex-row md:items-center gap-6 justify-between 
                        p-5 max-w-5xl rounded-xl border border-gray-200 
                        bg-white shadow-sm hover:shadow-2xl hover:-translate-y-1 
                        transition-all duration-300"
                    >

                        {/* 📦 Items */}
                        <div className="flex gap-4 max-w-96 items-start">

                            <div className="bg-green-100 p-3 rounded-lg group-hover:scale-110 transition">
                                <img className="w-10 h-10 object-cover" src={assets.box_icon} alt="boxIcon" />
                            </div>

                            <div className="space-y-1">
                                {order.items.map((item, index) => (
                                    <p key={index} className="font-medium text-gray-700 group-hover:text-green-600 transition">
                                        {item.product.name}
                                        <span className='ml-2 text-green-500 font-semibold'>
                                            x {item.quantity}
                                        </span>
                                    </p>
                                ))}
                            </div>

                        </div>

                        {/* 📍 Address */}
                        <div className="text-sm md:text-base text-gray-500 space-y-1">
                            <p className='text-gray-800 font-semibold'>
                                {order.address.firstName} {order.address.lastName}
                            </p>
                            <p>{order.address.street}, {order.address.city}</p>
                            <p>{order.address.state}, {order.address.zipcode}, {order.address.country}</p>

                            <p className="text-green-600 font-medium">
                                📞 {order.address.phone}
                            </p>
                        </div>

                        {/* 💰 Amount */}
                        <p className="text-xl font-bold text-green-600 group-hover:scale-110 transition">
                            {currency}{order.amount}
                        </p>

                        {/* 📊 Meta */}
                        <div className="flex flex-col text-sm text-gray-600 bg-green-50 p-3 rounded-lg border border-green-100 group-hover:bg-green-100/40 transition">

                            <p>
                                Method:
                                <span className="font-medium text-gray-800 ml-1">
                                    {order.paymentType}
                                </span>
                            </p>

                            <p>
                                Date:
                                <span className="ml-1">
                                    {new Date(order.createdAt).toLocaleDateString()}
                                </span>
                            </p>

                            <p>
                                Payment:
                                <span className={`ml-1 font-semibold ${order.isPaid ? "text-green-600" : "text-red-500"}`}>
                                    {order.isPaid ? "Paid ✅" : "Pending ⏳"}
                                </span>
                            </p>

                        </div>

                    </div>
                ))}

            </div>
        </div>
    )
}

export default Orders