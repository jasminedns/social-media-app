import Logo from "../Logo";
import AccountLinks from "../AccountLinks";
import SearchBar from "../SearchBar";
import MobileHeader from "./MobileHeader";
import { createClient } from "@/utils/supabase/server-client";
import { getUserInfo } from "@/utils/supabase/queries";

const Header = async () => {
    const supabase = await createClient();
    const { data: { user }, error } = await supabase.auth.getUser();

    let userinfo = null;

    if (user) {
        const { data: userInfoData } = await getUserInfo(supabase, user.id);
        userinfo = userInfoData; 
    }

    return (
        <header className={`flex flex-col md:flex-row justify-center md:justify-between items-center p-4 md:pb-4`}>
            <div className="w-full flex justify-between items-center relative">
                <Logo />
                <MobileHeader user={user} userInfo={userinfo} />
                <div className="hidden md:block">                
                    <SearchBar />
                </div>
            </div>
            <div className="md:hidden">
                <SearchBar />
            </div>
        </header>
    );
};
export default Header;