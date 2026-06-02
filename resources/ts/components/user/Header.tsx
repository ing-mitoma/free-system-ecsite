import React from "react";
import { Link } from "react-router-dom";
import {
  Box,
  Flex,
  Heading,
  Input,
  IconButton,
  Badge,
  Container,
} from "@chakra-ui/react";

export default function Header() {
  return (
    <Box
      as="header"
      bg="white"
      borderBottom="1px solid"
      borderColor="gray.100"
      position="sticky"
      top="0"
      zIndex="100"
      py={4}
    >
      <Container maxW="6xl">
        <Flex align="center" justify="space-between" gap={4}>
          {/* 🏬 ロゴエリア */}
          <Heading
            size="lg"
            fontWeight="black"
            color="black"
            asChild // 💡 1. これを追加して、中身の Link コンポーネントに Chakra のデザインを継承させます
          >
            {/* 💡 2. as="a" と href="/" の代わりに、Link と to="/" を使います */}
            <Link to="/home">FREE SYSTEM</Link>
          </Heading>
          {/* 🔍 検索バー（PCサイズ以上で表示、スマホでは隠す） */}
          <Input
            placeholder="キーワードで商品を検索..."
            maxW="400px"
            variant="subtle"
            borderRadius="xl"
            bg="gray.50"
            display={{ base: "none", md: "block" }}
          />

          {/* 🛒 アイコンエリア */}
          <Flex align="center" gap={4}>
            <Box position="relative" textDecoration="none" asChild>
              <Link to="/cart">
                {/* カートの絵文字ボタン */}
                <IconButton
                  aria-label="Cart"
                  variant="ghost"
                  fontSize="xl"
                  borderRadius="full"
                >
                  🛒
                </IconButton>

                {/* カート内の商品数バッジ */}
                <Badge
                  colorPalette="pink"
                  variant="solid"
                  position="absolute"
                  top="-1"
                  right="-1"
                  borderRadius="full"
                  px={1.5}
                  fontSize="10px"
                >
                  1{/*カート内の商品点数を表す数*/}
                </Badge>
              </Link>
            </Box>
          </Flex>
        </Flex>
      </Container>
    </Box>
  );
}
