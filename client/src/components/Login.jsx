import React, { useEffect, useState } from "react";
import { useAppContext } from "../context/AppContext";
import { Eye, EyeOff } from "lucide-react";
import toast from "react-hot-toast";

const Login = () => {

    const { setShowUserLogin, setUser, axios, navigate } = useAppContext();

    const [state, setState] = useState("login");
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);

    // 🔥 Typing Animation
    const loginTexts = [
        "Secure login to your account",
        "Fast, simple and safe access",
        "Welcome back to your dashboard"
    ];

    const signupTexts = [
        "Create your account in seconds",
        "Join us and explore more",
        "Start your journey today"
    ];

    const texts = state === "login" ? loginTexts : signupTexts;

    const [textIndex, setTextIndex] = useState(0);
    const [typedText, setTypedText] = useState("");
    const [charIndex, setCharIndex] = useState(0);

    useEffect(() => {
        if (charIndex < texts[textIndex].length) {
            const timeout = setTimeout(() => {
                setTypedText(prev => prev + texts[textIndex][charIndex]);
                setCharIndex(prev => prev + 1);
            }, 40);
            return () => clearTimeout(timeout);
        } else {
            setTimeout(() => {
                setTypedText("");
                setCharIndex(0);
                setTextIndex((prev) => (prev + 1) % texts.length);
            }, 2000);
        }
    }, [charIndex, textIndex, texts]);

    const onSubmitHandler = async (event) => {
        try {
            event.preventDefault();
            const { data } = await axios.post(`/api/user/${state}`,
                { name, email, password })
            if (data.success) {
                navigate('/')
                setUser(data.user)
                setShowUserLogin(false);
            } else {
                toast.error(data.message);
            }

        } catch (error) {
            toast.error(error.message);
        }

        setShowUserLogin(false);
    };

    return (
        <div
            onClick={() => setShowUserLogin(false)}
            className="fixed inset-0 z-30 flex items-center justify-center 
            bg-black/50 backdrop-blur-md"
        >

            <form
                onSubmit={onSubmitHandler}
                onClick={(e) => e.stopPropagation()}
                className="relative flex flex-col gap-6 p-8 py-10 w-80 sm:w-[360px] 
                bg-white/90 backdrop-blur-xl rounded-2xl shadow-2xl 
                border border-white/30 animate-pop-in overflow-hidden"
            >

                {/* Glow */}
                <div className="absolute -top-10 -left-10 w-40 h-40 bg-green-300/20 blur-3xl rounded-full"></div>

                {/* Title */}
                <div className="text-center">
                    <h2 className="text-2xl font-semibold text-gray-800">
                        {state === "login" ? "Sign in to your account" : "Create your account"}
                    </h2>

                    {/* 🔥 Typing Subtitle */}
                    <p className="text-sm text-gray-500 mt-1 h-5">
                        {typedText}
                        <span className="animate-blink ml-1">|</span>
                    </p>
                </div>

                {/* Inputs */}
                {state === "register" && (
                    <FloatingInput label="Full Name" value={name} setValue={setName} />
                )}

                <FloatingInput label="Email Address" value={email} setValue={setEmail} type="email" />

                <div className="relative">
                    <FloatingInput
                        label="Password"
                        value={password}
                        setValue={setPassword}
                        type={showPassword ? "text" : "password"}
                    />

                    <span
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-3 top-3 cursor-pointer text-gray-400 hover:text-green-500"
                    >
                        {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                    </span>
                </div>

                {/* Toggle */}
                <p className="text-sm text-center">
                    {state === "login" ? (
                        <>
                            Don’t have an account?{" "}
                            <span
                                onClick={() => setState("register")}
                                className="text-green-600 cursor-pointer hover:underline"
                            >
                                Sign up
                            </span>
                        </>
                    ) : (
                        <>
                            Already have an account?{" "}
                            <span
                                onClick={() => setState("login")}
                                className="text-green-600 cursor-pointer hover:underline"
                            >
                                Sign in
                            </span>
                        </>
                    )}
                </p>

                {/* 🔥 BUTTON */}
                <button
                    className="relative py-2 rounded-md text-white font-medium
                    bg-gradient-to-r from-green-500 via-emerald-500 to-teal-500
                    overflow-hidden group hover:scale-110 active:scale-95 transition"
                >
                    <span className="absolute inset-0 bg-white/20 translate-x-[-100%] group-hover:translate-x-[100%] transition duration-700"></span>
                    <span className="relative z-10">
                        {state === "login" ? "Sign In" : "Create Account"}
                    </span>
                </button>

            </form>
        </div>
    );
};

// 🔥 Floating Input Component
const FloatingInput = ({ label, value, setValue, type = "text" }) => {
    return (
        <div className="relative w-full">
            <input
                type={type}
                value={value}
                onChange={(e) => setValue(e.target.value)}
                className="peer w-full px-3 pt-5 pb-2 border border-gray-300 rounded-md 
                outline-none focus:ring-2 focus:ring-green-400 focus:border-green-400"
                required
            />
            <label className={`absolute left-3 text-gray-400 text-sm transition-all
                ${value ? "top-1 text-xs text-green-500" : "top-3"}
                peer-focus:top-1 peer-focus:text-xs peer-focus:text-green-500`}
            >
                {label}
            </label>
        </div>
    );
};

export default Login;