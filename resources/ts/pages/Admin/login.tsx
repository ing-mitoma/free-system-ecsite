import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
    Box,
    Container,
    Heading,
    Text,
    Stack,
    Input,
    Button,
    Center,
} from "@chakra-ui/react";

export default function AdminLogin() {
    const navigate = useNavigate();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleLogin = (e: React.FormEvent) => {
        e.preventDefault();

        // 💡 テスト用の簡易ログインチェック（のちにLaravelのAPIと連動させます）
        if (email === "admin@minimal.com" && password === "password") {
            // ブラウザの記憶（localStorage）に「ログイン中！」のスタンプを押す
            localStorage.setItem("admin_logged_in", "true");
            // 管理画面のトップへ進む
            navigate("/admin");
        } else {
            alert(
                "メールアドレスまたはパスワードが違います。\n(テスト用: admin@minimal.com / password)",
            );
        }
    };

    return (
        <Center minH="100vh" bg="gray.50">
            <Container
                maxW="md"
                p={8}
                bg="white"
                border="1px solid"
                borderColor="gray.100"
                shadow="md"
            >
                <form onSubmit={handleLogin}>
                    <Stack gap={6}>
                        <Box textAlign="center">
                            <Heading
                                size="xl"
                                fontWeight="black"
                                color="black.600"
                                mb={2}
                            >
                                FREE SYSTEM
                            </Heading>
                            <Text fontSize="sm" color="gray.500">
                                管理者アカウントでログインしてください
                            </Text>
                        </Box>

                        <Stack gap={4}>
                            <Box>
                                <Text
                                    fontSize="xs"
                                    fontWeight="bold"
                                    mb={1}
                                    color="gray.600"
                                >
                                    メールアドレス
                                </Text>
                                <Input
                                    type="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    placeholder="admin@minimal.com"
                                    bg="gray.50"
                                    variant="subtle"
                                    h="48px"
                                    required
                                />
                            </Box>
                            <Box>
                                <Text
                                    fontSize="xs"
                                    fontWeight="bold"
                                    mb={1}
                                    color="gray.600"
                                >
                                    パスワード
                                </Text>
                                <Input
                                    type="password"
                                    value={password}
                                    onChange={(e) =>
                                        setPassword(e.target.value)
                                    }
                                    placeholder="••••••••"
                                    bg="gray.50"
                                    variant="subtle"
                                    h="48px"
                                    required
                                />
                            </Box>
                        </Stack>

                        <Button
                            type="submit"
                            colorPalette="black"
                            w="full"
                            size="lg"
                            fontWeight="bold"
                            h="50px"
                        >
                            ログイン
                        </Button>
                    </Stack>
                </form>
            </Container>
        </Center>
    );
}
