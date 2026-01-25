import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import type { IOrderRestaurant } from "./typeOrder"
import { Button } from "@/components/ui/button";

interface IOrderCardProps {
    orderId: number;
    restaurantData: IOrderRestaurant;
}

export const OrderCard = ({ orderId, restaurantData }: IOrderCardProps) => {
    return (
        <Card key={orderId}>
            <CardHeader>
                <CardTitle className="flex items-center gap-2 pb-3">
                    <img src="src/assets/Restaurant.svg" alt={restaurantData.restaurant.name} />
                    <b className="text-lg">{restaurantData.restaurant.name}</b>
                </CardTitle>
                <CardContent className="flex flex-col gap-7 pb-3 px-0">
                    {
                        restaurantData.items.map(item => (
                            <div className="flex gap-3 items-center">
                                <img src={item.image} alt={item.menuName} className="w-[80px] h-[80px] rounded-xl" />
                                <div className="flex flex-col">
                                    <p className="text-lg">{item.menuName}</p>
                                    <p className="text-lg font-bold">{item.quantity} x Rp{item.price.toLocaleString('id-ID')}</p>
                                </div>
                            </div>
                        ))
                    }
                </CardContent>
                <CardFooter className="border-t-1 flex md:flex-row flex-col pt-5 px-0 md:gap-0 gap-5 md:justify-between">
                    <div className="md:w-[240px] w-full">
                        <p>Total</p>
                        <b>Rp{restaurantData.subtotal.toLocaleString('id-ID')}</b>
                    </div>
                    <Button
                        className="rounded-full h-[48px] md:w-[240px] w-full"
                    >Give Review</Button>
                </CardFooter>
            </CardHeader>
        </Card>
    )
}

/* 
IOrderRestaurant
*/