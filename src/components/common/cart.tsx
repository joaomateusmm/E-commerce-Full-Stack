"use client";

import { ScrollArea } from "@radix-ui/react-scroll-area";
import { Separator } from "@radix-ui/react-separator";
import { ShoppingBasketIcon } from "lucide-react"; // ALTERAÇÃO AQUI: Apenas o ícone é importado daqui
import Link from "next/link"; // ALTERAÇÃO AQUI: Importação correta para navegação

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
  // ... (código do skeleton sem alterações)
};

export const Cart = () => {
  const { data: cart, isPending } = useCart();
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
                  {cart?.items.map((item) => (
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
                  ))}
                </div>
              </ScrollArea>
            </div>

            {cart?.items && cart?.items.length > 0 && (
              <div className="scrollbar-none mt-auto flex flex-col gap-6 border-t border-t-gray-300 pt-6 [&::-webkit-scrollbar]:hidden">
                <div className="flex items-center justify-between text-xs font-medium">
                  <p>Subtotal</p>
                  <p className="font-bold">
                    {formatCentsToBRL(cart?.totalPriceInCents ?? 0)}
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
                    {formatCentsToBRL(cart?.totalPriceInCents ?? 0)}
                  </p>
                </div>
                {/* 👇 Este botão agora funcionará corretamente */}
                <Button className="mt-2 rounded-full py-6" asChild>
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
