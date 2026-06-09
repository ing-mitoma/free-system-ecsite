import {
  Dialog,
  Button,
  Portal,
  CloseButton,
  Stack,
  Field,
  Input,
  Textarea,
} from "@chakra-ui/react";
import {
  ProductSchemaType,
  productSchema,
} from "../validation/AdminProductValidation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQueryClient } from "@tanstack/react-query";

interface ProductAddDialogProps {
  isAddDialogOpen: boolean;
  setIsAddDialogOpen: (open: boolean) => void;
}

const createProduct = async (submitData: ProductSchemaType) => {
  const res = await fetch("/api/products", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(submitData),
  });

  if (!res.ok) {
    throw new Error("商品の登録に失敗しました");
  }
  return res.json();
};

export default function ProductAddDialog({
  isAddDialogOpen,
  setIsAddDialogOpen,
}: ProductAddDialogProps) {
  const queryClient = useQueryClient();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ProductSchemaType>({
    resolver: zodResolver(productSchema),
    defaultValues: {
      name: "",
      price: 0,
      category: "",
      emoji: "",
      description: "",
    },
  });

  const addMutation = useMutation({
    mutationFn: createProduct,
    onSuccess: () => {
      alert("登録が完了しました。");
      reset();
      queryClient.invalidateQueries({ queryKey: ["products"] });
      setIsAddDialogOpen(false);
    },
    onError: (error: any) => {
      alert(error.message);
    },
  });

  const onSubmit = (data: ProductSchemaType) => {
    addMutation.mutate(data);
  };
  return (
    <Dialog.Root
      size="lg"
      placement="center"
      motionPreset="slide-in-bottom"
      open={isAddDialogOpen}
      onOpenChange={(e) => setIsAddDialogOpen(e.open)}
    >
      <Dialog.Trigger asChild onClick={() => setIsAddDialogOpen(true)}>
        <Button colorPalette="black" size="sm" fontWeight={"bold"}>
          + 新規作成
        </Button>
      </Dialog.Trigger>
      <Portal>
        <Dialog.Backdrop />
        <Dialog.Positioner>
          <Dialog.Content>
            <form onSubmit={handleSubmit(onSubmit)}>
              <Dialog.Header>
                <Dialog.Title fontWeight="black" fontSize="xl">
                  新規商品の登録
                </Dialog.Title>
                <Dialog.CloseTrigger>
                  <CloseButton size="sm" />
                </Dialog.CloseTrigger>
              </Dialog.Header>
              <Dialog.Body>
                <Stack gap={4} my={4}>
                  <Field.Root>
                    <Field.Label>商品名</Field.Label>
                    <Input {...register("name")} />
                    {errors.name && (
                      <p style={{ color: "red" }}>{errors.name.message}</p>
                    )}
                  </Field.Root>
                  <Field.Root>
                    <Field.Label>価格</Field.Label>
                    <Input {...register("price", { valueAsNumber: true })} />
                    {errors.price && (
                      <p style={{ color: "red" }}>{errors.price.message}</p>
                    )}
                  </Field.Root>
                  <Field.Root>
                    <Field.Label>カテゴリー</Field.Label>
                    <select
                      {...register("category")}
                      style={{
                        width: "100%",
                        padding: "8px",
                        border: "1px solid #E2E8F0",
                      }}
                    >
                      <option value="財布・小物">👛 財布・小物</option>
                      <option value="バッグ">👜 バッグ</option>
                      <option value="シューズ">👟 シューズ</option>
                      <option value="アパレル">🧥 アパレル</option>
                      <option value="アクセサリー">👓 アクセサリー</option>
                      <option value="時計">⌚ 時計</option>
                      <option value="ガジェット">🎧 ガジェット</option>
                      <option value="ステーショナリー">
                        ✏️ ステーショナリー
                      </option>
                      <option value="ライフスタイル">🥛 ライフスタイル</option>
                    </select>
                    {errors.category && (
                      <p style={{ color: "red" }}>{errors.category.message}</p>
                    )}
                  </Field.Root>
                  <Field.Root>
                    <Field.Label>画像</Field.Label>
                    <Input {...register("emoji")} />
                    {errors.emoji && (
                      <p style={{ color: "red" }}>{errors.emoji.message}</p>
                    )}
                  </Field.Root>
                  <Field.Root>
                    <Field.Label>商品説明</Field.Label>
                    <Textarea {...register("description")} />
                    {errors.description && (
                      <p style={{ color: "red" }}>
                        {errors.description.message}
                      </p>
                    )}
                  </Field.Root>
                </Stack>
              </Dialog.Body>
              <Dialog.Footer>
                <Button type="submit" colorPalette="black" fontWeight="bold">
                  保存する
                </Button>
              </Dialog.Footer>
            </form>
          </Dialog.Content>
        </Dialog.Positioner>
      </Portal>
    </Dialog.Root>
  );
}
