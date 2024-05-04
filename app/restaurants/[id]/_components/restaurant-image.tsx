"use client";

import Image from "next/image";
import { Button } from "@/app/_components/ui/button";
import { Restaurant, UserFavoriteRestaurant } from "@prisma/client";
import { ChevronLeftIcon, HeartIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { toggleFavoriteRestaurant } from "@/app/_actions/restaurants";

interface RestaurantImageProps {
  restaurant: Pick<Restaurant, "name" | "imageUrl" | "id">;
  userId?: string;
  favoritesRestaurants?: UserFavoriteRestaurant[];
}

const RestaurantImage = ({
  restaurant,
  userId,
  favoritesRestaurants,
}: RestaurantImageProps) => {
  const isFavorite = favoritesRestaurants?.some(
    (fav) => fav.restaurantId === restaurant.id,
  );
  const handleFavoriteClick = async () => {
    if (!userId) return;
    try {
      await toggleFavoriteRestaurant(userId, restaurant.id);
      toast.success(
        isFavorite
          ? "Restaurante removido dos favoritos."
          : "Você tem um novo restaurante favorito!",
      );
    } catch (error) {
      toast.error("Erro ao favoritar restaurante.");
    }
  };
  const router = useRouter();
  const handleBackClick = () => router.back();
  return (
    <div className="relative h-[250px] w-full">
      <Image
        src={restaurant.imageUrl}
        alt={restaurant.name}
        fill
        className="object-cover"
      />
      <Button
        className="absolute left-2 top-2 rounded-full bg-white text-foreground hover:text-white"
        size="icon"
        onClick={handleBackClick}
      >
        <ChevronLeftIcon />
      </Button>
      {userId && (
        <Button
          size="icon"
          className={`absolute right-2 top-2 h-7 w-7 rounded-full bg-gray-700 ${isFavorite && "bg-primary hover:bg-gray-700"}`}
          onClick={handleFavoriteClick}
        >
          <HeartIcon size={16} className="fill-white" />
        </Button>
      )}
    </div>
  );
};

export default RestaurantImage;
