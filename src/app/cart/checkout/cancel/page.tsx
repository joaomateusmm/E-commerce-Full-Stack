"use client";

import Image from "next/image";
import Link from "next/link";

import { Header } from "@/components/common/header";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogTitle,
} from "@/components/ui/dialog";

const CheckoutCancelPage = () => {
  return (
    <>
      <Header />
      <Dialog open={true} onOpenChange={() => {}}>
        <DialogContent className="text-center">
          <Image
            src="/illustration-cancel.svg"
            alt="Falha no pagamento"
            width={300}
            height={300}
            className="mx-auto"
          />
          <DialogTitle className="text-destructive mt-4 text-2xl">
            Ops! Pagamento não concluído
          </DialogTitle>
          <DialogDescription className="font-medium">
            Não foi possível processar o seu pagamento. Fique tranquilo, nenhuma
            cobrança foi realizada. Por favor, verifique seus dados e tente
            novamente.
          </DialogDescription>

          <DialogFooter className="flex-col gap-2 sm:flex-col sm:space-x-0">
            <Button
              className="w-full cursor-pointer rounded-full bg-red-500 py-6 drop-shadow-md hover:scale-[1.02] hover:bg-red-600"
              size="lg"
              asChild
            >
              <Link className="mb-2" href="/cart/confirmation">
                Tentar Novamente
              </Link>
            </Button>
            <Button
              className="w-full rounded-full py-6"
              variant="outline"
              size="lg"
              asChild
            >
              <Link href="/">Voltar para a loja</Link>
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default CheckoutCancelPage;
