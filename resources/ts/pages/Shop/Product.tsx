import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import {
    Box,
    Container,
    Heading,
    Flex,
    Text,
    Button,
    Stack,
    Badge,
    HStack,
    SimpleGrid,
    Spinner,
    Center,
} from "@chakra-ui/react";

interface ProductType {
    id: number;
    name: string;
    price: number;
    category: string;
    emoji: string;
    is_new: boolean;
    description: string;
}

export default function Product() {
    const { id } = useParams<{ id: string }>();

    // 📥 APIから取得した1件の商品データを管理する箱（最初は null）
    const [product, setProduct] = useState<ProductType | null>(null);
    // ⏳ 読み込み中の状態を管理
    const [loading, setLoading] = useState<boolean>(true);

    // 🔄 画面が開いたとき、およびURLのIDが変わったときに実行
    useEffect(() => {
        setLoading(true);
        fetch(`/api/products/${id}`) // 💡 LaravelのID個別指定APIを叩く
            .then((response) => {
                if (!response.ok) throw new Error("商品の取得に失敗しました");
                return response.json();
            })
            .then((data: ProductType) => {
                setProduct(data); // 💡 届いたデータをセット
                setLoading(false); // ローディング終了
            })
            .catch((error) => {
                console.error(error);
                setLoading(false);
            });
    }, [id]); // id が変わったら再読み込みする設定

    // ⏳ ロード中のぐるぐる表示
    if (loading) {
        return (
            <Center minH="100vh" flexDirection="column" gap={4}>
                <Spinner
                    color="purple.500"
                    size="xl"
                    width="40px"
                    height="40px"
                />
                <Text fontWeight="bold" color="gray.500">
                    商品情報を読み込み中...
                </Text>
            </Center>
        );
    }

    // 🚨 エラー安全対策（データが取れなかった場合）
    if (!product) {
        return (
            <Container maxW="xl" py={20} textAlign="center">
                <Text color="gray.500" mb={4} fontSize="lg">
                    ご指定の商品は存在しないか、売り切れました。
                </Text>
                <Button asChild colorPalette="purple" borderRadius="xl">
                    <Link to="/">ショップトップへ戻る</Link>
                </Button>
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
                mb={8}
                _hover={{ bg: "gray.100" }}
            >
                <Link to="/home">← 商品一覧に戻る</Link>
            </Button>

            <SimpleGrid
                columns={{ base: 1, md: 2 }}
                gap={{ base: 8, md: 12 }}
                alignItems="flex-start"
            >
                {/* 左側：商品画像エリア */}
                <Box
                    bg="white"
                    borderRadius="3xl"
                    border="1px solid"
                    borderColor="gray.100"
                    h={{ base: "320px", md: "500px" }}
                    display="flex"
                    alignItems="center"
                    justifyContent="center"
                    fontSize="9xl"
                    shadow="sm"
                >
                    {product.emoji}
                </Box>

                {/* 右側：商品情報エリア */}
                <Stack gap={6}>
                    <HStack justify="space-between" align="center">
                        <Text
                            fontSize="sm"
                            fontWeight="bold"
                            color="purple.600"
                            letterSpacing="wider"
                        >
                            {product.category}
                        </Text>
                        {product.is_new && (
                            <Badge
                                colorPalette="pink"
                                variant="solid"
                                borderRadius="md"
                                px={2.5}
                                py={0.5}
                                fontSize="xs"
                            >
                                NEW
                            </Badge>
                        )}
                    </HStack>

                    <Heading
                        as="h1"
                        size="3xl"
                        fontWeight="black"
                        color="gray.900"
                        lineHeight="tight"
                    >
                        {product.name}
                    </Heading>

                    <Text fontSize="3xl" fontWeight="black" color="gray.900">
                        ¥{product.price.toLocaleString()}
                        <Text
                            as="span"
                            fontSize="sm"
                            fontWeight="normal"
                            color="gray.400"
                            ml={2}
                        >
                            （税込）
                        </Text>
                    </Text>

                    <Box borderTop="1px solid" borderColor="gray.100" pt={6}>
                        <Text
                            fontWeight="bold"
                            mb={3}
                            color="gray.800"
                            fontSize="sm"
                        >
                            商品の説明
                        </Text>
                        {/* 💡 LaravelのAPIから届いた説明文が表示されます */}
                        <Text
                            color="gray.600"
                            fontSize="md"
                            lineHeight="relaxed"
                        >
                            {product.description}
                        </Text>
                    </Box>

                    <Stack
                        gap={3}
                        pt={6}
                        borderTop="1px solid"
                        borderColor="gray.100"
                    >
                        <Button
                            colorPalette="purple"
                            size="lg"
                            borderRadius="xl"
                            fontWeight="bold"
                            h="56px"
                            fontSize="md"
                            _hover={{ shadow: "md" }}
                            onClick={() =>
                                alert(
                                    `${product.name} をカートに追加しました（数量: 1）`,
                                )
                            }
                        >
                            カートに入れる
                        </Button>
                        <Text fontSize="xs" color="gray.400" textAlign="center">
                            🚚 全国一律送料無料 / 2〜3営業日以内に発送予定
                        </Text>
                    </Stack>
                </Stack>
            </SimpleGrid>
        </Container>
    );
}
