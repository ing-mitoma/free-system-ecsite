import React, { useEffect, useState } from "react";
import UserCheckout from "../../components/user/UserCheckout";

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

export default function Checkout() {
  const [cartDataDetails, setCartDetails] = useState<any>(null);

  useEffect(() => {
    const currentCartData = localStorage.getItem("cart") || "[]";
    const cartItems = JSON.parse(currentCartData);

    if (cartItems.length === 0) {
      return;
    }
    fetch("/api/cart/summary", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ items: cartItems }),
    })
      .then((res) => {
        if (!res.ok) throw new Error("カート情報の取得に失敗しました");
        return res.json();
      })
      .then((data: CartDetailType) => {
        setCartDetails(data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);
  if (!cartDataDetails) {
    return (
      <div style={{ padding: "40px", textAlign: "center", fontWeight: "bold" }}>
        注文内容を計算中...
      </div>
    );
  }
  return <UserCheckout cartDataDetails={cartDataDetails} />;
}
