import React from "react";
import UserCheckout from "../../components/user/UserCheckout";
import { useCartSummary } from "../../hooks/useCartSummary";
import { Center, Spinner } from "@chakra-ui/react";

interface CartItemType {
  product_id: number;
  name: string;
  emoji: string;
  price: number;
  quantity: number;
  subtotal: number;
}

export default function Checkout() {
  const cartItems = React.useMemo(() => {
    const currentCartData = localStorage.getItem("cart");
    return JSON.parse(currentCartData || "[]") as CartItemType[];
  }, []);
  const {
    data: cartDataDetails,
    isLoading,
    isError,
    error,
  } = useCartSummary(cartItems);

  if (isLoading) {
    return (
      <Center minH="50vh">
        <Spinner size="xl" color="black" />
        <span style={{ marginLeft: "12px", fontWeight: "bold" }}>
          注文内容を計算中...
        </span>
      </Center>
    );
  }

  if (isError) {
    return (
      <Center minH="50vh" flexDirection="column" gap={2}>
        <div style={{ color: "red", fontWeight: "bold" }}>
          エラー:{" "}
          {error instanceof Error
            ? error.message
            : "カート情報の取得に失敗しました"}
        </div>
      </Center>
    );
  }
  if (!cartDataDetails) {
    return (
      <div style={{ padding: "40px", textAlign: "center", fontWeight: "bold" }}>
        注文内容を計算中...
      </div>
    );
  }
  return <UserCheckout cartDataDetails={cartDataDetails} />;
}
