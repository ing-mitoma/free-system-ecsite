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
import {
  LoginSchemaType,
  LoginSchema,
} from "../../components/validation/AdminLoginValidation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

export default function AdminLogin() {
  const [isError, setIsError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<LoginSchemaType>({
    resolver: zodResolver(LoginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });
  const onSubmit = (data: LoginSchemaType) => {
    fetch("/api/admin/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify(data),
    })
      .then(async (res) => {
        const resData = await res.json();
        if (res.ok) {
          localStorage.setItem("admin_user", JSON.stringify(resData.user));
          navigate("/admin/home");
          reset();
        } else {
          throw new Error(resData.message || "ログインに失敗しました。");
        }
      })
      .catch((error) => {
        setErrorMessage(error.message || "ログインに失敗しました。");
      });
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
        <form onSubmit={handleSubmit(onSubmit)}>
          <Stack gap={6}>
            <Box textAlign="center">
              <Heading size="xl" fontWeight="black" color="black.600" mb={2}>
                FREE SYSTEM
              </Heading>
              <Text fontSize="sm" color="gray.500">
                管理者アカウントでログインしてください
              </Text>
            </Box>

            {errorMessage && (
              <Text color="red.600" fontSize="sm" textAlign="center">
                {errorMessage}
              </Text>
            )}

            <Stack gap="8">
              <Field.Root>
                <Field.Label>メールアドレス</Field.Label>
                <Input {...register("email")} />
                {errors.email && (
                  <p style={{ color: "red" }}>{errors.email.message}</p>
                )}
              </Field.Root>
              <Field.Root>
                <Input
                  type="password"
                  placeholder="••••••••"
                  {...register("password")}
                />
                {errors.password && (
                  <p style={{ color: "red" }}>{errors.password.message}</p>
                )}
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
