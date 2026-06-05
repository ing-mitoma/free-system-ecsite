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
import { useState } from "react";

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
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });
  const handleAdd = (e: React.FormEvent) => {
    e.preventDefault();
    const submitData = {
      name: formData.name,
      email: formData.email,
      password: formData.password,
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
          setFormData({
            name: "",
            email: "",
            password: "",
          });
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
            <form onSubmit={handleAdd}>
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
