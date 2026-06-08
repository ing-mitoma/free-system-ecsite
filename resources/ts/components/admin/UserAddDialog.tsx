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
import {
  AddUserSchemaType,
  UserSchema,
} from "../validation/AdminUserValidation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

interface UserAddDialogProps {
  isAddDialogOpen: boolean;
  setIsAddDialogOpen: (open: boolean) => void;
  fetchUsers: () => void;
}

export default function UserAddDialog({
  isAddDialogOpen,
  setIsAddDialogOpen,
  fetchUsers,
}: UserAddDialogProps) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<AddUserSchemaType>({
    resolver: zodResolver(UserSchema),
    defaultValues: {
      username: "",
      email: "",
      password: "",
    },
  });
  const onSubmit = (data: AddUserSchemaType) => {
    const submitData = {
      name: data.username,
      email: data.email,
      password: data.password,
    };
    fetch("/api/users", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(submitData),
    })
      .then((res) => {
        if (res.ok) {
          alert("登録が完了しました。");
          fetchUsers();
          setIsAddDialogOpen(false);
        } else {
          throw new Error("登録失敗");
        }
      })
      .catch((error) => {
        console.log(error);
        setIsAddDialogOpen(true);
      });
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
                  管理者情報の作成
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
                  <Field.Root>
                    <Field.Label>パスワード</Field.Label>
                    <Input type="password" {...register("password")} />
                    {errors.password ? (
                      <p style={{ color: "red" }}>{errors.password.message}</p>
                    ) : (
                      <p>
                        ※英数字（大文字を1つ以上）を使用し、8文字以上でパスワードを設定してください
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
