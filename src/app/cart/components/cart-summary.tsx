import { Separator } from "@radix-ui/react-separator";
import Image from "next/image";
import React from "react";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { formatCentsToBRL } from "@/helpers/money";

interface CartSummaryProps {
  subtotalInCents: number;
  totalInCents: number;
  products: Array<{
    id: string;
    name: string;
    variantName: string;
    quantity: number;
    priceInCents: number;
    imageUrl: string;
  }>;
}

const CartSummary = ({
  subtotalInCents,
  totalInCents,
  products,
}: CartSummaryProps) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Resumo</CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        {products.map((product) => (
          <div className="flex items-center justify-between" key={product.id}>
            <div className="flex items-center gap-4">
              <Image
                src={product.imageUrl}
                alt={product.name}
                width={78}
                height={78}
                className="rounded-lg drop-shadow-md"
              />
              <div className="flex flex-col gap-1">
                <p className="text-sm font-semibold">{product.name}</p>
                <p className="text-muted-foreground text-xs font-medium">
                  {product.variantName}
                </p>
                <p className="text-muted-foreground text-xs font-medium">{product.quantity}</p>
              </div>
            </div>
            <Separator />
            <div className="flex flex-col items-end justify-center space-y-3">
              <p className="text-sm font-bold">
                {formatCentsToBRL(product.priceInCents)}
              </p>
            </div>
          </div>
        ))}
        <div className="mt-8 space-y-3">
          <div className="flex justify-between">
            <p className="text-sm">Subtotal</p>
            <p className="text-muted-foreground text-sm font-medium">
              {formatCentsToBRL(subtotalInCents)}
            </p>
          </div>
          <div className="flex justify-between">
            <p className="text-sm">Frete</p>
            <p className="text-muted-foreground text-sm font-medium">GRATÍS</p>
          </div>
          <div className="flex justify-between">
            <p className="text-sm">Total</p>
            <p className="text-muted-foreground text-sm font-medium">
              {formatCentsToBRL(totalInCents)}
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default CartSummary;
