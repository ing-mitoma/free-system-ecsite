import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import {
  Box,
  Container,
  Heading,
  Text,
  SimpleGrid,
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
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    fetch("/api/products")
      .then((res) => res.json())
      .then((data) => {
        setProducts(data);
        setLoading(false);
      })
      .catch((error) => console.log("データの取得失敗", error));
    setLoading(true);
  }, []);

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
            <HomeCard key={product.id} product={product} />
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
