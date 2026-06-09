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
import { useCartSummary } from "../../hooks/useCartSummary";

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
  const [cartItems, setCartItems] = useState<CartItemType[]>(() => {
    const currentCartData = localStorage.getItem("cart") || "[]";
    return JSON.parse(currentCartData);
  });

  const {
    data: cartDataDetails,
    isLoading,
    isError,
    error,
  } = useCartSummary(cartItems);

  const handleDeleteCartItem = (productId: number) => {
    const updatedCartItems = cartItems.filter(
      (item: CartItemType) => item.product_id !== productId
    );
    setCartItems(updatedCartItems);
    localStorage.setItem("cart", JSON.stringify(updatedCartItems));
  };

  const handleUpdataQuantity = (productId: number, newQuantity: number) => {
    const updatedCartItems = cartItems.map((item: CartItemType) => {
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
