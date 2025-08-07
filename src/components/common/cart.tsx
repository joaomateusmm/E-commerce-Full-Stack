"use client";

import { ShoppingBasketIcon } from "lucide-react"; // 1.6k (gzipped: 919)

import { Button } from "@/components/ui/button";

import { Sheet, SheetContent, SheetTrigger } from "../ui/sheet";

export const Cart = () => {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button
          variant="outline"
          size="icon"
          className="cursor-pointer bg-transparent border-[1.5px] text-gray-800 drop-shadow-sm duration-200 hover:scale-[1.05] hover:bg-gray-50/10 hover:text-black"
        >
          <ShoppingBasketIcon />
        </Button>
      </SheetTrigger>
      <SheetContent></SheetContent>
    </Sheet>
  );
};
