import { desc } from "drizzle-orm";
import Image from "next/image";

import CategorySelector from "@/components/common/category-selector";
import { db } from "@/db";
import { productTable } from "@/db/schema";

import { Header } from "./authentication/components/common/header";
import ProductList from "./authentication/components/common/products-list";
import Footer from "@/components/common/footer";

const Home = async () => {
  const products = await db.query.productTable.findMany({
    with: {
      variants: true,
    },
  });
  const newlyCreatedProducts = await db.query.productTable.findMany({
    orderBy: [desc(productTable.createdAt)],
    with: {
      variants: true,
    },
  });

  const categories = await db.query.categoryTable.findMany({});
  return (
    <>
      <Header />
      <div className="space-y-6">
        <div className="my-5 px-5">
          <Image
            src="/banner01.png"
            alt="Leve uma vida com estilo"
            height={0}
            width={0}
            sizes="100vw"
            className="h-auto w-full rounded-4xl shadow-lg"
          />
        </div>

        <ProductList products={products} title="Mais vendidos" />

        <div className="p-5">
          <CategorySelector categories={categories} />
        </div>

        <div className="px-5">
          <Image
            src="/banner02.png"
            alt="Leve uma vida com estilo"
            height={0}
            width={0}
            sizes="100vw"
            className="h-auto w-full rounded-4xl shadow-lg"
          />
        </div>

        <ProductList products={newlyCreatedProducts} title="Novidades" />
        <Footer />
      </div>
    </>
  );
};

export default Home;
