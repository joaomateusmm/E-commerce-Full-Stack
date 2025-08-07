// product-item.tsx

import Image from "next/image";
import Link from "next/link";

import { productTable, productVariantTable } from "@/db/schema";
import { formatCentsToBRL } from "@/helpers/money";

interface ProductItemProps {
  product: typeof productTable.$inferSelect & {
    variants: (typeof productVariantTable.$inferSelect)[];
  };
}

const ProductItem = ({ product }: ProductItemProps) => {
  const firstVariant = product.variants?.[0];

  // ADICIONADO: Debug para vermos a URL exata no console do navegador
  console.log(
    `Renderizando produto: ${product.name}, URL:`,
    firstVariant?.imageUrl,
  );

  if (!firstVariant || !firstVariant.imageUrl) {
    return null;
  }

  return (
    <Link href="/" className="flex w-[155px] flex-col gap-4">
      <div className="relative flex w-full items-center justify-center rounded-lg">
        <Image
          src={firstVariant.imageUrl} // Agora deve receber uma URL limpa
          alt={firstVariant.name || product.name}
          width={200}
          height={200}
          sizes="100vw"
          className="rounded-3xl shadow-md"
          style={{ objectFit: "contain" }}
        />
      </div>

      <div className="flex flex-col gap-1">
        <p className="truncate text-sm font-medium">{product.name}</p>
        <p className="text-muted-foreground truncate text-xs font-medium">
          {product.description}
        </p>
        <p className="truncate text-sm font-semibold">
          {formatCentsToBRL(firstVariant.priceInCents)}
        </p>
      </div>
    </Link>
  );
};

export default ProductItem;
