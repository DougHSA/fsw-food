import { notFound } from "next/navigation";
import { db } from "../../_lib/prisma";
import RestaurantImage from "./_components/restaurant-image";
import RestaurantDetails from "./_components/restaurant-details";
import CartBanner from "./_components/cart-banner";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/_lib/auth-options";

interface RestaurantPageProps {
  params: {
    id: string;
  };
}

const RestaurantPage = async ({ params: { id } }: RestaurantPageProps) => {
  const session = await getServerSession(authOptions);
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
  const favoriteRestaurants = await db.userFavoriteRestaurant.findMany({
    where: { userId: session?.user.id },
  });
  if (!restaurant) {
    return notFound();
  }
  return (
    <div>
      <RestaurantImage
        restaurant={restaurant}
        userId={session?.user.id}
        favoritesRestaurants={favoriteRestaurants}
      />
      <RestaurantDetails restaurant={JSON.parse(JSON.stringify(restaurant))} />
      <CartBanner restaurantId={restaurant.id} />
    </div>
  );
};

export default RestaurantPage;
