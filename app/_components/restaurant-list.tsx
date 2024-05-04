import { Restaurant } from "@prisma/client";
import RestaurantItem from "./restaurant-item";
import { getServerSession } from "next-auth";
import { db } from "../_lib/prisma";
import { authOptions } from "../_lib/auth-options";

interface RestaurantListProps {
  restaurants: Restaurant[];
}

const RestaurantList = async ({ restaurants }: RestaurantListProps) => {
  const session = await getServerSession(authOptions);
  const favoritesRestaurants = await db.userFavoriteRestaurant.findMany({
    where: {
      userId: session?.user.id,
    },
  });
  return (
    <div className="flex gap-4 overflow-x-scroll px-5 [&::-webkit-scrollbar]:hidden">
      {restaurants.map((restaurant) => (
        <RestaurantItem
          key={restaurant.id}
          restaurant={restaurant}
          favoritesRestaurants={favoritesRestaurants}
        />
      ))}
    </div>
  );
};

export default RestaurantList;
