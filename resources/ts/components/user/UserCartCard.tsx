import { Card, Box, HStack, Badge, Button, Text, Flex } from "@chakra-ui/react";
import { Outlet } from "react-router";
interface cartItem {
    id: number;
    name: string;
    price: number;
    quantity: number;
    emoji: string;
}
interface itemProps {
    item: cartItem;
}
export default function CartCard({ item }: itemProps) {
    return (
        <Flex
            key={item.id}
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
                >
                    削除
                </Button>
            </Flex>
        </Flex>
    );
}
