'use client'

import { LogOut } from "@/actions/log-out";

type LogoutProps = {
    toggleMenu: (() => void) | undefined
}

const LogoutButton = ({toggleMenu}:LogoutProps) => {

    const handleClick = () => {
        LogOut()
        if (toggleMenu) {
            toggleMenu()
        }
    }
    
    return (
        <div className="w-full">
            <button
                onClick={handleClick}
                className="button-primary rounded-b-2xl md:rounded-2xl md:mr-10"
            >
                Log out
            </button>
        </div>
    )
}

export default LogoutButton;