import Header from "@/app/_components/header";
import RestaurantItem from "@/app/_components/restaurant-item";
import { authOptions } from "@/app/_lib/auth-options";
import { db } from "@/app/_lib/prisma";
import { getServerSession } from "next-auth";

const RecommendedRestaurants = async () => {
  const session = await getServerSession(authOptions);
  const restaurants = await db.restaurant.findMany({});
  const favoriteRestaurants = await db.userFavoriteRestaurant.findMany({
    where: { userId: session?.user.id },
  });
  return (
    <>
      <Header />
      <div className="px-5 py-6">
        <h2 className="mb-6 text-lg font-semibold">
          Restaurantes Recomendados
        </h2>
        <div className="flex w-full flex-col gap-6">
          {restaurants.map((restaurant) => (
            <RestaurantItem
              key={restaurant.id}
              restaurant={restaurant}
              className="min-w-full max-w-full"
              favoritesRestaurants={favoriteRestaurants}
            />
          ))}
        </div>
      </div>
    </>
  );
};

export default RecommendedRestaurants;
