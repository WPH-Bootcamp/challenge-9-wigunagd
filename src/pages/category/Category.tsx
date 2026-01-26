import Footer from "@/components/Footer";
import NavigationMenu from "@/components/NavigationMenu";
import { IoFilter } from "react-icons/io5";
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import { Card, CardContent } from "@/components/ui/card";
import { useGetRestaurant } from "../home/hooksHome";
import type { Restaurant, RestaurantResponse } from "../home/typeHome";
import { RestaurantDisplayCard } from "@/components/RestaurantDisplayCard";
import { useState } from "react";
import { Spinner } from "@/components/ui/spinner";
import { Button } from "@/components/ui/button";

const listDistance = [
    {
        id: "distance-0",
        text: "Nearby",
        distanceVal: 0.1
    }, {
        id: "distance-1",
        text: "Within 1 km",
        distanceVal: 1
    }, {
        id: "distance-3",
        text: "Within 3 km",
        distanceVal: 3
    }, {
        id: "distance-5",
        text: "Within 5 km",
        distanceVal: 5
    }, {
        id: "distance-10",
        text: "Within 10 km",
        distanceVal: 10
    }, {
        id: "distance-20",
        text: "Within 20 km",
        distanceVal: 20
    },
];

const listRating = [
    {
        id: "rating-5",
        ratingVal: 5
    }, {
        id: "rating-4",
        ratingVal: 4
    }, {
        id: "rating-3",
        ratingVal: 3
    }, {
        id: "rating-2",
        ratingVal: 2
    }, {
        id: "rating-1",
        ratingVal: 1
    },
];

const Category = () => {

    /* range, priceMin, priceMax, rating */
    const defaultrange = 50;
    const defaultRating = null;
    const [filterRange, setFilterRange] = useState<number | null>(defaultrange);
    const [filterPriceMin, setFilterPriceMin] = useState<number | null>();
    const [filterPriceMax, setFilterPriceMax] = useState<number | null>();
    const [filterRating, setFilterRating] = useState<number | null>();

    const [showSidebar, setShowSidebar] = useState(false);

    const {
        data: restaurantData,
        isLoading: isLoadingRestaurant,
        fetchNextPage,
        hasNextPage: hasNextPageRestaurant,
        isFetchingNextPage: isFetchingNextPageRestaurant
    } = useGetRestaurant({
        limit: 6,
        range: filterRange ?? 30,
        location: 'Jakarta Pusat',
        priceMin: filterPriceMin,
        priceMax: filterPriceMax,
        rating: filterRating
    });

    const handleDistance = () => {

        const chkdistance = document.querySelectorAll<HTMLInputElement>('.chkdistance');
        let selectedrange = defaultrange;
        chkdistance.forEach((chk, index) => {
            if (chk.getAttribute('data-state') === 'checked') {
                selectedrange = listDistance[index].distanceVal;
            }
        });

        console.log(selectedrange, 'within');

        setFilterRange(selectedrange);
    }

    const handleRating = () => {
        const chkrating = document.querySelectorAll('.rating');
        let selectedRating: number | null = defaultRating;
        chkrating.forEach((chk, index) => {
            if (chk.getAttribute('data-state') === 'checked') {
                selectedRating = listRating[index].ratingVal;
            }
        });
        setFilterRating(selectedRating);
    }

    const handleMinPrice = (n: number) => {
        if (typeof n === "number" && n > 0) {
            setFilterPriceMin(n);
        } else {
            setFilterPriceMin(0);
        }
    }

    const handleMaxPrice = (n: number) => {
        if (typeof n === "number" && n > 0) {
            setFilterPriceMax(n);
        } else {
            setFilterPriceMax(0);
        }
    }

    const handleShowSidebar = () => {
        setShowSidebar(!showSidebar);
    }

    return (
        <>
            <NavigationMenu changeOnScroll={false} />
            <main className="pt-23 md:px-0 px-4 w-full md:max-w-[1440px] mx-auto gap-5 grid mb-5">

                <h1 className="text-3xl font-bold">All Restaurant</h1>

                <div className="md:flex grid w-full gap-4">

                    <aside id="aside-menu"
                        className={`bg-white py-3
                                md:block md:relative md:top-auto md:left-auto md:h-auto md:w-1/4 md:shadow md:rounded-xl
                                ${showSidebar ? 'fixed top-20 left-0 h-screen shadow-2xl' : 'hidden'}
                        `}>
                        <Button 
                            variant={'outline'}
                            onClick={() => handleShowSidebar()}
                            className="rounded-full w-[40px] h-[40px] absolute top-0 -right-12 md:hidden">
                            X
                        </Button>
                        <div className="w-full px-5" id="card-profile">
                            <div className="flex flex-col gap-4">
                                <b>FILTER</b>
                                <b>Distance</b>
                                {
                                    listDistance.map(distance => (
                                        <div className="flex gap-3 items-center">
                                            <Checkbox
                                                id={distance.id}
                                                onCheckedChange={() => handleDistance()}
                                                className="chkdistance h-5 w-5 data-[state=checked]:bg-red-600 data-[state=checked]:border-red-600" />
                                            <Label htmlFor={distance.id} className="text-md">{distance.text}</Label>
                                        </div>
                                    ))
                                }

                                <hr />

                                <b>Price</b>
                                <div className=" text-black rounded-md pl-2 flex items-center h-[48px] w-full border-2 gap-2">
                                    <span className="bg-neutral-100 h-[36px] w-[40px] flex items-center justify-center rounded-sm ">Rp</span>
                                    <input
                                        id="minimumprice"
                                        min={0}
                                        type="number"
                                        onChange={(e) => handleMinPrice(Number(e.target.value))}
                                        className=" w-full h-full outline-none border-none focus:ring-0"
                                        placeholder="Minimum Price"
                                    />
                                </div>

                                <div className=" text-black rounded-md pl-2 flex items-center h-[48px] w-full border-2 gap-2">
                                    <span className="bg-neutral-100 h-[36px] w-[40px] flex items-center justify-center rounded-sm ">Rp</span>
                                    <input
                                        id="maximumprice"
                                        min={0}
                                        type="number"
                                        onChange={(e) => handleMaxPrice(Number(e.target.value))}
                                        className=" w-full h-full outline-none border-none focus:ring-0"
                                        placeholder="Maximum Price"
                                    />
                                </div>

                                <hr />

                                <b>Rating</b>
                                {
                                    listRating.map(rating => (
                                        <div className="flex gap-3 items-center">
                                            <Checkbox
                                                id={rating.id}
                                                onCheckedChange={() => handleRating()}
                                                className="rating h-5 w-5 data-[state=checked]:bg-red-600 data-[state=checked]:border-red-600" />
                                            <Label htmlFor={rating.id}
                                                className="flex text-md items-center"><img src="src/assets/Star.svg" alt="star-5" /><span>{rating.ratingVal}</span></Label>
                                        </div>
                                    ))
                                }

                            </div>
                        </div>
                    </aside>

                    <div className="md:w-3/4 w-full">

                        <Button 
                        variant={'outline'} 
                        onClick={() => handleShowSidebar()}
                        className="flex justify-between w-full h-[54px] text-lg mb-4 rounded-xl md:hidden">
                            <b>FILTER</b>
                            <IoFilter />
                        </Button>

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

                        <div className="w-full flex items-center mt-5">
                            {(isLoadingRestaurant || isFetchingNextPageRestaurant) && (<Spinner className="w-12 h-12 mx-auto" />)}
                            {
                                !isFetchingNextPageRestaurant && hasNextPageRestaurant && (
                                    <Button
                                        id="buttonloadmorereview"
                                        variant={'outlineborder'}
                                        onClick={() => fetchNextPage()}
                                        className="rounded-full w-[160px] mx-auto text-bold"
                                    >Show More</Button>
                                )
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