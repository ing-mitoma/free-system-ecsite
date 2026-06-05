import { Box, Button, Text, Flex } from "@chakra-ui/react";
import { toaster } from "../../pages/Shop/ui/toaster";

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
  onUpdataQuantity: (productId: number, newQuantity: number) => void;
}

export default function CartCard({
  item,
  onDelete,
  onUpdataQuantity,
}: CartCardProps) {
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
        <Flex
          align="center"
          border="1px solid"
          borderColor="gray.200"
          borderRadius="md"
          p={1}
          gap={2}
        >
          <Button
            size="xs"
            variant="ghost"
            disabled={item.quantity <= 1}
            onClick={() => {
              onUpdataQuantity(item.product_id, item.quantity - 1);
            }}
          >
            -
          </Button>

          <Text fontWeight="bold" minW="40px" textAlign="center">
            {item.quantity}
          </Text>

          <Button
            size="xs"
            variant="ghost"
            onClick={() => {
              onUpdataQuantity(item.product_id, item.quantity + 1);
            }}
          >
            +
          </Button>
        </Flex>

        <Flex align="center" gap={4}>
          <Text
            fontWeight="black"
            color="gray.900"
            minW="90px"
            textAlign="right"
          >
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
                duration: 2000,
                closable: true,
              });
            }}
          >
            削除
          </Button>
        </Flex>
      </Flex>
    </Flex>
  );
}
