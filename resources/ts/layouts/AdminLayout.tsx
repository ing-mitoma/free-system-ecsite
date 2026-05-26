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

export default function Sidebar() {
    const navigate = useNavigate();
    const handleLogout = () => {
        localStorage.removeItem("admin_logged_in");
        navigate("/admin/login");
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
                        bg="gray.800"
                        borderRadius="xl"
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
