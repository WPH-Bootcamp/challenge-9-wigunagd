import { Card, CardFooter, CardHeader } from "@/components/ui/card"
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { Button } from "./ui/button";
import { useEffect, useState } from "react";
import { useUpdateCartItem } from "@/pages/cart/hooksCart";
import { useAppSelector } from "@/services/api/redux";

interface IMenuCardProps {
    cartItemId: number;
    menuId: number;
    menuName: string;
    menuPrice: number;
    menuType: string;
    menuImage: string;
    qtyinCart: number;
    selectedCategoryState: string;
    buttonOnAddFunc: () => void;
}

export const MenuCard = ({ cartItemId, menuId, menuName, menuPrice, menuType, qtyinCart, menuImage, selectedCategoryState, buttonOnAddFunc }: IMenuCardProps) => {
    const [itemQty, setItemQty] = useState(qtyinCart);
    const { mutate: mutateUpdate } = useUpdateCartItem();
    const cartCountState = useAppSelector((cartState) => cartState.cartCount);

    useEffect(() => {
        setItemQty(qtyinCart);
    }, [qtyinCart]);

    const handleItemQty = (increment: 1 | -1) => {
        const newQty = itemQty + increment;
        setItemQty(newQty);

        if (itemQty >= 0) {
            mutateUpdate({
                cartItemId: cartItemId,
                quantity: newQty
            }, {
                onError: () => {
                    const itemInCart = cartCountState.itemsInCart.find(item => item.menu.id === cartItemId);
                    setItemQty(itemInCart?.quantity ?? qtyinCart);
                }
            });
        }
    }

    return (
        <Card id={cartItemId.toString()} className={`
            p-0 flex flex-col h-full /* 1. Force full height & flex column */
            ${(selectedCategoryState === "" || selectedCategoryState === menuType) ? 'block' : 'hidden'}
        `}>
            <CardHeader className="p-0">
                <AspectRatio className="p-0" ratio={1 / 1}>
                    <img src={menuImage} alt={menuName} className="object-cover w-full h-full rounded-t-xl" />
                </AspectRatio>
            </CardHeader>
            <CardFooter className="flex-1 flex md:flex-row md:items-center flex-col justify-between p-4">
                <div className="md:w-1/2 w-full mb-2">
                    <p className="font-medium leading-tight line-clamp-2 min-h-[3rem] md:line-clamp-none md:min-h-0">
                        {menuName}
                    </p>
                    <b>Rp {menuPrice.toLocaleString('id-ID')}</b>
                </div>

                <div className="md:w-1/2 w-full flex md:justify-end">
                    {itemQty === 0 && (
                        <Button
                            id="btnadddesktop"
                            onClick={buttonOnAddFunc}
                            className="rounded-full w-full md:max-w-[79px] md:right-0"
                            value={menuId}
                        >
                            Add
                        </Button>
                    )}

                    {itemQty > 0 && (
                        <div className="grid grid-cols-3 items-center justify-between">
                            <Button
                                variant={'outline'}
                                onClick={() => handleItemQty(-1)}
                                className="rounded-full w-[36px] text-3xl"
                            >
                                -
                            </Button>
                            <p className="text-center">{itemQty}</p>
                            <Button
                                onClick={() => handleItemQty(1)}
                                className="rounded-full w-[36px] text-3xl"
                            >
                                +
                            </Button>
                        </div>
                    )}
                </div>
            </CardFooter>
        </Card>
    )
}