// src/app/cart/identification/page.tsx

import { eq } from "drizzle-orm";
import { headers } from "next/headers";
import { redirect } from "next/navigation";

import Footer from "@/components/common/footer";
import { Header } from "@/components/common/header";
import { db } from "@/db";
import { shippingAddressTable } from "@/db/schema";
import { auth } from "@/lib/auth";

import Addresses from "./components/addresses";

// Este componente está perfeito. O erro que acontece aqui é um sintoma, não a causa.
// A causa é a conexão com um banco de dados desatualizado.
const IdentificationPage = async () => {
  // ===================================================================================
  // PASSO DE DEPURAÇÃO: Esta linha é a nossa ferramenta para resolver o problema.
  // Ela vai nos mostrar no terminal qual URL de banco de dados o Next.js está usando.
  console.log(
    ">>>>>> [DEBUG FINAL] URL do Banco de Dados que o Next.js está usando:",
    process.env.DATABASE_URL,
  );
  // ===================================================================================

  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session?.user.id) {
    redirect("/");
  }

  // O erro acontece na linha abaixo porque a query gerada pelo Drizzle
  // não é compatível com o banco de dados antigo ao qual o Next.js está se conectando.
  const cart = await db.query.cartTable.findFirst({
    where: (cart, { eq }) => eq(cart.userId, session.user.id),
    with: {
      shippingAddress: true,
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
  });

  if (!cart || cart?.items.length === 0) {
    redirect("/");
  }

  const shippingAddresses = await db.query.shippingAddressTable.findMany({
    where: eq(shippingAddressTable.userId, session.user.id),
  });

  const cartTotalInCents = cart.items.reduce(
    (acc, item) => acc + item.productVariant.priceInCents * item.quantity,
    0,
  );

  return (
    <div>
      <Header />
      <div className="mt-25 space-y-4 px-5">
        {/*
         * Note que você estava passando valores fixos aqui.
         * O ideal seria passar os valores reais do carrinho e dos endereços.
         * Ex: shippingAddresses={shippingAddresses} e defaultShippingAddressId={cart.shippingAddressId}
         */}
        <Addresses
          shippingAddresses={shippingAddresses}
          defaultShippingAddressId={cart.shippingAddressId}
        />
      </div>
      <div className="mt-12">
        <Footer />
      </div>
    </div>
  );
};

export default IdentificationPage;
