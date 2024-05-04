import { getServerSession } from "next-auth";
import { authOptions } from "../_lib/auth-options";
import { db } from "../_lib/prisma";
import Header from "../_components/header";
import RestaurantItem from "../_components/restaurant-item";

const MyFavoriteRestaurants = async () => {
  const session = await getServerSession(authOptions);
  const favoriteRestaurants = await db.userFavoriteRestaurant.findMany({
    where: {
      userId: session?.user.id,
    },
    include: {
      restaurant: true,
    },
  });
  return (
    <>
      <Header />
      <div className="px-5 py-6">
        <h2 className="mb-6 text-lg font-semibold">Restaurantes Favoritos</h2>
        <div className="flex w-full flex-col gap-6">
          {favoriteRestaurants.length > 0 ? (
            favoriteRestaurants.map((fav) => (
              <RestaurantItem
                key={fav.restaurantId}
                restaurant={fav.restaurant}
                className="min-w-full max-w-full"
                favoritesRestaurants={favoriteRestaurants}
              />
            ))
          ) : (
            <h3 className="font-medium">
              Você não possui restaurantes favoritos.
            </h3>
          )}
        </div>
      </div>
    </>
  );
};

export default MyFavoriteRestaurants;
