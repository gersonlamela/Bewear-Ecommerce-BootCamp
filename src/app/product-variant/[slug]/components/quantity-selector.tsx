"use client";

import { MinusIcon, PlusIcon } from "lucide-react";
import { useState } from "react";

import { Button } from "@/components/ui/button";

export default function QuantitySelector() {
  const [quantity, setQuantity] = useState(1);

  const handleDecrement = () =>
    setQuantity((prev) => (prev > 1 ? prev - 1 : prev));
  const handleIncrement = () => setQuantity((prev) => prev + 1);

  return (
    <div className="space-y-4">
      <h3 className="font-medium">Quantidade</h3>
      <div className="flex w-[100px] items-center justify-between rounded-lg border">
        <Button variant={"ghost"} size={"icon"} onClick={handleDecrement}>
          <MinusIcon />
        </Button>
        <p>{quantity}</p>
        <Button variant={"ghost"} size={"icon"} onClick={handleIncrement}>
          <PlusIcon />
        </Button>
      </div>
    </div>
  );
}
