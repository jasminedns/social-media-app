import Link from "next/link"
import LogoutButton from "./LogoutButton";
import { User } from "@supabase/supabase-js";

interface AccountLinksProps {
  user: User | null;
  closeMenu?: () => void;
}

const AccountLinks = ({user, closeMenu}:AccountLinksProps) => {

    return (
        <div>
            { user 
                ?
                    <div className="flex flex-col md:flex-row items-center justify-center md:mr-10">
                        <Link href="/create" 
                            onClick={closeMenu}
                            className="button-primary rounded-t-2xl md:rounded-2xl md:mr-2"
                        >
                            Create
                        </Link>
                        <LogoutButton toggleMenu={closeMenu}/>
                    </div> 
                : <Link href="/auth/login" className="block button-primary rounded-2xl md:mr-2">Log In</Link>
    
            }
        </div>
    )
}

export default AccountLinks;