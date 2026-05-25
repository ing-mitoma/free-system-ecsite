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

// 💡 テスト用のダミーカートデータ（あとで動的にします）
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
    // 🧮 合計金額の計算（価格 × 数量 の合計）
    const totalPrice = DUMMY_CART_ITEMS.reduce(
        (sum, item) => sum + item.price * item.quantity,
        0,
    );

    return (
        <Container maxW="6xl" py={12}>
            <Heading as="h1" size="2xl" mb={8} fontWeight="black">
                ショッピングカート
            </Heading>

            {/* 🛠️ ヒント：Flex を使って、スマホでは縦並び、PCでは横並び（row）にします */}
            <Flex
                direction={{ base: "column", lg: "row" }}
                gap={8}
                align="flex-start"
            >
                {/* 🛒 左側：カート内の商品一覧エリア（横幅を広く取る） */}
                <Box flex="2" w="full">
                    <Stack gap={4}>
                        {DUMMY_CART_ITEMS.map((item) => (
                            // 🧱 各商品行：横並び（Flex）にして、白背景に薄いボーダーをつけると綺麗です
                            <Flex
                                key={item.id}
                                bg="white"
                                p={5}
                                borderRadius="2xl"
                                border="1px solid"
                                borderColor="gray.100"
                                align="center"
                                justify="space-between"
                            >
                                {/* 左端：商品の絵文字と名前 */}
                                <Flex align="center" gap={4}>
                                    <Box
                                        fontSize="4xl"
                                        bg="gray.50"
                                        p={2}
                                        borderRadius="xl"
                                    >
                                        {item.emoji}
                                    </Box>
                                    <Box>
                                        <Text
                                            fontWeight="bold"
                                            color="gray.900"
                                        >
                                            {item.name}
                                        </Text>
                                        <Text fontSize="sm" color="gray.500">
                                            単価: ¥{item.price.toLocaleString()}
                                        </Text>
                                    </Box>
                                </Flex>

                                {/* 右端：数量と価格、削除ボタン */}
                                <Flex align="center" gap={6}>
                                    <Text fontWeight="bold">
                                        数量: {item.quantity}
                                    </Text>
                                    <Text fontWeight="black" color="gray.900">
                                        ¥
                                        {(
                                            item.price * item.quantity
                                        ).toLocaleString()}
                                    </Text>
                                    <Button
                                        size="sm"
                                        variant="ghost"
                                        colorPalette="red"
                                    >
                                        削除
                                    </Button>
                                </Flex>
                            </Flex>
                        ))}
                    </Stack>
                </Box>

                {/* 💳 右側：注文内容の合計エリア（サイドバー、横幅を固定気味にする） */}
                <Box
                    flex="1"
                    w="full"
                    bg="white"
                    p={6}
                    borderRadius="2xl"
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
                        colorPalette="purple"
                        w="full"
                        size="lg"
                        borderRadius="xl"
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
