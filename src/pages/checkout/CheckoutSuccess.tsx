import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import type { ICheckoutResponse } from "./checkoutType";
import dayjs from 'dayjs'
import 'dayjs/locale/id'

dayjs.locale('id');

interface checkOutSuccessProps {
    checkoutdata: ICheckoutResponse
}

const CheckoutSuccess = ({ checkoutdata }: checkOutSuccessProps) => {
    return (
        <div className="grid w-full h-screen items-center">
            <div className="max-w-[428px] md:mx-auto mx-4 flex flex-col gap-9 items-center">
                
                <div className="flex flex-row mx-auto gap-2 items-center">
                    <img src="src/assets/Logo.svg" alt="Logo" className="" />
                    <h1 className="text-4xl font-bold">Foody</h1>
                </div>

                <Card className="p-0 gap-0 w-full mx-a">
                    <div className="relative border-b-0 p-5 flex flex-col items-center gap-3">

                        <img src="src/assets/check-green.svg" alt="Check-succes" className="w-[64px] h-[64px" />
                        <b className="text-xl">Payment Success</b>
                        <p>Your payment has been successfully processed.</p>

                        <div id="left-inset-1" className="absolute z-2 -bottom-3 -left-3 w-6 h-6 inset-bg rounded-full ring-2 ring-gray-200"></div>
                        <div id="right-inset-1" className="absolute z-2 -bottom-3 -right-3 w-6 h-6 inset-bg rounded-full ring-2 ring-gray-200"></div>
                        <div id="left-inset-cover-1" className="absolute z-2 -bottom-4 -left-5 w-5 h-8 inset-bg"></div>
                        <div id="right-inset-cover-1" className="absolute z-2 -bottom-4 -right-5 w-5 h-8 inset-bg rounded-full"></div>
                    </div>
                    <div className="relative flex flex-col border-t-2 border-dashed p-5 gap-5">
                        <div className="flex justify-between md:text-xl text-md">
                            <p>Date</p>
                            <b>{dayjs(checkoutdata.data.transaction.createdAt).format('DD MMMM YYYY, HH:mm')}</b>
                        </div>

                        <div className="flex justify-between md:text-xl text-md">
                            <p>Payment Method</p>
                            <b>{checkoutdata.data.transaction.paymentMethod}</b>
                        </div>

                        <div className="flex justify-between md:text-xl text-md">
                            <p>Price</p>
                            <b>Rp{checkoutdata.data.transaction.pricing.subtotal.toLocaleString('id-ID')}</b>
                        </div>

                        <div className="flex justify-between md:text-xl text-md">
                            <p>Delivery Fee</p>
                            <b>Rp{checkoutdata.data.transaction.pricing.deliveryFee.toLocaleString('id-ID')}</b>
                        </div>

                        <div className="flex justify-between md:text-xl text-md">
                            <p>Service Fee</p>
                            <b>Rp{checkoutdata.data.transaction.pricing.serviceFee.toLocaleString('id-ID')}</b>
                        </div>

                        <div id="left-inset-2" className="absolute z-2 -bottom-3 -left-3 w-6 h-6 inset-bg rounded-full ring-2 ring-gray-200"></div>
                        <div id="right-inset-2" className="absolute z-2 -bottom-3 -right-3 w-6 h-6 inset-bg rounded-full ring-2 ring-gray-200"></div>
                        <div id="left-inset-cover-2" className="absolute z-2 -bottom-4 -left-5 w-5 h-8 inset-bg"></div>
                        <div id="right-inset-cover-2" className="absolute z-2 -bottom-4 -right-5 w-5 h-8 inset-bg rounded-full"></div>
                    </div>
                    <div className="flex flex-col relative border-t-2 border-dashed p-5 gap-3">

                        <div className="flex justify-between md:text-xl text-md font-bold">
                            <p>Total</p>
                            <b>Rp{checkoutdata.data.transaction.pricing.totalPrice.toLocaleString('id-ID')}</b>
                        </div>

                        <Button asChild className="rounded-full md:text-lg text-md font-bold w-full h-[48px]">
                            <a href="/profile?orders">See My Order</a>
                        </Button>
                    </div>
                </Card>

            </div>
        </div>
    )
}


export default CheckoutSuccess;