'use client'

import { User } from "@supabase/supabase-js";
import AccountLinks from "../../AccountLinks";
import Hamburger from "hamburger-react";
import { useState } from "react";

const MobileHeader = ({user}:{user:User | null}) => {
const [isOpen, setOpen] = useState(false) 



const handleClick = () => {
    setOpen(!isOpen)
}

    return (
        <div className="md:hidden relative">
            <Hamburger toggled={isOpen} toggle={setOpen} />
            <div className={`${isOpen ? "block absolute right-0 z-99" : "hidden"} bg-white rounded-2xl text-[#5865f2] w-[20vh]`}>
                <AccountLinks user={user} closeMenu={handleClick}/>
            </div>
        </div>
    )
}

export default MobileHeader;