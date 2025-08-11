import { eq } from "drizzle-orm";
import { headers } from "next/headers";
import { redirect } from "next/navigation";

import Footer from "@/components/common/footer";
import { Header } from "@/components/common/header";
import { db } from "@/db";
import { orderTable } from "@/db/schema";
import { auth } from "@/lib/auth";

import Orders from "./components/orders";

const MyOrdersPage = async () => {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session || !session.user) {
    redirect("/");
  }

  const orders = await db.query.orderTable.findMany({
    where: eq(orderTable.userId, session.user.id),
    with: {
      items: {
        with: {
          productVariant: {
            with: {
              product: true,
            },
          },
        },
      },
    },
    orderBy: (orders, { desc }) => [desc(orders.createdAt)],
  });

  return (
    <>
      <div className="flex h-full flex-col">
        <Header />
        <div className="mt-20 px-5">
          <Orders
            orders={orders.map((order) => ({
              id: order.id,
              totalPriceInCents: order.totalPriceInCents,
              status: order.status,
              createdAt: order.createdAt,
              items: order.items.map((item) => ({
                imageUrl: item.productVariant.imageUrl,
                productName: item.productVariant.product.name,
                productvariantName: item.productVariant.name,
                princeInCents: item.priceInCents, // de priceInCents para princeInCents
                quantity: item.quantity,
              })),
            }))}
          />
        </div>
      </div>
      <Footer />
    </>
  );
};

export default MyOrdersPage;
