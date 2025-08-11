import { eq } from "drizzle-orm";
import { NextResponse } from "next/server";
import Stripe from "stripe";

import { db } from "@/db";
import { cartItemTable, cartTable, orderTable } from "@/db/schema";

export const POST = async (request: Request) => {
  if (!process.env.STRIPE_SECRET_KEY || !process.env.STRIPE_WEBHOOK_SECRET) {
    return new NextResponse("Stripe secrets not configured", { status: 500 });
  }

  const signature = request.headers.get("stripe-signature");
  if (!signature) {
    return new NextResponse("Missing Stripe signature", { status: 400 });
  }

  const text = await request.text();
  const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

  let event: Stripe.Event;

  try {
    event = stripe.webhooks.constructEvent(
      text,
      signature,
      process.env.STRIPE_WEBHOOK_SECRET,
    );
  } catch (err) {
    const errorMessage = err instanceof Error ? err.message : "Unknown error";
    return new NextResponse(`Webhook Error: ${errorMessage}`, { status: 400 });
  }

  if (event.type === "checkout.session.completed") {
    console.log("Checkout session completed");
    const session = event.data.object;
    const orderId = session.metadata?.orderId;

    if (!orderId) {
      return new NextResponse("Missing orderId in webhook metadata", {
        status: 400,
      });
    }

    try {
      await db.transaction(async (tx) => {
        // 1. Atualiza o status do pedido para "paid"
        await tx
          .update(orderTable)
          .set({ status: "paid" })
          .where(eq(orderTable.id, orderId));

        // 2. Encontra o usuário associado ao pedido
        const order = await tx.query.orderTable.findFirst({
          where: eq(orderTable.id, orderId),
          columns: {
            userId: true,
          },
        });

        if (!order || !order.userId) {
          throw new Error("Order or User ID not found for clearing cart.");
        }

        // 3. Encontra o carrinho do usuário
        const cart = await tx.query.cartTable.findFirst({
          where: eq(cartTable.userId, order.userId),
          columns: {
            id: true,
          },
        });

        if (cart) {
          // 4. Limpa os itens do carrinho do usuário
          await tx
            .delete(cartItemTable)
            .where(eq(cartItemTable.cartId, cart.id));
        }
      });
    } catch (error) {
      console.error("Failed to process successful checkout:", error);
      return new NextResponse("Error processing transaction after payment.", {
        status: 500,
      });
    }
  }

  return NextResponse.json({ received: true });
};
