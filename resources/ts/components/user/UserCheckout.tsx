import {
  Container,
  Button,
  Heading,
  SimpleGrid,
  Box,
  Stack,
  Field,
  Flex,
  Input,
  DataList,
  Separator,
} from "@chakra-ui/react";
import { Form, Link } from "react-router";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  orderFormSchema,
  OrderFormInput,
} from "../validation/CheckoutValidation";
import { useForm } from "react-hook-form";

interface CartItemType {
  product_id: number;
  name: string;
  emoji: string;
  price: number;
  quantity: number;
  subtotal: number;
}

interface CartDetailType {
  items: CartItemType[];
  total_amount: number;
}

interface UserCheckoutProps {
  cartDataDetails: CartDetailType;
}

export default function UserCheckout({ cartDataDetails }: UserCheckoutProps) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<OrderFormInput>({
    resolver: zodResolver(orderFormSchema),
    defaultValues: {
      lastName: "",
      firstName: "",
      email: "",
      zipCode: "",
      addressLine1: "",
      addressLine2: "",
    },
  });
  const onSubmit = () => {
    alert("商品の購入が完了しました！");
  };

  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
      <Container maxW="6xl" py={12}>
        <Button
          asChild
          variant="ghost"
          size="sm"
          color="gray.500"
          mb={6}
          _hover={{ bg: "gray.100" }}
        >
          <Link to="/cart">← カートに戻る</Link>
        </Button>

        <Heading as="h1" size="2xl" mb={8} fontWeight="black">
          ご購入手続き
        </Heading>

        <SimpleGrid
          columns={{ base: 1, lg: 3 }}
          gap={8}
          alignItems="flex-start"
        >
          <Box gridColumn={{ lg: "span 2" }}>
            <Box
              bg="white"
              p={6}
              border="1px solid"
              borderColor="gray.100"
              shadow="sm"
            >
              <Stack gap="8" maxW="sm" css={{ "--field-label-width": "96px" }}>
                <Field.Root>
                  <Field.Label fontWeight="bold">名前</Field.Label>
                  <Flex gap={4}>
                    <Field.Root invalid={!!errors.lastName}>
                      <Input placeholder="田中" {...register("lastName")} />
                      {errors.lastName && (
                        <p style={{ color: "red", fontSize: "14px" }}>
                          {errors.lastName.message}
                        </p>
                      )}
                    </Field.Root>

                    <Field.Root invalid={!!errors.firstName}>
                      <Input placeholder="太郎" {...register("firstName")} />
                      {errors.firstName && (
                        <p style={{ color: "red", fontSize: "14px" }}>
                          {errors.firstName.message}
                        </p>
                      )}
                    </Field.Root>
                  </Flex>
                </Field.Root>
                <Field.Root invalid={!!errors.email}>
                  <Field.Label fontWeight={"bold"}>メールアドレス</Field.Label>
                  <Input
                    placeholder="example@example.com"
                    {...register("email")}
                  />
                  {errors.email && (
                    <p style={{ color: "red", fontSize: "14px" }}>
                      {errors.email.message}
                    </p>
                  )}
                </Field.Root>

                <Field.Root invalid={!!errors.zipCode}>
                  <Field.Label fontWeight={"bold"}>配送先住所</Field.Label>
                  <Stack gap={2} width="full">
                    <Input
                      maxW={"200px"}
                      placeholder="郵便番号（例: 1234567）"
                      {...register("zipCode")}
                    />
                    {errors.zipCode && (
                      <p style={{ color: "red", fontSize: "14px" }}>
                        {errors.zipCode.message}
                      </p>
                    )}
                    <Field.Root invalid={!!errors.addressLine1}>
                      <Input
                        placeholder="都道府県・市区町村（例: 東京都渋谷区神南）"
                        {...register("addressLine1")}
                      />
                      {errors.addressLine1 && (
                        <p style={{ color: "red", fontSize: "14px" }}>
                          {errors.addressLine1.message}
                        </p>
                      )}
                    </Field.Root>
                    <Field.Root invalid={!!errors.addressLine2}>
                      <Input
                        placeholder="番地・ビル名・部屋番号"
                        {...register("addressLine2")}
                      />
                      {errors.addressLine2 && (
                        <p style={{ color: "red", fontSize: "14px" }}>
                          {errors.addressLine2.message}
                        </p>
                      )}
                    </Field.Root>
                  </Stack>
                </Field.Root>
              </Stack>
            </Box>
          </Box>

          <Box
            bg="white"
            p={6}
            border="1px solid"
            borderColor="gray.100"
            shadow="sm"
          >
            <Box flex={1}>
              <Heading
                as="h2"
                size="sm"
                mb={4}
                fontWeight="bold"
                color="gray.800"
              >
                注文内容の確認
              </Heading>
              <DataList.Root orientation="horizontal">
                <DataList.Item>
                  <DataList.ItemLabel>商品小計</DataList.ItemLabel>
                  <DataList.ItemValue>
                    ¥{cartDataDetails.total_amount.toLocaleString()}
                  </DataList.ItemValue>
                </DataList.Item>
                <DataList.Item>
                  <DataList.ItemLabel>配送料</DataList.ItemLabel>
                  <DataList.ItemValue color={"green"}>無料</DataList.ItemValue>
                </DataList.Item>
                <Separator borderColor="gray.200" />
                <DataList.Item>
                  <DataList.ItemLabel fontSize={"sm"} fontWeight={"bold"}>
                    最終合計金額
                  </DataList.ItemLabel>
                  <DataList.ItemValue>
                    ¥{cartDataDetails.total_amount.toLocaleString()}
                  </DataList.ItemValue>
                </DataList.Item>
              </DataList.Root>
            </Box>

            <Button
              mt={3}
              type="submit"
              colorPalette="black"
              w="full"
              fontWeight="bold"
              variant={"solid"}
            >
              注文を確定する
            </Button>
          </Box>
        </SimpleGrid>
      </Container>
    </Form>
  );
}
