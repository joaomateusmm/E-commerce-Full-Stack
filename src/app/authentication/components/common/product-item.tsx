// src/app/authentication/components/common/product-item.tsx

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

  if (!firstVariant || !firstVariant.imageUrl) {
    return null;
  }

  return (
    <Link
      href={`/product-variant/${firstVariant.slug}`}
      className="group flex w-[155px] flex-col gap-4"
    >
      <div className="relative flex h-auto w-full items-center justify-center rounded-lg">
        <Image
          src={firstVariant.imageUrl}
          alt={firstVariant.name || product.name}
          width={200}
          height={200}
          sizes="100vw"
          className="h-auto w-full rounded-3xl object-contain shadow-md transition-transform duration-300 ease-in-out group-hover:translate-y-[-5px] group-hover:active:translate-y-[-5px]"
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
