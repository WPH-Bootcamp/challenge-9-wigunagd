import { Card } from "@/components/ui/card";
import { useGetOrders } from "./hooksOrder";
import { OrderCard } from "./OrderCard";

const Orders = () => {
    // const { data, isLoading, fetchNextPage, hasNextPage, isFetchingNextPage } = useGetOrders({ limit: 10 })
    const { data, isLoading, fetchNextPage, hasNextPage, isFetchingNextPage } = useGetOrders({ limit: 10 })
    console.log(data, 'Data Orders');
    return (
        <div id="my-order-section">
            <h1 className="text-2xl font-bold">My Order</h1>

           <Card className="flex flex-col gap-5 p-5">
             {
                data?.pages.map(page => (
                    page.data.orders.map(order => (
                        order.restaurants.map(restaurant => (
                            <OrderCard
                                orderId={order.id}
                                restaurantData={restaurant}
                            />
                        ))
                    ))
                ))
            }
           </Card>

        </div>
    )
}

export default Orders;