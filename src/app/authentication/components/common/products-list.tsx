// src/app/authentication/components/common/products-list.tsx

"use client";

import { productTable, productVariantTable } from "@/db/schema";

import ProductItem from "./product-item";

interface ProductListProps {
  title: string;
  products: (typeof productTable.$inferSelect & {
    variants: (typeof productVariantTable.$inferSelect)[];
  })[];
}

const ProductList = ({ title, products }: ProductListProps) => {
  return (
    <div className="space-y-6">
      <h3 className="font-semibold px-5">{title}</h3>
      {/* CORREÇÃO APLICADA AQUI: Adicionado "py-4" */}
      <div className="flex gap-4 overflow-x-auto py-4 [&::-webkit-scrollbar]:hidden px-5">
        {products.map((product) => (
          <ProductItem key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
};

export default ProductList;