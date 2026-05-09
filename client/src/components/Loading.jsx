import React, { useEffect } from 'react'
import { useAppContext } from '../context/AppContext'
import { useLocation } from 'react-router-dom';
import toast from 'react-hot-toast';

const Loading = () => {
    const { navigate, axios, setCartItems } = useAppContext();
    let { search } = useLocation();
    const query = new URLSearchParams(search);
    const nextUrl = query.get('next');
    const sessionId = query.get('session_id');
    useEffect(() => {
        const finishCheckout = async () => {
            if (sessionId) {
                try {
                    const { data } = await axios.post('/api/order/verify-stripe', { sessionId });
                    if (data.success) {
                        setCartItems({});
                    } else {
                        toast.error(data.message);
                    }
                } catch (error) {
                    toast.error(error.response?.data?.message || error.message);
                }
            }

            if (nextUrl) {
                setTimeout(() => {
                    navigate(`/${nextUrl}`)
                }, 1000)
            }
        }

        finishCheckout();
    }, [nextUrl, sessionId])
    return (
        <div className='flex justify-center items-center h-screen'>
            <div className='animate-spin rounded-full h-24 w-24 border-4 border-gray-300 border-t-green-500'></div>

        </div>
    )
}

export default Loading
