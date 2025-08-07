// src/app/categories/[slug]/page.tsx

import { eq } from "drizzle-orm";
import { notFound } from "next/navigation";

import { Header } from "@/app/authentication/components/common/header";
import ProductItem from "@/app/authentication/components/common/product-item";
import Footer from "@/components/common/footer";
import { db } from "@/db";
import { categoryTable, productTable } from "@/db/schema";

interface CategoryPageProps {
  params: { slug: string };
}

const CategoryPage = async ({ params }: CategoryPageProps) => {
  const { slug } = params;

  const category = await db.query.categoryTable.findFirst({
    where: eq(categoryTable.slug, slug),
  });

  if (!category) {
    return notFound();
  }

  const products = await db.query.productTable.findMany({
    where: eq(productTable.categoryId, category.id),
    with: {
      variants: true,
    },
  });

  return (
    <div className="flex min-h-screen flex-col">
      <div className="flex-grow">
        <div className="flex flex-col gap-8 p-5">
          <Header />

          <div className="mx-auto mt-20">
            <h2 className="mb-5 text-lg font-bold uppercase">
              {category.name}
            </h2>

            <div className="grid grid-cols-2 gap-8 sm:grid-cols-3 md:grid-cols-4">
              {products.map((product) => (
                <ProductItem key={product.id} product={product} />
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="">
        <Footer />
      </div>
    </div>
  );
};

export default CategoryPage;
