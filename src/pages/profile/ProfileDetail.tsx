import { Card, CardContent } from "@/components/ui/card";
import { useAppSelector } from "@/services/api/redux";
import { useGetProfile } from "./hooksProfile";
import { Button } from "@/components/ui/button";

const ProfileDetail = () => {
    const authState = useAppSelector((state) => state.auth);

    const {data: profileData} = useGetProfile();

    return (
        <div id="my-profile" className="grid gap-3">
            <h1 className="text-2xl font-bold">My Profile</h1>
            <div className="max-w-[524px]">
                <Card>
                    <CardContent className="flex flex-col gap-5">
                        <img src={authState.avatar ?? 'https://res.cloudinary.com/dvz5kmwqx/image/upload/v1769413652/avatars/avatar_68_1769413649794.jpg'} alt="Avatar" className="w-[64px] rounded-full mr-2" />
                        <div className="flex justify-between">
                            <span>Name</span>
                            <b>{profileData?.data.name ?? authState.userName}</b>
                        </div>
                        <div className="flex justify-between">
                            <span>Email</span>
                            <b>{profileData?.data.email ?? '-'}</b>
                        </div>
                        <div className="flex justify-between">
                            <span>Nomor Handphone</span>
                            <b>{profileData?.data.phone ?? '-'}</b>
                        </div>

                        <Button className="rounded-full h-[44px]"> Update Profile</Button>
                    </CardContent>
                </Card>
            </div>
        </div>
    )
}

export default ProfileDetail;