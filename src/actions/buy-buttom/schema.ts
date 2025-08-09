import { z } from "zod";

export const buyProductsSchema = z.object({
  productVariantId: z.uuid(),
  quantity: z.number().min(1),
});

export type BuyProductsSchema = z.infer<typeof buyProductsSchema>;
