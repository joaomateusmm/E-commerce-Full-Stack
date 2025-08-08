import { icons, MinusIcon, PlusIcon, TrashIcon } from "lucide-react";
import Image from "next/image";
import { format } from "path";

import { formatCentsToBRL } from "@/helpers/money";

import { Button } from "../ui/button";

interface CartItemProps {
  id: string;
  productName: string;
  productVariantName: string;
  productVariantImageUrl: string;
  productVariantPriceInCents: number;
  quantity: number;
}

const CartItem = ({
  id,
  productName,
  productVariantName,
  productVariantImageUrl,
  productVariantPriceInCents,
  quantity,
}: CartItemProps) => {
  return (
    <div className="flex items-center justify-between">
      <div className="flex items-center gap-4">
        <Image
          src={productVariantImageUrl}
          alt={productVariantName}
          width={78}
          height={78}
          className="rounded-lg drop-shadow-md"
        />
        <div className="flex flex-col gap-1">
          <p className="text-sm font-semibold">{productName}</p>
          <p className="text-muted-foreground text-xs font-medium">
            {productVariantName}
          </p>
          <div className="flex w-[100px] items-center justify-between rounded-lg border bg-gray-50/50 p-1 drop-shadow-md">
            <Button className="h-4 w-4" variant="ghost" onClick={() => {}}>
              <MinusIcon />
            </Button>
            <p>{quantity}</p>
            <Button className="h-4 w-4" variant="ghost" onClick={() => {}}>
              <PlusIcon />
            </Button>
          </div>
        </div>
      </div>
      <div>
        <div className="flex flex-col items-end justify-center space-y-3">
          <Button
            className="cursor-pointer drop-shadow-md hover:scale-[1.05px] hover:bg-red-500"
            variant="outline"
            size="icon"
          >
            <TrashIcon />
          </Button>
          <p className="text-sm font-bold">
            {formatCentsToBRL(productVariantPriceInCents)}
          </p>
        </div>
      </div>
    </div>
  );
};

export default CartItem;
