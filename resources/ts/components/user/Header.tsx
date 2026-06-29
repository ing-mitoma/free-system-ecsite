import React from "react";
import { Link, useLocation } from "react-router-dom";
import {
  Box,
  Flex,
  Heading,
  Input,
  IconButton,
  Container,
} from "@chakra-ui/react";

export default function Header() {
  const location = useLocation();

  const isHomePage = location.pathname === "/home";

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
          <Heading size="lg" fontWeight="black" color="black">
            <Link to="/home">FREE SYSTEM</Link>
          </Heading>
          {isHomePage ? (
            <Input
              placeholder="キーワードで商品を検索..."
              maxW="400px"
              variant="subtle"
              borderRadius="xl"
              bg="gray.50"
              display={{ base: "none", md: "block" }}
            />
          ) : (
            <Box
              maxW="400px"
              width="full"
              display={{ base: "none", md: "block" }}
            />
          )}

          <Flex align="center" gap={4}>
            <Box position="relative" textDecoration="none" asChild>
              <Link to="/cart">
                <IconButton
                  aria-label="Cart"
                  variant="ghost"
                  fontSize="xl"
                  borderRadius="full"
                >
                  🛒
                </IconButton>
              </Link>
            </Box>
          </Flex>
        </Flex>
      </Container>
    </Box>
  );
}
