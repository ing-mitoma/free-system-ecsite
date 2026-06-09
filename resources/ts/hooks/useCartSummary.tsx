import { useQuery } from "@tanstack/react-query";

interface CartItemType {
  product_id: number;
  name: string;
  emoji: string;
  price: number;
  quantity: number;
  subtotal: number;
}

interface CartDetailType {
  items: CartItemType[];
  total_amount: number;
}

export function useCartSummary(cartItems: any[]) {
  return useQuery<CartDetailType>({
    queryKey: ["cartSummary", cartItems],
    queryFn: async () => {
      if (cartItems.length === 0) {
        return { items: [], total_amount: 0 };
      }
      const response = await fetch("/api/cart/summary", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ items: cartItems }),
      });
      if (!response.ok) {
        throw new Error("カート情報の取得に失敗しました");
      }
      return response.json();
    },
  });
}
