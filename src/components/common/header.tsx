"use client";

import { Separator } from "@radix-ui/react-separator";
import {
  House,
  LogInIcon,
  LogOutIcon,
  MenuIcon,
  ShoppingCart,
  Truck,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { db } from "@/db";
import { authClient } from "@/lib/auth-client";

import { Cart } from "./cart";
import CategorySelector from "./category-selector";

export const Header = () => {
  const { data: session } = authClient.useSession();
  const router = useRouter();

  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  const isAuthenticated = !!session?.user;

  useEffect(() => {
    const controlNavbar = () => {
      if (window.scrollY > lastScrollY) {
        setIsVisible(false);
      } else {
        setIsVisible(true);
      }
      setLastScrollY(window.scrollY);
    };

    window.addEventListener("scroll", controlNavbar);

    return () => {
      window.removeEventListener("scroll", controlNavbar);
    };
  }, [lastScrollY]);

  const handleSignOut = async () => {
    await authClient.signOut();
    router.push("/");
  };

  return (
    <header
      className={`fixed top-0 left-0 z-50 flex w-full items-center justify-between rounded-b-2xl border-[1.5px] border-b border-gray-200 bg-gray-50/50 p-5 backdrop-blur-sm transition-transform duration-300 ease-out ${
        isVisible ? "translate-y-0" : "-translate-y-full"
      }`}
    >
      <Link href="/">
        <Image src="/logo.svg" alt="BEWEAR" width={100} height={26.14} />
      </Link>

      <div className="flex items-center gap-4">
        {/* O carrinho na barra principal permanece, abrindo a folha lateral */}
        <Cart />

        <Sheet>
          <SheetTrigger asChild>
            <Button
              className="cursor-pointer border-[1.5px] bg-transparent text-gray-800 drop-shadow-sm duration-200 hover:scale-[1.05] hover:bg-gray-50/10 hover:text-black"
              variant="outline"
              size="icon"
            >
              <MenuIcon />
            </Button>
          </SheetTrigger>
          <SheetContent className="rounded-l-3xl">
            <SheetHeader className="mx-5 flex justify-center">
              <SheetTitle className="mt-5">Menu</SheetTitle>
            </SheetHeader>
            <div className="px-5">
              {isAuthenticated ? (
                // SE O USUÁRIO ESTIVER LOGADO
                <>
                  <div className="mt-2 flex flex-row items-center justify-between gap-4">
                    <div className="flex min-w-0 items-center gap-3">
                      <Avatar className="h-12 w-12 drop-shadow-md">
                        <AvatarImage
                          src={session?.user?.image as string | undefined}
                        />
                        <AvatarFallback>
                          {session.user.name?.split(" ")[0]?.[0]}
                          {session.user.name?.split(" ")[1]?.[0]}
                        </AvatarFallback>
                      </Avatar>
                      <div className="min-w-0">
                        <h3 className="font-semibold">{session.user.name}</h3>
                        <span className="text-muted-foreground block truncate text-xs">
                          {session.user.email}
                        </span>
                      </div>
                    </div>
                  </div>
                </>
              ) : (
                // SE O USUÁRIO NÃO ESTIVER LOGADO
                <div className="mt-6 flex items-center justify-between">
                  <h2 className="font-semibold">Olá. Faça seu login!</h2>
                  <Button size="icon" asChild variant="outline">
                    <Link href="/authentication">
                      <LogInIcon />
                    </Link>
                  </Button>
                </div>
              )}
            </div>

            <div className="mx-auto mt-4 w-[75%] border-b border-gray-100"></div>

            <div className="ml-3 flex flex-col gap-2 px-5">
              <Button
                variant="ghost"
                className="justify-start gap-3 py-5"
                asChild
              >
                <Link href="/">
                  <House size={16} />
                  Início
                </Link>
              </Button>

              {isAuthenticated && (
                <Button
                  variant="ghost"
                  className="justify-start gap-3 py-5"
                  asChild
                >
                  <Link href="/my-orders">
                    <Truck size={16} />
                    Meus Pedidos
                  </Link>
                </Button>
              )}

              <Button
                variant="ghost"
                className="justify-start gap-3 py-5"
                asChild
              >
                <Link href="/cart/identification">
                  <ShoppingCart size={16} />
                  Carrinho
                </Link>
              </Button>
            </div>

            <div className="mx-auto mt-2 w-[75%] border-b border-gray-100"></div>

            {/* <div className="p-5">
              <CategorySelector categories={categories} />
            </div> */}

            {/* LÓGICA DE LOGOUT CORRIGIDA E POSICIONADA NO FINAL */}
            {isAuthenticated && (
              <div className="text-muted-foreground absolute bottom-5 w-full cursor-pointer px-5">
                <Button
                  variant="ghost"
                  className="w-full justify-start gap-3"
                  onClick={handleSignOut}
                >
                  <LogOutIcon size={16} />
                  Sair da conta
                </Button>
              </div>
            )}
          </SheetContent>
        </Sheet>
      </div>
    </header>
  );
};
