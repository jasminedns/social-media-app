'use client'

import { User } from "@supabase/supabase-js";
import AccountLinks from "../../AccountLinks";
import Hamburger from "hamburger-react";
import { useEffect, useState } from "react";

const MobileHeader = ({user}:{user:User | null}) => {
const [isOpen, setOpen] = useState(false) 

const handleClick = () => {
  setOpen(!isOpen)
}

useEffect(() => {
  if (isOpen) {
    document.body.style.overflow = "hidden";
  } else {
    document.body.style.overflow = "auto";
  }
},[isOpen])

return (
    <div className="md:hidden relative flex items-center justify-between">
      <div className={`relative z-50 ${isOpen ? "text-[#5865f2]" : "text-white"}`}>
        <Hamburger toggled={isOpen} toggle={setOpen} />
      </div>

      <div
        className={`
            ${isOpen
                ? "fixed inset-0 z-40 flex justify-center items-center bg-white text-2xl text-[#5865f2] opacity-100 translate-y-0"
                : "fixed inset-0 z-40 flex justify-center items-center bg-white text-2xl text-[#5865f2] opacity-0 -translate-y-full pointer-events-none"
            } transition-all duration-200 ease-in-out`}
      >
        <AccountLinks user={user} closeMenu={handleClick} />
      </div>
    </div>
  );}

export default MobileHeader;