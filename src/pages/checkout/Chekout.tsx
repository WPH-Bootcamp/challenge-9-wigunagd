import { useAppSelector } from "@/services/api/redux";
import Footer from "../../components/Footer";
import NavigationMenu from "../../components/NavigationMenu";
import { CartItemCard } from "../cart/CartItemCard";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label"
import { useState } from "react";
import CheckoutSuccess from "./CheckoutSuccess";
import type { ICheckoutResponse, IRestaurantCheckoutOrderBody } from "./checkoutType";
import { useDoCheckout } from "./hooksCheckout";
import { useClearCart } from "../cart/hooksCart";
import { useNavigate } from "react-router-dom";
import { Spinner } from "@/components/ui/spinner";

/* 
// dipakai untuk tes
const DUMMY_RESPONSE: ICheckoutResponse = {
    success: true,
    message: "Order placed successfully",
    data: {
        transaction: {
            id: 1024,
            transactionId: "TRX-20260125-FODY99",
            paymentMethod: "Bank Negara Indonesia",
            status: "done",
            deliveryAddress: "Jl. Sudirman No. 25, Jakarta Pusat, 10220",
            phone: "0812-3456-7890",
            pricing: {
                subtotal: 125000,
                serviceFee: 1000,
                deliveryFee: 10000,
                totalPrice: 136000
            },
            restaurants: [
                {
                    restaurant: { id: 108, name: "Warung Makan Bali", logo: "src/assets/Restaurant.svg" },
                    items: [{ menuId: 224, menuName: "Nasi Campur Special", price: 45000, quantity: 2, itemTotal: 90000 }],
                    subtotal: 90000
                }
            ],
            createdAt: "2026-01-25T12:00:06.529Z"
        }
    }
}; 
*/

const Checkout = () => {

    const bankArr = [
        {
            id: "BNI",
            nama: "Bank Negara Indonesia",
            imgurl: "src/assets/bank-bni.svg"
        }, {
            id: "BRI",
            nama: "Bank Rakyat Indonesia",
            imgurl: "src/assets/bank-bri.svg"
        }, {
            id: "BCA",
            nama: "Bank Central Asia",
            imgurl: "src/assets/bank-bca.svg"
        }, {
            id: "BMI",
            nama: "Mandiri",
            imgurl: "src/assets/bank-mandiri.svg"
        },
    ];

    const cardData = useAppSelector((cartState) => cartState.cartCount);
    const navigate = useNavigate();



    const deliveryFee = 10000;
    const serviceFee = 1000;
    const total = deliveryFee + serviceFee + cardData.totalPrice

    const [doneCheckout, setDoneCheckout] = useState(false);
    const [payment, setPayment] = useState(bankArr[0].nama);
    const [checkoutData, setCheckoutData] = useState<ICheckoutResponse | null>(null);

    if (cardData.totalItems < 1 && !doneCheckout) {
        navigate('/cart')
    }

    const { mutate: mutateDoCheckout, isPending: isPendingCheckout } = useDoCheckout();
    const { mutate: mutateClearCart } = useClearCart();

    const saveOrder = () => {

        const restaurantsData: IRestaurantCheckoutOrderBody[] = cardData.cart.map((cartGroup) => (
            {
                restaurantId: cartGroup.restaurant.id,
                items: cartGroup.items.map((item) => (
                    {
                        menuId: item.menu.id,
                        quantity: item.quantity
                    }
                ))
            }
        ))

        mutateDoCheckout({
            restaurants: restaurantsData,
            deliveryAddress: "Jl. Sudirman No. 25, Jakarta Pusat, 10220",
            phone: "0812-3456-7890",
            paymentMethod: payment,
            notes: "Please ring the doorbell"
        }, {
            onSuccess: (response) => {
                console.log(response, 'Berhasil Checkout');
                setCheckoutData(response);
                setDoneCheckout(response.success);
                mutateClearCart();
            }
        });

        /* 
        setCheckoutData(DUMMY_RESPONSE);
        setDoneCheckout(DUMMY_RESPONSE.success); 
        */

    }

    const handlePaymentChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const p =e.target.value;
        setPayment(p);
        console.log(p);
    };

    return (
        <>
            {!doneCheckout && (
                <>
                    <NavigationMenu changeOnScroll={false} />
                    <main className="pt-23 md:px-0 px-4 w-full md:max-w-[1440px] mx-auto flex">
                        <section id="cart-item-list" className="w-full md:max-w-[1000px] mx-auto my-10">
                            <h1 className="text-4xl mb-6">Checkout</h1>

                            <div className="flex md:flex-row flex-col gap-5">

                                <div className="flex flex-col gap-5 md:w-1/2 w-full">
                                    <Card>
                                        <CardContent>
                                            <span className="flex flex-col gap-2">
                                                <span className="flex font-bold text-lg items-center"><img src="src/assets/Location.svg" alt="Location-icon" className="mr-2" /> Delivery Address</span>
                                                <span>Jl. Sudirman No. 25, Jakarta Pusat, 10220</span>
                                                <span>0812-3456-7890</span>
                                                <Button
                                                    variant={'outlineborder'}
                                                    asChild
                                                    className="rounded-full w-[120px] h-[44px]">
                                                    <a href='#'>Change</a>
                                                </Button>
                                            </span>
                                        </CardContent>
                                    </Card>

                                    {cardData?.cart?.length > 0 ? (
                                        cardData.cart.map((cartItem) => (
                                            <CartItemCard
                                                key={cartItem.restaurant.id}
                                                isCheckout={true}
                                                cartItem={cartItem}
                                            />
                                        ))
                                    ) : (
                                        <p className="text-muted-foreground">Your cart is currently empty.</p>
                                    )}
                                </div>

                                <div className="flex flex-col md:w-1/2 w-full">

                                    <div className="p-0 gap-0">
                                        <Card
                                            className="relative border-b-0 p-5"
                                        >
                                            <b className="text-lg">Payment Method</b>

                                            <div className="flex flex-col gap-5 divide-y divide-gray-200">
                                                {
                                                    bankArr.map(b => (
                                                        <div className="flex items-center gap-3 justify-between pb-5">
                                                            <Label htmlFor={b.id} className="text-xl w-full">
                                                                <img src={b.imgurl} alt={b.nama} width={40} className="w-[40px] h-[40px]" />
                                                                {b.nama}
                                                            </Label>
                                                            <input type="radio"
                                                                value={b.nama}
                                                                id={b.id}
                                                                onChange={handlePaymentChange}
                                                                name="rb-pembayaran"
                                                                className="w-6 h-6 accent-red-500 " />
                                                        </div>
                                                    ))
                                                }
                                            </div>

                                            <div id="left-inset" className="absolute -bottom-3 -left-3 w-6 h-6 inset-bg rounded-full ring-2 ring-gray-200"></div>
                                            <div id="right-inset" className="absolute -bottom-3 -right-3 w-6 h-6 inset-bg rounded-full ring-2 ring-gray-200"></div>
                                            <div className="absolute -bottom-4 -left-5 w-5 h-8 inset-bg"></div>
                                            <div className="absolute -bottom-4 -right-5 w-5 h-8 inset-bg rounded-ful"></div>
                                        </Card>
                                        <Card
                                            className="relativeborder-t-2 border-dashed p-5"
                                        >
                                            <b className="text-lg">Payment Summary</b>

                                            <div className="flex justify-between text-xl">
                                                <p>Price ( {cardData.totalItems ?? 0} items )</p>
                                                <p>Rp{cardData.totalPrice.toLocaleString('id-ID')}</p>
                                            </div>

                                            <div className="flex justify-between text-xl">
                                                <p>Delivery Fee</p>
                                                <p>Rp{deliveryFee.toLocaleString('id-ID')}</p>
                                            </div>

                                            <div className="flex justify-between text-xl">
                                                <p>Service Fee</p>
                                                <p>Rp{serviceFee.toLocaleString('id-ID')}</p>
                                            </div>

                                            <div className="flex justify-between text-xl font-bold">
                                                <p>Total</p>
                                                <p>Rp{total.toLocaleString('id-ID')}</p>
                                            </div>

                                            <Button
                                                disabled={isPendingCheckout}
                                                onClick={saveOrder}
                                                className="rounded-full text-lg font-bold w-full h-[48px]">
                                                {isPendingCheckout && (<Spinner />)}
                                                Buy
                                            </Button>
                                        </Card>
                                    </div>


                                </div>

                            </div>
                        </section>
                    </main>
                    <Footer />
                </>
            )}

            {doneCheckout && (
                checkoutData && (
                    <CheckoutSuccess checkoutdata={checkoutData} />
                )
            )}
        </>
    )
}

export default Checkout;