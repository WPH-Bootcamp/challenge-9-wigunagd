import { useEffect, useState } from "react";
import ButtonCustomLink from "./ButtonCustomLink";
import { useAppSelector } from "../services/api/redux";
import { FaBagShopping } from "react-icons/fa6";
import { baseURLVar } from "../BaseUrlVar";

interface INavigation {
    changeOnScroll: boolean;
}

const NavigationMenu = ({ changeOnScroll }: INavigation) => {
    const authState = useAppSelector((state) => state.auth);

    const [isScrolled, setIsScrolled] = useState(!changeOnScroll);

    useEffect(() => {
        const handleScroll = () => {
            if (changeOnScroll) {
                if (window.scrollY > 25) {
                    setIsScrolled(true);
                } else {
                    setIsScrolled(false);
                }
            } else {
                setIsScrolled(true);
            }
        }

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <header className={`
        w-full h-[80px] fixed z-50
        ${!isScrolled ? ('bg-transparent') : ('bg-white')}
        `}>
            <nav className="flex w-full py-5 max-w-[1440px] mx-auto justify-between md:px-0 px-3">
                <div className="flex items-center">
                    <a className="flex items-center" href={baseURLVar}>
                        {!isScrolled ? (
                            <img src="src/assets/Logo-White.svg" alt="Logo-White" className="" />
                        ) : (
                            <img src="src/assets/Logo.svg" alt="Logo" className="" />
                        )}
                        <h1 className={`
                    ${!isScrolled ? ('text-white') : ('text-black')}
                    text-3xl font-bold ml-4
                        `}>Foody</h1>
                    </a>
                </div>

                <div className="flex items-center">
                    {
                        (authState.accessToken === "" || !authState.isLoggedin) ?
                            (
                                <div>
                                    <ButtonCustomLink
                                        href="/login"
                                        type="button"
                                        className={`
                                        rounded-full md:px-12 md:py-2 mr-1 p-2 bg-transparent border 
                                        ${!isScrolled ? ('border-white text-white') : ('border-black text-black')}
                                        `}>Sign In</ButtonCustomLink>
                                    <ButtonCustomLink
                                        href="/login?signup"
                                        type="button"
                                        className={`
                                        rounded-full ml-1 md:px-12 md:py-2 p-2
                                        ${!isScrolled ? ('bg-white') : ('bg-red-700 text-white')}
                                        `}>Sign Up</ButtonCustomLink>
                                </div>
                            ) : (
                                <div className={` flex items-center font-semibold
                                ${!isScrolled ? ('text-white') : (' text-black')}
                                `}>
                                    <a href="/cart" className="mr-3 flex relative pr-3">
                                        <FaBagShopping className="text-4xl" />
                                        <span id="cartcounter" className="bg-primary text-white rounded-full text-center h-[24px] w-[24px] absolute right-0">0</span>
                                    </a>
                                    <img src={authState.avatar ?? './src/assets/tmp-img.png'} alt="Avatar" className="w-[48px] rounded-full mr-2" />
                                    <span className="hidden md:block">{authState.userName}</span>
                                </div>
                            )
                    }

                </div>
            </nav>
        </header>
    );
}

export default NavigationMenu;