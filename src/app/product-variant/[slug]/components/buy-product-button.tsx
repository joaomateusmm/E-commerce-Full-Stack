"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

import { addProductToCart } from "@/actions/add-cart-products/index";
import { Button } from "@/components/ui/button";

interface AddToCartButtonProps {
  productVariantId: string;
  quantity: number;
}

const BuyProductButton = ({
  productVariantId,
  quantity,
}: AddToCartButtonProps) => {
  const router = useRouter();
  const queryClient = useQueryClient();

  const { mutate, isPending } = useMutation({
    mutationKey: ["addProductToCart", productVariantId, quantity],
    // 👇 1. CORREÇÃO DE TIPO: Aceitamos string ou number para o toastId
    mutationFn: (toastId: string | number) =>
      addProductToCart({
        productVariantId,
        quantity,
      }).catch((error) => {
        toast.error("Houve um erro ao adicionar o produto.", { id: toastId });
        throw error;
      }),
    onSuccess: (data, toastId) => {
      toast.success("Produto adicionado com sucesso!", { id: toastId });
      queryClient.invalidateQueries({ queryKey: ["cart"] });
      router.push("/cart/identification");
    },
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    onError: (error, _variables, _context) => {
      console.error("Mutação falhou:", error);
    },
  });

  const handleBuyNow = () => {
    const toastId = toast.loading("Adicionando produto ao carrinho...");
    mutate(toastId);
  };

  return (
    <Button
      className="cursor-pointer rounded-full py-6 drop-shadow-sm duration-200 hover:scale-[1.02]"
      size="lg"
      disabled={isPending}
      onClick={handleBuyNow} // Usamos a nova função de handler
    >
      {isPending ? (
        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
      ) : (
        "Comprar Agora"
      )}
    </Button>
  );
};

export default BuyProductButton;
