import { useMutation, useQueryClient } from "@tanstack/react-query";

import { addProductToCart } from "@/actions/add-cart-product";

import { getUseCartQueryKey } from "../queries/use-cart";

export const getIncreaseCartProductQuantityMutationKey = (cartItemId: string) =>
  ["increase-cart-product-quantity", cartItemId] as const;

export const useIncreaseCartProductQuantityMutation = (
  productVariantId: string,
) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: getIncreaseCartProductQuantityMutationKey(productVariantId),
    mutationFn: () => addProductToCart({ productVariantId, quantity: 1 }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: getUseCartQueryKey() });
    },
  });
};
