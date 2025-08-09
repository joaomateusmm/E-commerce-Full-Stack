"use client";

import { LogInIcon, LogOutIcon, MenuIcon } from "lucide-react";
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
import { authClient } from "@/lib/auth-client";

import { Cart } from "./cart";

export const Header = () => {
  const { data: session } = authClient.useSession();
  const router = useRouter();

  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

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

      {/* 👇 PASSO 1: Inverter a posição dos botões */}
      <div className="flex items-center gap-4">
        {/* O carrinho agora vem primeiro */}
        <Cart />

        {/* O menu (Sheet) agora vem depois */}
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
          <SheetContent>
            <SheetHeader>
              <SheetTitle>Menu</SheetTitle>
            </SheetHeader>
            <div className="px-5">
              {session?.user ? (
                <>
                  <div className="mt-6 flex flex-row items-center justify-between gap-4">
                    {/* 👇 PASSO 2: Adicionar 'min-w-0' para permitir que este container encolha */}
                    <div className="flex min-w-0 items-center gap-3">
                      <Avatar>
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
                        {/* 👇 PASSO 3: Adicionar 'truncate' para cortar o texto com "..." */}
                        <span className="text-muted-foreground block truncate text-xs">
                          {session.user.email}
                        </span>
                      </div>
                    </div>
                    <Button
                      className="cursor-pointer"
                      variant="outline"
                      size="icon"
                      onClick={handleSignOut}
                    >
                      <LogOutIcon />
                    </Button>
                  </div>
                </>
              ) : (
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
          </SheetContent>
        </Sheet>
      </div>
    </header>
  );
};
