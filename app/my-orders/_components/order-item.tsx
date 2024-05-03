"use client";

import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/app/_components/ui/avatar";
import { Button } from "@/app/_components/ui/button";
import { Card, CardContent } from "@/app/_components/ui/card";
import { Separator } from "@/app/_components/ui/separator";
import { CartContext } from "@/app/_context/cart";
import { formatCurrency } from "@/app/_helpers/price";
import { OrderStatus, Prisma } from "@prisma/client";
import { ChevronRightIcon, Link } from "lucide-react";
import { useRouter } from "next/navigation";
import { useContext } from "react";

interface OrderItemProps {
  order: Prisma.OrderGetPayload<{
    include: {
      restaurant: true;
      orderProducts: {
        include: {
          product: true;
        };
      };
    };
  }>;
}
const getOrderStatusLabel = (status: OrderStatus) => {
  switch (status) {
    case "CANCELED":
      return "Cancelado";
    case "COMPLETED":
      return "Finalizado";
    case "CONFIRMED":
      return "Confirmado";
    case "DELIVERING":
      return "Em transporte";
    case "PREPARING":
      return "Preparando";
    default:
      return "";
  }
};

const OrderItem = ({ order }: OrderItemProps) => {
  const { addProductToCart } = useContext(CartContext);

  const router = useRouter();

  const handleRedoOrderClick = () => {
    for (const orderProduct of order.orderProducts) {
      addProductToCart({
        product: { ...orderProduct.product, restaurant: order.restaurant },
        quantity: orderProduct.quantity,
      });
    }
    router.push(`/restaurants/${order.restaurantId}`);
  };
  return (
    <Card>
      <CardContent className="p-5">
        <div
          className={`w-fit rounded-full px-2 py-1 ${
            order.status === "COMPLETED"
              ? "bg-green-500 text-white"
              : order.status === "CANCELED"
                ? "bg-red-500 text-white"
                : "bg-[#EEEEEE] text-muted-foreground "
          }`}
        >
          <span className="block text-xs font-semibold">
            {getOrderStatusLabel(order.status)}
          </span>
        </div>
        <div className="flex items-center justify-between pt-3">
          <div className="flex items-center gap-2">
            <Avatar className="h-6 w-6">
              <AvatarImage
                src={order.restaurant.imageUrl}
                alt={order.restaurant.name}
              />
              <AvatarFallback>
                {order.restaurant.name[0].toUpperCase()}
                {order.restaurant.name[1].toUpperCase()}
              </AvatarFallback>
            </Avatar>
            <span className="text-sm font-semibold">
              {order.restaurant.name}
            </span>
          </div>
          <Button
            variant="link"
            size="icon"
            className="h-5 w-5 text-black"
            asChild
          >
            <Link href={`/restaurants/${order.restaurantId}`}>
              <ChevronRightIcon />
            </Link>
          </Button>
        </div>
        <div className="py-3">
          <Separator />
        </div>

        <div className="space-y-2">
          {order.orderProducts.map((product) => (
            <div key={product.id} className="flex items-center gap-2">
              <div className="flex h-5 w-5 items-center rounded-full bg-muted-foreground">
                <span className="block text-xs text-white">
                  {product.quantity}
                </span>
                <span className="block text-xs text-muted-foreground">
                  {product.product.name}
                </span>
              </div>
            </div>
          ))}
        </div>
        <div className="py-3">
          <Separator />
        </div>
        <div className="flex items-center justify-between">
          <p className="text-xs">{formatCurrency(Number(order.totalPrice))}</p>
          <Button
            variant="ghost"
            className="text-xs text-primary"
            size="sm"
            disabled={order.status !== "COMPLETED"}
            onClick={handleRedoOrderClick}
          >
            Refazer Pedido
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default OrderItem;
