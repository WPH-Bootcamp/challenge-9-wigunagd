import Footer from "@/components/Footer";
import NavigationMenu from "@/components/NavigationMenu";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useAppDispatch, useAppSelector } from "@/services/api/redux";
import { useState } from "react";
import { GrLocation } from "react-icons/gr";
import { IoDocumentTextOutline } from "react-icons/io5";
import { RiLoginCircleLine } from "react-icons/ri";
import ProfileDetail from "./ProfileDetail";
import Orders from "../orders/Orders";
import { useNavigate } from "react-router-dom";


const Profile = () => {
    const authState = useAppSelector((state) => state.auth);
     const navigate = useNavigate();

    if(!authState.isLoggedin){
        navigate('/login');
    }

    const dispatch = useAppDispatch();

    const urlParams = new URLSearchParams(location.search);
    const isHasOrderParam = urlParams.has('orders');
    const stateSelectedBtn = isHasOrderParam ? 2 : 1;

    const [selectedBtn, setSelectedBtn] = useState(stateSelectedBtn);

    const handleLogout = () => {
        dispatch({type: "auth/logout"});
        navigate("/login");
    }

    return (
        <>
            <NavigationMenu changeOnScroll={false} />
            <main className="pt-23 md:px-0 px-4 w-full md:max-w-[1440px] mx-auto gap-5 md:flex grid mb-5">
                <section id="section-navigation" className="flex md:w-1/4 w-full h-fit">
                    <Card className="w-full " id="card-profile">
                        <CardHeader>
                            <CardTitle className="flex items-center border-b-2 pb-5">
                                <img src={authState.avatar ?? './src/assets/tmp-img.png'} alt="Avatar" className="w-[48px] rounded-full mr-2" />
                                <span className="text-lg font-bold">{authState.userName}</span>

                            </CardTitle>
                        </CardHeader>
                        <CardContent id="card-profile-content" className="flex flex-col gap-7 ">

                            <button className={`flex gap-2 py-1 hover:text-red-500 ${selectedBtn === 1 ? 'text-red-500' : ''}`}
                                onClick={() => setSelectedBtn(1)}>
                                <GrLocation size={24} className="text-2xl shrink-0" />
                                Delivery Address
                            </button>

                            <button className={`flex gap-2 py-1 hover:text-red-500 ${selectedBtn === 2 ? 'text-red-500' : ''}`}
                                onClick={() => setSelectedBtn(2)}>
                                <IoDocumentTextOutline size={24} className="text-2xl shrink-0" />
                                My Orders
                            </button>

                            <button onClick={handleLogout} className="flex gap-2 py-1 hover:text-red-500">
                                <RiLoginCircleLine size={24} className="rotate-180 text-2xl shrink-0" />
                                Logout
                            </button>

                        </CardContent>
                    </Card>
                </section>

                <section id="setion-content" className="md:w-3/4 w-full">
                   {selectedBtn === 1 && (
                    <ProfileDetail />
                   )}

                   {selectedBtn === 2 && (
                    <Orders />
                   )}
                </section>
            </main>
            <Footer />
        </>
    )
}

export default Profile;