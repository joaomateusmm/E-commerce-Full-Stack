// 1. Importar o componente Link do Next.js
import Link from "next/link"; 

import { categoryTable } from "@/db/schema";

import { Button } from "../ui/button";

interface CategorySelectorProps {
  categories: (typeof categoryTable.$inferSelect)[];
}

const CategorySelector = ({ categories }: CategorySelectorProps) => {
  return (
    <div className="rounded-3xl bg-[#F4EFFF] p-6">
      <div className="grid grid-cols-2 gap-3">
        {categories.map((category) => (
          <Link key={category.id} href={`/category/${category.slug}`}>
            <Button
              variant="ghost"
              className="w-full cursor-pointer rounded-full text-xs font-bold bg-white py-6 shadow-md"
            >
              {category.name}
            </Button>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default CategorySelector;