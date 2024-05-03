import { Category } from "@prisma/client";
import CategoryItem from "./category-item";
import Link from "next/link";

interface CategoryListProps {
  categories: Category[];
}

const CategoryList = async ({ categories }: CategoryListProps) => {
  return (
    <div className="flex gap-4 overflow-x-scroll pb-1 [&::-webkit-scrollbar]:hidden">
      {categories.map((category) => (
        <Link key={category.id} href={`/categories/${category.id}/products`}>
          <CategoryItem key={category.id} category={category} />
        </Link>
      ))}
    </div>
  );
};

export default CategoryList;
