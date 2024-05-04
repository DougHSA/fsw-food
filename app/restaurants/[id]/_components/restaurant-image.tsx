"use client";

import Image from "next/image";
import { Button } from "@/app/_components/ui/button";
import { Restaurant } from "@prisma/client";
import { ChevronLeftIcon, HeartIcon } from "lucide-react";
import { useRouter } from "next/navigation";

interface RestaurantImageProps {
  restaurant: Pick<Restaurant, "name" | "imageUrl">;
  userId?: string;
}

const RestaurantImage = ({ restaurant, userId }: RestaurantImageProps) => {
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
          className="absolute right-4 top-4 rounded-full bg-gray-700"
        >
          <HeartIcon size={20} className="fill-white" />
        </Button>
      )}
    </div>
  );
};

export default RestaurantImage;
