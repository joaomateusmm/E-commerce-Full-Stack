import { z } from "zod"; // 208k (gzipped: 46k)

export const finishOrderSchema = z.object({
  shippingAddressId: z.uuid(),
  items: z.array(
    z.object({
      productVariantId: z.uuid(),
      quantity: z.number().min(1),
    }),
  ),
});

export type FinishOrderSchema = z.infer<typeof finishOrderSchema>;
