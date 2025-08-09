import { useMutation, useQueryClient } from "@tanstack/react-query";

import { addProductToCart } from "@/actions/add-cart-products";

import { getUseCartQueryKey } from "../queries/use-cart";

// A chave da mutação é baseada no ID da variante do produto
export const getIncreaseCartProductMutationKey = (productVariantId: string) =>
  ["increase-cart-product-quantity", productVariantId] as const;

export const useIncreaseCartProduct = (productVariantId: string) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: getIncreaseCartProductMutationKey(productVariantId),
    // A função de mutação chama a action addProductToCart, que já lida com o incremento
    mutationFn: () => addProductToCart({ productVariantId, quantity: 1 }),
    onSuccess: () => {
      // Invalida a query do carrinho para atualizar a UI
      queryClient.invalidateQueries({ queryKey: getUseCartQueryKey() });
    },
  });
};
