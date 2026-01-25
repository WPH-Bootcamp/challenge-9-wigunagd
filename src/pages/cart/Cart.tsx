
import Footer from "../../components/Footer";
import NavigationMenu from "../../components/NavigationMenu";
import { useAppSelector } from "@/services/api/redux";
import { Card, CardContent, CardTitle, CardHeader, CardFooter } from "@/components/ui/card"
import { IoIosArrowForward } from "react-icons/io";
import { Button } from "@/components/ui/button";
import { AspectRatio } from "@radix-ui/react-aspect-ratio";

const Cart = () => {
    const cardData = useAppSelector((cartState) => cartState.cartCount);
    console.log(cardData, 'cart Data')
    return (
        <>
            <NavigationMenu changeOnScroll={false} />
            <main className="pt-23 md:px-0 px-4 w-full md:max-w-[1440px] mx-auto">
                <section className="w-full md:max-w-[800px] mx-auto my-10">
                    <h1 className="text-4xl mb-6">My Cart</h1>
                    <div className="flex flex-col gap-5">
                        {cardData?.cart?.length > 0 ? (
                            cardData.cart.map((cartItem) => (
                                <Card>
                                    <CardHeader>
                                        <CardTitle className="flex gap-1 items-center text-lg font-bold">
                                            <img src="src/assets/Restaurant.svg" className="w-[32px] h-[32px]" alt="Restaurant-Icon" />
                                            {cartItem.restaurant.name}
                                            <IoIosArrowForward />
                                        </CardTitle>
                                    </CardHeader>
                                    <CardContent className="flex flex-col gap-3">
                                        {cartItem.items.map(menu => (
                                            <div className="flex justify-between">
                                                <div className="flex w-1/2 items-center gap-3">
                                                    <div className="w-[80px] h-[80px] rounded-2xl">
                                                        <img className="object-cover w-full h-full rounded-2xl" src={menu.menu.image} alt={menu.id.toString()} />
                                                    </div>
                                                    <div>
                                                        <p>{menu.menu.foodName}</p>
                                                        <b>Rp{menu.menu.price.toLocaleString('id-ID')}</b>
                                                    </div>
                                                </div>
                                                <div className="flex w-1/2 gap-5 items-center justify-end">
                                                    <Button
                                                        variant={'outline'}
                                                        className="rounded-full w-[36px] text-3xl"
                                                    >
                                                        -
                                                    </Button>
                                                    <p className="text-center">{menu.quantity}</p>
                                                    <Button
                                                        className="rounded-full w-[36px] text-3xl"
                                                    >
                                                        +
                                                    </Button>
                                                </div>
                                            </div>
                                        ))}
                                    </CardContent>
                                    <CardFooter className="border-t-2">
                                        <div className="flex w-full pt-5 items-center mx-auto justify-between md:px-0 px-3">
                                            <div className="w-1/2">
                                                <p className="flex">
                                                    Total
                                                </p>
                                                <b className="text-xl">Rp{cartItem.subtotal.toLocaleString('id-ID')}</b>
                                            </div>

                                            <Button asChild className="rounded-full md:w-full md:max-w-[230px] w-1/2 h-[44px]">
                                                <a href="/cart">Checkout</a>
                                            </Button>
                                        </div>
                                    </CardFooter>
                                </Card>
                            ))
                        ) : (
                            <p className="text-muted-foreground">Your cart is currently empty.</p>
                        )}
                    </div>
                </section>
            </main>
            <Footer />
        </>
    )
}

export default Cart;