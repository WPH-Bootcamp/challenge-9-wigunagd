import { FaBagShopping } from "react-icons/fa6";
import { Button } from "@/components/ui/button";

interface ICartSummaryProps {
    jmlItemSummary?: number;
    totalSummary?: number;
}

const CartSummaryBottomNav = ({jmlItemSummary, totalSummary} : ICartSummaryProps) => {
    return (
        <div className="w-full h-[80px] bottom-0 fixed z-50 bg-white">
            <div className="flex w-full py-5 max-w-[1440px] mx-auto justify-between md:px-0 px-3">
                <div className="w-1/2">
                    <p className="flex">
                        <FaBagShopping className="text-lg mr-2" />
                        {(jmlItemSummary ?? 0)} Items
                    </p>
                    <b>Rp{(totalSummary ?? 0).toLocaleString('id-ID')}</b>
                </div>

                <Button asChild className="rounded-full md:w-full md:max-w-[230px] w-1/2 h-[44px]">
                    <a href="/cart">Checkout</a>
                </Button>
            </div>
        </div>
    );
}

export default CartSummaryBottomNav;