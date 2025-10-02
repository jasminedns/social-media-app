'use client'

import { LogOut } from "@/actions/log-out";

const LogoutButton = () => {

    const handleClick = () => {
        LogOut()
    }
    
    return (
        <div>
            <button
                onClick={handleClick}
                className="button-primary mr-10 hover:bg-gray-200"
            >
                Log out
            </button>
        </div>
    )
}

export default LogoutButton;