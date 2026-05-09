/* eslint-disable react-refresh/only-export-components */
import { createContext, useContext, useEffect, useRef, useState } from 'react';
import toast from 'react-hot-toast';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
axios.defaults.withCredentials = true;
axios.defaults.baseURL = import.meta.env.VITE_BACKEND_URL;

const getStoredToken = () => {
    if (typeof window === 'undefined') return null;
    return localStorage.getItem('freshlix_token');
}

const setAuthToken = (token) => {
    if (typeof window === 'undefined') return;

    if (token) {
        localStorage.setItem('freshlix_token', token);
        axios.defaults.headers.common.Authorization = `Bearer ${token}`;
    } else {
        localStorage.removeItem('freshlix_token');
        delete axios.defaults.headers.common.Authorization;
    }
}

setAuthToken(getStoredToken());

const getStoredCart = () => {
    if (typeof window === 'undefined') return {};
    try {
        return JSON.parse(localStorage.getItem('freshlix_cart') || '{}');
    } catch {
        return {};
    }
}

const setStoredCart = (cartItems) => {
    if (typeof window === 'undefined') return;
    localStorage.setItem('freshlix_cart', JSON.stringify(cartItems || {}));
}

export const AppContext = createContext();
export const AppContextProvider = ({ children }) => {
    const currency = import.meta.env.VITE_CURRENCY;
    const navigate = useNavigate();
    const [user, setUser] = useState(null);
    const [isAuthLoading, setIsAuthLoading] = useState(true);
    const [isSeller, setIsSeller] = useState(false);
    const [showUserLogin, setShowUserLogin] = useState(false);
    const [products, setProducts] = useState([]);
    const [cartItems, setCartItems] = useState(getStoredCart);
    const [searchQuery, setSearchQuery] = useState('');
    const hasHydratedCart = useRef(false);
    //fetch seller status
    const fetchSeller = async () => {
        try {
            const { data } = await axios.get('/api/seller/is-auth');
            if (data.success) {
                setIsSeller(true);
            } else {
                setIsSeller(false);
            }
        } catch {
            setIsSeller(false);
        }
    }
    //fetch user auth status,user data and cart items
    const fetchUser = async () => {
        setIsAuthLoading(true);
        try {
            const { data } = await axios.get('/api/user/is-auth')
            if (data.success) {
                setUser(data.user)
                setCartItems(data.user.cartItems || {});
            } else {
                setUser(null);
                setCartItems(getStoredCart());
            }
        } catch {
            setUser(null);
            setCartItems(getStoredCart());
        } finally {
            hasHydratedCart.current = true;
            setIsAuthLoading(false);
        }
    }


    //fetch All Products
    const fetchProducts = async () => {
        try {
            const { data } = await axios.get('/api/product/list');
            if (data.success) {
                setProducts(data.products);
            } else {
                toast.error(data.message);
            }
        } catch (error) {
            toast.error(error.message);
        }
    }
    const addToCart = (itemId) => {
        let cartData = structuredClone(cartItems);
        if (cartData[itemId]) {
            cartData[itemId] += 1;
        } else {
            cartData[itemId] = 1;
        }
        setCartItems(cartData);
        toast.success("Added to cart");
    }
    const updateCartItem = (itemId, quantity) => {
        let cartData = structuredClone(cartItems);
        cartData[itemId] = quantity;
        setCartItems(cartData);
        toast.success("Cart Updated");
    }
    const removeFromCart = (itemId) => {
        let cartData = structuredClone(cartItems);
        if (cartData[itemId]) {
            cartData[itemId] -= 1;
            if (cartData[itemId] === 0) {
                delete cartData[itemId];
            }
        }
        toast.success("Remove from cart");
        setCartItems(cartData)
    }
    const getCartCount = () => {
        let totalCount = 0;
        for (const item in cartItems) {
            totalCount += cartItems[item];
        }
        return totalCount;
    }
    const getCartAmount = () => {
        let totalAmount = 0;
        for (const items in cartItems) {
            let itemInfo = products.find((product) => product._id === items);
            if (itemInfo && cartItems[items] > 0) {
                totalAmount += itemInfo.offerPrice * cartItems[items];
            }
        }
        return Math.floor(totalAmount * 100) / 100;
    }
    useEffect(() => {
        fetchUser();
        fetchProducts();
    }, [])
    //update database cart items
    useEffect(() => {
        const updateCart = async () => {
            try {
                const { data } = await axios.post('/api/cart/update', { cartItems })
                if (!data.success) {
                    toast.error(data.message)
                }
        } catch (error) {
                if (error.response?.status === 401) {
                    setAuthToken(null);
                    setUser(null);
                    setCartItems({});
                } else {
                    toast.error(error.response?.data?.message || error.message)
                }
            }
        }
        setStoredCart(cartItems);
        if (user && hasHydratedCart.current) {
            updateCart();
        }
    }, [cartItems, user])
    const value = {
        showUserLogin, setShowUserLogin, navigate,
        isAuthLoading,
        setAuthToken,
        user, setUser, setIsSeller,
        isSeller, products, setProducts, currency,
        addToCart, updateCartItem, removeFromCart,
        cartItems, searchQuery, setSearchQuery, getCartAmount, getCartCount, axios, fetchProducts, fetchSeller, setCartItems
    }
    return <AppContext.Provider value={value}>
        {children}
    </AppContext.Provider>
}
export const useAppContext = () => {
    return useContext(AppContext)
}
