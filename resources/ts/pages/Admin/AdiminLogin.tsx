import { useState } from "react";
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
import { useMutation } from "@tanstack/react-query";

export default function AdminLogin() {
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

  const loginMutation = useMutation({
    mutationFn: async (formData: LoginSchemaType) => {
      const response = await fetch("/api/admin/login", {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify(formData),
      });
      const resData = await response.json();

      if (!response.ok) {
        throw new Error(resData.message || "ログインに失敗しました。");
      }
      return resData;
    },
    onSuccess: () => {
      reset();
      navigate("/admin/home");
    },
    onError: (error: Error) => {
      setErrorMessage(error.message);
    },
  });

  const onSubmit = (data: LoginSchemaType) => {
    setErrorMessage("");
    loginMutation.mutate(data);
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
