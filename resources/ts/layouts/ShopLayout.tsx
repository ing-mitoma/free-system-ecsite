import React from "react";
import { Flex, Box } from "@chakra-ui/react";
import Header from "../components/user/Header";
import Footer from "../components/user/Footer";

interface ShopLayoutProps {
    children: React.ReactNode;
}

export default function ShopLayout({ children }: ShopLayoutProps) {
    return (
        <Flex direction="column" minH="100vh" bg="gray.50">
            <Header />

            <Box as="main" flex="1">
                {children}
            </Box>

            <Footer />
        </Flex>
    );
}
