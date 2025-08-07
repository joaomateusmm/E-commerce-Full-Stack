import { eq } from "drizzle-orm";
import Image from "next/image";
import { notFound } from "next/navigation";

import ProductList from "@/app/authentication/components/common/products-list";
import Footer from "@/components/common/footer";
import { Header } from "@/components/common/header";
import { Button } from "@/components/ui/button";
import { db } from "@/db";
import { productTable, productVariantTable } from "@/db/schema";
import { formatCentsToBRL } from "@/helpers/money";

import QuantitySelector from "./components/quantity-selector";
// import { formatCentsToBRL } from "@/helpers/money";
// import ProductActions from "./components/product-actions";
import VariantSelector from "./components/variant-selector";

interface ProductVariantPageProps {
  params: Promise<{ slug: string }>;
}

const ProductVariantPage = async ({ params }: ProductVariantPageProps) => {
  const { slug } = await params;
  const productVariant = await db.query.productVariantTable.findFirst({
    where: eq(productVariantTable.slug, slug),
    with: {
      product: {
        with: {
          variants: true,
        },
      },
    },
  });
  if (!productVariant) {
    return notFound();
  }
  const likelyProducts = await db.query.productTable.findMany({
    where: eq(productTable.categoryId, productVariant.product.categoryId),
    with: {
      variants: true,
    },
  });
  return (
    <>
      <Header />
      <div className="flex flex-col space-y-6 px-5">
        <Image
          src={productVariant.imageUrl}
          alt={productVariant.name}
          sizes="100vw"
          height={0}
          width={0}
          className="mt-25 h-auto w-full rounded-2xl object-cover drop-shadow-lg"
        />

        <div className="px-5">
          <div className="">
            <VariantSelector
              selectedVariantSlug={productVariant.slug}
               variants={productVariant.product.variants}
            />
          </div>
        </div>

        <div className="px-5">
          {/* DESCRIÇÃO */}
          <h2 className="text-lg font-semibold">
            {productVariant.product.name}
          </h2>
          <h3 className="text-muted-foreground text-sm">
            {productVariant.name}
          </h3>
          <h3 className="text-lg font-semibold">
            {formatCentsToBRL(productVariant.priceInCents)}
          </h3>
        </div>

        <div className="px-5">
          <QuantitySelector />
        </div>

        <div className="flex flex-col gap-5 px-3">
          <Button
            size="lg"
            className="text-md cursor-pointer rounded-full py-6 font-semibold duration-300 hover:scale-[1.02] hover:active:scale-95"
          >
            Comprar Agora
          </Button>
          <Button
            variant="outline"
            className="cursor-pointer rounded-full py-5 font-semibold duration-300 hover:scale-[1.02] hover:active:scale-95"
          >
            Adicionar ao Carinho
          </Button>
        </div>

        <div className="px-5">
          <p className="text-sm">{productVariant.product.description}</p>
        </div>
      </div>

      <div className="mb-5 pl-5">
        <h2 className="mx-5 mt-25 mb-[-22px] font-semibold">
          Produtos que você pode gostar
        </h2>
        <ProductList title="" products={likelyProducts} />
      </div>

      <div>
        <Footer />
      </div>
    </>
  );
};

export default ProductVariantPage;
