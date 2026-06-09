import { useState } from "react";
import {
  Box,
  Container,
  Heading,
  Flex,
  Text,
  Button,
  Stack,
  DataList,
  Separator,
  Center,
  Spinner,
} from "@chakra-ui/react";
import { Link } from "react-router-dom";
import CartCard from "../../components/user/UserCartCard";
import { Toaster } from "./ui/toaster";
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

export default function Cart() {
  const [cartItems, setCartItems] = useState<any[]>(() => {
    const currentCartData = localStorage.getItem("cart") || "[]";
    return JSON.parse(currentCartData);
  });

  const {
    data: cartDataDetails,
    isLoading,
    isError,
    error,
  } = useQuery<CartDetailType>({
    queryKey: ["cartSummary", cartItems],
    queryFn: async () => {
      if (cartItems.length === 0) {
        return { items: [], total_amount: 0 };
      }
      const response = await fetch("/api/cart/summary", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ items: cartItems }),
      });
      if (!response.ok) {
        throw new Error("ユーザー一覧の取得に失敗しました");
      }
      return response.json();
    },
    staleTime: 0,
  });

  const handleDeleteCartItem = (productId: number) => {
    const updatedCartItems = cartItems.filter(
      (item: any) => item.product_id !== productId
    );
    setCartItems(updatedCartItems);
    localStorage.setItem("cart", JSON.stringify(updatedCartItems));
  };

  const handleUpdataQuantity = (productId: number, newQuantity: number) => {
    const updatedCartItems = cartItems.map((item: any) => {
      if (item.product_id === productId) {
        return { ...item, quantity: newQuantity };
      }
      return item;
    });
    setCartItems(updatedCartItems);
    localStorage.setItem("cart", JSON.stringify(updatedCartItems));
  };

  if (isLoading) {
    return (
      <Center minH="50vh">
        <Spinner size="xl" color="black" />
      </Center>
    );
  }
  if (isError) {
    return (
      <Container maxW="6xl" py={12} textAlign="center">
        <Text color="red.500" fontWeight="bold">
          エラー:{" "}
          {error instanceof Error
            ? error.message
            : "データの取得に失敗しました"}
        </Text>
      </Container>
    );
  }

  return (
    <Container maxW="6xl" py={12}>
      <Button
        asChild
        variant="ghost"
        size="sm"
        color="gray.500"
        mb={6}
        _hover={{ bg: "gray.100" }}
      >
        <Link to="/home">← お買い物を続ける</Link>
      </Button>

      <Heading as="h1" size="2xl" mb={8} fontWeight="black">
        ショッピングカート
      </Heading>

      <Flex
        direction={{ base: "column", lg: "row" }}
        gap={8}
        align="flex-start"
      >
        <Box flex="2" w="full">
          <Stack gap={4}>
            {cartDataDetails?.items.map((item) => (
              //toasterを追加
              <CartCard
                key={item.product_id}
                item={item}
                onDelete={handleDeleteCartItem}
                onUpdataQuantity={handleUpdataQuantity}
              />
            ))}
          </Stack>
        </Box>
        <Box
          bg="white"
          p={6}
          border="1px solid"
          borderColor="gray.100"
          shadow="sm"
        >
          <Box flex={1}>
            <Heading
              as="h2"
              size="sm"
              mb={4}
              fontWeight="bold"
              color="gray.800"
            >
              注文内容の確認
            </Heading>
            <DataList.Root orientation="horizontal">
              <DataList.Item>
                <DataList.ItemLabel>商品小計</DataList.ItemLabel>
                <DataList.ItemValue>
                  ¥{cartDataDetails?.total_amount.toLocaleString()}
                </DataList.ItemValue>
              </DataList.Item>
              <DataList.Item>
                <DataList.ItemLabel>配送料</DataList.ItemLabel>
                <DataList.ItemValue color={"green"}>無料</DataList.ItemValue>
              </DataList.Item>
              <Separator borderColor="gray.200" />
              <DataList.Item>
                <DataList.ItemLabel fontSize={"sm"} fontWeight={"bold"}>
                  合計金額
                </DataList.ItemLabel>
                <DataList.ItemValue>
                  ¥{cartDataDetails?.total_amount.toLocaleString()}
                </DataList.ItemValue>
              </DataList.Item>
            </DataList.Root>
          </Box>

          <Button
            mt={3}
            colorPalette="black"
            w="full"
            fontWeight="bold"
            variant={"solid"}
            asChild
          >
            <Link to="/checkout">購入手続きへ進む</Link>
          </Button>
          <Button
            mt={3}
            colorPalette="black"
            w="full"
            fontWeight="bold"
            variant={"ghost"}
            asChild
          >
            <Link to="/home">買い物を続ける</Link>
          </Button>
        </Box>
      </Flex>
      <Toaster />
    </Container>
  );
}
