import React from "react";
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
} from "@chakra-ui/react";
import { Link } from "react-router-dom";
import CartCard from "../../components/user/UserCartCard";

const DUMMY_CART_ITEMS = [
  {
    id: 1,
    name: "プレミアム レザーミニウォレット",
    price: 12800,
    quantity: 1,
    emoji: "👛",
  },
  {
    id: 2,
    name: "クラシックキャンバス トートバッグ",
    price: 8500,
    quantity: 2,
    emoji: "👜",
  },
];

export default function Cart() {
  const totalPrice = DUMMY_CART_ITEMS.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

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
        <Link to="/home">← カートに戻る</Link>
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
            {DUMMY_CART_ITEMS.map((item) => (
              <CartCard item={item} />
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
                  ¥{totalPrice.toLocaleString()}
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
                  ¥{totalPrice.toLocaleString()}
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
    </Container>
  );
}
