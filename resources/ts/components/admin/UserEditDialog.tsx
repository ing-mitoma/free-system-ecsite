import {
  Dialog,
  Button,
  Portal,
  CloseButton,
  Stack,
  Field,
  Input,
  DialogCloseTrigger,
} from "@chakra-ui/react";
import { useEffect } from "react";
import {
  EditUserSchemaType,
  editUserSchema,
} from "../validation/AdminUserValidation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQueryClient } from "@tanstack/react-query";

interface User {
  id: number;
  name: string;
  email: string;
  password: string;
}

interface UserEditDialogProps {
  isEditDialogOpen: boolean;
  setIsEditDialogOpen: (open: boolean) => void;
  editingUser: User | null;
}
const updateUser = async ({
  id,
  data,
}: {
  id: number;
  data: EditUserSchemaType;
}) => {
  const res = await fetch(`/api/users/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  if (!res.ok) {
    throw new Error("商品情報の更新に失敗しました");
  }
  return res.json();
};

export default function UserEditDialog({
  isEditDialogOpen,
  setIsEditDialogOpen,
  editingUser,
}: UserEditDialogProps) {
  const queryClient = useQueryClient();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<EditUserSchemaType>({
    resolver: zodResolver(editUserSchema),
    defaultValues: {
      name: "",
      email: "",
    },
  });
  useEffect(() => {
    if (editingUser) {
      reset({
        name: String(editingUser.name),
        email: String(editingUser.email),
      });
    } else {
      reset({ name: "", email: "" });
    }
  }, [editingUser, reset]);

  const editMutation = useMutation({
    mutationFn: updateUser,
    onSuccess: () => {
      alert("更新が完了しました。");
      queryClient.invalidateQueries({ queryKey: ["products"] });
      setIsEditDialogOpen(false);
    },
    onError: (error: any) => {
      alert(error.message);
    },
  });

  const onSubmit = (data: EditUserSchemaType) => {
    if (!editingUser) return;
    editMutation.mutate({
      id: editingUser.id,
      data: data,
    });
  };
  return (
    <Dialog.Root
      size="lg"
      placement="center"
      motionPreset="slide-in-bottom"
      open={isEditDialogOpen}
      onOpenChange={(e) => setIsEditDialogOpen(e.open)}
    >
      <Dialog.Trigger
        asChild
        onClick={() => setIsEditDialogOpen(true)}
      ></Dialog.Trigger>
      <Portal>
        <Dialog.Backdrop />
        <Dialog.Positioner>
          <Dialog.Content>
            <form onSubmit={handleSubmit(onSubmit)}>
              <Dialog.Header>
                <Dialog.Title fontWeight="black" fontSize="xl">
                  管理者情報の編集
                </Dialog.Title>
                <DialogCloseTrigger asChild>
                  <CloseButton size="sm" />
                </DialogCloseTrigger>
              </Dialog.Header>
              <Dialog.Body>
                <Stack gap={4} my={4}>
                  <Field.Root>
                    <Field.Label>管理者名</Field.Label>
                    <Input {...register("name")} />
                    {errors.name && (
                      <p style={{ color: "red" }}>{errors.name.message}</p>
                    )}
                  </Field.Root>
                  <Field.Root>
                    <Field.Label>メールアドレス</Field.Label>
                    <Input {...register("email")} />
                    {errors.email && (
                      <p style={{ color: "red" }}>{errors.email.message}</p>
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
