import {
    Box,
    Flex,
    Heading,
    Text,
    Stack,
    SimpleGrid,
    Button,
    HStack,
    Card,
    VStack,
} from "@chakra-ui/react";
import { Link, useNavigate } from "react-router-dom";
import SidebarButton from "./SiderbarButton";

interface SidebarProps {
    onLogout: () => void;
}

export default function Sidebar({ onLogout }: SidebarProps) {
    const handleLogout = () => {
        localStorage.removeItem("admin_logged_in");
        onLogout();
    };
    return (
        <Box
            w="260px"
            bg="gray.900"
            color="white"
            p={6}
            display={{ base: "none", md: "flex" }}
            flexDirection="column"
        >
            <Box flex="1">
                <Heading
                    size="md"
                    mb={8}
                    fontWeight="black"
                    letterSpacing="wider"
                    color="white"
                >
                    FREE SYSTEM
                </Heading>
                <VStack gap={2} align="stretch">
                    <SidebarButton title={"ホーム"} page={"home"} />
                    <SidebarButton title={"商品一覧"} page={"products"} />
                    <SidebarButton title={"管理者一覧"} page={"users"} />
                </VStack>
            </Box>
            <Button
                fontWeight={"bold"}
                variant="ghost"
                color="gray"
                onClick={handleLogout}
            >
                ログアウト
            </Button>
        </Box>
    );
}
