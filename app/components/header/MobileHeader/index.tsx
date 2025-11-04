'use client'

import { User } from "@supabase/supabase-js";
import AccountLinks from "../../AccountLinks";
import Hamburger from "hamburger-react";
import { useEffect, useState } from "react";
import { UserInfoTypes } from "@/utils/supabase/queries";

type HeaderProps = {
  user: User | null;
  userInfo: UserInfoTypes | null;
}

const MobileHeader = ({user, userInfo}:HeaderProps) => {
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
          } transition-all duration-200 ease-in-out
        `}
      >
        <div className="flex flex-col justify-evenly items-center h-screen w-full">
          <div>
            <AccountLinks user={user} closeMenu={handleClick} />
          </div>
          {user && userInfo && (
            <div className="w-full flex flex-col items-center justify-center">
              <div className="h-[1px] w-[80%] bg-[#13131353] my-5 mx-auto"></div>
              <div className="p-5">
                <div className="button-tertiary m-auto p-10 flex items-center justify-center h-10 w-10 rounded-full text-white uppercase">{userInfo.username[0]}</div>
                <div className="text-center mt-5 pt-5 capitalize">
                  <h2 className="w-full p-3 capitalize">Welcome back,</h2>
                  <h2>{userInfo.username}</h2>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );}

export default MobileHeader;