
import Footer from "../../components/Footer";
import { CiSearch } from "react-icons/ci";
import NavigationMenu from "../../components/NavigationMenu";
import { useGetRestaurant } from "./hooksHome";
import type { RestaurantResponse, Restaurant } from "./typeHome";
import { Card, CardContent } from "@/components/ui/card"
import { RestaurantDisplayCard } from "@/components/RestaurantDisplayCard";
import { exploreArr } from "@/features/filters/Filter";
import { useState } from "react";
import { Spinner } from "@/components/ui/spinner";
import { Button } from "@/components/ui/button";

const MainPage = () => {

    const [searchOrder, setSearchOrder] = useState('')
    const {
        data: restaurantData,
        isLoading: isLoadingRestaurant,
        fetchNextPage,
        hasNextPage: hasNextPageRestaurant,
        isFetchingNextPage: isFetchingNextPageRestaurant
    } = useGetRestaurant({ limit: 6, range: 30, location: 'Jakarta' });

    const handleSearchOrder = (text: string) => {
        setSearchOrder(text);
    }

    return (
        <>
            <NavigationMenu changeOnScroll={true} />
            <section id="herocontent" className="relative md:h-[827px] h-[648px]">
                <img id="bannerimg" src="src/assets/bannerimg.svg" alt="Banner Image" className="w-full object-cover md:h-[827px] h-[648px]" />
                <div className="absolute inset-0 bg-black/50"></div>

                <div
                    id="herosearch"
                    className="absolute flex flex-col items-center top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 
                                w-full max-w-[712px] text-center text-white 
                                px-6 md:px-0"
                >
                    <h1 className="text-3xl md:text-5xl font-[800] mb-5">
                        Explore Culinary Experiences
                    </h1>
                    <h4 className="text-lg md:text-2xl font-[700] mb-10">
                        Search and refine your choice to discover the perfect restaurant.
                    </h4>

                    <div className="bg-white text-black px-5 rounded-full flex items-center h-[56px] w-full md:max-w-[604px]">
                        <CiSearch className="text-3xl" />
                        <input
                            id="searchinput"
                            onChange={(e) => handleSearchOrder(e.target.value)}
                            type="text"
                            className="p-5 w-full h-full outline-none border-none focus:ring-0"
                            placeholder="Search restaurants, food and drink"
                        />
                    </div>
                </div>

            </section>

            <main className="md:px-0 px-4 py-3 w-full md:max-w-[1440px] mx-auto mb-5">
                <section id="mainsection">
                    <ul className="flex flex-row flex-wrap md:flex-nowrap justify-between w-full my-5 gap-y-5">
                        {exploreArr.map((ex) => (
                            <li key={ex.id} className="w-[30%] md:w-[161px]">
                                <a href={ex.href} className="flex flex-col items-center w-full">
                                    <div className="shadow-md rounded-2xl w-full h-[100px] aspect-square md:aspect-auto flex items-center justify-center bg-white mb-2">
                                        <img
                                            src={ex.imgSrc}
                                            alt={ex.id}
                                            className="w-[65px] h-[65px] object-contain"
                                        />
                                    </div>
                                    <span className="text-center font-medium text-md">{ex.id}</span>
                                </a>
                            </li>
                        ))}
                    </ul>

                    <div id="contentrestaurant">
                        <div className="flex justify-between mb-5">
                            <h3 className="text-lg font-bold">All Restaurant</h3>
                            <p className="text-primary font-extrabold">
                                <a href="/category">See all</a>
                            </p>
                        </div>
                        <div id="contentrestaurantlist" className="md:grid md:grid-cols-3 flex flex-col gap-5">
                            {
                                restaurantData?.pages.map((page: RestaurantResponse) => (
                                    page.data.restaurants
                                        .filter(res => res.name.toLowerCase().includes(searchOrder.toLowerCase()))
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
                </section>
            </main>
            <Footer />
        </>
    )
}

export default MainPage;