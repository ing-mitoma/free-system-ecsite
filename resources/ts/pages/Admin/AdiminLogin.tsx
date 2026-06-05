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
  Field,
} from "@chakra-ui/react";

export default function AdminLogin() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [isError, setIsError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await fetch("/api/admin/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({ email, password }),
      });
      const data = await response.json();

      if (response.ok) {
        localStorage.setItem("admin_user", JSON.stringify(data.user));
        navigate("/admin/home");
      } else {
        setIsError(true);
        setErrorMessage(data.message || "ログインに失敗しました。");
      }
    } catch (error) {
      setIsError(true);
      setErrorMessage("サーバーとの通信に失敗しました。");
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
              <Heading size="xl" fontWeight="black" color="black.600" mb={2}>
                FREE SYSTEM
              </Heading>
              <Text fontSize="sm" color="gray.500">
                管理者アカウントでログインしてください
              </Text>
            </Box>

            <Stack gap="8">
              <Field.Root>
                <Field.Label> メールアドレス</Field.Label>
                <Input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="admin@minimal.com"
                  required
                />
              </Field.Root>

              <Field.Root>
                <Field.Label>パスワード</Field.Label>
                <Input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  required
                />
              </Field.Root>
            </Stack>
            <Button type="submit" colorPalette="black" fontWeight="bold">
              ログイン
            </Button>
          </Stack>
        </form>
      </Container>
    </Center>
  );
}
