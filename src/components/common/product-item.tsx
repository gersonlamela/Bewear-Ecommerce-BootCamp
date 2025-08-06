import Image from "next/image";
import Link from "next/link";

import { productTable, productVariantTable } from "@/db/schema";
import { formatCents } from "@/helpers/format-cents";

interface ProductListProps {
  product: typeof productTable.$inferSelect & {
    variants: (typeof productVariantTable.$inferSelect)[];
  };
}

export default function ProductItem({ product }: ProductListProps) {
  const firstVariant = product.variants[0];
  console.log("Image URL:", firstVariant.imageUrl);
  return (
    <Link href="/" className="flex flex-col gap-4">
      <Image
        src={firstVariant.imageUrl}
        alt={firstVariant.name}
        width={200}
        height={260}
        className="rounded-3xl"
      />
      <div className="flex max-w-[200px] flex-col gap-1">
        <p className="truncate text-sm font-medium">{product.name}</p>
        <p className="text-muted-foreground truncate text-xs font-medium">
          {product.description}
        </p>
        <p className="truncate text-sm font-semibold">
          {formatCents(firstVariant.priceInCents)}
        </p>
      </div>
    </Link>
  );
}
