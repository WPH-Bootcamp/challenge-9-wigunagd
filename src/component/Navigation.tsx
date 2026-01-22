import { useEffect, useState } from "react";
import ButtonLink from "./ButtonLink";
import { useAppSelector } from "../services/api/redux";

interface INavigation {
    changeOnScroll: boolean;
}

const Navigation = ({ changeOnScroll }: INavigation) => {
    const authState = useAppSelector((state) => state.auth);

    const [isScrolled, setIsScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY > 25) {
                setIsScrolled(changeOnScroll && true);
            } else {
                setIsScrolled(changeOnScroll && false);
            }
        }

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <header className={`
        w-full h-[80px] fixed
        ${!isScrolled ? ('bg-transparent') : ('bg-white')}
        `}>
            <nav className="flex w-full py-5 max-w-[1440px] mx-auto justify-between md:px-0 px-3">
                <div className="flex items-center">
                    {!isScrolled ? (
                        <img src="src/assets/Logo-White.svg" alt="Logo-White" className="" />
                    ) : (
                        <img src="src/assets/Logo.svg" alt="Logo" className="" />
                    )}
                    <h1 className={`
                    ${!isScrolled ? ('text-white') : ('text-black')}
                    text-3xl font-bold ml-4
                        `}>Foody</h1>
                </div>

                <div className="flex items-center">
                    {
                        (authState.accessToken === "" || !authState.isLoggedin) ?
                            (
                                <div>
                                    <ButtonLink
                                        href="/login"
                                        type="button"
                                        className={`
                                        rounded-full md:px-12 md:py-2 mr-1 p-2 bg-transparent border 
                                        ${!isScrolled ? ('border-white text-white') : ('border-black text-black')}
                                        `}>Sign In</ButtonLink>
                                    <ButtonLink
                                        href="/login?signup"
                                        type="button"
                                        className={`
                                        rounded-full ml-1 md:px-12 md:py-2 p-2
                                        ${!isScrolled ? ('bg-white') : ('bg-red-700 text-white')}
                                        `}>Sign Up</ButtonLink>
                                </div>
                            ) : (
                                <div className={` flex items-center font-semibold
                                ${!isScrolled ? ('text-white') : (' text-black')}
                                `}>
                                    <img src={authState.avatar ?? './src/assets/tmp-img.png'} alt="Avatar" className="w-[48px] rounded-full mr-2" />
                                    <span>{authState.userName}</span>
                                </div>
                            )
                    }

                </div>
            </nav>
        </header>
    );
}

export default Navigation;

/* 
if (authState.accessToken !== "" && authState.isLoggedin) {
*/