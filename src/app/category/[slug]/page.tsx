import { eq } from "drizzle-orm";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";

import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { db } from "@/db";
import { categoryTable } from "@/db/schema";
import { formatCentsToBRL } from "@/helpers/money";

interface CategoryPageProps {
  params: {
    slug: string;
  };
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export async function generateMetadata({ params }: { params: any }) {
  const typedParams = params as CategoryPageProps["params"];

  const category = await db.query.categoryTable.findFirst({
    where: eq(categoryTable.slug, typedParams.slug),
    columns: {
      name: true,
    },
  });

  if (!category) {
    return {
      title: "Categoria não encontrada",
    };
  }

  return {
    title: `Categoria: ${category.name}`,
    description: `Produtos da categoria ${category.name}.`,
  };
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default async function CategoryPage({ params }: { params: any }) {
  const { slug } = params as { slug: string };

  const category = await db.query.categoryTable.findFirst({
    where: eq(categoryTable.slug, slug),
    with: {
      products: {
        with: {
          variants: true,
        },
      },
    },
  });

  if (!category) {
    notFound();
  }

  return (
    <main className="container space-y-8 py-12">
      <Badge variant="outline" className="rounded-md px-3 py-1 text-sm">
        Categoria
      </Badge>

      <div className="space-y-2">
        <h1 className="text-3xl font-bold tracking-tight">{category.name}</h1>
        <p className="text-muted-foreground text-lg">
          Confira todos os produtos disponíveis na categoria {category.name}.
        </p>
      </div>

      {category.products.length > 0 ? (
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {category.products.map((product) =>
            product.variants.map((variant) => (
              <Link key={variant.id} href={`/product-variant/${variant.slug}`}>
                <Card className="overflow-hidden transition-transform duration-300 ease-in-out hover:scale-105">
                  <CardHeader className="p-0">
                    <Image
                      src={variant.imageUrl}
                      alt={`${product.name} - ${variant.name}`}
                      width={400}
                      height={400}
                      className="aspect-square w-full object-cover"
                    />
                  </CardHeader>
                  <CardContent className="p-4">
                    <CardTitle className="truncate text-lg">
                      {product.name}
                    </CardTitle>
                    <CardDescription className="truncate">
                      {variant.name}
                    </CardDescription>
                    <p className="mt-2 text-xl font-semibold">
                      {formatCentsToBRL(variant.priceInCents)}
                    </p>
                  </CardContent>
                </Card>
              </Link>
            )),
          )}
        </div>
      ) : (
        <div className="flex h-60 items-center justify-center rounded-md border border-dashed">
          <p className="text-muted-foreground">
            Nenhum produto encontrado nesta categoria.
          </p>
        </div>
      )}
    </main>
  );
}
