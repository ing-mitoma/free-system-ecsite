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
} from "@chakra-ui/react";
import { Link, useNavigate } from "react-router-dom";

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
                <Stack gap={2}>
                    <Box
                        p={3}
                        borderRadius="xl"
                        _hover={{ bg: "gray.800" }}
                        color="gray.400"
                        fontWeight="bold"
                    >
                        <Link to="/admin">🏠 ホーム</Link>
                    </Box>
                    <Box
                        p={3}
                        borderRadius="xl"
                        _hover={{ bg: "gray.800" }}
                        color="gray.400"
                        transition="0.2s"
                    >
                        <Link to="/admin/products">📦 商品管理</Link>
                    </Box>
                    <Box
                        p={3}
                        borderRadius="xl"
                        _hover={{ bg: "gray.800" }}
                        color="gray.400"
                        transition="0.2s"
                    >
                        <Link to="/admin/users">👥 管理者一覧</Link>
                    </Box>
                </Stack>
            </Box>
            <Button
                variant="ghost"
                color="gray.400"
                justifyContent="flex-start"
                p={3}
                _hover={{ bg: "red.900", color: "red.200" }}
                onClick={handleLogout}
            >
                🚪 ログアウト
            </Button>
        </Box>
    );
}
