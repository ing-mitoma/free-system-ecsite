import React from "react";
import { Link } from "react-router-dom";
import {
    Box,
    Container,
    Heading,
    Flex,
    Text,
    Button,
    Stack,
    Input,
    SimpleGrid,
    Field,
    Switch,
} from "@chakra-ui/react";

export default function Checkout() {
    // 💡 表示用の仮の金額設定（後ほどカートと連動させます）
    const itemTotal = 21300;
    const shippingFee = 0;
    const finalTotal = itemTotal + shippingFee;

    return (
        <Container maxW="6xl" py={12}>
            {/* カートに戻るリンクボタン */}
            <Button
                asChild
                variant="ghost"
                size="sm"
                color="gray.500"
                mb={6}
                _hover={{ bg: "gray.100" }}
            >
                <Link to="/cart">← カートに戻る</Link>
            </Button>

            <Heading as="h1" size="2xl" mb={8} fontWeight="black">
                ご購入手続き
            </Heading>

            {/* PCでは 2カラム（左: 入力, 右: 金額）、スマホでは縦1列になるレイアウト */}
            <SimpleGrid
                columns={{ base: 1, lg: 3 }}
                gap={8}
                alignItems="flex-start"
            >
                <Stack
                    gap="8"
                    maxW="sm"
                    css={{ "--field-label-width": "96px" }}
                >
                    <Field.Root>
                        <Field.Label>お名前</Field.Label>
                        <Input placeholder="田中" />
                        <Input placeholder="太郎" />
                    </Field.Root>

                    <Field.Root>
                        <Field.Label>メールアドレス</Field.Label>
                        <Input placeholder="me@example.com" />
                    </Field.Root>
                    <Field.Root>
                        <Field.Label>Email</Field.Label>
                        <Input placeholder="me@example.com" />
                    </Field.Root>
                    <Field.Root>
                        <Field.Label>配送先住所</Field.Label>
                        <Input placeholder="郵便番号（例: 123-4567）" />
                        <Input placeholder="都道府県・市区町村（例: 東京都渋谷区神南）" />
                        <Input placeholder="番地・ビル名・部屋番号" />
                    </Field.Root>
                </Stack>
            </SimpleGrid>
            <SimpleGrid
                columns={{ base: 1, lg: 3 }}
                gap={8}
                alignItems="flex-start"
            >
                {/* 📝 左側カラム（3つ中2つの幅）：お客様情報 ＆ 配送先入力フォーム */}
                <Box gridColumn={{ lg: "span 2" }}>
                    <Box
                        bg="white"
                        p={6}
                        border="1px solid"
                        borderColor="gray.100"
                        shadow="sm"
                    >
                        <Stack gap={6}>
                            {/* 👤 氏名入力エリア */}
                            <Box>
                                <Text
                                    fontSize="xs"
                                    fontWeight="bold"
                                    mb={2}
                                    color="gray.700"
                                >
                                    お名前
                                </Text>
                                <SimpleGrid columns={2} gap={4}>
                                    <Input
                                        placeholder="姓（例: 山田）"
                                        bg="gray.50"
                                        variant="subtle"
                                        h="48px"
                                    />
                                    <Input
                                        placeholder="名（例: 太郎）"
                                        bg="gray.50"
                                        variant="subtle"
                                        h="48px"
                                    />
                                </SimpleGrid>
                            </Box>

                            {/* ✉️ メールアドレス入力エリア */}
                            <Box>
                                <Text
                                    fontSize="xs"
                                    fontWeight="bold"
                                    mb={2}
                                    color="gray.700"
                                >
                                    メールアドレス
                                </Text>
                                <Input
                                    type="email"
                                    placeholder="example@minimal.com"
                                    bg="gray.50"
                                    variant="subtle"
                                    h="48px"
                                />
                            </Box>

                            {/* 📍 配送先入力エリア */}
                            <Box>
                                <Text
                                    fontSize="xs"
                                    fontWeight="bold"
                                    mb={2}
                                    color="gray.700"
                                >
                                    配送先住所
                                </Text>
                                <Stack gap={3}>
                                    <Input
                                        placeholder="郵便番号（例: 123-4567）"
                                        maxW="240px"
                                        bg="gray.50"
                                        variant="subtle"
                                        h="48px"
                                    />
                                    <Input
                                        placeholder="都道府県・市区町村（例: 東京都渋谷区神南）"
                                        bg="gray.50"
                                        variant="subtle"
                                        h="48px"
                                    />
                                    <Input
                                        placeholder="番地・ビル名・部屋番号"
                                        bg="gray.50"
                                        variant="subtle"
                                        h="48px"
                                    />
                                </Stack>
                            </Box>
                        </Stack>
                    </Box>
                </Box>

                {/* 🧾 右側カラム（3つ中1つの幅）：金額表示 ＆ 注文確定ボタン */}
                <Box
                    bg="white"
                    p={6}
                    border="1px solid"
                    borderColor="gray.100"
                    shadow="sm"
                >
                    <Heading
                        as="h2"
                        size="sm"
                        mb={4}
                        fontWeight="bold"
                        color="gray.800"
                    >
                        注文内容の確認
                    </Heading>

                    {/* 金額の明細 */}
                    <Stack gap={3} mb={6} fontSize="sm" color="gray.600">
                        <Flex justify="space-between">
                            <Text>商品小計</Text>
                            <Text fontWeight="medium" color="gray.900">
                                ¥{itemTotal.toLocaleString()}
                            </Text>
                        </Flex>
                        <Flex justify="space-between">
                            <Text>配送料</Text>
                            <Text color="green.600" fontWeight="medium">
                                無料
                            </Text>
                        </Flex>
                        <hr style={{ borderColor: "#F3F4F6" }} />
                        <Flex
                            justify="space-between"
                            fontSize="lg"
                            fontWeight="black"
                            color="gray.900"
                        >
                            <Text>最終合計金額</Text>
                            <Text fontSize="xl">
                                ¥{finalTotal.toLocaleString()}
                            </Text>
                        </Flex>
                    </Stack>

                    {/* 注文確定ボタン */}
                    <Button
                        colorPalette="black"
                        w="full"
                        size="lg"
                        fontWeight="bold"
                        h="56px"
                        _hover={{ shadow: "md" }}
                        onClick={() =>
                            alert(
                                "注文が確定しました！ご購入ありがとうございます。（テスト）",
                            )
                        }
                    >
                        注文を確定する
                    </Button>
                </Box>
            </SimpleGrid>
        </Container>
    );
}
