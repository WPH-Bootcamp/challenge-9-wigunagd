import { useState } from "react";
import { Button } from "./ui/button";
import { useDelCart, useUpdateCartItem } from "@/pages/cart/hooksCart";
import { useAppSelector } from "@/services/api/redux";

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

interface ICartItemCardMenuProps {
    item: ICartItemProps;
    isCheckout: boolean;
}

export const CartItemCardMenu = ({ isCheckout, item }: ICartItemCardMenuProps) => {
    const [itemQty, setItemQty] = useState(item.quantity);
    const { mutate: mutateUpdate } = useUpdateCartItem();
    const { mutate: mutateDel } = useDelCart();
    const cartCountState = useAppSelector((cartState) => cartState.cartCount);


    const handleItemQty = (increment: 1 | -1) => {
        const newQty = itemQty + increment;
        setItemQty(newQty);

        if (newQty >= 1) {
            mutateUpdate({
                cartItemId: item.id,
                quantity: newQty
            }, {
                onError: () => {
                    const itemInCart = cartCountState.itemsInCart.find(item => item.menu.id === item.id);
                    setItemQty(itemInCart?.quantity ?? item.quantity);
                }
            });
        } else {
            mutateDel({
                id: item.id
            });
        }
    }

    return (
        <div className="flex justify-between items-center py-2">
            <div className={`flex ${!isCheckout? 'w-1/2' : 'w-full'} items-center gap-3`}>
                <div className="flex w-[80px] h-[80px] rounded-2xl shrink-0">
                    <img
                        className="object-cover w-full h-full rounded-2xl"
                        src={item.menu.image}
                        alt={item.id.toString()}
                    />
                </div>

                <div>
                    <p>{item.menu.foodName}</p>
                    <b>Rp{item.menu.price.toLocaleString('id-ID')}</b>
                </div>
            </div>

            {!isCheckout && (
                <div className={`flex w-1/2 gap-5 items-center justify-end`}>
                    <Button
                        onClick={() => handleItemQty(-1)}
                        variant="outline"
                        className="rounded-full w-[36px] text-3xl"
                    >
                        -
                    </Button>
                    <p className="text-center font-bold w-6">{item.quantity}</p>
                    <Button
                        onClick={() => handleItemQty(1)}
                        className="rounded-full w-[36px] text-3xl"
                    >
                        +
                    </Button>
                </div>
            )}

        </div>
    );
};