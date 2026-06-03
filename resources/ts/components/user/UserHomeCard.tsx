import {
  LinkBox,
  Card,
  Button,
  LinkOverlay,
  Text,
  Box,
} from "@chakra-ui/react";
import { Link } from "react-router";
export interface Product {
  id: number;
  name: string;
  price: number;
  category: string;
  emoji: string;
}
interface HomeCardProps {
  product: Product;
}
export default function HomeCard({ product }: HomeCardProps) {
  return (
    <LinkBox asChild>
      <Card.Root maxW="sm" overflow="hidden">
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
        <Card.Body gap="2">
          <Text>{product.category}</Text>
          <Card.Title>{product.name}</Card.Title>
          <Text fontSize="lg" fontWeight="black" color="gray.900" mt={2}>
            ¥{product.price.toLocaleString()}
          </Text>
        </Card.Body>
        <Card.Footer gap="2">
          <Button variant="solid" w="full" fontWeight={"bold"} asChild>
            <LinkOverlay asChild>
              <LinkOverlay asChild>
                <Link to={`/product/${product.id}`}>商品の詳細へ</Link>
              </LinkOverlay>
            </LinkOverlay>
          </Button>
        </Card.Footer>
      </Card.Root>
    </LinkBox>
  );
}
