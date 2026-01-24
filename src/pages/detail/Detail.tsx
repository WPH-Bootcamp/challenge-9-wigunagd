import { useState, useEffect } from "react";
import Footer from "../../components/Footer";
import NavigationMenu from "../../components/NavigationMenu";
import { useGetDetail, useGetReview } from "./hooksDetail";
import { Spinner } from "@/components/ui/spinner";
import { Carousel, CarouselContent, CarouselItem, type CarouselApi } from "@/components/ui/carousel";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { RestaurantDisplayCard } from "@/components/RestaurantDisplayCard";
import { Skeleton } from "@/components/ui/skeleton";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"
import { Button } from "@/components/ui/button";
import ReviewRestaurantCard from "@/components/ReviewRestaurantCard";

const Detail = () => {
    const urlParams = new URLSearchParams(location.search);
    const restaurantid = urlParams.get('restaurantid');
    const { data: detailData, isLoading: isLoadingData } = useGetDetail({ id: restaurantid ?? '', limitReview: 1 });
    const { data: reviewData, isLoading: isLoadingDataReview, fetchNextPage, hasNextPage: hasNextPageReview, isFetchingNextPage: isFetchingNextPageReview } = useGetReview({ id: restaurantid ?? '', limit: 6 });

    const [api, setApi] = useState<CarouselApi>();
    const [current, setCurrent] = useState(0);
    const [selectedCategory, setSelectedCategory] = useState("");

    interface Category {
        id: string;
        filterVal: string;
    }

    console.log(reviewData, 'review');

    const uniqueTypes = [...new Set(detailData?.data.menus.map(m => m.type))];

    const menuCategory: Category[] = [
        { id: "All Menu", filterVal: "" },
        ...uniqueTypes.map(type => ({
            id: type.charAt(0).toUpperCase() + type.slice(1),
            filterVal: type
        }))
    ];

    useEffect(() => {
        if (!api) return;
        api.on("select", () => {
            setCurrent(api.selectedScrollSnap());
        });
    }, [api]);

    return (
        <>
            <NavigationMenu changeOnScroll={false} />
            <main className="pt-23 md:px-0 px-4 w-full md:max-w-[1440px] mx-auto">
                <section>
                    <div id="carouselformobile" className="md:hidden block">
                        <Carousel setApi={setApi} className="w-full relative">
                            <CarouselContent>
                                {detailData?.data.images.map((img, index) => (
                                    <CarouselItem key={index}>
                                        <AspectRatio ratio={4 / 3}>
                                            <img src={img} alt={`Banner ${detailData?.data.name} ${(index + 1).toString()}`} className="object-cover w-full h-full rounded-xl" />
                                        </AspectRatio>
                                    </CarouselItem>
                                ))}
                            </CarouselContent>
                        </Carousel>
                        <div className="flex justify-center gap-2 mt-4">
                            {detailData?.data.images.map((_, index) => (
                                <button
                                    key={index}
                                    onClick={() => api?.scrollTo(index)}
                                    className={`h-3 w-3 rounded-full transition-all duration-300 ${index === current ? "bg-primary " : "bg-neutral "
                                        }`}
                                />
                            ))}
                        </div>
                    </div>

                    {isLoadingData && (
                        <div id="skeletonimg">
                            <Card className="w-full">
                                <CardContent>
                                    <Skeleton className="aspect-video w-full" />
                                </CardContent>
                            </Card>
                        </div>
                    )}

                    {!isLoadingData && (
                        <div id="imagesfordesktop" className="hidden md:grid grid-cols-4 grid-rows-2 gap-3 h-[500px]">
                            {detailData?.data.images.map((img, index, arr) => {
                                const total = arr.length;
                                if (index === 0) {
                                    return (
                                        <div key={index} className={`${total === 1 ? "col-span-4" : "col-span-2"} row-span-2`}>
                                            <img src={img} className="w-full h-full object-cover rounded-xl" />
                                        </div>
                                    );
                                }

                                if (index === 1) {
                                    return (
                                        <div key={index} className={`${total === 2 ? "col-span-2 row-span-2" : "col-span-2 row-span-1"}`}>
                                            <img src={img} className="w-full h-full object-cover rounded-xl" />
                                        </div>
                                    );
                                }

                                if (index >= 2 && index < 4) {
                                    return (
                                        <div key={index} className="col-span-1 row-span-1">
                                            <img src={img} className="w-full h-full object-cover rounded-xl" />
                                        </div>
                                    );
                                }

                                return null;
                            })}
                        </div>
                    )}

                    {isLoadingData && (
                        <div id="skeletonname" className="flex items-center gap-4 w-[120px] h-[120px] ">
                            <Skeleton className="size-10 shrink-0 rounded-full" />
                            <div className="grid gap-2">
                                <Skeleton className="h-4 w-[150px]" />
                                <Skeleton className="h-4 w-[100px]" />
                            </div>
                        </div>
                    )}

                    {!isLoadingData && (
                        <RestaurantDisplayCard
                            logo={detailData?.data.logo}
                            name={detailData?.data.name}
                            star={detailData?.data.star}
                            place={detailData?.data.place}
                            distance={detailData?.data.distance}
                        />
                    )}

                    {isLoadingData && (<Spinner />)}

                    <div id="button-food-cat" className="mt-5">
                        {
                            menuCategory.map(c => (
                                <Button
                                    className="mr-2"
                                    onClick={() => { setSelectedCategory(c.filterVal); }}
                                    variant={`${selectedCategory === c.filterVal ? 'outlineDefault' : 'outlineSecondary'}`}>{c.id}</Button>
                            ))
                        }
                    </div>

                    <div id="menu-display" className="grid md:grid-cols-4 grid-cols-2 gap-5 mt-5 mb-5">
                        {
                            detailData?.data.menus.map(m => (
                                <Card className={`
                                p-0
                                ${(selectedCategory === "" || selectedCategory === m.type) ? 'block' : 'hidden'}
                                `}>
                                    <CardHeader className="p-0">
                                        <AspectRatio className="p-0" ratio={1 / 1}>
                                            <img src={m.image} alt={m.foodName} className="object-cover w-full h-full rounded-t-xl" />
                                        </AspectRatio>
                                    </CardHeader>
                                    <CardFooter>
                                        <div className="md:flex w-full pb-5">
                                            <div className="md:w-1/2 w-full flex flex-col">
                                                <p>{m.foodName}</p>
                                                <b>{m.price.toLocaleString('id-ID')}</b>
                                            </div>
                                            <div className="md:w-1/2 w-full flex justify-end items-center">
                                                <Button className="rounded-full" value={m.id}>Add</Button>
                                            </div>
                                        </div>
                                    </CardFooter>
                                </Card>
                            ))
                        }
                    </div>


                    <div id="review-display" className="grid md:grid-cols-2 gap-3 grid-cols-1 mb-3">
                        {reviewData?.pages.map((page) => {

                            // 2. Return the nested map
                            return page?.data.reviews.map((review) => (
                                <ReviewRestaurantCard
                                    key={review.id}
                                    id={review.id}
                                    name={review.user.name}
                                    avatar={review.user.avatar ?? 'src/assets/tmp-img.png'}
                                    date={review.createdAt}
                                    star={review.star}
                                    comment={review.comment}
                                />
                            ));
                        })}
                    </div>

                    <div className="w-full flex items-center mb-5">
                        {(isLoadingDataReview || isFetchingNextPageReview) && (<Spinner className="w-12 h-12 mx-auto" />)}
                        {
                            !isFetchingNextPageReview && hasNextPageReview && (
                                <Button
                                    id="buttonloadmorereview"
                                    variant={'outlineSecondary'}
                                    onClick={() => fetchNextPage()}
                                    className="rounded-full w-64 mx-auto"
                                >Show More</Button>
                            )
                        }
                    </div>
                </section>
            </main>
            <Footer />
        </>
    )
}

export default Detail;