import { Card } from "@/components/ui/card";
import { useGetOrders, useSendComment } from "./hooksOrder";
import { OrderCard } from "./OrderCard";
import { Spinner } from "@/components/ui/spinner";
import { Button } from "@/components/ui/button";
import { orderStatusArr } from "./typeOrder";
import { useState } from "react";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea"
import { toast } from "sonner";
import { CiSearch } from "react-icons/ci";


const Orders = () => {

    const { data, isLoading, fetchNextPage, hasNextPage, isFetchingNextPage } = useGetOrders({ limit: 5 })

    const [selectedOrderStatus, setSelectedOrderStatus] = useState("");
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const [searchOrder, setSearchOrder] = useState('')

    const [transactionId, setTransactionId] = useState<string>("");
    const [restaurantId, setRestaurantId] = useState<number>(0);
    const [selectedStar, setSelectedStar] = useState(0);
    const [comment, setComment] = useState("");
    const [menuIds, setMenuIds] = useState<number[]>([]);
    const [isValidToPostReview, setIsValidToPostReview] = useState(false);

    const { mutate: mutateSendCommet } = useSendComment();

    const handleOpenReview = (transactionId: string, restaurantId: number, menuIds: number[]) => {
        setTransactionId(transactionId);
        setRestaurantId(restaurantId);
        setIsDialogOpen(true);
        setMenuIds(menuIds);
        setSelectedStar(0);
        setComment("")
        setIsValidToPostReview(true);
    }

    const handleSearchOrder = (text: string) => {
        setSearchOrder(text);
    }

    const handleComment = (text: string) => {
        setComment(text);
    }

    const handleSubmitReview = () => {
        let valid = true;

        if (transactionId === "" || transactionId === undefined) {
            valid = false;
        }

        if (restaurantId === 0 || restaurantId === undefined) {
            valid = false;
        }

        if (selectedStar < 1 || selectedStar === undefined) {
            valid = false;
        }

        if (comment === "" || comment === undefined) {
            valid = false;
        }

        if (menuIds.length < 1) {
            valid = false;
        }

        setIsValidToPostReview(valid);

        if (valid) {
            console.log(transactionId, "transactionId");
            console.log(restaurantId, "restaurantId");
            console.log(menuIds, "menuIds");
            console.log(comment, "comment");

            mutateSendCommet({
                transactionId: transactionId,
                restaurantId: restaurantId,
                star: selectedStar,
                comment: comment,
                menuIds: menuIds
            }, {
                onSuccess: () => {
                    setIsDialogOpen(false);
                },
                onError: (e) => {
                    console.log(e);
                    toast.error('Looks like something wrong');
                }
            });
        }
    }

    return (
        <div id="my-order-section">
            <h1 className="text-2xl font-bold">My Order</h1>


            <Card className="flex flex-col gap-5 p-5">

                <div className=" text-black px-5 rounded-full flex items-center h-[56px] w-full md:max-w-[598px] border-2">
                    <CiSearch className="text-3xl" />
                    <input
                        id="searchinput"
                        onChange={(e) => handleSearchOrder(e.target.value)}
                        type="text"
                        className="p-5 w-full h-full outline-none border-none focus:ring-0"
                        placeholder="Search"
                    />
                </div>

                <div id="button-food-cat" className="flex flex-wrap gap-3">

                    <Button
                        className="mr-2 h-[40px]"
                        onClick={() => { setSelectedOrderStatus(""); }}
                        variant={`${selectedOrderStatus === "" ? 'outlineDefault' : 'outlineborder'}`}>All Status</Button>

                    {
                        orderStatusArr.map(orderStatus => (
                            <Button
                                className="mr-2 h-[40px]"
                                onClick={() => { setSelectedOrderStatus(orderStatus.value); }}
                                variant={`${selectedOrderStatus === orderStatus.value ? 'outlineDefault' : 'outlineborder'}`}>{orderStatus.display}</Button>
                        ))
                    }
                </div>

                {
                    data?.pages.map(page => (
                        page.data.orders
                            .filter(order => selectedOrderStatus === "" || order.status === selectedOrderStatus)
                            .map((order) => (
                                order.restaurants
                                .filter(res => res.restaurant.name.toLowerCase().includes(searchOrder.toLowerCase()))
                                .map(restaurant => (
                                    <OrderCard
                                        onReviewClick={handleOpenReview}
                                        transactionId={order.transactionId}
                                        restaurantData={restaurant}
                                    />
                                ))
                            ))
                    ))
                }

                <div className="w-full flex items-center">
                    {(isLoading || isFetchingNextPage) && (<Spinner className="w-12 h-12 mx-auto" />)}
                    {
                        !isFetchingNextPage && hasNextPage && (
                            <Button
                                id="buttonloadmorereview"
                                variant={'outlineDefault'}
                                onClick={() => fetchNextPage()}
                                className="rounded-full w-[160px] mx-auto font-bold"
                            >Load More</Button>
                        )
                    }
                </div>
            </Card>

            <div id="dialog-review">
                <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                    <DialogContent className="w-[430px]">
                        <DialogHeader>
                            <DialogTitle className="text-2xl font-bold">Give Review</DialogTitle>
                            <DialogDescription className="flex flex-col gap-5 justify-center mt-5">
                                <div>
                                    <p className="text-center text-lg font-extrabold text-black">Give Rating</p>
                                    <div className="w-full flex justify-center gap-1">
                                        {
                                            [...Array(5)].map((_, index) => {
                                                const starVallue = index + 1;

                                                return (
                                                    <button onClick={() => setSelectedStar(starVallue)}>
                                                        <img src={`${selectedStar >= starVallue ? 'src/assets/Star-Rating-1.svg' : 'src/assets/Star-Rating-0.svg'}`} alt="Star-Rating" />
                                                    </button>
                                                )
                                            })
                                        }

                                    </div>
                                </div>
                                <Textarea
                                    className="h-[235px]"
                                    value={comment}
                                    onChange={(e) => handleComment(e.target.value)}
                                    placeholder="Please share your thoughts about our service!" />
                                {!isValidToPostReview && (
                                    <p className="text-red-500 text-md">Please complete the review before submit. Give a rating and add comment.</p>
                                )}
                                <Button onClick={() => handleSubmitReview()} className="rounded-full">Send</Button>
                            </DialogDescription>
                        </DialogHeader>
                    </DialogContent>
                </Dialog>
            </div>

        </div>
    )
}

export default Orders;