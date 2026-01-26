
import Footer from "../../components/Footer";
import NavigationMenu from "../../components/NavigationMenu";
import { useAppSelector } from "@/services/api/redux";
import { CartItemCard } from "./CartItemCard";


const Cart = () => {
    const cardData = useAppSelector((cartState) => cartState.cartCount);

    return (
        <>
            <NavigationMenu changeOnScroll={false} />
            <main className="pt-23 md:px-0 px-4 w-full md:max-w-[1440px] mx-auto">
                <section id="cart-item-list" className="w-full md:max-w-[800px] mx-auto my-10">
                    <h1 className="text-4xl mb-6">My Cart</h1>
                    <div className="flex flex-col gap-5 min-h-[1200px]">
                        {cardData?.cart?.length > 0 ? (
                            cardData.cart.map((cartItem) => (
                                <CartItemCard
                                    key={cartItem.restaurant.id}
                                    isCheckout={false}
                                    cartItem={cartItem}
                                />
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