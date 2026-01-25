import { Card, CardContent, CardTitle, CardHeader, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button";
import { IoIosArrowForward } from "react-icons/io";
import { CartItemCardMenu } from "./CartItemCardMenu";

interface ICartMenuProps {
    foodName: string;
    price: number;
    image: string;
}

interface ICartItemProps {
    id: number;
    quantity: number;
    menu: ICartMenuProps;
}

interface ICartItemCardProps {
    cartItem: {
        restaurant: {
            id: number;
            name: string;
        };
        items: ICartItemProps[];
        subtotal: number;
    },
    isCheckout: boolean;
}

export const CartItemCard = ({ isCheckout, cartItem }: ICartItemCardProps) => {
    return (
        <Card id={cartItem.restaurant.id.toString()}>
            <CardHeader>
                <CardTitle className="flex gap-1 items-center text-lg font-bold justify-between">
                    <a
                        href={`${!isCheckout ? `/detail?restaurantid=${cartItem.restaurant.id}` : '#'}`}
                        className="flex gap-1 items-center">
                        <img src="src/assets/Restaurant.svg" className="w-[32px] h-[32px]" alt="Restaurant-Icon" />
                        {cartItem.restaurant.name}
                        {!isCheckout && (
                            <IoIosArrowForward />
                        )}
                    </a>

                    {isCheckout && (
                        <Button
                            variant={'outlineborder'}
                            asChild
                            className="rounded-full w-[120px] h-[44px]">
                            <a href={`/detail?restaurantid=${cartItem.restaurant.id}`}>Add item</a>
                        </Button>
                    )}

                </CardTitle>
            </CardHeader>
            <CardContent className="flex flex-col gap-5">
                {cartItem.items.map(menu => (
                    /* menu item */
                    <CartItemCardMenu
                        isCheckout={isCheckout}
                        key={menu.id}
                        item={menu}
                    />
                    /* menu item */
                ))}
            </CardContent>
            <CardFooter className="border-t-2">
                <div className="flex w-full pt-5 items-center mx-auto justify-between md:px-0 px-3">
                    <div className={`${!isCheckout ? 'w-1/2' : 'w-full'}`}>
                        <p className="flex">
                            Total
                        </p>
                        <b className="text-xl">Rp{cartItem.subtotal.toLocaleString('id-ID')}</b>
                    </div>

                    {!isCheckout && (
                        <Button asChild className="rounded-full md:w-full md:max-w-[230px] w-1/2 h-[44px]">
                            <a href="/checkout">Checkout</a>
                        </Button>
                    )}
                </div>
            </CardFooter>
        </Card>
    )
}