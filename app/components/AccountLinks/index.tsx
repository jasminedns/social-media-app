import { createClient } from "@/utils/supabase/server-client";
import Link from "next/link"
import LogoutButton from "./LogoutButton";

const AccountLinks = async () => {

    const supabase = await createClient();
    const {data: {user}, error} = await supabase.auth.getUser()
    
    return (
        <div>
            { user 
                ?
                    <div className="flex flex-row items-center justify-center mr-10">
                        <Link href="/create" className="button-primary mr-2">Create</Link>
                        <LogoutButton />
                    </div> 
                : <Link href="/auth/login" className="button-primary">Log In</Link>
    
            }
        </div>
    )
}

export default AccountLinks;