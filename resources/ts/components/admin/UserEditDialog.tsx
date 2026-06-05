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
import React, { useEffect, useState } from "react";

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
  const [formData, setFormData] = useState({
    id: "",
    name: "",
    email: "",
    password: "",
  });

  useEffect(() => {
    if (editingUser) {
      setFormData({
        id: String(editingUser.id),
        name: editingUser.name,
        email: String(editingUser.email),
        password: editingUser.password,
      });
    }
  }, [editingUser]);

  const handleEdit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingUser) return;

    const submitData = {
      name: formData.name,
      email: formData.email,
      password: formData.password,
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
          setFormData({
            id: "",
            name: "",
            email: "",
            password: "",
          });
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
            <form onSubmit={handleEdit}>
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
                    <Input
                      placeholder="例：山田 太郎"
                      value={formData.name}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          name: e.target.value,
                        })
                      }
                      required
                    />
                  </Field.Root>
                  <Field.Root>
                    <Field.Label>メールアドレス</Field.Label>
                    <Input
                      type="email"
                      placeholder="example@in-g.jp"
                      value={formData.email}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          email: e.target.value,
                        })
                      }
                      required
                    />
                  </Field.Root>
                  <Field.Root>
                    <Field.Label>パスワード</Field.Label>
                    <Input
                      type="password"
                      value={formData.password}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          password: e.target.value,
                        })
                      }
                      required
                    />
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
