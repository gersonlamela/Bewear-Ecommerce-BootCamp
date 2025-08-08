import { MinusIcon, PlusIcon, TrashIcon } from "lucide-react";
import Image from "next/image";

import { formatCents } from "@/helpers/format-cents";

import { Button } from "../ui/button";

interface CartItemProps {
  id: string;
  productName: string;
  productVariantName: string;
  productVariantImageUrl: string;
  productVariantPriceInCents: number;
  quantity: number;
}

export default function CartItem({
  id,
  productName,
  productVariantImageUrl,
  productVariantName,
  productVariantPriceInCents,
  quantity,
}: CartItemProps) {
  return (
    <div className="flex items-center justify-between">
      <div className="flex items-center gap-4">
        <Image
          src={productVariantImageUrl}
          width={78}
          height={78}
          alt={productVariantName}
          className="rounded-lg"
        />
        <div className="flex flex-col gap-1">
          <p className="text-sm font-semibold">{productName}</p>
          <p className="text-muted-foreground text-xs font-medium">
            {productVariantName}
          </p>
          <div className="flex w-[100px] items-center justify-between rounded-lg border p-1">
            <Button variant={"ghost"} className="h-4 w-4" onClick={() => {}}>
              <MinusIcon className="" />
            </Button>
            <p className="text-xs font-medium">{quantity}</p>
            <Button variant={"ghost"} className="h-4 w-4" onClick={() => {}}>
              <PlusIcon className="" />
            </Button>
          </div>
        </div>
      </div>
      <div className="gap1 flex flex-col items-end justify-center">
        <Button variant={"outline"} size={"icon"}>
          <TrashIcon />
        </Button>
        <p className="text-sm font-bold">
          {formatCents(productVariantPriceInCents)}
        </p>
      </div>
    </div>
  );
}
