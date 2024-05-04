import { notFound } from "next/navigation";
import { db } from "../../_lib/prisma";
import RestaurantImage from "./_components/restaurant-image";
import RestaurantDetails from "./_components/restaurant-details";
import CartBanner from "./_components/cart-banner";
import { getServerSession } from "next-auth";

interface RestaurantPageProps {
  params: {
    id: string;
  };
}

const RestaurantPage = async ({ params: { id } }: RestaurantPageProps) => {
  const session = await getServerSession();
  const restaurant = await db.restaurant.findUnique({
    where: {
      id,
    },
    include: {
      categories: {
        include: {
          products: {
            include: {
              restaurant: {
                select: {
                  name: true,
                },
              },
            },
          },
        },
      },
      products: {
        include: {
          restaurant: true,
        },
      },
    },
  });
  if (!restaurant) {
    return notFound();
  }
  return (
    <div>
      <RestaurantImage restaurant={restaurant} userId={session?.user.id} />
      <RestaurantDetails restaurant={restaurant} />
      <CartBanner restaurantId={restaurant.id} />
    </div>
  );
};

export default RestaurantPage;
