import {
  Box,
  Container,
  Text,
  SimpleGrid,
  Spinner,
  Center,
} from "@chakra-ui/react";
import HomeCard from "../../components/user/UserHomeCard";
import { useQuery } from "@tanstack/react-query";

interface Product {
  id: number;
  name: string;
  price: number;
  category: string;
  emoji: string;
  is_new: boolean;
}

const Home = () => {
  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["product"],
    queryFn: async () => {
      const response = await fetch(`/api/products`);
      if (!response.ok) throw new Error("商品一覧の取得に失敗しました");
      return response.json() as Promise<Product[]>;
    },
  });

  if (isLoading) {
    return (
      <Center minH="100vh" flexDirection="column" gap={4}>
        <Spinner color="black" size="xl" width="40px" height="40px" />
        <Text fontWeight="bold" color="gray.500">
          商品を読み込み中...
        </Text>
      </Center>
    );
  }
  if (isError) {
    return (
      <div className="p-8">
        <p className="text-red-500">エラー: {error.message}</p>
      </div>
    );
  }

  return (
    <Box minH="100vh" bg="gray.50" color="gray.800" pb={16}>
      <Container maxW="6xl" mt={12}>
        <SimpleGrid columns={{ base: 1, sm: 2, md: 3 }} gap={8}>
          {data?.map((product) => (
            <HomeCard key={product.id} product={product} />
          ))}
        </SimpleGrid>

        {data?.length === 0 && (
          <Text textAlign="center" color="gray.400" mt={12}>
            現在、販売中の商品はありません。
          </Text>
        )}
      </Container>
    </Box>
  );
};

export default Home;
