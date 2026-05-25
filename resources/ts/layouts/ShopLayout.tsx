import React from "react";
import { Flex, Box } from "@chakra-ui/react";
import Header from "../components/Header";
import Footer from "../components/Footer";

interface ShopLayoutProps {
    children: React.ReactNode;
}

export default function ShopLayout({ children }: ShopLayoutProps) {
    return (
        // Flexを縦並び（column）にし、minH="100vh" にすることで、
        // ページの中身が少なくてもフッターが必ず画面の一番下に固定される実務のテクニックです
        <Flex direction="column" minH="100vh" bg="gray.50">
            <Header />

            <Box as="main" flex="1">
                {children}
            </Box>

            <Footer />
        </Flex>
    );
}
