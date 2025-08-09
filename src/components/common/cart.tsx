"use client";

import { ScrollArea } from "@radix-ui/react-scroll-area";
import { Separator } from "@radix-ui/react-separator";
import { ShoppingBasketIcon } from "lucide-react";
import Link from "next/link";

import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { formatCentsToBRL } from "@/helpers/money";
import { useCart } from "@/hooks/queries/use-cart";

import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "../ui/sheet";
import CartItem from "./cart-item";

const CartSkeleton = () => {
  return (
    <div className="flex h-full flex-col gap-14 px-5 pb-6">
      {Array.from({ length: 3 }).map((_, index) => (
        <div key={index} className="flex items-center gap-4">
          <Skeleton className="h-24 w-24 rounded-lg" />
          <div className="flex w-full flex-col gap-2">
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-1/2" />
            <Skeleton className="mt-2 h-6 w-1/4" />
          </div>
        </div>
      ))}
    </div>
  );
};

export const Cart = () => {
  const { data: cart, isPending } = useCart();

  const cartTotalInCents =
    cart?.items.reduce(
      (acc, item) => acc + item.productVariant.priceInCents * item.quantity,
      0,
    ) ?? 0;

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button
          variant="outline"
          size="icon"
          className="cursor-pointer border-[1.5px] bg-transparent text-gray-800 drop-shadow-sm duration-200 hover:scale-[1.05] hover:bg-gray-50/10 hover:text-black"
        >
          <ShoppingBasketIcon />
        </Button>
      </SheetTrigger>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>Carrinho</SheetTitle>
        </SheetHeader>

        {isPending ? (
          <CartSkeleton />
        ) : (
          <div className="flex h-full flex-col px-5 pb-6">
            <div className="flex h-full max-h-full flex-col overflow-auto">
              <ScrollArea className="h-full">
                <div className="flex h-full flex-col gap-14">
                  {cart?.items.length === 0 ? (
                    <p className="pt-8 text-center text-sm text-gray-500">
                      Seu carrinho está vazio.
                    </p>
                  ) : (
                    cart?.items.map((item) => (
                      <CartItem
                        key={item.id}
                        id={item.id}
                        productVariantId={item.productVariantId}
                        productName={item.productVariant.product.name}
                        productVariantName={item.productVariant.name}
                        productVariantImageUrl={item.productVariant.imageUrl}
                        productVariantPriceInCents={
                          item.productVariant.priceInCents
                        }
                        quantity={item.quantity}
                      />
                    ))
                  )}
                </div>
              </ScrollArea>
            </div>

            {cart?.items && cart?.items.length > 0 && (
              <div className="scrollbar-none mt-auto flex flex-col gap-6 border-t border-t-gray-300 pt-6 [&::-webkit-scrollbar]:hidden">
                <div className="flex items-center justify-between text-xs font-medium">
                  <p>Subtotal</p>
                  <p className="font-bold">
                    {formatCentsToBRL(cartTotalInCents)}
                  </p>
                </div>

                <div className="flex items-center justify-between text-xs font-medium">
                  <p>Entrega</p>
                  <p className="font-bold">GRÁTIS</p>
                </div>

                <Separator />

                <div className="flex items-center justify-between text-sm font-bold">
                  <p>Total</p>
                  <p className="text-lg font-bold">
                    {formatCentsToBRL(cartTotalInCents)}
                  </p>
                </div>

                <Button
                  className="mt-2 rounded-full py-6 hover:scale-[1.02]"
                  asChild
                >
                  <Link href="/cart/identification">Finalizar compra</Link>
                </Button>
              </div>
            )}
          </div>
        )}
      </SheetContent>
    </Sheet>
  );
};
