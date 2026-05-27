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
import HomeCard from "../../components/user/UserHomeCard";

interface Product {
    id: number;
    name: string;
    price: number;
    category: string;
    emoji: string;
    is_new: boolean;
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

    if (loading) {
        return (
            <Center minH="100vh" flexDirection="column" gap={4}>
                <Spinner color="black" size="xl" width="40px" height="40px" />
                <Text fontWeight="bold" color="gray.500">
                    商品を読み込み中...
                </Text>
            </Center>
        );
    }

    return (
        <Box minH="100vh" bg="gray.50" color="gray.800" pb={16}>
            <Container maxW="6xl" mt={12}>
                <SimpleGrid columns={{ base: 1, sm: 2, md: 3 }} gap={8}>
                    {products.map((product) => (
                        <HomeCard product={product} />
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
