import { Suspense } from "react";
import Restaurants from "./_components/restaurants";

const RestaurantsPage = async () => {
  return (
    <Suspense>
      <Restaurants />
    </Suspense>
  );
};

export default RestaurantsPage;
