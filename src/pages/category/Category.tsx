import Footer from "@/components/Footer";
import NavigationMenu from "@/components/NavigationMenu";

import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { IoFilter } from "react-icons/io5";
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import { Card, CardContent } from "@/components/ui/card";
import { useGetRestaurant } from "../home/hooksHome";
import type { Restaurant, RestaurantResponse } from "../home/typeHome";
import { RestaurantDisplayCard } from "@/components/RestaurantDisplayCard";


const SidebarContent = () => (
    <div className="flex flex-col gap-4">
        <b>FILTER</b>
        <b>Distance</b>
        <div className="flex gap-3 items-center">
            <Checkbox id="label-1" className="h-5 w-5 data-[state=checked]:bg-red-600 data-[state=checked]:border-red-600" />
            <Label htmlFor="label-1" className="text-md">Nearby</Label>
        </div>
        <div className="flex gap-3 items-center">
            <Checkbox id="label-2" className="h-5 w-5 data-[state=checked]:bg-red-600 data-[state=checked]:border-red-600" />
            <Label htmlFor="label-2" className="text-md">Within 1 km</Label>
        </div>
        <div className="flex gap-3 items-center">
            <Checkbox id="label-3" className="h-5 w-5 data-[state=checked]:bg-red-600 data-[state=checked]:border-red-600" />
            <Label htmlFor="label-3" className="text-md">Within 3 km</Label>
        </div>
        <div className="flex gap-3 items-center">
            <Checkbox id="label-4" className="h-5 w-5 data-[state=checked]:bg-red-600 data-[state=checked]:border-red-600" />
            <Label htmlFor="label-4" className="text-md">Within 5 km</Label>
        </div>

        <hr />

        <b>Price</b>
        <div className=" text-black rounded-md pl-2 flex items-center h-[48px] w-full border-2 gap-2">
            <span className="bg-neutral-100 h-[36px] w-[40px] flex items-center justify-center rounded-sm ">Rp</span>
            <input
                id="minimumprice"
                type="text"
                className=" w-full h-full outline-none border-none focus:ring-0"
                placeholder="Minimum Price"
            />
        </div>

        <div className=" text-black rounded-md pl-2 flex items-center h-[48px] w-full border-2 gap-2">
            <span className="bg-neutral-100 h-[36px] w-[40px] flex items-center justify-center rounded-sm ">Rp</span>
            <input
                id="maximumprice"
                type="text"
                className=" w-full h-full outline-none border-none focus:ring-0"
                placeholder="Maximum Price"
            />
        </div>

        <hr />

        <b>Rating</b>
        <div className="flex gap-3 items-center">
            <Checkbox id="rating-5" className="h-5 w-5 data-[state=checked]:bg-red-600 data-[state=checked]:border-red-600" />
            <Label htmlFor="rating-5" className="flex text-md items-center"><img src="src/assets/Star.svg" alt="star-5" /><span>5</span></Label>
        </div>
        <div className="flex gap-3 items-center">
            <Checkbox id="rating-4" className="h-5 w-5 data-[state=checked]:bg-red-600 data-[state=checked]:border-red-600" />
            <Label htmlFor="rating-4" className="flex text-md items-center"><img src="src/assets/Star.svg" alt="star-5" /><span>4</span></Label>
        </div>
        <div className="flex gap-3 items-center">
            <Checkbox id="rating-3" className="h-5 w-5 data-[state=checked]:bg-red-600 data-[state=checked]:border-red-600" />
            <Label htmlFor="rating-3" className="flex text-md items-center"><img src="src/assets/Star.svg" alt="star-5" /><span>3</span></Label>
        </div>
        <div className="flex gap-3 items-center">
            <Checkbox id="rating-2" className="h-5 w-5 data-[state=checked]:bg-red-600 data-[state=checked]:border-red-600" />
            <Label htmlFor="rating-2" className="flex text-md items-center"><img src="src/assets/Star.svg" alt="star-5" /><span>2</span></Label>
        </div>
        <div className="flex gap-3 items-center">
            <Checkbox id="rating-1" className="h-5 w-5 data-[state=checked]:bg-red-600 data-[state=checked]:border-red-600" />
            <Label htmlFor="rating-1" className="flex text-md items-center"><img src="src/assets/Star.svg" alt="star-5" /><span>1</span></Label>
        </div>

    </div>
);

const Category = () => {

    const { data: restaurantData } = useGetRestaurant({ limit: 20, range: 30, location: 'Jakarta' });

    return (
        <>
            <NavigationMenu changeOnScroll={false} />
            <main className="pt-23 md:px-0 px-4 w-full md:max-w-[1440px] mx-auto gap-5 grid mb-5">

                <h1 className="text-3xl font-bold">All Restaurant</h1>

                <div className="md:flex grid w-full gap-4">

                    <div className="md:hidden mb-">
                        <div className="md:hidden mb-2">
                            <Sheet>
                                <SheetTrigger asChild>
                                    <Button variant="outline" className="flex w-full h-[54px] font-bold justify-between gap-2 rounded-xl">
                                        FILTER
                                        <IoFilter size={20} />
                                    </Button>
                                </SheetTrigger>
                                <SheetContent side="left" className="pt-10 px-5">
                                    <SidebarContent />
                                </SheetContent>
                            </Sheet>
                        </div>
                    </div>

                    <aside className="hidden md:block w-1/4">
                        <Card className="w-full px-5" id="card-profile">
                            <SidebarContent />
                        </Card>
                    </aside>

                    <div className="md:w-3/4 w-full">
                        <div className="md:grid md:grid-cols-2 flex flex-col gap-3">
                            {
                                restaurantData?.pages.map((page: RestaurantResponse) => (
                                    page.data.restaurants
                                        .map((r: Restaurant) => (
                                            <a href={`/detail?restaurantid=${r.id}`}>
                                                <Card id={r.name} className="py-0">
                                                    <CardContent className="py-2">
                                                        <div className="flex">

                                                            <RestaurantDisplayCard
                                                                logo={r.logo}
                                                                name={r.name}
                                                                star={r.star}
                                                                place={r.place}
                                                                distance={r.distance}
                                                            />

                                                        </div>
                                                    </CardContent>
                                                </Card>
                                            </a>
                                        ))
                                ))
                            }
                        </div>
                    </div>

                </div>

            </main>
            <Footer />
        </>
    )
}

export default Category;