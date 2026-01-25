import Footer from "@/components/Footer";
import NavigationMenu from "@/components/NavigationMenu";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useAppSelector } from "@/services/api/redux";

const Profile = () => {
    const authState = useAppSelector((state) => state.auth);


    return (
        <>
            <NavigationMenu changeOnScroll={false} />
            <main className="pt-23 md:px-0 px-4 w-full md:max-w-[1440px] mx-auto gap-5 md:flex grid mb-5">
                <section id="section-navigation" className="flex md:w-1/4 w-full">
                    <Card className="w-full">
                        <CardHeader>
                            <CardTitle className="flex">
                                <img src={authState.avatar ?? './src/assets/tmp-img.png'} alt="Avatar" className="w-[48px] rounded-full mr-2" />
                                <span>{authState.userName}</span>
                            </CardTitle>
                        </CardHeader>
                        <CardContent></CardContent>
                    </Card>
                </section>

                <section id="setion-content" className="md:w-3/4 w-full">
                    aaa
                </section>
            </main>
            <Footer />
        </>
    )
}

export default Profile;