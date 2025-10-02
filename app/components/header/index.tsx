import Logo from "../Logo";
import AccountLinks from "../AccountLinks";
import SearchBar from "../SearchBar";

const Header = () => {
    return (
        <>
            <header className={`flex justify-between items-center pb-4`}>
                <Logo />
                <SearchBar />
                <div className="flex justify-center items-center gap-5">
                    <AccountLinks />
                </div>
            </header>
        </>
    )
}

export default Header;