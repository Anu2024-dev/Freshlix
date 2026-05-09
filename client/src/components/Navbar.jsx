import React, { useEffect } from 'react'
import { NavLink } from 'react-router-dom';
import { assets } from '../assets/assets';
import { useAppContext } from '../context/AppContext';
import toast from 'react-hot-toast';
const Navbar = () => {
    const [open, setOpen] = React.useState(false);
    const { user, setUser, setCartItems, setAuthToken, showUserLogin, setShowUserLogin, navigate, setSearchQuery, searchQuery, getCartCount, axios } = useAppContext();
    const logout = async () => {
        try {
            const { data } = await axios.get('/api/user/logout')
            if (data.success) {
                toast.success(data.message);
                setAuthToken(null);
                setUser(null);
                setCartItems({});
                navigate('/');
            } else {
                toast.error(data.message);
            }
        } catch (error) {
            toast.error(error.message);
        }
    }
    useEffect(() => {
        if (searchQuery.length > 0) {
            navigate("/products")
        }
    }, [searchQuery])
    return (
        <nav className="flex items-center justify-between px-6 md:px-16 lg:px-24 xl:px-32 py-3 border-b border-gray-200 bg-gradient-to-r from-white via-green-50 to-white sticky top-0 z-50 backdrop-blur-md">
            <NavLink to='/' onClick={() => setOpen(false)} className="group flex items-center gap-2">
                {/* Glow Effect */}
                <div className="absolute w-20 h-10 bg-green-400/20 blur-xl opacity-0 group-hover:opacity-100 transition duration-500 rounded-full"></div>

                <img
                    className='h-10 relative z-10 transition duration-500 group-hover:scale-125 group-hover:-rotate-6'
                    src={assets.logo}
                    alt="logo"
                />

            </NavLink>

            {/* Desktop Menu */}
            <div className="hidden sm:flex items-center gap-8 text-gray-700 font-medium">
                {[{ name: "Home", path: "/" }, { name: "All Product", path: "/products" }, { name: "Contact", path: "/contacts" }].map((item, i) => (
                    <NavLink
                        key={i}
                        to={item.path}
                        className="relative group transition"
                    >
                        <span className="group-hover:text-green-600 transition">{item.name}</span>

                        <span className="absolute left-0 -bottom-1 w-0 h-[2px] bg-gradient-to-r from-green-400 via-emerald-500 to-green-600 transition-all duration-500 group-hover:w-full"></span>
                    </NavLink>
                ))}
                <div className="hidden lg:flex items-center text-sm gap-2 border border-gray-300 px-4 py-1.5 rounded-full bg-white shadow-sm focus-within:ring-2 focus-within:ring-green-400 transition-all duration-300 hover:shadow-lg">

                    <input onChange={(e) => setSearchQuery(e.target.value)}
                        className="bg-transparent outline-none placeholder-gray-400 w-28 focus:w-44 transition-all duration-500"
                        type="text"
                        placeholder="Search products"
                    />

                    <img src={assets.search_icon} className='w-4 h-4 opacity-70' />
                </div>
                <div onClick={() => navigate('/cart')} className="relative cursor-pointer group">

                    <div className="absolute inset-0 rounded-full bg-green-400/30 scale-0 group-hover:scale-150 transition duration-500"></div>

                    <img src={assets.nav_cart_icon} className='w-6 opacity-80 relative z-10 transition group-hover:scale-125' />

                    <button className="absolute -top-2 -right-3 text-xs text-white bg-green-600 w-5 h-5 flex items-center justify-center rounded-full">
                        {getCartCount()}
                    </button>

                </div>
                {!user ? (
                    <button
                        onClick={() => {

                            setShowUserLogin(true)
                        }}
                        className="relative px-6 py-2 rounded-full text-white overflow-hidden group"
                    >
                        <span className="absolute inset-0 bg-gradient-to-r from-green-500 to-emerald-600 transition group-hover:scale-110"></span>
                        <span className="relative z-10">Login</span>
                    </button>
                ) : (
                    <div className='relative group'>

                        <img src={assets.profile_icon} className='w-10 cursor-pointer transition group-hover:scale-110' />
                        <ul className='absolute top-12 right-0 bg-white shadow-xl border border-gray-100 py-2.5 w-36 rounded-lg text-sm z-40 opacity-0 scale-90 group-hover:opacity-100 group-hover:scale-100 transition-all duration-300 origin-top'>

                            <li onClick={() => navigate("my-orders")} className='p-2 pl-3 hover:bg-green-50 cursor-pointer transition'>
                                My Orders
                            </li>

                            <li onClick={logout} className='p-2 pl-3 hover:bg-red-50 cursor-pointer transition'>
                                Logout
                            </li>

                        </ul>
                    </div>
                )}
            </div>
            <div className='flex items-center gap-6 sm:hidden'>
                <div onClick={() => navigate('/cart')} className="relative cursor-pointer group">

                    <div className="absolute inset-0 rounded-full bg-green-400/30 scale-0 group-hover:scale-150 transition duration-500"></div>

                    <img src={assets.nav_cart_icon} className='w-6 opacity-80 relative z-10 transition group-hover:scale-125' />

                    <button className="absolute -top-2 -right-3 text-xs text-white bg-green-600 w-5 h-5 flex items-center justify-center rounded-full">
                        {getCartCount()}
                    </button>

                </div>
                <button
                    onClick={() => setOpen(!open)}
                    className=" transition duration-300 hover:rotate-180"
                >
                    <img src={assets.menu_icon} className="w-7" />
                </button>
            </div>
            <div className={`absolute top-16 left-0 w-full bg-white shadow-lg px-6 flex flex-col gap-4 text-sm overflow-hidden transition-all duration-500 ${open ? "max-h-96 py-4" : "max-h-0"}`}>

                <NavLink to='/' onClick={() => setOpen(false)} className="hover:text-green-500 transition">
                    Home
                </NavLink>

                <NavLink to='/products' onClick={() => setOpen(false)} className="hover:text-green-500 transition">
                    All Products
                </NavLink>

                {user && (
                    <NavLink to='/products' onClick={() => {
                        setOpen(false);
                        setShowUserLogin(true);
                    }} className="hover:text-green-500 transition">
                        My Orders
                    </NavLink>
                )}

                <NavLink to='/' onClick={() => setOpen(false)} className="hover:text-green-500 transition">
                    Contact
                </NavLink>

                {!user ? (
                    <button
                        onClick={() => {
                            setOpen(false);
                            setShowUserLogin(true);
                        }}
                        className="mt-2 py-2 bg-gradient-to-r from-green-500 to-green-600 text-white rounded-full hover:scale-105 transition"
                    >
                        Login
                    </button>
                ) : (
                    <button
                        onClick={logout}
                        className="mt-2 py-2 bg-gradient-to-r from-red-400 to-red-500 text-white rounded-full hover:scale-105 transition"
                    >
                        Logout
                    </button>
                )}
            </div>

        </nav>
    )
}

export default Navbar;
