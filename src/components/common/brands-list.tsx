import Image from "next/image";

const Brands = () => {
  return (
    <div className="space-y-6">
      <h3 className="px-5 font-semibold">Marcas parceiras</h3>
      <div className="flex w-full items-center gap-10 overflow-x-auto px-5 [&::-webkit-scrollbar]:hidden">
        <div className="flex-shrink-0 items-center justify-center">
          <div className="flex h-20 w-20 items-center justify-center rounded-3xl border-1 border-gray-200/50 shadow-md">
            <Image src="/nike.svg" alt="Nike" width={40} height={40} />
          </div>
          <h3 className="mt-3 text-center">Nike</h3>
        </div>
        <div className="flex-shrink-0 items-center justify-center">
          <div className="flex h-20 w-20 items-center justify-center rounded-3xl border-1 border-gray-200/50 shadow-md">
            <Image src="/adidas.svg" alt="Adidas" width={40} height={40} />
          </div>
          <h3 className="mt-3 text-center">Adidas</h3>
        </div>
        <div className="flex-shrink-0 items-center justify-center">
          <div className="flex h-20 w-20 items-center justify-center rounded-3xl border-1 border-gray-200/50 shadow-md">
            <Image src="/puma.svg" alt="Puma" width={40} height={40} />
          </div>
          <h3 className="mt-3 text-center">Puma</h3>
        </div>
        <div className="flex-shrink-0 items-center justify-center">
          <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-3xl border-1 border-gray-200/50 shadow-md">
            <Image
              src="/new-balance.svg"
              alt="New Balance"
              width={40}
              height={40}
            />
          </div>
          <h3 className="mt-3 text-center">New Balance</h3>
        </div>
        <div className="flex-shrink-0 items-center justify-center">
          <div className="flex h-20 w-20 items-center justify-center rounded-3xl border-1 border-gray-200/50 shadow-md">
            <Image src="/converse.svg" alt="Converse" width={30} height={30} />
          </div>
          <h3 className="mt-3 text-center">Converse</h3>
        </div>
        <div className="flex-shrink-0 items-center justify-center">
          <div className="flex h-20 w-20 items-center justify-center rounded-3xl border-1 border-gray-200/50 shadow-md">
            <Image src="/polo.svg" alt="Polo" width={22} height={22} />
          </div>
          <h3 className="mt-3 text-center">Polo</h3>
        </div>
        <div className="flex-shrink-0 items-center justify-center">
          <div className="flex h-20 w-20 items-center justify-center rounded-3xl border-1 border-gray-200/50 shadow-md">
            <Image src="/zara.svg" alt="Zara" width={40} height={40} />
          </div>
          <h3 className="mt-3 text-center">Zara</h3>
        </div>
      </div>
    </div>
  );
};

export default Brands;
