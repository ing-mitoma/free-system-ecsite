import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import {
    Box,
    Container,
    Heading,
    Text,
    SimpleGrid,
    Button,
    Flex,
    Badge,
    Spinner,
    Center,
} from "@chakra-ui/react";

// 💡 TypeScriptの型定義（LaravelのAPIから届くデータの形を定義）
interface Product {
    id: number;
    name: string;
    price: number; // 数値型にしてあとでフォーマットしやすくします
    category: string;
    emoji: string;
    is_new: boolean; // Laravel側と合わせてスネークケースに
}

const Home = () => {
    // 📥 1. APIから届く商品データを格納する空箱（State）
    const [products, setProducts] = useState<Product[]>([]);
    // ⏳ 2. 読み込み中（ローディング）の状態を管理
    const [loading, setLoading] = useState<boolean>(true);

    // 🔄 3. 画面が立ち上がった瞬間に、自動でLaravelのAPIを叩きに行く
    useEffect(() => {
        fetch("/api/products") // Laravel側のルートを呼び出す
            .then((response) => {
                if (!response.ok) throw new Error("データの取得に失敗しました");
                return response.json();
            })
            .then((data: Product[]) => {
                setProducts(data); // 💡 届いたデータをReactの箱にセット！
                setLoading(false); // ローディングを終了
            })
            .catch((error) => {
                console.error(error);
                setLoading(false);
            });
    }, []); // 空の配列 [] は「最初の1回だけ実行する」という意味

    // ⏳ もしロード中なら、Chakra UIのオシャレなぐるぐる（Spinner）を画面中央に出す
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
                    商品を読み込み中...
                </Text>
            </Center>
        );
    }

    return (
        <Box minH="100vh" bg="gray.50" color="gray.800" pb={16}>
            <Container maxW="6xl" mt={12}>
                {/* 🛍️ 商品グリッド（APIの数だけ map 関数で自動生成） */}
                <SimpleGrid columns={{ base: 1, sm: 2, md: 3 }} gap={8}>
                    {products.map((product) => (
                        <Box
                            key={product.id} // 💡 map関数の中では一意のキー（id）が必須です
                            bg="white"
                            border="1px solid"
                            borderColor="gray.100"
                            shadow="sm"
                            overflow="hidden"
                            _hover={{
                                shadow: "md",
                                transform: "translateY(-4px)",
                            }}
                            transition="all 0.3s"
                            display="flex"
                            flexDirection="column"
                            asChild
                        >
                            {/* 💡 3. カード全体を囲うように Link を配置（バッククォートでURLにIDを埋め込む） */}
                            <Link
                                to={`/product/${product.id}`}
                                style={{
                                    textDecoration: "none",
                                    color: "inherit",
                                }}
                            >
                                {/* 商品画像エリア */}
                                <Box
                                    bg="gray.50"
                                    h="200px"
                                    display="flex"
                                    alignItems="center"
                                    justifyContent="center"
                                    fontSize="6xl"
                                >
                                    {product.emoji}
                                </Box>

                                {/* 商品情報エリア */}
                                <Box
                                    p={6}
                                    flex="1"
                                    display="flex"
                                    flexDirection="column"
                                >
                                    <Flex
                                        justify="space-between"
                                        align="center"
                                        mb={2}
                                    >
                                        <Text
                                            fontSize="xs"
                                            fontWeight="bold"
                                            color="black"
                                        >
                                            {product.category}
                                        </Text>
                                    </Flex>

                                    <Heading
                                        as="h3"
                                        size="sm"
                                        fontWeight="bold"
                                        mb={2}
                                        color="gray.900"
                                        lineClamp={2}
                                        flex="1"
                                    >
                                        {product.name}
                                    </Heading>

                                    {/* 💡 数字の価格を日本円表記（¥12,800など）に綺麗にフォーマット */}
                                    <Text
                                        fontSize="lg"
                                        fontWeight="black"
                                        color="gray.900"
                                        mb={4}
                                    >
                                        ¥{product.price.toLocaleString()}
                                    </Text>

                                    <Button
                                        colorPalette="black"
                                        w="full"
                                        fontWeight="bold"
                                    >
                                        カートに入れる
                                    </Button>
                                </Box>
                            </Link>
                        </Box>
                    ))}
                </SimpleGrid>

                {/* セーフティ：もし商品が1件もない場合の表示 */}
                {products.length === 0 && (
                    <Text textAlign="center" color="gray.400" mt={12}>
                        現在、販売中の商品はありません。
                    </Text>
                )}
            </Container>
        </Box>
    );
};

export default Home;
