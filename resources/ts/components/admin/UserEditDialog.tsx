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
  fetchUsers: () => void;
}

export default function UserEditDialog({
  isEditDialogOpen,
  setIsEditDialogOpen,
  editingUser,
  fetchUsers,
}: UserEditDialogProps) {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<EditUserSchemaType>({
    resolver: zodResolver(editUserSchema),
    defaultValues: {
      username: "",
      email: "",
    },
  });
  useEffect(() => {
    if (editingUser) {
      reset({
        username: String(editingUser.name),
        email: String(editingUser.email),
      });
    } else {
      reset({ username: "", email: "" });
    }
  }, [editingUser, reset]);

  const onSubmit = (data: EditUserSchemaType) => {
    if (!editingUser) return;

    const submitData = {
      name: data.username,
      email: data.email,
    };
    fetch(`/api/users/${editingUser.id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(submitData),
    })
      .then((res) => {
        if (res.ok) {
          alert("更新が完了しました。");
          fetchUsers();
          setIsEditDialogOpen(false);
        } else {
          throw new Error("更新失敗");
        }
      })
      .catch((error) => {
        console.log(error);
        setIsEditDialogOpen(true);
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
                    <Input {...register("username")} />
                    {errors.username && (
                      <p style={{ color: "red" }}>{errors.username.message}</p>
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
