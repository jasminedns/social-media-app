'use client';

import Link from "next/link";
import LoginForm from "./LoginForm";
import { motion } from "motion/react";

const LoginPage = () => {
    return (
        <div className="relative flex md:flex-col lg:flex-row items-stretch justify-center grow md:grow-0 md:my-auto md:mx-15 min-h-[80vh]">

            <div className="md:hidden bg-[#b4bafec4] w-[90%] h-[100px] rounded-2xl absolute -top-2 right-1/2 translate-x-1/2 z-0"></div>

            <div className="relative z-10 bg-white rounded-t-2xl md:rounded-2xl lg:rounded-l-2xl lg:rounded-r-none flex flex-col items-center w-full lg:w-1/2">
                <LoginForm />
                <div className="text-black text-center p-3 my-4">
                    Don't have an account? <Link className="button-secondary" href="/auth/signup">Sign up</Link>
                </div>
            </div>

            <div className="hidden lg:flex justify-center items-center bg-[url('/log-sign-image.jpeg')] bg-cover bg-center w-1/2 rounded-r-2xl">
                <div className="text-center ">
                    <motion.ul whileHover={{ scale: 1.1 }} className="p-6">
                            <h2 className="font-logo text-5xl font-bold">BLOOP</h2>
                            <p>Say it. Bloop it. Regret it later.</p>
                    </motion.ul>
                </div>
            </div>
        </div>
    )
}

export default LoginPage;