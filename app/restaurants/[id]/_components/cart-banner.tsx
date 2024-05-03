"use client";

import Cart from "@/app/_components/cart";
import { Button } from "@/app/_components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/app/_components/ui/sheet";
import { CartContext } from "@/app/_context/cart";
import { formatCurrency } from "@/app/_helpers/price";
import { useContext, useState } from "react";

interface CartBannerProps {
  restaurantId: string;
}

const CartBanner = ({ restaurantId }: CartBannerProps) => {
  const [isCartOpen, setIsCartOpen] = useState(false);
  const { products, totalPrice, totalQuantity } = useContext(CartContext);
  const restaurantHasProductOnCart = products.some(
    (product) => product.restaurantId === restaurantId,
  );
  if (!restaurantHasProductOnCart) return null;
  return (
    <div className="fixed bottom-0 left-0 z-50 w-full border-t border-solid border-muted bg-white p-5 pt-3 shadow-md">
      <div className="flex items-center justify-between">
        <div>
          <span className="text-xs text-muted-foreground">
            Total sem entrega
          </span>
          <h3 className="font-semibold">
            {formatCurrency(totalPrice)}
            <span className="text-xs font-normal text-muted-foreground">
              {" "}
              / {totalQuantity} {totalQuantity === 1 ? "item" : "itens"}
            </span>
          </h3>
        </div>
        <Button onClick={() => setIsCartOpen(true)}>Ver Sacola</Button>
        <Sheet open={isCartOpen} onOpenChange={setIsCartOpen}>
          <SheetContent className="w-[90vw]">
            <SheetHeader>
              <SheetTitle>Sacola</SheetTitle>
            </SheetHeader>
            <Cart setIsOpen={setIsCartOpen} />
          </SheetContent>
        </Sheet>
      </div>
    </div>
  );
};

export default CartBanner;
