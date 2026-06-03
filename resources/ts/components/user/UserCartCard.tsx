import { Box, Button, Text, Flex } from "@chakra-ui/react";
import { toaster } from "../../../../src/components/ui/toaster";

interface CartItemType {
  product_id: number;
  name: string;
  emoji: string;
  price: number;
  quantity: number;
  subtotal: number;
}
interface CartCardProps {
  item: CartItemType;
  onDelete: (productId: number) => void;
}

export default function CartCard({ item, onDelete }: CartCardProps) {
  return (
    <Flex
      bg="white"
      p={5}
      border="1px solid"
      borderColor="black"
      align="center"
      justify="space-between"
    >
      <Flex align="center" gap={4}>
        <Box fontSize="4xl" bg="gray.50" p={2}>
          {item.emoji}
        </Box>
        <Box>
          <Text fontWeight="bold" color="gray.900">
            {item.name}
          </Text>
          <Text fontSize="sm" color="gray.500">
            単価: ¥{item.price.toLocaleString()}
          </Text>
        </Box>
      </Flex>
      <Flex align="center" gap={6}>
        <Text fontWeight="bold">数量: {item.quantity}</Text>
        <Text fontWeight="black" color="gray.900">
          ¥{(item.price * item.quantity).toLocaleString()}
        </Text>
        <Button
          size="sm"
          variant="ghost"
          colorPalette="red"
          border="1px solid"
          onClick={() => {
            onDelete(item.product_id);
            toaster.create({
              description: "商品を削除しました",
              type: "info",
              closable: true,
            });
          }}
        >
          削除
        </Button>
      </Flex>
    </Flex>
  );
}
