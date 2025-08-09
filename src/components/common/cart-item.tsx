import { MinusIcon, PlusIcon, TrashIcon } from "lucide-react";
import Image from "next/image";
import { toast } from "sonner";

import { formatCents } from "@/helpers/format-cents";
import { useDecreaseCartProductQuantityMutation } from "@/hooks/mutations/decrease-cart-product-quantity-mutation copy";
import { useIncreaseCartProductQuantityMutation } from "@/hooks/mutations/increase-cart-product-quantity-mutation";
import { useRemoveProductFromCartMutation } from "@/hooks/mutations/remove-product-from-cart-mutation";

import { Button } from "../ui/button";

interface CartItemProps {
  id: string;
  productName: string;
  productVariantId: string;
  productVariantName: string;
  productVariantImageUrl: string;
  productVariantPriceInCents: number;
  quantity: number;
}

export default function CartItem({
  id,
  productName,
  productVariantId,
  productVariantImageUrl,
  productVariantName,
  productVariantPriceInCents,
  quantity,
}: CartItemProps) {
  const removeProductFromCartMutation = useRemoveProductFromCartMutation(id);

  const decreaseCartProductQuantityMutation =
    useDecreaseCartProductQuantityMutation(id);

  const increaseCartProductQuantityMutation =
    useIncreaseCartProductQuantityMutation(productVariantId);

  const handleDeleteClick = () => {
    removeProductFromCartMutation.mutate(undefined, {
      onSuccess: () => {
        toast.success("Quantidade do produto removida.");
      },
      onError: () => {
        toast.error("Error ao remover produto do carrinho");
      },
    });
  };

  const handleDecreaseCartProductQuantityDeleteClick = () => {
    decreaseCartProductQuantityMutation.mutate();
  };

  const handleIncreaseCartProductQuantityDeleteClick = () => {
    increaseCartProductQuantityMutation.mutate();
  };
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
            <Button
              variant={"ghost"}
              className="h-4 w-4"
              onClick={handleDecreaseCartProductQuantityDeleteClick}
            >
              <MinusIcon className="" />
            </Button>
            <p className="text-xs font-medium">{quantity}</p>
            <Button
              variant={"ghost"}
              className="h-4 w-4"
              onClick={handleIncreaseCartProductQuantityDeleteClick}
            >
              <PlusIcon className="" />
            </Button>
          </div>
        </div>
      </div>
      <div className="gap1 flex flex-col items-end justify-center">
        <Button variant={"outline"} size={"icon"} onClick={handleDeleteClick}>
          <TrashIcon />
        </Button>
        <p className="text-sm font-bold">
          {formatCents(productVariantPriceInCents)}
        </p>
      </div>
    </div>
  );
}
