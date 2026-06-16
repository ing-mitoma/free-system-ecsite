import { useParams, Link } from "react-router-dom";
import {
  Box,
  Container,
  Heading,
  Text,
  Button,
  Stack,
  HStack,
  SimpleGrid,
  Spinner,
  Center,
} from "@chakra-ui/react";
import { useQuery } from "@tanstack/react-query";

interface ProductType {
  id: number;
  name: string;
  price: number;
  category: string;
  emoji: string;
  description: string;
}

export default function Product() {
  const { id } = useParams<{ id: string }>();
  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["product", id],
    queryFn: async () => {
      const response = await fetch(`/api/products/${id}`);
      if (!response.ok) throw new Error("商品情報が取得できませんでした。");
      return response.json() as Promise<ProductType>;
    },
  });

  if (isError) return <p>エラー: {error.message}</p>;

  if (isLoading) {
    return (
      <Center minH="100vh" flexDirection="column" gap={4}>
        <Spinner color="black.500" size="xl" width="40px" height="40px" />
        <Text fontWeight="bold" color="gray.500">
          商品情報を読み込み中...
        </Text>
      </Center>
    );
  }

  if (!data) {
    return (
      <Container maxW="xl" py={20} textAlign="center">
        <Text color="gray.500" mb={4} fontSize="lg">
          ご指定の商品は存在しないか、売り切れました。
        </Text>
        <Button asChild colorPalette="black" borderRadius="xl">
          <Link to="/">ショップトップへ戻る</Link>
        </Button>
      </Container>
    );
  }

  const handleAddToCart = (data: ProductType) => {
    const currentCartData = localStorage.getItem("cart") || "[]";
    const cartItems = JSON.parse(currentCartData);

    const existItemIndex = cartItems.findIndex(
      (item: any) => item.product_id === data.id
    );
    if (existItemIndex > -1) {
      cartItems[existItemIndex].quantity++;
    } else {
      cartItems.push({
        product_id: data.id,
        quantity: 1,
      });
    }

    const updatedCartData = JSON.stringify(cartItems);
    localStorage.setItem("cart", updatedCartData);
  };

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
        <Box
          bg="white"
          border="1px solid"
          borderColor="gray.100"
          h={{ base: "320px", md: "500px" }}
          display="flex"
          alignItems="center"
          justifyContent="center"
          fontSize="9xl"
          shadow="sm"
        >
          {data.emoji}
        </Box>

        <Stack gap={6}>
          <HStack justify="space-between" align="center">
            <Text
              fontSize="sm"
              fontWeight="bold"
              color="black.600"
              letterSpacing="wider"
            >
              {data.category}
            </Text>
          </HStack>

          <Heading
            as="h1"
            size="3xl"
            fontWeight="black"
            color="gray.900"
            lineHeight="tight"
          >
            {data.name}
          </Heading>

          <Text fontSize="3xl" fontWeight="black" color="gray.900">
            ¥{data.price.toLocaleString()}
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
            <Text fontWeight="bold" mb={3} color="gray.800" fontSize="sm">
              商品の説明
            </Text>
            <Text color="gray.600" fontSize="md" lineHeight="relaxed">
              {data.description}
            </Text>
          </Box>

          <Stack gap={3} pt={6} borderTop="1px solid" borderColor="gray.100">
            <Button
              colorPalette="black"
              size="lg"
              fontWeight="bold"
              h="56px"
              fontSize="md"
              _hover={{ shadow: "md" }}
              onClick={() => handleAddToCart(data)}
              asChild
            >
              <Link to="/home">カートへ入れる</Link>
            </Button>
            <Text fontSize="s" color="gray.400" textAlign="center">
              全国一律送料無料 / 2〜3営業日以内に発送予定
            </Text>
          </Stack>
        </Stack>
      </SimpleGrid>
    </Container>
  );
}
