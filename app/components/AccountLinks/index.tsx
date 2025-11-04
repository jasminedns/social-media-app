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
                    <div className="flex flex-col items-center justify-center">
                        <Link href="/create" 
                            onClick={closeMenu}
                            className="button-secondary uppercase rounded-t-2xl md:rounded-2xl"
                        >
                            Bloop it
                        </Link>
                        <LogoutButton toggleMenu={closeMenu}/>
                    </div> 
                : 
                    <div className="flex flex-col items-center justify-center">
                        <Link href="/auth/login" 
                            onClick={closeMenu}
                            className="button-secondary uppercase rounded-t-2xl md:rounded-2xl"
                        >
                            Log In
                        </Link>
                        <Link href="/auth/signup" 
                            onClick={closeMenu}
                            className="button-secondary uppercase rounded-b-2xl md:rounded-2xl"
                        >
                            Sign In
                        </Link>

                    </div> 

            }
        </div>
    )
}

export default AccountLinks;