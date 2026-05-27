import React from "react";
import {
    Box,
    Container,
    Heading,
    Flex,
    Text,
    Button,
    Stack,
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
        0,
    );

    return (
        <Container maxW="6xl" py={12}>
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
                    flex="1"
                    w="full"
                    bg="white"
                    p={6}
                    border="1px solid"
                    borderColor="gray.100"
                >
                    <Heading as="h2" size="sm" mb={4} fontWeight="bold">
                        注文内容
                    </Heading>

                    <Stack gap={3} mb={6} fontSize="sm" color="gray.600">
                        <Flex justify="space-between">
                            <Text>商品合計</Text>
                            <Text>¥{totalPrice.toLocaleString()}</Text>
                        </Flex>
                        <Flex justify="space-between">
                            <Text>送料</Text>
                            <Text>無料</Text>
                        </Flex>
                        <hr style={{ borderColor: "#F3F4F6" }} />
                        <Flex
                            justify="space-between"
                            fontSize="lg"
                            fontWeight="black"
                            color="gray.900"
                        >
                            <Text>合計金額</Text>
                            <Text>¥{totalPrice.toLocaleString()}</Text>
                        </Flex>
                    </Stack>

                    {/* 購入手続きボタン */}
                    <Button
                        colorPalette="black"
                        w="full"
                        size="lg"
                        fontWeight="bold"
                        asChild
                    >
                        <Link to="/checkout">購入手続きへ進む</Link>
                    </Button>

                    <Button
                        asChild
                        variant="ghost"
                        w="full"
                        mt={3}
                        size="sm"
                        color="gray.500"
                    >
                        <Link to="/home">買い物を続ける</Link>
                    </Button>
                </Box>
            </Flex>
        </Container>
    );
}
