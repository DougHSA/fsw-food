import { redirect } from "next/navigation";
import { authOptions } from "../_lib/auth-options";
import { db } from "../_lib/prisma";
import { getServerSession } from "next-auth";
import Header from "../_components/header";
import OrderItem from "./_components/order-item";

const MyOrdersPage = async () => {
  const session = await getServerSession(authOptions);
  if (!session?.user) return redirect("/");
  const orders = await db.order.findMany({
    where: {
      userId: session?.user.id,
    },
    include: {
      restaurant: true,
      orderProducts: {
        include: {
          product: true,
        },
      },
    },
    orderBy: {
      createdAt: "desc",
    },
  });
  return (
    <>
      <Header />
      <div className="px-5 py-6">
        <h2 className="pb-6 text-lg font-semibold">Meus Pedidos</h2>
        <div className="space-y-4">
          {orders.map((orderItem) => (
            <OrderItem key={orderItem.id} order={orderItem} />
          ))}
        </div>
      </div>
    </>
  );
};

export default MyOrdersPage;
