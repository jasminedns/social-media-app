import Logo from "../Logo";
import AccountLinks from "../AccountLinks";
import SearchBar from "../SearchBar";
import MobileHeader from "./MobileHeader";
import { createClient } from "@/utils/supabase/server-client";

const Header = async () => {
    const supabase = await createClient();
    const {data: {user}, error} = await supabase.auth.getUser()

    return (
        <>
            <header className={`flex flex-col md:flex-row justify-center md:justify-between items-center pb-4`}>
                <div className="w-full flex justify-between items-center relative">
                    <Logo />
                    <MobileHeader user={user}/>
                </div>
                <SearchBar />
                <div className="hidden md:flex justify-center items-center gap-5">
                    <AccountLinks user={user} />
                </div>
            </header>
        </>
    )
}

export default Header;