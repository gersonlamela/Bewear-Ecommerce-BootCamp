import { useMutation, useQueryClient } from "@tanstack/react-query";
import { MinusIcon, PlusIcon, TrashIcon } from "lucide-react";
import Image from "next/image";
import { toast } from "sonner";

import { addProductToCart } from "@/actions/add-cart-product";
import { decreaseCartProductQuantity } from "@/actions/decrease-cart-product-quantity";
import { removeProductFromCart } from "@/actions/remove-cart-product";
import { formatCents } from "@/helpers/format-cents";

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
  const queryClient = useQueryClient();
  const removeProductFromCartMutation = useMutation({
    mutationKey: ["remove-cart-product"],
    mutationFn: () => removeProductFromCart({ cartItemId: id }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["cart"] });
    },
  });

  const decreaseCartProductQuantityMutation = useMutation({
    mutationKey: ["decrease-cart-product-quantity"],
    mutationFn: () => decreaseCartProductQuantity({ cartItemId: id }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["cart"] });
    },
  });

  const increaseCartProductQuantityMutation = useMutation({
    mutationKey: ["increase-cart-product-quantity"],
    mutationFn: () =>
      addProductToCart({ productVariantId: productVariantId, quantity: 1 }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["cart"] });
    },
  });
  const handleDeleteClick = () => {
    removeProductFromCartMutation.mutate(undefined, {
      onSuccess: () => {
        toast.success("Quantidade do produto removida.");
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
