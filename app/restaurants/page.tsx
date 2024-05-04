import { Suspense } from "react";
import Restaurants from "./_components/restaurants";
import { getServerSession } from "next-auth";
import { authOptions } from "../_lib/auth-options";
import { db } from "../_lib/prisma";

const RestaurantsPage = async () => {
  const session = await getServerSession(authOptions);
  console.log(session);
  const favoriteRestaurants = await db.userFavoriteRestaurant.findMany({
    where: { userId: session?.user.id },
  });
  return (
    <Suspense>
      <Restaurants favoriteRestaurants={favoriteRestaurants} />
    </Suspense>
  );
};

export default RestaurantsPage;
