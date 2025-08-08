"use client";

import { ScrollArea } from "@radix-ui/react-scroll-area";
import { Separator } from "@radix-ui/react-separator";
import { useQuery } from "@tanstack/react-query";
import { ShoppingBasketIcon } from "lucide-react";
import Image from "next/image";
import { format } from "path";

import { getCart } from "@/actions/get-cart";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton"; // Importação do Skeleton
import { formatCentsToBRL } from "@/helpers/money";

import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "../ui/sheet";
import CartItem from "./cart-item";

// --- O SKELETON ADICIONADO AQUI ---

const CartSkeleton = () => {
  return (
    <div className="flex h-full flex-col px-5 pb-6">
      <div className="flex h-full max-h-full flex-col gap-8 overflow-hidden">
        {/* Itens do Carrinho (Skeleton) */}
        {Array.from({ length: 3 }).map((_, index) => (
          <div key={index} className="flex items-center gap-4">
            <Skeleton className="h-20 w-20 rounded-lg" />
            <div className="flex-1 space-y-2">
              <Skeleton className="h-4 w-3/4" />
              <Skeleton className="h-3 w-1/2" />
              <Skeleton className="h-5 w-1/4" />
            </div>
            <Skeleton className="h-8 w-8" />
          </div>
        ))}
      </div>

      {/* Sumário do Carrinho (Skeleton) */}
      <div className="mt-auto flex flex-col gap-4">
        <Separator />
        <div className="flex items-center justify-between">
          <Skeleton className="h-4 w-20" />
          <Skeleton className="h-4 w-24" />
        </div>
        <Separator />
        <div className="flex items-center justify-between">
          <Skeleton className="h-4 w-20" />
          <Skeleton className="h-4 w-16" />
        </div>
        <Separator />
        <div className="flex items-center justify-between">
          <Skeleton className="h-5 w-16" />
          <Skeleton className="h-5 w-24" />
        </div>
        <Skeleton className="mt-5 h-12 w-full rounded-full" />
      </div>
    </div>
  );
};

export const Cart = () => {
  const { data: cart, isPending: cartIsLoading } = useQuery({
    queryKey: ["cart"],
    queryFn: () => getCart(),
  });
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

        {/* LÓGICA CONDICIONAL ADICIONADA AQUI */}
        {cartIsLoading ? (
          <CartSkeleton />
        ) : (
          <div className="flex h-full flex-col px-5 pb-6">
            <div className="flex h-full max-h-full flex-col overflow-auto">
              <ScrollArea className="h-full">
                <div className="flex h-full flex-col gap-14">
                  {cart?.items.map((item) => (
                    <CartItem
                      key={item.id}
                      id={item.id}
                      productName={item.productVariant.product.name}
                      productVariantName={item.productVariant.name}
                      productVariantImageUrl={item.productVariant.imageUrl}
                      productVariantPriceInCents={
                        item.productVariant.priceInCents
                      }
                      quantity={item.quantity}
                    />
                  ))}
                </div>
              </ScrollArea>
            </div>

            {cart?.items && cart?.items.length > 0 && (
              <div className="scrollbar-none mb-20 flex flex-col gap-6 border-t border-t-gray-300 [&::-webkit-scrollbar]:hidden">
                <Separator />

                <div className="flex items-center justify-between text-xs font-medium">
                  <p>Subtotal</p>
                  <p className="text-lg font-bold">
                    {formatCentsToBRL(cart?.totalPriceInCents ?? 0)}
                  </p>
                </div>

                <Separator />

                <div className="flex items-center justify-between text-xs font-medium">
                  <p>Entrega</p>
                  <p className="text-lg font-bold">GRÁTIS</p>
                </div>

                <Separator />

                <div className="flex items-center justify-between text-xs font-medium">
                  <p>Total</p>
                  <p className="text-lg font-bold">
                    {formatCentsToBRL(cart?.totalPriceInCents ?? 0)}
                  </p>
                </div>

                <Button className="mt-5 cursor-pointer rounded-full py-6 duration-300 hover:scale-[1.02]">
                  Finalizar compra
                </Button>
              </div>
            )}
          </div>
        )}
      </SheetContent>
    </Sheet>
  );
};
