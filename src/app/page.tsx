import Image from "next/image";

import { db } from "@/db";

import { Header } from "./authentication/components/common/header";
import ProductList from "./authentication/components/common/products-list";

const Home = async () => {
  const products = await db.query.productTable.findMany({
    with: {
      variants: true,
    },
  });
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
      </div>
    </>
  );
};

export default Home;
